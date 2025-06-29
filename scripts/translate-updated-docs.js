const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { LANGUAGES, translateDirectory } = require('./translate-all-docs');

/**
 * 智能文本翻译函数 - 根据文件类型区分翻译策略
 */
function translateText(text, langCode, isSchemaFile = false) {
  const translations = LANGUAGES[langCode].translations;
  let translatedText = text;
  
  if (isSchemaFile) {
    // schemas目录下的技术文档：只翻译描述性内容，保留技术字段名
    translatedText = translateSchemaContent(text, langCode);
  } else {
    // 根目录下的文档：翻译所有内容，但保留技术字段名
    translatedText = translateRootContent(text, langCode);
  }
  
  return translatedText;
}

/**
 * 翻译schemas目录下的技术文档
 * 规则：字段名称不翻译，只翻译描述性内容
 */
function translateSchemaContent(text, langCode) {
  const translations = LANGUAGES[langCode].translations;
  const commonPhrases = getCommonPhrases(langCode);
  let translatedText = text;
  
  // 定义技术字段名模式（不翻译）- 根据新翻译规则增强
  const technicalFieldPatterns = [
    // 基础字段名
    /\b(confirmId|planId|userId|agentId|timestamp|status|type|id|roleId|workflowId|traceId|contextId|deliveryId|projectName|createdAt|agentStates|memory)\b/g,
    // MPLP相关技术类型
    /\b(MPLP\.[A-Za-z\u4e00-\u9fff]+)\b/g, // MPLP.确认、MPLP.Schema等
    // camelCase字段名（更精确的模式）
    /\b([a-z]+[A-Z][a-zA-Z]*(?:Id|Type|Status|Config|Data|Info|Ref|Name|At|States)?)\b/g,
    // 技术术语和关键词
    /\b(Schema|Type|Interface|Enum|Protocol|Workflow|Context|Trace|Delivery|Role)\b/g,
    // JSON Schema相关术语
    /\b(properties|required|additionalProperties|items|anyOf|oneOf|allOf)\b/g,
    // 技术文档中的结构化字段
    /\b(\w+)(?=\s*:.*?\{.*?\})/g, // 对象定义前的字段名
    // API和协议相关术语
    /\b(API|HTTP|JSON|UUID|URI|URL|REST|GraphQL)\b/g,
    // Markdown表格中的字段名（方括号内的锚点链接）
    /\[([a-zA-Z][a-zA-Z0-9]*(?:[A-Z][a-z0-9]*)*(?:Id|Type|Status|Config|Data|Info|Ref|Name|At|States)?)\]\(#[^)]+\)/g,
    // 锚点ID（#后面的字段名）
    /#([a-zA-Z][a-zA-Z0-9]*(?:[a-z][A-Z][a-zA-Z0-9]*)*(?:id|type|status|config|data|info|ref|name|at|states)?)/g,
    // 表格中独立的字段名（在|之间）
    /\|\s*([a-zA-Z][a-zA-Z0-9]*(?:[A-Z][a-z0-9]*)*(?:Id|Type|Status|Config|Data|Info|Ref|Name|At|States)?)\s*\|/g
  ];
  
  // 保护技术字段名和特殊内容
  const protectedFields = [];
  let protectedText = translatedText;
  
  // 额外保护模式：URL路径、文件名、技术标识符
  const additionalProtectionPatterns = [
    // URL路径和文件名
    /https?:\/\/[^\s"')]+/g,
    /[a-zA-Z0-9_-]+\.(?:schema\.json|md|html|js|ts|py)/g,
    // 定义位置链接中的文件名
    /"[^"]*\.schema\.json[^"]*"/g,
    // 版本号和时间戳
    /v\d+\.\d+/g,
    /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[+\-]\d{2}:\d{2}/g,
    // 代码块内容（保护整个代码块）
    /```[\s\S]*?```/g,
    // 行内代码
    /`[^`]+`/g
  ];
  
  // 先保护额外内容
  additionalProtectionPatterns.forEach((pattern, index) => {
    protectedText = protectedText.replace(pattern, (match) => {
      const placeholder = `__PROTECTED_ADDITIONAL_${index}_${protectedFields.length}__`;
      protectedFields.push({ placeholder, original: match });
      return placeholder;
    });
  });
  
  // 再保护技术字段名
  technicalFieldPatterns.forEach((pattern, index) => {
    protectedText = protectedText.replace(pattern, (match) => {
      const placeholder = `__PROTECTED_FIELD_${index}_${protectedFields.length}__`;
      protectedFields.push({ placeholder, original: match });
      return placeholder;
    });
  });
  
  // 翻译描述性内容
  const allTranslations = { ...commonPhrases, ...translations };
  const sortedKeys = Object.keys(allTranslations).sort((a, b) => b.length - a.length);
  
  for (const key of sortedKeys) {
    const regex = new RegExp(escapeRegExp(key), 'gi');
    protectedText = protectedText.replace(regex, allTranslations[key]);
  }
  
  // 恢复受保护的技术字段名
  protectedFields.forEach(({ placeholder, original }) => {
    protectedText = protectedText.replace(placeholder, original);
  });
  
  return protectedText;
}

/**
 * 翻译根目录下的文档内容
 * 规则：翻译标题和内容，但保留结构说明中的字段名
 */
function translateRootContent(text, langCode) {
  const translations = LANGUAGES[langCode].translations;
  const commonPhrases = getCommonPhrases(langCode);
  let translatedText = text;
  
  // 定义需要保护的技术字段名（在结构说明中）- 根据新翻译规则增强
  const fieldNamePatterns = [
    // 冒号前的基础字段名（扩展更多常见字段）
    /\b(confirmId|planId|userId|agentId|timestamp|status|type|id|roleId|workflowId|traceId|contextId|deliveryId|projectName|createdAt|agentStates|memory|format|description|title|version|enum)(?=\s*:)/g,
    // camelCase字段名（冒号前，更精确，支持更多后缀）
    /\b([a-z]+[A-Z][a-zA-Z]*(?:Id|Type|Status|Config|Data|Info|Ref|Name|At|States|Memory|Format|Description|Title|Version|Enum)?)(?=\s*:)/g,
    // MPLP技术类型（支持中文）
    /\b(MPLP\.[A-Za-z\u4e00-\u9fff]+)\b/g,
    // 技术术语（独立出现时）
    /\b(Schema|Type|Interface|Enum|Protocol|Workflow|Context|Trace|Delivery|Role)(?=\s*:)/g,
    // JSON Schema字段
    /\b(properties|required|additionalProperties|items|anyOf|oneOf|allOf|\$schema|\$id)(?=\s*:)/g,
    // 保护英文短语和技术描述（避免部分翻译）
    /\b(the global state management and shared context mechanism for all agents within a multi-agent project)\b/g,
    /\b(JSON-based key-value pool, with memory backend)\b/g,
    /\b(Standard lifecycle)\b/g,
    /\b(initialize → update → resolve → persist)\b/g,
    /\b(Unique identifier for)\b/g,
    /\b(Human-readable project name)\b/g,
    /\b(ISO 8601 timestamp of)\b/g,
    /\b(Array tracking all active agents)\b/g,
    /\b(Flexible key-value store for)\b/g,
    // 保护代码块和行内代码
    /```[\s\S]*?```/g,
    /`[^`]+`/g,
    // 保护URL和文件路径
    /https?:\/\/[^\s]+/g,
    /[a-zA-Z]:\\[^\s]+/g,
    /\.[a-zA-Z0-9]+\//g
  ];
  
  // 保护字段名
  const protectedFields = [];
  let protectedText = translatedText;
  
  fieldNamePatterns.forEach((pattern, index) => {
    protectedText = protectedText.replace(pattern, (match) => {
      const placeholder = `__PROTECTED_FIELD_${index}_${protectedFields.length}__`;
      protectedFields.push({ placeholder, original: match });
      return placeholder;
    });
  });
  
  // 翻译所有其他内容
  const allTranslations = { ...commonPhrases, ...translations };
  const sortedKeys = Object.keys(allTranslations).sort((a, b) => b.length - a.length);
  
  for (const key of sortedKeys) {
    const regex = new RegExp(escapeRegExp(key), 'gi');
    protectedText = protectedText.replace(regex, allTranslations[key]);
  }
  
  // 恢复受保护的字段名
  protectedFields.forEach(({ placeholder, original }) => {
    protectedText = protectedText.replace(placeholder, original);
  });
  
  return protectedText;
}

/**
 * 转义正则表达式特殊字符
 */
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * 获取常见短语翻译
 */
function getCommonPhrases(langCode) {
  const phrases = {
    'jp': {
      'This protocol freezes intent and enables multi-round confirmation to prevent execution drift and ensure alignment with user expectations.': 'このプロトコルは意図を固定し、実行のドリフトを防ぎ、ユーザーの期待との整合性を確保するために、マルチラウンド確認を可能にします。',
      'Multi-stage confirmation with checkpoints and user approval gates.': 'チェックポイントとユーザー承認ゲートを持つマルチステージ確認。',
      'Standard lifecycle: capture → freeze → review → approve → proceed': '標準ライフサイクル: キャプチャ → 固定 → レビュー → 承認 → 進行',
      'Unique identifier for each confirmation instance': '各確認インスタンスの一意識別子',
      'Reference to the plan being confirmed': '確認されるプランへの参照',
      'Multi-stage approval workflow with status tracking': 'ステータス追跡を伴うマルチステージ承認ワークフロー',
      'Structured mechanism for undoing confirmed changes': '確認された変更を元に戻すための構造化メカニズム',
      'Overall confirmation state (pending, confirmed, rejected, rolled_back)': '全体的な確認状態（保留中、確認済み、拒否、ロールバック）',
      'Audit trail for confirmation actions': '確認アクションの監査証跡',
      'Unique identifier for the confirmation instance.': '確認インスタンスの一意識別子。',
      'Associated plan identifier being confirmed.': '確認される関連プラン識別子。',
      'User or agent that performed the confirmation.': '確認を実行したユーザーまたはエージェント。',
      'Timestamp of the confirmation.': '確認のタイムスタンプ。',
      'Key Components:': '主要コンポーネント:',
      'Suggested Execution Model': '推奨実行モデル'
    },
    'kr': {
      'This protocol freezes intent and enables multi-round confirmation to prevent execution drift and ensure alignment with user expectations.': '이 프로토콜은 의도를 고정하고 실행 드리프트를 방지하며 사용자 기대와의 일치를 보장하기 위해 다중 라운드 확인을 가능하게 합니다.',
      'Multi-stage confirmation with checkpoints and user approval gates.': '체크포인트와 사용자 승인 게이트가 있는 다단계 확인.',
      'Standard lifecycle: capture → freeze → review → approve → proceed': '표준 라이프사이클: 캡처 → 고정 → 검토 → 승인 → 진행',
      'Unique identifier for each confirmation instance': '각 확인 인스턴스의 고유 식별자',
      'Reference to the plan being confirmed': '확인되는 계획에 대한 참조',
      'Multi-stage approval workflow with status tracking': '상태 추적이 있는 다단계 승인 워크플로우',
      'Structured mechanism for undoing confirmed changes': '확인된 변경사항을 취소하기 위한 구조화된 메커니즘',
      'Overall confirmation state (pending, confirmed, rejected, rolled_back)': '전체 확인 상태 (대기 중, 확인됨, 거부됨, 롤백됨)',
      'Audit trail for confirmation actions': '확인 작업에 대한 감사 추적',
      'Unique identifier for the confirmation instance.': '확인 인스턴스의 고유 식별자.',
      'Associated plan identifier being confirmed.': '확인되는 관련 계획 식별자.',
      'User or agent that performed the confirmation.': '확인을 수행한 사용자 또는 에이전트.',
      'Timestamp of the confirmation.': '확인의 타임스탬프.',
      'Key Components:': '주요 구성 요소:',
      'Suggested Execution Model': '제안된 실행 모델'
    },
    'de': {
      'This protocol freezes intent and enables multi-round confirmation to prevent execution drift and ensure alignment with user expectations.': 'Dieses Protokoll friert die Absicht ein und ermöglicht mehrrundige Bestätigung, um Ausführungsabweichungen zu verhindern und die Übereinstimmung mit Benutzererwartungen sicherzustellen.',
      'Multi-stage confirmation with checkpoints and user approval gates.': 'Mehrstufige Bestätigung mit Checkpoints und Benutzer-Genehmigungsgates.',
      'Standard lifecycle: capture → freeze → review → approve → proceed': 'Standard-Lebenszyklus: erfassen → einfrieren → überprüfen → genehmigen → fortfahren',
      'Unique identifier for each confirmation instance': 'Eindeutige Kennung für jede Bestätigungsinstanz',
      'Reference to the plan being confirmed': 'Verweis auf den zu bestätigenden Plan',
      'Multi-stage approval workflow with status tracking': 'Mehrstufiger Genehmigungsworkflow mit Statusverfolgung',
      'Structured mechanism for undoing confirmed changes': 'Strukturierter Mechanismus zum Rückgängigmachen bestätigter Änderungen',
      'Overall confirmation state (pending, confirmed, rejected, rolled_back)': 'Gesamtbestätigungsstatus (ausstehend, bestätigt, abgelehnt, zurückgesetzt)',
      'Audit trail for confirmation actions': 'Prüfpfad für Bestätigungsaktionen',
      'Unique identifier for the confirmation instance.': 'Eindeutige Kennung für die Bestätigungsinstanz.',
      'Associated plan identifier being confirmed.': 'Zugehörige Plan-Kennung, die bestätigt wird.',
      'User or agent that performed the confirmation.': 'Benutzer oder Agent, der die Bestätigung durchgeführt hat.',
      'Timestamp of the confirmation.': 'Zeitstempel der Bestätigung.',
      'Key Components:': 'Hauptkomponenten:',
      'Suggested Execution Model': 'Vorgeschlagenes Ausführungsmodell'
    },
    'es': {
      'This protocol freezes intent and enables multi-round confirmation to prevent execution drift and ensure alignment with user expectations.': 'Este protocolo congela la intención y permite confirmación de múltiples rondas para prevenir la deriva de ejecución y asegurar la alineación con las expectativas del usuario.',
      'Multi-stage confirmation with checkpoints and user approval gates.': 'Confirmación de múltiples etapas con puntos de control y puertas de aprobación del usuario.',
      'Standard lifecycle: capture → freeze → review → approve → proceed': 'Ciclo de vida estándar: capturar → congelar → revisar → aprobar → proceder',
      'Unique identifier for each confirmation instance': 'Identificador único para cada instancia de confirmación',
      'Reference to the plan being confirmed': 'Referencia al plan que se está confirmando',
      'Multi-stage approval workflow with status tracking': 'Flujo de trabajo de aprobación de múltiples etapas con seguimiento de estado',
      'Structured mechanism for undoing confirmed changes': 'Mecanismo estructurado para deshacer cambios confirmados',
      'Overall confirmation state (pending, confirmed, rejected, rolled_back)': 'Estado general de confirmación (pendiente, confirmado, rechazado, revertido)',
      'Audit trail for confirmation actions': 'Rastro de auditoría para acciones de confirmación',
      'Unique identifier for the confirmation instance.': 'Identificador único para la instancia de confirmación.',
      'Associated plan identifier being confirmed.': 'Identificador del plan asociado que se está confirmando.',
      'User or agent that performed the confirmation.': 'Usuario o agente que realizó la confirmación.',
      'Timestamp of the confirmation.': 'Marca de tiempo de la confirmación.',
      'Key Components:': 'Componentes Clave:',
      'Suggested Execution Model': 'Modelo de Ejecución Sugerido'
    },
    'fr': {
      'This protocol freezes intent and enables multi-round confirmation to prevent execution drift and ensure alignment with user expectations.': 'Ce protocole fige l\'intention et permet une confirmation multi-tours pour prévenir la dérive d\'exécution et assurer l\'alignement avec les attentes de l\'utilisateur.',
      'Multi-stage confirmation with checkpoints and user approval gates.': 'Confirmation multi-étapes avec points de contrôle et portes d\'approbation utilisateur.',
      'Standard lifecycle: capture → freeze → review → approve → proceed': 'Cycle de vie standard : capturer → figer → réviser → approuver → procéder',
      'Unique identifier for each confirmation instance': 'Identifiant unique pour chaque instance de confirmation',
      'Reference to the plan being confirmed': 'Référence au plan en cours de confirmation',
      'Multi-stage approval workflow with status tracking': 'Flux de travail d\'approbation multi-étapes avec suivi de statut',
      'Structured mechanism for undoing confirmed changes': 'Mécanisme structuré pour annuler les changements confirmés',
      'Overall confirmation state (pending, confirmed, rejected, rolled_back)': 'État de confirmation global (en attente, confirmé, rejeté, annulé)',
      'Audit trail for confirmation actions': 'Piste d\'audit pour les actions de confirmation',
      'Unique identifier for the confirmation instance.': 'Identifiant unique pour l\'instance de confirmation.',
      'Associated plan identifier being confirmed.': 'Identifiant du plan associé en cours de confirmation.',
      'User or agent that performed the confirmation.': 'Utilisateur ou agent qui a effectué la confirmation.',
      'Timestamp of the confirmation.': 'Horodatage de la confirmation.',
      'Key Components:': 'Composants Clés :',
      'Suggested Execution Model': 'Modèle d\'Exécution Suggéré'
    },
    'it': {
      'This protocol freezes intent and enables multi-round confirmation to prevent execution drift and ensure alignment with user expectations.': 'Questo protocollo congela l\'intento e abilita la conferma multi-round per prevenire la deriva di esecuzione e assicurare l\'allineamento con le aspettative dell\'utente.',
      'Multi-stage confirmation with checkpoints and user approval gates.': 'Conferma multi-stadio con checkpoint e gate di approvazione utente.',
      'Standard lifecycle: capture → freeze → review → approve → proceed': 'Ciclo di vita standard: catturare → congelare → rivedere → approvare → procedere',
      'Unique identifier for each confirmation instance': 'Identificatore unico per ogni istanza di conferma',
      'Reference to the plan being confirmed': 'Riferimento al piano che viene confermato',
      'Multi-stage approval workflow with status tracking': 'Flusso di lavoro di approvazione multi-stadio con tracciamento dello stato',
      'Structured mechanism for undoing confirmed changes': 'Meccanismo strutturato per annullare le modifiche confermate',
      'Overall confirmation state (pending, confirmed, rejected, rolled_back)': 'Stato di conferma complessivo (in sospeso, confermato, rifiutato, annullato)',
      'Audit trail for confirmation actions': 'Traccia di audit per le azioni di conferma',
      'Unique identifier for the confirmation instance.': 'Identificatore unico per l\'istanza di conferma.',
      'Associated plan identifier being confirmed.': 'Identificatore del piano associato che viene confermato.',
      'User or agent that performed the confirmation.': 'Utente o agente che ha eseguito la conferma.',
      'Timestamp of the confirmation.': 'Timestamp della conferma.',
      'Key Components:': 'Componenti Chiave:',
      'Suggested Execution Model': 'Modello di Esecuzione Suggerito'
    },
    'ru': {
      'This protocol freezes intent and enables multi-round confirmation to prevent execution drift and ensure alignment with user expectations.': 'Этот протокол замораживает намерение и обеспечивает многораундовое подтверждение для предотвращения дрейфа выполнения и обеспечения соответствия ожиданиям пользователя.',
      'Multi-stage confirmation with checkpoints and user approval gates.': 'Многоэтапное подтверждение с контрольными точками и воротами одобрения пользователя.',
      'Standard lifecycle: capture → freeze → review → approve → proceed': 'Стандартный жизненный цикл: захват → заморозка → обзор → одобрение → продолжение',
      'Unique identifier for each confirmation instance': 'Уникальный идентификатор для каждого экземпляра подтверждения',
      'Reference to the plan being confirmed': 'Ссылка на подтверждаемый план',
      'Multi-stage approval workflow with status tracking': 'Многоэтапный рабочий процесс одобрения с отслеживанием статуса',
      'Structured mechanism for undoing confirmed changes': 'Структурированный механизм для отмены подтвержденных изменений',
      'Overall confirmation state (pending, confirmed, rejected, rolled_back)': 'Общее состояние подтверждения (ожидание, подтверждено, отклонено, откачено)',
      'Audit trail for confirmation actions': 'Аудиторский след для действий подтверждения',
      'Unique identifier for the confirmation instance.': 'Уникальный идентификатор для экземпляра подтверждения.',
      'Associated plan identifier being confirmed.': 'Идентификатор связанного плана, который подтверждается.',
      'User or agent that performed the confirmation.': 'Пользователь или агент, который выполнил подтверждение.',
      'Timestamp of the confirmation.': 'Временная метка подтверждения.',
      'Key Components:': 'Ключевые Компоненты:',
      'Suggested Execution Model': 'Предлагаемая Модель Выполнения'
    },
    'zh': {
      'This protocol freezes intent and enables multi-round confirmation to prevent execution drift and ensure alignment with user expectations.': '此协议冻结意图并启用多轮确认，以防止执行偏移并确保与用户期望保持一致。',
      'Multi-stage confirmation with checkpoints and user approval gates.': '具有检查点和用户批准门的多阶段确认。',
      'Standard lifecycle: capture → freeze → review → approve → proceed': '标准生命周期：捕获 → 冻结 → 审查 → 批准 → 继续',
      'Unique identifier for each confirmation instance': '每个确认实例的唯一标识符',
      'Reference to the plan being confirmed': '对正在确认的计划的引用',
      'Multi-stage approval workflow with status tracking': '具有状态跟踪的多阶段批准工作流',
      'Structured mechanism for undoing confirmed changes': '用于撤销已确认更改的结构化机制',
      'Overall confirmation state (pending, confirmed, rejected, rolled_back)': '整体确认状态（待定、已确认、已拒绝、已回滚）',
      'Audit trail for confirmation actions': '确认操作的审计跟踪',
      'Unique identifier for the confirmation instance.': '确认实例的唯一标识符。',
      'Associated plan identifier being confirmed.': '正在确认的关联计划标识符。',
      'User or agent that performed the confirmation.': '执行确认的用户或代理。',
      'Timestamp of the confirmation.': '确认的时间戳。',
      'Key Components:': '关键组件：',
      'Suggested Execution Model': '建议的执行模型'
    },
    'tw': {
      'This protocol freezes intent and enables multi-round confirmation to prevent execution drift and ensure alignment with user expectations.': '此協議凍結意圖並啟用多輪確認，以防止執行偏移並確保與用戶期望保持一致。',
      'Multi-stage confirmation with checkpoints and user approval gates.': '具有檢查點和用戶批准門的多階段確認。',
      'Standard lifecycle: capture → freeze → review → approve → proceed': '標準生命週期：捕獲 → 凍結 → 審查 → 批准 → 繼續',
      'Unique identifier for each confirmation instance': '每個確認實例的唯一標識符',
      'Reference to the plan being confirmed': '對正在確認的計劃的引用',
      'Multi-stage approval workflow with status tracking': '具有狀態跟蹤的多階段批准工作流',
      'Structured mechanism for undoing confirmed changes': '用於撤銷已確認更改的結構化機制',
      'Overall confirmation state (pending, confirmed, rejected, rolled_back)': '整體確認狀態（待定、已確認、已拒絕、已回滾）',
      'Audit trail for confirmation actions': '確認操作的審計跟蹤',
      'Unique identifier for the confirmation instance.': '確認實例的唯一標識符。',
      'Associated plan identifier being confirmed.': '正在確認的關聯計劃標識符。',
      'User or agent that performed the confirmation.': '執行確認的用戶或代理。',
      'Timestamp of the confirmation.': '確認的時間戳。',
      'Key Components:': '關鍵組件：',
      'Suggested Execution Model': '建議的執行模型'
    }
  };
  
  return phrases[langCode] || {};
}

// 配置文件路径
const HASH_FILE = path.join(__dirname, '.translation-hashes.json');
const SOURCE_DIR = 'docs/schemas';
const ROOT_SOURCE_DIR = 'docs';

/**
 * 计算文件的MD5哈希值
 */
function calculateFileHash(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      return null;
    }
    const content = fs.readFileSync(filePath, 'utf8');
    return crypto.createHash('md5').update(content).digest('hex');
  } catch (error) {
    console.error(`计算文件哈希失败 ${filePath}:`, error.message);
    return null;
  }
}

