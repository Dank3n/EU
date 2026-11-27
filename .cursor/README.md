# Cursor General Skills

Portable agent skills for general Cursor projects: architecture, planning, TDD, code review, security, E2E, docs, and multi-step workflows.

Skills live under `.cursor/skills/` and are discovered automatically by Cursor Agent. Invoke workflows with `/` in chat (for example `/plan`, `/code-review`).

## Layout

```text
.cursor/
├── README.md                 # This file
├── CONTRIBUTING.md           # How to add or change skills
├── WORLDFLOWAI.md            # Quick workflows for general projects
└── skills/
    ├── agents/               # Specialist skills (auto-suggested by context)
    │   ├── architect/
    │   ├── build-error-resolver/
    │   ├── code-reviewer/
    │   ├── doc-updater/
    │   ├── e2e-runner/
    │   ├── planner/
    │   ├── refactor-cleaner/
    │   ├── security-reviewer/
    │   └── tdd-guide/
    └── workflows/            # Slash workflows (explicit /name only)
        ├── build-fix/
        ├── checkpoint/
        ├── code-review/
        ├── e2e/
        ├── eval/
        ├── learn/
        ├── orchestrate/
        └── plan/
```

## Agents (auto)

| Skill | Use when |
|-------|----------|
| `architect` | System design, scalability, technical trade-offs |
| `build-error-resolver` | Build / TypeScript errors; minimal diffs to go green |
| `code-reviewer` | After writing or changing code |
| `doc-updater` | Codemaps, READMEs, and docs drift |
| `e2e-runner` | Playwright journeys, flakes, artifacts |
| `planner` | Features, refactors, multi-file work |
| `refactor-cleaner` | Dead code, duplicates, unused exports |
| `security-reviewer` | Auth, input, APIs, secrets, OWASP risks |
| `tdd-guide` | Tests-first features, bugs, refactors |

## Workflows (slash)

| Command | What it does |
|---------|--------------|
| `/plan` | Requirements, risks, step plan — waits for confirm |
| `/build-fix` | Fix build errors one at a time |
| `/code-review` | Security + quality pass on uncommitted changes |
| `/e2e` | Generate and run Playwright E2E |
| `/eval` | Define / check / report evals |
| `/learn` | Extract reusable patterns from the session |
| `/checkpoint` | Save or verify workflow checkpoints |
| `/orchestrate` | Chain agents (feature / bugfix / refactor / security) |

## Suggested flow

```text
1. /plan
2. Follow tdd-guide (or /orchestrate feature …)
3. /build-fix if the build fails
4. /code-review before opening a PR
5. /checkpoint to lock a known-good state
```

## Reuse in other projects

Copy `.cursor/skills/` (and optionally these docs) into another repo, or sync personal skills from `~/.cursor/skills/` in Cursor Settings → Agents.

Each skill is a folder with `SKILL.md`:

```markdown
---
name: my-skill
description: What it does and when to use it.
---

# Instructions for the agent
```

Workflow-only skills set `disable-model-invocation: true` so they run only when you type `/name`.

## Source

Adapted from the [everything-claude-code](https://github.com/affaan-m/everything-claude-code) agent/command set for Cursor Agent Skills (`.cursor/skills/*/SKILL.md`).
