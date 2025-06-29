const fs = require('fs');
const path = require('path');

// 完整的9种语言配置（不包括英文原文）
const LANGUAGES = {
  'jp': {
    name: '日本語',
    dir: 'docs/jp',
    statusHeader: '翻訳ステータス: 完了',
    sourceHeader: '原文書',
    updateHeader: '最終更新',
    versionHeader: '翻訳バージョン',
    translations: {
      'Plan': 'プラン',
      'Execute': '実行',
      'Test': 'テスト', 
      'Confirm': '確認',
      'Learn': '学習',
      'Trace': 'トレース',
      'Context': 'コンテキスト',
      'Delivery': '配信',
      'Role': '役割',
      'Workflow': 'ワークフロー',
      'Protocol': 'プロトコル',
      'Purpose': '目的',
      'Purpose:': '目的:',
      'Structure': 'プロトコル構造（補完予定）',
      'Execution Model': '推奨実行モデル',
      'TODO': 'TODO',
      'Translation pending': '翻訳準備中',
      'defines': 'を定義します',
      'for': 'のための',
      'multi-agent': 'マルチエージェント',
      'project': 'プロジェクト',
      'lifecycle': 'ライフサイクル',
      'management': '管理',
      'Standard lifecycle': '標準ライフサイクル'
    }
  },
  'kr': {
    name: '한국어',
    dir: 'docs/kr',
    statusHeader: '번역 상태: 완료',
    sourceHeader: '원본 문서',
    updateHeader: '최종 업데이트',
    versionHeader: '번역 버전',
    translations: {
      'Plan': '계획',
      'Execute': '실행',
      'Test': '테스트',
      'Confirm': '확인',
      'Learn': '학습',
      'Trace': '추적',
      'Context': '컨텍스트',
      'Delivery': '배송',
      'Role': '역할',
      'Workflow': '워크플로우',
      'Protocol': '프로토콜',
      'Purpose': '목적',
      'Purpose:': '목적:',
      'Structure': '프로토콜 구조 (보완 예정)',
      'Execution Model': '권장 실행 모델',
      'TODO': 'TODO',
      'Translation pending': '번역 준비 중',
      'defines': '을 정의합니다',
      'for': '를 위한',
      'multi-agent': '멀티 에이전트',
      'project': '프로젝트',
      'lifecycle': '라이프사이클',
      'management': '관리',
      'Standard lifecycle': '표준 라이프사이클'
    }
  },
  'de': {
    name: 'Deutsch',
    dir: 'docs/de',
    statusHeader: 'Übersetzungsstatus: Abgeschlossen',
    sourceHeader: 'Originaldokument',
    updateHeader: 'Letzte Aktualisierung',
    versionHeader: 'Übersetzungsversion',
    translations: {
      'Plan': 'Plan',
      'Execute': 'Ausführung',
      'Test': 'Test',
      'Confirm': 'Bestätigung',
      'Learn': 'Lernen',
      'Trace': 'Verfolgung',
      'Context': 'Kontext',
      'Delivery': 'Lieferung',
      'Role': 'Rolle',
      'Workflow': 'Arbeitsablauf',
      'Protocol': 'Protokoll',
      'Purpose': 'Zweck',
      'Purpose:': 'Zweck:',
      'Structure': 'Protokollstruktur (zu vervollständigen)',
      'Execution Model': 'Vorgeschlagenes Ausführungsmodell',
      'TODO': 'TODO',
      'Translation pending': 'Übersetzung ausstehend',
      'defines': 'definiert',
      'for': 'für',
      'multi-agent': 'Multi-Agent',
      'project': 'Projekt',
      'lifecycle': 'Lebenszyklus',
      'management': 'Verwaltung',
      'Standard lifecycle': 'Standard-Lebenszyklus'
    }
  },
  'es': {
    name: 'Español',
    dir: 'docs/es',
    statusHeader: 'Estado de traducción: Completado',
    sourceHeader: 'Documento original',
    updateHeader: 'Última actualización',
    versionHeader: 'Versión de traducción',
    translations: {
      'Plan': 'Plan',
      'Execute': 'Ejecución',
      'Test': 'Prueba',
      'Confirm': 'Confirmación',
      'Learn': 'Aprendizaje',
      'Trace': 'Rastreo',
      'Context': 'Contexto',
      'Delivery': 'Entrega',
      'Role': 'Rol',
      'Workflow': 'Flujo de trabajo',
      'Protocol': 'Protocolo',
      'Purpose': 'Propósito',
      'Purpose:': 'Propósito:',
      'Structure': 'Estructura del protocolo (por completar)',
      'Execution Model': 'Modelo de ejecución sugerido',
      'TODO': 'TODO',
      'Translation pending': 'Traducción pendiente',
      'defines': 'define',
      'for': 'para',
      'multi-agent': 'multi-agente',
      'project': 'proyecto',
      'lifecycle': 'ciclo de vida',
      'management': 'gestión',
      'Standard lifecycle': 'Ciclo de vida estándar'
    }
  },
  'fr': {
    name: 'Français',
    dir: 'docs/fr',
    statusHeader: 'Statut de traduction: Terminé',
    sourceHeader: 'Document original',
    updateHeader: 'Dernière mise à jour',
    versionHeader: 'Version de traduction',
    translations: {
      'Plan': 'Plan',
      'Execute': 'Exécution',
      'Test': 'Test',
      'Confirm': 'Confirmation',
      'Learn': 'Apprentissage',
      'Trace': 'Traçage',
      'Context': 'Contexte',
      'Delivery': 'Livraison',
      'Role': 'Rôle',
      'Workflow': 'Flux de travail',
      'Protocol': 'Protocole',
      'Purpose': 'Objectif',
      'Purpose:': 'Objectif :',
      'Structure': 'Structure du protocole (à compléter)',
      'Execution Model': 'Modèle d\'exécution suggéré',
      'TODO': 'TODO',
      'Translation pending': 'Traduction en attente',
      'defines': 'définit',
      'for': 'pour',
      'multi-agent': 'multi-agents',
      'project': 'projet',
      'lifecycle': 'cycle de vie',
      'management': 'gestion',
      'Standard lifecycle': 'Cycle de vie standard'
    }
  },
  'it': {
    name: 'Italiano',
    dir: 'docs/it',
    statusHeader: 'Stato della traduzione: Completato',
    sourceHeader: 'Documento originale',
    updateHeader: 'Ultimo aggiornamento',
    versionHeader: 'Versione traduzione',
    translations: {
      'Plan': 'Piano',
      'Execute': 'Esecuzione',
      'Test': 'Test',
      'Confirm': 'Conferma',
      'Learn': 'Apprendimento',
      'Trace': 'Tracciamento',
      'Context': 'Contesto',
      'Delivery': 'Consegna',
      'Role': 'Ruolo',
      'Workflow': 'Flusso di lavoro',
      'Protocol': 'Protocollo',
      'Purpose': 'Scopo',
      'Purpose:': 'Scopo:',
      'Structure': 'Struttura del protocollo (da completare)',
      'Execution Model': 'Modello di esecuzione suggerito',
      'TODO': 'TODO',
      'Translation pending': 'Traduzione in sospeso',
      'defines': 'definisce',
      'for': 'per',
      'multi-agent': 'multi-agente',
      'project': 'progetto',
      'lifecycle': 'ciclo di vita',
      'management': 'gestione',
      'Standard lifecycle': 'Ciclo di vita standard'
    }
  },
  'ru': {
    name: 'Русский',
    dir: 'docs/ru',
    statusHeader: 'Статус перевода: Завершено',
    sourceHeader: 'Исходный документ',
    updateHeader: 'Последнее обновление',
    versionHeader: 'Версия перевода',
    translations: {
      'Plan': 'План',
      'Execute': 'Выполнение',
      'Test': 'Тест',
      'Confirm': 'Подтверждение',
      'Learn': 'Обучение',
      'Trace': 'Трассировка',
      'Context': 'Контекст',
      'Delivery': 'Доставка',
      'Role': 'Роль',
      'Workflow': 'Рабочий процесс',
      'Protocol': 'Протокол',
      'Purpose': 'Цель',
      'Purpose:': 'Цель:',
      'Structure': 'Структура протокола (для завершения)',
      'Execution Model': 'Предлагаемая модель выполнения',
      'TODO': 'TODO',
      'Translation pending': 'Перевод ожидается',
      'defines': 'определяет',
      'for': 'для',
      'multi-agent': 'мульти-агентного',
      'project': 'проекта',
      'lifecycle': 'жизненного цикла',
      'management': 'управления',
      'Standard lifecycle': 'Стандартный жизненный цикл'
    }
  },
  'zh': {
    name: '简体中文',
    dir: 'docs/zh',
    statusHeader: '翻译状态: 已完成',
    sourceHeader: '原文档',
    updateHeader: '最后更新',
    versionHeader: '翻译版本',
    translations: {
      'Plan': '计划',
      'Execute': '执行',
      'Test': '测试',
      'Confirm': '确认',
      'Learn': '学习',
      'Trace': '追踪',
      'Context': '上下文',
      'Delivery': '交付',
      'Role': '角色',
      'Workflow': '工作流程',
      'Protocol': '协议',
      'Purpose': '目的',
      'Purpose:': '目的：',
      'Structure': '协议结构（待补充）',
      'Execution Model': '建议执行模型',
      'TODO': 'TODO',
      'Translation pending': '翻译准备中',
      'defines': '定义了',
      'for': '的',
      'multi-agent': '多智能体',
      'project': '项目',
      'lifecycle': '生命周期',
      'management': '管理',
      'Standard lifecycle': '标准生命周期'
    }
  },
  'tw': {
    name: '繁體中文',
    dir: 'docs/tw',
    statusHeader: '翻譯狀態: 已完成',
    sourceHeader: '原文檔',
    updateHeader: '最後更新',
    versionHeader: '翻譯版本',
    translations: {
      'Plan': '計劃',
      'Execute': '執行',
      'Test': '測試',
      'Confirm': '確認',
      'Learn': '學習',
      'Trace': '追蹤',
      'Context': '上下文',
      'Delivery': '交付',
      'Role': '角色',
      'Workflow': '工作流程',
      'Protocol': '協議',
      'Purpose': '目的',
      'Purpose:': '目的：',
      'Structure': '協議結構（待補充）',
      'Execution Model': '建議執行模型',
      'TODO': 'TODO',
      'Translation pending': '翻譯準備中',
      'defines': '定義了',
      'for': '的',
      'multi-agent': '多智能體',
      'project': '專案',
      'lifecycle': '生命週期',
      'management': '管理',
      'Standard lifecycle': '標準生命週期'
    }
  }
};