/**
 * 加载已保存的文件哈希值
 */
function loadSavedHashes() {
  try {
    if (fs.existsSync(HASH_FILE)) {
      const content = fs.readFileSync(HASH_FILE, 'utf8');
      return JSON.parse(content);
    }
  } catch (error) {
    console.warn('加载哈希文件失败:', error.message);
  }
  return {};
}

/**
 * 保存文件哈希值
 */
function saveSavedHashes(hashes) {
  try {
    fs.writeFileSync(HASH_FILE, JSON.stringify(hashes, null, 2), 'utf8');
  } catch (error) {
    console.error('保存哈希文件失败:', error.message);
  }
}

/**
 * 获取所有源文件
 */
function getAllSourceFiles() {
  const sourceFiles = [];
  
  // 获取schemas目录下的文件
  if (fs.existsSync(SOURCE_DIR)) {
    const schemaFiles = fs.readdirSync(SOURCE_DIR)
      .filter(file => file.endsWith('.md'))
      .map(file => ({
        path: path.join(SOURCE_DIR, file),
        relativePath: `schemas/${file}`,
        targetSubDir: 'schemas'
      }));
    sourceFiles.push(...schemaFiles);
  }
  
  // 获取根目录下的协议文件
  const rootFiles = ['Confirm.md', 'Context.md', 'Delivery.md', 'Execute.md', 
                    'Learn.md', 'Plan.md', 'Role.md', 'Test.md', 'Trace.md', 'Workflow.md'];
  
  for (const file of rootFiles) {
    const filePath = path.join(ROOT_SOURCE_DIR, file);
    if (fs.existsSync(filePath)) {
      sourceFiles.push({
        path: filePath,
        relativePath: file,
        targetSubDir: ''
      });
    }
  }
  
  return sourceFiles;
}

