# DaemonCraft MVP v0.1 — Especificaciones Técnicas

> **Versión:** 0.1.0-alpha  
> **Fecha:** Abril 2026  
> **Estado:** En definición (pendiente decisión de stack)  
> **Dueño:** Agente Tech + Nico  

---

## 1. Alcance del MVP

El MVP v0.1 es un **agente mínimo viable** que demuestre la proposición central:

> "Un agente de IA autónomo que se conecta a un servidor de Minecraft, percibe el entorno,
> responde a chat natural, y persiste estado entre sesiones."

### Fuera de scope (v0.1)
- Múltiples SOULs (solo el Leñador como default)
- Guardian Mode
- Reportes Telegram
- Memoria a largo plazo (>1 sesión)
- Marketplace de SOULs
- API pública

---

## 2. Arquitectura de Alto Nivel

```
┌───────────────────────────────────────────────────────────────────────────────┐
│                         DAEMONCRAFT CLOUD                              │
│                                                                         │
│  ┌────────────0──────┐    ┌───────────────────────┐    ┌───────────────────────┐  │
│  │  API Gateway   │    │  Agent Core    │    │  Memory Store  │  │
│  │  (FastAPI)     │───►│  (Python)      │───►│  (Redis/DB)    │  │
│  └─────────────────┘    └───────────────────────┘    └───────────────────────┘  │
│         ▲                                                    │          │
│         │                                                    ▼          │
│  ┌──────────────────────────────────────────────────────────────┐          │
│  │  LLM Provider (OpenAI / Anthropic / Mistral)               │          │
│  └──────────────────────────────────────────────────────────────┘          │
│                                                                         │
│  ┌──────────────────────────────────────────────────────────────┐          │
│  │  Minecraft Bridge (mineflayer / node-minecraft-protocol)     │          │
│  └──────────────────────────────────────────────────────────────┘          │
│                                                                         │
└───────────────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌───────────────────────────────────────────────────────────────────────────────┐
│                         SERVIDOR MINECRAFT (Java/Bedrock)              │
└───────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Componentes del Sistema

### 3.1 Minecraft Bridge
**Responsabilidad:** Conexión bidireccional con servidores Minecraft.

| Aspecto | Especificación |
|---------|---------------|
| Protocolo | Java: mineflayer (Node.js) o mcproto (Python). Bedrock: bedrock-protocol |
| Eventos | chat, blockUpdate, entitySpawn, health, death, inventory |
| Acciones | chat, move, placeBlock, breakBlock, equip, attack |
| Rate limit | Máx 1 acción/segundo para evitar kick por spam |

### 3.2 Agent Core
**Responsabilidad:** Percepción, razonamiento, decisión.

| Aspecto | Especificación |
|---------|---------------|
| Framework | LangChain / LlamaIndex (Python) o custom (Node.js) |
| Prompt system | System prompt base + SOUL prompt + contexto de sesión |
| Context window | Últimos 20 mensajes + estado actual del mundo (blocks cercanos, inventario, health) |
| Tool use | 5 tools: move_to, place_block, break_block, chat, use_item |
| Latencia objetivo | < 2s desde percepción a acción |

### 3.3 Memory Store
**Responsabilidad:** Persistencia de estado entre sesiones.

| Aspecto | Especificación |
|---------|---------------|
| Datos | Preferencias del jugador, nombre, última posición, inventario visto, relación |
| TTL | 7 días (sesión), 30 días (perfil), indefinido (tier pago) |
| Backend | Redis (hot) + PostgreSQL (cold) |

### 3.4 API Gateway
**Responsabilidad:** Interfaz REST/WebSocket para clientes.

| Endpoint | Método | Uso |
|----------|--------|-----|
| /api/v1/daemons | POST | Crear nuevo daemon |
| /api/v1/daemons/{id} | GET | Estado del daemon |
| /api/v1/daemons/{id}/chat | POST | Enviar mensaje al daemon |
| /ws/v1/daemons/{id} | WS | Stream de eventos en tiempo real |

---

## 4. Flujo de Onboarding (v0.1)

```
1. Usuario entra a daemoncraft.ai
2. Elige preset (solo Leñador en v0.1)
3. Pone nombre al daemon
4. Ingresa IP:puerto de su servidor Minecraft
5. Daemon se conecta y aparece en el juego
6. Usuario habla por chat: "Hola Daemon"
7. Daemon responde por chat en el juego
```

---

## 5. Decisiones Pendientes (requieren input de Nico)

| Decisión | Opciones | Recomendación | Impacto |
|----------|----------|---------------|---------|
| **Backend runtime** | Node.js vs Python vs Go | Python (LangChain ecosystem) | Crítico |
| **LLM provider** | OpenAI vs Anthropic vs Mistral | OpenAI GPT-4o (func calling) + fallback Anthropic | Crítico |
| **Cloud** | AWS vs GCP vs Vercel/Modal | GCP (credits startup) o Vercel (frontend) | Alto |
| **Database** | PostgreSQL vs Supabase | Supabase (managed, auth, realtime) | Medio |
| **Minecraft lib** | mineflayer vs custom | mineflayer (más madura) | Crítico |

---

## 6. Milestones de Desarrollo

| Semana | Entregable | Criterio de aceptación |
|--------|-----------|------------------------|
| S1 | Arquitectura definida | Nico aprueba stack. Repo creado. |
| S2 | Bridge funcional | Bot se conecta a servidor MC y responde "hola" |
| S3 | Agent core | Responde a 5 comandos básicos (move, build, etc.) |
| S4 | MVP integrado | Onboarding web → daemon jugando en 30 segundos |

---

## 7. Riesgos Técnicos

| Riesgo | Mitigación |
|--------|-----------|
| LLM latency > 2s | Streaming parcial, caching de respuestas comunes |
| Minecraft anti-bot | Limitar APM, comportamiento humanizado, proxy rotation |
| EULA Mojang | No vender items in-game. No pay-to-win. Solo "compañero" |
| Costo LLM | Rate limiting por tier, caching, modelos más baratos para chat simple |

---

*Documento preparado por Agente Tech — DaemonCraft/AlterMundi — Abril 2026*