// 原始文档目录
const SOURCE_DIR = 'docs/schemas';
const ROOT_SOURCE_DIR = 'docs';

/**
 * 获取当前时间戳
 */
function getCurrentTimestamp() {
  return new Date().toISOString().split('T')[0];
}

/**
 * 创建翻译状态头部
 */
function createTranslationHeader(langCode, sourceFile, timestamp) {
  const lang = LANGUAGES[langCode];
  return `> **${lang.statusHeader}**\n` +
         `> **${lang.sourceHeader}**: ${sourceFile}\n` +
         `> **${lang.updateHeader}**: ${timestamp}\n` +
         `> **${lang.versionHeader}**: 1.0\n\n`;
}

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
      'This protocol defines': 'このプロトコルは定義します',
      'Key Components': '主要コンポーネント',
      'Standard lifecycle': '標準ライフサイクル',
      'multi-agent project lifecycle management': 'マルチエージェントプロジェクトライフサイクル管理',
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
      'This protocol defines': '이 프로토콜은 정의합니다',
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
      'Key Components': '주요 구성 요소',
      'Key Components:': '주요 구성 요소:',
      'Suggested Execution Model': '제안된 실행 모델',
      'Standard lifecycle': '표준 라이프사이클',
      'multi-agent project lifecycle management': '멀티 에이전트 프로젝트 라이프사이클 관리'
    },
    'de': {
      'This protocol defines': 'Dieses Protokoll definiert',
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
      'Key Components': 'Hauptkomponenten',
      'Key Components:': 'Hauptkomponenten:',
      'Suggested Execution Model': 'Vorgeschlagenes Ausführungsmodell',
      'Standard lifecycle': 'Standard-Lebenszyklus',
      'multi-agent project lifecycle management': 'Multi-Agent-Projekt-Lebenszyklus-Management'
    },
    'es': {
      'This protocol defines': 'Este protocolo define',
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
      'Key Components': 'Componentes clave',
      'Key Components:': 'Componentes Clave:',
      'Suggested Execution Model': 'Modelo de Ejecución Sugerido',
      'Standard lifecycle': 'Ciclo de vida estándar',
      'multi-agent project lifecycle management': 'gestión del ciclo de vida de proyectos multi-agente'
    },
    'fr': {
      'This protocol defines': 'Ce protocole définit',
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
      'Key Components': 'Composants clés',
      'Key Components:': 'Composants Clés :',
      'Suggested Execution Model': 'Modèle d\'Exécution Suggéré',
      'Standard lifecycle': 'Cycle de vie standard',
      'multi-agent project lifecycle management': 'gestion du cycle de vie de projets multi-agents'
    },
    'it': {
      'This protocol defines': 'Questo protocollo definisce',
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
      'Key Components': 'Componenti chiave',
      'Key Components:': 'Componenti Chiave:',
      'Suggested Execution Model': 'Modello di Esecuzione Suggerito',
      'Standard lifecycle': 'Ciclo di vita standard',
      'multi-agent project lifecycle management': 'gestione del ciclo di vita di progetti multi-agente'
    },
    'ru': {
      'This protocol defines': 'Этот протокол определяет',
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
      'Key Components': 'Ключевые компоненты',
      'Key Components:': 'Ключевые Компоненты:',
      'Suggested Execution Model': 'Предлагаемая Модель Выполнения',
      'Standard lifecycle': 'Стандартный жизненный цикл',
      'multi-agent project lifecycle management': 'управления жизненным циклом мульти-агентных проектов'
    },
    'zh': {
      'This protocol defines': '此协议定义了',
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
      'Key Components': '关键组件',
      'Key Components:': '关键组件：',
      'Suggested Execution Model': '建议的执行模型',
      'Standard lifecycle': '标准生命周期',
      'multi-agent project lifecycle management': '多智能体项目生命周期管理'
    },
    'tw': {
      'This protocol defines': '此協議定義了',
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
      'Key Components': '關鍵組件',
      'Key Components:': '關鍵組件：',
      'Suggested Execution Model': '建議的執行模型',
      'Standard lifecycle': '標準生命週期',
      'multi-agent project lifecycle management': '多智能體專案生命週期管理'
    }
  };
  
  return phrases[langCode] || {};
}