/**
 * 检测已更新的文件
 */
function detectUpdatedFiles() {
  console.log('🔍 检测文档更新...');
  
  const savedHashes = loadSavedHashes();
  const sourceFiles = getAllSourceFiles();
  const updatedFiles = [];
  const newHashes = {};
  
  for (const fileInfo of sourceFiles) {
    const currentHash = calculateFileHash(fileInfo.path);
    if (currentHash === null) {
      continue;
    }
    
    const savedHash = savedHashes[fileInfo.relativePath];
    newHashes[fileInfo.relativePath] = currentHash;
    
    if (savedHash !== currentHash) {
      updatedFiles.push(fileInfo);
      if (savedHash) {
        console.log(`📝 检测到更新: ${fileInfo.relativePath}`);
      } else {
        console.log(`🆕 检测到新文件: ${fileInfo.relativePath}`);
      }
    }
  }
  
  if (updatedFiles.length === 0) {
    console.log('✅ 没有检测到文档更新');
  } else {
    console.log(`📊 共检测到 ${updatedFiles.length} 个更新的文件`);
  }
  
  return { updatedFiles, newHashes };
}

/**
 * 创建翻译状态头部
 */
function createTranslationHeader(langCode) {
  const timestamp = new Date().toISOString().split('T')[0];
  return `<!-- 此文件由自动翻译生成，请勿手动编辑 -->
<!-- 翻译状态: 已完成 -->
<!-- 原文档: docs/schemas/ -->
<!-- 最后更新: ${timestamp} -->
<!-- 翻译版本: 1.0 -->
<!-- 翻译语言: ${LANGUAGES[langCode].name} -->

`;
}

