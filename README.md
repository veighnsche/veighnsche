# [veighnsche](https://github.com/veighnsche)

<!-- TEAM_007: Added developer profile and project analysis -->
I’m a systems‑first builder focused on **safety, determinism, and autonomy** across OS tooling, AI infrastructure, and device‑level platforms. My work pairs deep systems engineering (Rust/Go, kernel/virtualization, packaging) with AI‑assisted workflows that stay auditable and reversible.

**Core strengths**
- Systems architecture with strong safety/rollback primitives
- Linux distro + package engineering, immutable workflows, and build pipelines
- AI infrastructure that is self‑hosted, offline‑capable, and composable
- Device‑level security/virtualization (Android kernels, AVF, microVMs)

**Typical stack**
- Rust, Go, Python, TypeScript
- Linux / Nix / Fedora Atomic / Arch
- Containers, microVMs, QEMU, ADB/fastboot

## Project Analysis

Across the projects below, the through‑line is **intentional automation with guardrails**—build systems and infra that are powerful but always reversible.

- **Safety‑first system mutation**: Switchyard‑fs and oxidizr‑arch show a consistent pattern of atomic changes, policy gates, and rollback.
- **Self‑hosted AI infrastructure**: rbee emphasizes orchestration, multi‑GPU scheduling, and OpenAI‑compatible APIs without cloud lock‑in.
- **OS‑level product building**: LevitateOS and Tanzanite combine distro engineering with developer‑first ergonomics and offline workflows.
- **Device‑scale isolation & control**: sovereign‑vault and android‑root apply kernel/AVF foundations plus tooling to safely control Android hosts.
- **Developer experience tooling**: cukerust and qemu‑screenshot‑mcp focus on tight feedback loops and agent‑friendly interfaces.

## Projects

<details>
<summary><strong><a href="https://github.com/LevitateOS/LevitateOS">LevitateOS</a> — AI-assisted Linux distribution + offline package building</strong></summary>

### What it is

LevitateOS is an attempt to build an **AI-assisted Linux distribution** on a **minimalist Fedora base**. The system ships with a small on-device language model and uses it to guide installation and system setup.

### Key idea

The model is not “just chat”. It’s intended to act as a constrained assistant that:

- Translates user intent into concrete actions
- Makes those actions transparent (show the plan/command before doing anything)
- Runs fully offline

### Offline-first package manager (the experimental part)

Instead of relying on an online package repository, the package manager is meant to be **offline-first** and **user-controlled**:

- User provides:
  - source code (git/tarball), or
  - an existing artifact (AppImage / other package formats)
- A small language model (with a LoRA) generates a build recipe as a **Rust/Rhai script**.
- That script defines traits/steps for:
  - download
  - build
  - install
  - update
  - remove

The goal is that packages become inspectable and editable “recipes”, and the system can construct them locally rather than pulling opaque binaries from a remote repository.

### Links

- https://github.com/LevitateOS/LevitateOS

</details>

<details>
<summary><strong><a href="https://github.com/veighnsche/sovereign-vault">sovereign-vault</a> — hosting Forgejo/Vaultwarden on a Pixel 6 via AVF microVMs</strong></summary>

### What it is

Sovereign Vault is an attempt to turn a Pixel 6 into a small self-hosting device where sensitive services (like **Forgejo** and **Vaultwarden**) live in a more isolated “protected section” than normal Android apps.

### Core approach

- A **custom Android kernel** (KernelSU + virtualization features) provides the foundation.
- Services run inside **Android Virtualization Framework (AVF)** microVMs (pKVM-backed isolation).
- A Go-based CLI orchestrates build/deploy/start/stop/test flows for the system.

### Goal

Expose “desktop Linux capability” through a **safe, intentional API surface** (via the Android kernel + virtualization) rather than treating the phone like a generic rooted Linux box.

### What it’s meant to host

- PostgreSQL VM (shared dependency)
- Forgejo VM
- Vaultwarden VM

### Status

The repo describes the project as largely working (~80%), with remaining work focused on service integration and networking/access simplification.

### Links