/**
 * 翻译单个文档
 */
function translateDocument(sourceFile, targetFile, langCode) {
  try {
    console.log(`翻译 ${sourceFile} -> ${targetFile}`);
    
    if (!fs.existsSync(sourceFile)) {
      console.warn(`警告: 源文件不存在: ${sourceFile}`);
      return false;
    }
    
    const content = fs.readFileSync(sourceFile, 'utf8');
    const timestamp = getCurrentTimestamp();
    const sourceFileName = path.basename(sourceFile);
    
    // 判断是否为schemas目录下的文件
    const isSchemaFile = sourceFile.includes('schemas') || sourceFile.includes('\\schemas\\');
    
    // 创建翻译头部
    const header = createTranslationHeader(langCode, sourceFileName, timestamp);
    
    // 根据文件类型选择翻译策略
    const translatedContent = translateText(content, langCode, isSchemaFile);
    
    // 组装最终内容
    const finalContent = header + translatedContent;
    
    // 确保目标目录存在
    const targetDir = path.dirname(targetFile);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    
    // 写入翻译文件
    fs.writeFileSync(targetFile, finalContent, 'utf8');
    
    // 输出翻译策略信息
    const strategy = isSchemaFile ? '技术文档模式（保留字段名）' : '内容文档模式（翻译描述）';
    console.log(`✓ 翻译完成: ${targetFile} [${strategy}]`);
    return true;
  } catch (error) {
    console.error(`✗ 翻译失败 ${sourceFile}:`, error.message);
    return false;
  }
}