/**
 * 翻译单个文档
 */
function translateDocumentUpdated(sourceFile, targetFile, langCode) {
  try {
    // 判断是否为schemas目录下的文件
    const isSchemaFile = sourceFile.includes('schemas');
    
    // 读取源文件内容
    const sourceContent = fs.readFileSync(sourceFile, 'utf8');
    
    // 创建翻译头部
    const header = createTranslationHeader(langCode);
    
    // 翻译内容
    const translatedContent = translateText(sourceContent, langCode, isSchemaFile);
    
    // 组合最终内容
    const finalContent = header + translatedContent;
    
    // 确保目标目录存在
    const targetDir = path.dirname(targetFile);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    
    // 写入翻译后的文件
    fs.writeFileSync(targetFile, finalContent, 'utf8');
    
    const strategy = isSchemaFile ? 'Schema策略' : 'Root策略';
    console.log(`   ✓ ${path.basename(sourceFile)} → ${path.basename(targetFile)} (${strategy})`);
    return true;
  } catch (error) {
    console.error(`   ✗ 翻译失败 ${path.basename(sourceFile)}:`, error.message);
    return false;
  }
}

/**
 * 翻译更新的文档
 */
function translateUpdatedDocuments(targetLanguages = null, forceAll = false) {
  const timestamp = new Date().toISOString().split('T')[0];
  console.log(`开始翻译更新的文档 - ${timestamp}`);
  console.log('=' .repeat(50));
  
  const languagesToTranslate = targetLanguages || Object.keys(LANGUAGES);
  
  let updatedFiles, newHashes;
  
  if (forceAll) {
    console.log('🔄 强制翻译所有文档');
    const sourceFiles = getAllSourceFiles();
    updatedFiles = sourceFiles;
    newHashes = {};
    for (const fileInfo of sourceFiles) {
      const hash = calculateFileHash(fileInfo.path);
      if (hash) {
        newHashes[fileInfo.relativePath] = hash;
      }
    }
  } else {
    const detection = detectUpdatedFiles();
    updatedFiles = detection.updatedFiles;
    newHashes = detection.newHashes;
  }
  
  if (updatedFiles.length === 0 && !forceAll) {
    console.log('\n🎉 没有需要翻译的文档更新!');
    return { totalSuccess: 0, totalFailed: 0, results: {} };
  }
  
  const results = {};
  let grandTotalSuccess = 0;
  let grandTotalFailed = 0;
  
  for (const langCode of languagesToTranslate) {
    if (!LANGUAGES[langCode]) {
      console.warn(`警告: 不支持的语言代码: ${langCode}`);
      continue;
    }
    
    console.log(`\n🌐 翻译语言: ${LANGUAGES[langCode].name} (${langCode})`);
    console.log('-'.repeat(30));
    
    let success = 0;
    let failed = 0;
    
    for (const fileInfo of updatedFiles) {
      const targetFile = path.join(
        LANGUAGES[langCode].dir, 
        fileInfo.targetSubDir, 
        path.basename(fileInfo.path)
      );
      
      if (translateDocumentUpdated(fileInfo.path, targetFile, langCode)) {
        success++;
      } else {
        failed++;
      }
    }
    
    results[langCode] = {
      language: LANGUAGES[langCode].name,
      success,
      failed,
      total: success + failed
    };
    
    grandTotalSuccess += success;
    grandTotalFailed += failed;
    
    console.log(`📊 ${LANGUAGES[langCode].name} 翻译结果:`);
    console.log(`   ✓ 成功: ${success}`);
    console.log(`   ✗ 失败: ${failed}`);
    console.log(`   📄 总计: ${success + failed}`);
  }
  
  // 保存新的哈希值（只有在成功翻译时）
  if (grandTotalSuccess > 0) {
    saveSavedHashes(newHashes);
    console.log('\n💾 已保存文件哈希值');
  }
  
  // 打印总结报告
  console.log('\n' + '='.repeat(50));
  console.log('📋 翻译总结报告');
  console.log('='.repeat(50));
  
  for (const [langCode, result] of Object.entries(results)) {
    console.log(`${result.language} (${langCode}): ${result.success}/${result.total} 成功`);
  }
  
  console.log('-'.repeat(50));
  console.log(`🎯 总计: ${grandTotalSuccess}/${grandTotalSuccess + grandTotalFailed} 文档翻译成功`);
  console.log(`📅 完成时间: ${new Date().toLocaleString()}`);
  
  return {
    totalSuccess: grandTotalSuccess,
    totalFailed: grandTotalFailed,
    results
  };
}