- https://github.com/veighnsche/sovereign-vault

</details>

<details>
<summary><strong><a href="https://github.com/veighnsche/Tanzanite">Tanzanite</a> — Aurora (uBlue) developer workstation image</strong></summary>

### What it is

Tanzanite is a pre-configured developer workstation image based on **Aurora (Universal Blue)** and built with **BlueBuild**. The goal is a batteries-included daily-driver setup (including COSMIC) that can be installed as an immutable image.

### What’s included

- Language toolchains: Python (uv), Go, Rust, Node.js (pnpm/ts/eslint/prettier), Bun, Flutter/Dart
- Dev tooling: Android SDK/NDK + emulator, Gradle, container tooling (Podman/Buildah/Skopeo), Windsurf IDE
- Build essentials: clang/cmake/ninja, AOSP build dependencies, Java 21

### How you install it

- Switch from an existing Fedora Atomic system via `bootc switch`
- Or build/install via ISO releases

### Links

- https://github.com/veighnsche/Tanzanite

</details>

<details>
<summary><strong><a href="https://github.com/veighnsche/tenxten">tenxten</a> — proving ground for 10x10 (100x) architects</strong></summary>

### What it is

TENXTEN is a proving ground for engineers who were already “10x” before AI and want to prove they can be “10x with AI” too.

```
10x BEFORE AI × 10x WITH AI = 100x
```

### Why it exists

AI has made code generation cheap. TENXTEN focuses on what still matters: engineering judgment, architecture, debugging, and grit — with and without AI.

### The concept

- `10x.NATIVE` — certification without AI assistance
- `10x.AUGMENTED` — certification for AI-orchestrated building
- `100x.PROVEN` — the combined “multiplier” (requires both)

### Links

- https://github.com/veighnsche/tenxten

</details>

<details>
<summary><strong><a href="https://github.com/veighnsche/nixos-ram-tmp-lru">nixos-ram-tmp-lru</a> — /tmp tmpfs LRU cleaner module</strong></summary>

### What it is

This flake exposes a small NixOS module that:

- mounts `/tmp` as `tmpfs` (`boot.tmp.useTmpfs = true`)
- runs a systemd oneshot + timer that evicts least-recently-used top-level entries from `/tmp` when the tmpfs is close to full

Defaults: start cleaning at ~70% `/tmp` usage and delete LRU top-level entries until ~50%.

### Usage (flakes)

In your top-level `flake.nix`:

```nix
{
  inputs.nixos-ram-tmp-lru.url = "github:veighnsche/nixos-ram-tmp-lru";

  outputs = { self, nixpkgs, nixos-ram-tmp-lru, ... }:
    let
      system = "x86_64-linux";
    in {
      nixosConfigurations.my-host = nixpkgs.lib.nixosSystem {
        inherit system;
        modules = [
          ./hardware-configuration.nix
          ./configuration.nix

          nixos-ram-tmp-lru.nixosModules.tmp-lru-tmp
        ];
      };
    };
}
```

### Behaviour

- `/tmp` is a `tmpfs` with a fixed size (currently 32G)
- `tmp-lru-cleaner` checks `/tmp` is tmpfs and:
  - if usage is below ~70%: no-op
  - if usage is at/above ~70%: repeatedly deletes the least-recently-used top-level entries (based on access time) until usage drops to ~50%
- A systemd timer runs the cleaner periodically after boot

### Links

- https://github.com/veighnsche/nixos-ram-tmp-lru

</details>

<details>
<!-- TEAM_003: Added oxidizr-arch project entry -->
<summary><strong><a href="https://github.com/veighnsche/oxidizr-arch">oxidizr-arch</a> — Arch Linux CLI to use Rust replacements safely</strong></summary>

### What it is

oxidizr-arch is a safety-first CLI that switches key Arch system toolchains to their Rust replacements (uutils coreutils/findutils, sudo-rs) while keeping an atomic, reversible rollback path powered by Switchyard.

### Core approach

- Automatic, guarded switching with `use` / `replace` flows (no manual applet selection)
- One-step restore back to GNU/stock tools
- Policy gates, preflight checks, and audit facts via Switchyard

