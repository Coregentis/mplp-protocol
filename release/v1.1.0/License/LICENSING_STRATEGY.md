# MPLP Open Source License Strategy

## Overview

Multi-Agent Project Lifecycle Protocol (MPLP) adopts a dual license strategy to balance openness with commercial friendliness, promoting widespread adoption and ecosystem development of the protocol.

## License Strategy

### Apache License 2.0 Scope

**Applicable Content:**
- Core protocol documents (`protocols/`)
- JSON Schema definitions (`schemas/`)
- Governance rules framework (`rules/`)
- Architecture documents (`architecture/`)
- Protocol specification documents (`docs/`)

**Rationale:**
- Provides patent protection, ensuring security of protocol implementation
- Allows commercial use, promoting enterprise-level adoption
- Requires copyright notice retention, maintaining protocol traceability
- Supports modification and redistribution, encouraging protocol evolution

### MIT License Scope

**Applicable Content:**
- Example code (`examples/`)
- SDK implementations
- Reference tools
- Test code
- Build scripts

**Rationale:**
- Minimal license, lowering usage barriers
- Maximizes compatibility, facilitating integration
- Encourages code reuse and modification
- Suitable for rapid prototyping

## File License Identification

### Apache License 2.0 File Header

```
/*
 * Copyright 2024 Coregentis.com & Coregentis.ai
 * Multi-Agent Project Lifecycle Protocol (MPLP)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
```

### MIT License File Header

```
/*
 * MIT License
 *
 * Copyright (c) 2024 Coregentis.com & Coregentis.ai
 * Multi-Agent Project Lifecycle Protocol (MPLP)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
```

## Directory License Mapping

| Directory/File Type | License | Description |
|---------------------|---------|-------------|
| `protocols/` | Apache 2.0 | Core protocol module definitions |
| `schemas/` | Apache 2.0 | JSON Schema specifications |
| `rules/` | Apache 2.0 | Governance rules framework |
| `architecture/` | Apache 2.0 | System architecture documents |
| `docs/` | Apache 2.0 | Protocol specification documents |
| `examples/` | MIT | Example code and configurations |
| `*.md` (documents) | Apache 2.0 | Protocol-related documents |
| `*.json` (Schema) | Apache 2.0 | Structured specifications |
| `*.js`, `*.py`, `*.go` | MIT | Implementation code |

## Usage Guidelines

### For Protocol Implementers

1. **Using Core Protocols**: Follow Apache 2.0 License
   - Retain copyright notices
   - Mark modifications
   - Provide license copy

2. **Using Example Code**: Follow MIT License
   - Retain copyright notices
   - Free to modify and distribute

### For Contributors

1. **Contributing Protocol Content**: Will adopt Apache 2.0 License
2. **Contributing Example Code**: Will adopt MIT License
3. **Signing CLA**: Ensure legality of contributions

### For Commercial Users

1. **Enterprise Deployment**: Apache 2.0 provides patent protection
2. **Product Integration**: MIT License reduces integration complexity
3. **Custom Development**: Both licenses support commercial use

## License Compatibility

### Apache 2.0 Compatibility
- ✅ Compatible with MIT
- ✅ Compatible with BSD
- ✅ Compatible with commercial licenses
- ⚠️ Incompatible with GPL 2.0
- ✅ Compatible with GPL 3.0

### MIT Compatibility
- ✅ Compatible with almost all open source licenses
- ✅ Compatible with commercial licenses
- ✅ Can be embedded in proprietary software

## Legal Notices

### Disclaimer

This license strategy is for reference only. The specific legal effect is subject to the original text of each license. Users should consult legal professionals according to their own circumstances.

### Copyright Notice

Copyright 2024 Coregentis.com & Coregentis.ai
Multi-Agent Project Lifecycle Protocol (MPLP) Contributors
All rights reserved.

### Trademark Notice

"MPLP" and "Multi-Agent Project Lifecycle Protocol" are trademarks of this project. Usage must follow trademark usage guidelines.

## Update History

| Version | Date | Changes |
|---------|------|----------|
| 1.0.0 | 2024-12 | Initial version, established dual license strategy |

## Contact Information

For license-related questions, please contact through:

- Project Issues: [GitHub Issues](https://github.com/coregentis/MPLP/issues)
- Email: legal@coregentis.org
- Documentation: [Project Documentation](https://docs.coregentis.org/mplp)

---

*This document follows Apache License 2.0*