/**
 * 清除哈希缓存
 */
function clearHashCache() {
  try {
    if (fs.existsSync(HASH_FILE)) {
      fs.unlinkSync(HASH_FILE);
      console.log('✅ 已清除哈希缓存');
    } else {
      console.log('ℹ️  哈希缓存文件不存在');
    }
  } catch (error) {
    console.error('清除哈希缓存失败:', error.message);
  }
}

/**
 * 显示文档状态
 */
function showDocumentStatus() {
  console.log('📋 文档状态报告');
  console.log('='.repeat(50));
  
  const savedHashes = loadSavedHashes();
  const sourceFiles = getAllSourceFiles();
  
  console.log(`📄 源文件总数: ${sourceFiles.length}`);
  console.log(`💾 已缓存哈希: ${Object.keys(savedHashes).length}`);
  
  console.log('\n📝 文件状态:');
  for (const fileInfo of sourceFiles) {
    const currentHash = calculateFileHash(fileInfo.path);
    const savedHash = savedHashes[fileInfo.relativePath];
    
    let status;
    if (!savedHash) {
      status = '🆕 新文件';
    } else if (savedHash === currentHash) {
      status = '✅ 已同步';
    } else {
      status = '📝 已更新';
    }
    
    console.log(`   ${status} ${fileInfo.relativePath}`);
  }
  
  // 检查语言目录状态
  console.log('\n🌐 语言目录状态:');
  for (const [langCode, langConfig] of Object.entries(LANGUAGES)) {
    const langDir = langConfig.dir;
    const exists = fs.existsSync(langDir);
    const fileCount = exists ? 
      fs.readdirSync(langDir, { recursive: true })
        .filter(file => file.endsWith('.md')).length : 0;
    
    console.log(`   ${exists ? '✅' : '❌'} ${langConfig.name} (${langCode}): ${fileCount} 文件`);
  }
}