### Links

- https://github.com/veighnsche/oxidizr-arch

</details>

<details>
<!-- TEAM_005: Added switchyard project entry -->
<summary><strong><a href="https://github.com/veighnsche/switchyard">switchyard</a> — safe, deterministic engine for atomic system changes</strong></summary>

### What it is

Switchyard-fs is a Rust library that provides an auditable engine for applying system changes with atomic symlink swaps, policy gates, deterministic IDs, rescue verification, and optional smoke checks with auto‑rollback.

### Highlights

- Atomic symlink replacement with backup/restore
- Preflight policy gates, locking, and rescue verification
- Structured facts/audit emission with deterministic IDs

### Links

- https://github.com/veighnsche/switchyard
- https://docs.rs/switchyard-fs
- https://veighnsche.github.io/switchyard/

</details>

<details>
<!-- TEAM_006: Added android-root project entry -->
<summary><strong><a href="https://github.com/veighnsche/android-root">android-root</a> — Android Shell Manager MCP server</strong></summary>

### What it is

Android Shell Manager is an MCP server that manages multi-device Android shells (root or non‑root) with hang detection, background jobs, and AI-friendly status reporting for safe automation.

### Highlights

- Multi-device ADB/fastboot shell management with persistent sessions
- AI-centric status reporting (UNCERTAIN/WAITING_FOR_INPUT) and hang prevention
- Batch command execution and background job support

### Links

- https://github.com/veighnsche/android-root

</details>

<details>
<summary><strong><a href="https://github.com/rbee-keeper/rbee">rbee</a> — your private AI cloud across all your GPUs</strong></summary>

### What it is

rbee turns every GPU you own (desktop, laptop, server, remote machines) into a single, unified “home AI cloud” with:

- one interface
- one OpenAI-compatible API endpoint
- SSH-based multi-machine deployment (no Kubernetes)

### How it works (high level)

- **Keeper** — your interface (CLI / desktop UI)
- **Queen** — orchestrator + OpenAI-compatible API
- **Hives** — per-machine managers installed over SSH
- **Workers** — per-model inference processes (LLM, image, etc.)

### Links

- https://rbee.dev/
- https://github.com/rbee-keeper/rbee

</details>

<details>
<summary><strong><a href="https://github.com/Cond8/core">cond8/core</a> — structured AI text-to-workflow for TypeScript</strong></summary>

### What it is

Cond8 is an execution engine and programming model for **structured “text-to-workflow”**. At its core (`@cond8/core`) it provides composable, testable, observable pipelines:

- **Actors (roles)**: small, focused functions that mutate/observe state
- **Directors**: compose actors into pipelines with a clear init → steps → fin structure
- **Recorder + lifecycle hooks**: capture every step for debugging, auditing, and assertions

This is designed to make workflows interpretable and verifiable (treating “code like math”: pure composition, explicit steps, full observability) and to support small, domain-specific models that can drive workflows reliably.

### Links

- https://cond8.dev/
- https://github.com/Cond8/core
- https://app.cond8.dev/

</details>

<details>
<!-- TEAM_004: Added cukerust project entry -->
<summary><strong><a href="https://github.com/veighnsche/cukerust">cukerust</a> — Zero‑Config Gherkin × Rust BDD for VS Code</strong></summary>

### What it is

CukeRust is a VS Code extension spec that delivers first‑class Gherkin authoring with Rust step integration. It focuses on zero‑config step discovery, read‑only defaults, and strong diagnostics/definition tooling without auto‑executing project code.

### Highlights

- Static scan step discovery by default (no repo writes, no auto‑exec)
- Diagnostics for undefined/ambiguous steps with go‑to‑definition and completion
- Multi‑root aware indexing and run command helpers (opt‑in)

### Links

- https://github.com/veighnsche/cukerust
- https://marketplace.visualstudio.com/items?itemName=Veighnsche.cukerust

</details>

## What you’ll find here

- Short descriptions of projects
- Links to repositories and demos
- Notes on tools, prompts, and learnings

## Contact

- GitHub: @veighnsche