/**
 * 翻译指定目录下的所有文档
 */
function translateDirectory(sourceDir, langCode, subDir = '') {
  const lang = LANGUAGES[langCode];
  const targetDir = path.join(lang.dir, subDir);
  
  console.log(`\n翻译目录: ${sourceDir} -> ${targetDir}`);
  
  if (!fs.existsSync(sourceDir)) {
    console.warn(`警告: 源目录不存在: ${sourceDir}`);
    return { success: 0, failed: 0 };
  }
  
  const files = fs.readdirSync(sourceDir);
  let success = 0;
  let failed = 0;
  
  for (const file of files) {
    const sourceFile = path.join(sourceDir, file);
    const stat = fs.statSync(sourceFile);
    
    if (stat.isFile() && file.endsWith('.md')) {
      const targetFile = path.join(targetDir, file);
      if (translateDocument(sourceFile, targetFile, langCode)) {
        success++;
      } else {
        failed++;
      }
    }
  }
  
  return { success, failed };
}

/**
 * 翻译所有语言的文档
 */
function translateAllDocuments(targetLanguages = null) {
  const timestamp = getCurrentTimestamp();
  console.log(`开始翻译所有文档 - ${timestamp}`);
  console.log('=' .repeat(50));
  
  const languagesToTranslate = targetLanguages || Object.keys(LANGUAGES);
  const results = {};
  
  for (const langCode of languagesToTranslate) {
    if (!LANGUAGES[langCode]) {
      console.warn(`警告: 不支持的语言代码: ${langCode}`);
      continue;
    }
    
    console.log(`\n🌐 翻译语言: ${LANGUAGES[langCode].name} (${langCode})`);
    console.log('-'.repeat(30));
    
    // 翻译schemas目录
    const schemasResult = translateDirectory(SOURCE_DIR, langCode, 'schemas');
    
    // 翻译根目录文档
    const rootFiles = ['Confirm.md', 'Context.md', 'Delivery.md', 'Execute.md', 
                      'Learn.md', 'Plan.md', 'Role.md', 'Test.md', 'Trace.md', 'Workflow.md'];
    
    let rootSuccess = 0;
    let rootFailed = 0;
    
    for (const file of rootFiles) {
      const sourceFile = path.join(ROOT_SOURCE_DIR, file);
      const targetFile = path.join(LANGUAGES[langCode].dir, file);
      
      if (fs.existsSync(sourceFile)) {
        if (translateDocument(sourceFile, targetFile, langCode)) {
          rootSuccess++;
        } else {
          rootFailed++;
        }
      }
    }
    
    const totalSuccess = schemasResult.success + rootSuccess;
    const totalFailed = schemasResult.failed + rootFailed;
    
    results[langCode] = {
      language: LANGUAGES[langCode].name,
      success: totalSuccess,
      failed: totalFailed,
      total: totalSuccess + totalFailed
    };
    
    console.log(`📊 ${LANGUAGES[langCode].name} 翻译结果:`);
    console.log(`   ✓ 成功: ${totalSuccess}`);
    console.log(`   ✗ 失败: ${totalFailed}`);
    console.log(`   📄 总计: ${totalSuccess + totalFailed}`);
  }
  
  // 打印总结报告
  console.log('\n' + '='.repeat(50));
  console.log('📋 翻译总结报告');
  console.log('='.repeat(50));
  
  let grandTotalSuccess = 0;
  let grandTotalFailed = 0;
  
  for (const [langCode, result] of Object.entries(results)) {
    console.log(`${result.language} (${langCode}): ${result.success}/${result.total} 成功`);
    grandTotalSuccess += result.success;
    grandTotalFailed += result.failed;
  }
  
  console.log('-'.repeat(50));
  console.log(`🎯 总计: ${grandTotalSuccess}/${grandTotalSuccess + grandTotalFailed} 文档翻译成功`);
  console.log(`📅 完成时间: ${new Date().toLocaleString()}`);
  
  return results;
}

// 主函数
function main() {
  const args = process.argv.slice(2);
  
  if (args.length > 0) {
    // 如果提供了参数，只翻译指定语言
    const targetLanguages = args.filter(lang => LANGUAGES[lang]);
    
    if (targetLanguages.length === 0) {
      console.error('错误: 未提供有效的语言代码');
      console.log('支持的语言代码:', Object.keys(LANGUAGES).join(', '));
      process.exit(1);
    }
    
    console.log(`翻译指定语言: ${targetLanguages.join(', ')}`);
    translateAllDocuments(targetLanguages);
  } else {
    // 翻译所有语言
    console.log('翻译所有支持的语言');
    translateAllDocuments();
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  main();
}

module.exports = {
  LANGUAGES,
  translateAllDocuments,
  translateDocument,
  translateDirectory,
  translateText,
  getCommonPhrases
};