// 主函数
function main() {
  const args = process.argv.slice(2);
  
  // 解析命令行参数
  const options = {
    languages: [],
    forceAll: false,
    clearCache: false,
    showStatus: false
  };
  
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    
    if (arg === '--force' || arg === '-f') {
      options.forceAll = true;
    } else if (arg === '--clear-cache' || arg === '-c') {
      options.clearCache = true;
    } else if (arg === '--status' || arg === '-s') {
      options.showStatus = true;
    } else if (arg === '--help' || arg === '-h') {
      console.log(`
使用方法: node translate-updated-docs.js [选项] [语言代码...]

选项:
  --force, -f        强制翻译所有文档
  --clear-cache, -c  清除哈希缓存
  --status, -s       显示文档状态
  --help, -h         显示帮助信息

语言代码: ${Object.keys(LANGUAGES).join(', ')}

示例:
  node translate-updated-docs.js                    # 翻译所有语言的更新文档
  node translate-updated-docs.js jp kr              # 只翻译日语和韩语的更新文档
  node translate-updated-docs.js --force            # 强制翻译所有文档
  node translate-updated-docs.js --status           # 显示文档状态
  node translate-updated-docs.js --clear-cache      # 清除缓存
`);
      return;
    } else if (LANGUAGES[arg]) {
      options.languages.push(arg);
    } else {
      console.warn(`警告: 未知参数或不支持的语言代码: ${arg}`);
    }
  }
  
  // 执行相应操作
  if (options.clearCache) {
    clearHashCache();
    return;
  }
  
  if (options.showStatus) {
    showDocumentStatus();
    return;
  }
  
  // 执行翻译
  const targetLanguages = options.languages.length > 0 ? options.languages : null;
  
  if (targetLanguages) {
    console.log(`翻译指定语言: ${targetLanguages.join(', ')}`);
  } else {
    console.log('翻译所有支持的语言');
  }
  
  if (options.forceAll) {
    console.log('模式: 强制翻译所有文档');
  } else {
    console.log('模式: 只翻译更新的文档');
  }
  
  translateUpdatedDocuments(targetLanguages, options.forceAll);
}

// 如果直接运行此脚本
if (require.main === module) {
  main();
}

module.exports = {
  translateUpdatedDocuments,
  detectUpdatedFiles,
  clearHashCache,
  showDocumentStatus,
  calculateFileHash
};