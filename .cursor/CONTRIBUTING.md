# Contributing to Cursor General Skills

Thanks for contributing. This pack is meant to be reused across Cursor projects.

## What to add

### Agent skills (`.cursor/skills/agents/`)

Specialists the agent can auto-pick from context:
- Language or framework reviewers
- DevOps / infra helpers
- Domain experts (ML, mobile, data, etc.)

### Workflow skills (`.cursor/skills/workflows/`)

Slash-only playbooks (`disable-model-invocation: true`):
- Planning, review, deploy, test, docs flows
- Multi-step orchestration

## How to contribute

### 1. Branch

```bash
git checkout -b add-python-reviewer
```

### 2. Place the skill

```text
.cursor/skills/agents/<skill-name>/SKILL.md
# or
.cursor/skills/workflows/<skill-name>/SKILL.md
```

Folder name must match the `name` field (lowercase letters, numbers, hyphens).

### 3. Follow the format

**Agent skill:**

```markdown
---
name: agent-name
description: What it does and when to use it. Be specific so Cursor can auto-select it.
---

# Role

Instructions, checklists, and output format…
```

**Workflow skill (slash only):**

```markdown
---
name: my-workflow
description: Short description shown in the / menu.
disable-model-invocation: true
---

# My Workflow

Steps the agent must follow when the user runs /my-workflow…
```

Optional fields: `paths`, `icon`, `color`, `metadata`.

### 4. Keep skills focused

- One job per skill
- Actionable steps, not vague advice
- Prefer checklists and output templates
- Move long reference material to `references/` next to `SKILL.md`

### 5. Document

Update `.cursor/README.md` and `.cursor/WORLDFLOWAI.md` when you add or rename a skill.

### 6. Open a PR

Describe when the skill should fire and how you verified it (manual `/name` invoke is enough).

## Style tips

- Write for the agent: imperative, concrete, short
- Call out stop conditions and confirmation gates (`WAIT for user CONFIRM`)
- Avoid tooling that only exists in one IDE; prefer repo scripts and Cursor tools
- Do not commit secrets, tokens, or machine-specific paths

## License / attribution

Agent and workflow text adapted from community Cursor / Claude agent packs; keep attributions in skill bodies when you copy substantial external material.
