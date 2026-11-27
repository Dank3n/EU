# Cursor General Skills — Quick Guide

Reference for using the skills pack on any general Cursor project (web, API, scripts, monorepos).

## Installed Components

| Type | Items |
|------|-------|
| **Agents** | architect, build-error-resolver, code-reviewer, doc-updater, e2e-runner, planner, refactor-cleaner, security-reviewer, tdd-guide |
| **Workflows** | /build-fix, /checkpoint, /code-review, /e2e, /eval, /learn, /orchestrate, /plan |

## Quick Start Workflows

### Starting a new feature

```text
1. /plan           # Plan approach; wait for confirm
2. tdd-guide       # Tests first (or /orchestrate feature …)
3. /build-fix     # If compile/typecheck fails
4. /code-review    # Before PR
5. /checkpoint     # Save a known-good state
```

### Debugging build errors

```text
/build-fix        # Fix one error at a time, re-run build
```

### Code quality

```text
/code-review       # Security + quality on uncommitted changes
# or ask for refactor-cleaner for dead code
```

### Learning and memory

```text
/learn             # Extract reusable patterns from this session
/checkpoint        # Save / verify / list checkpoints
```

### Multi-agent chains

```text
/orchestrate feature Add realtime notifications
/orchestrate bugfix Login redirect loop on mobile
/orchestrate refactor Extract billing into a package
/orchestrate security Review auth and upload endpoints
```

## When to use each skill

| Situation | Skill / command |
|-----------|-----------------|
| Planning a feature | `/plan` → planner |
| System design | architect |
| Build / TS errors | `/build-fix` → build-error-resolver |
| Pre-PR review | `/code-review` → code-reviewer |
| Security-sensitive changes | security-reviewer |
| Tests first | tdd-guide |
| Dead code cleanup | refactor-cleaner |
| Playwright E2E | `/e2e` → e2e-runner |
| Docs / codemaps | doc-updater |
| Eval-driven checks | `/eval` |
| Complex multi-step work | `/orchestrate` |

## Project tips (general)

- Prefer the repo’s existing package manager (`npm` / `pnpm` / `yarn` / `bun`).
- Run the project’s real scripts: `lint`, `typecheck`, `test`, `build`.
- Keep skill-driven edits small and reversible; re-verify after each fix.
- For Cloud Agents, commit skills under `.cursor/skills/` so they travel with the repo.
- For personal reuse across machines, copy skills to `~/.cursor/skills/` and enable Sync Skills for Cloud Agents if needed.

## File locations in this repo

```text
.cursor/
├── README.md
├── CONTRIBUTING.md
├── WORLDFLOWAI.md
└── skills/
    ├── agents/<name>/SKILL.md
    └── workflows/<name>/SKILL.md
```

## Troubleshooting

**Skill not listed under `/`:**
- Confirm `.cursor/skills/<…>/<name>/SKILL.md` exists
- Frontmatter must include `name` (matching folder) and `description`
- Reload the window or start a new Agent chat

**Workflow runs when you did not ask:**
- Workflow skills should set `disable-model-invocation: true`
- Agent skills without that flag may auto-apply from context — that is intended

**Want these on every project:**
- Copy `.cursor/skills/` into each repo, or install under `~/.cursor/skills/`
