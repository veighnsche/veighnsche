# [veighnsche](https://github.com/veighnsche)

This repository hosts the README shown on my GitHub profile.

## Projects

- **[LevitateOS](https://github.com/LevitateOS/LevitateOS)** — AI-assisted Fedora-based distro + offline-first packaging experiments.
- **[sovereign-vault](https://github.com/veighnsche/sovereign-vault)** — Pixel 6 “protected services” project: custom Android kernel + AVF microVMs to run Forgejo/Vaultwarden with stronger isolation.
- **[Tanzanite](https://github.com/veighnsche/Tanzanite)** — Pre-configured developer workstation image (Aurora/uBlue via BlueBuild) with COSMIC + batteries-included toolchains.
- **[tenxten](https://github.com/veighnsche/tenxten)** — Proving ground / certification platform for “10x before AI × 10x with AI = 100x”.
- **[rbee](https://github.com/rbee-keeper/rbee)** — “Private AI cloud in one command”: unify all your GPUs (local + remote) under one OpenAI-compatible API + interface. ([rbee.dev](https://rbee.dev/))
- **[cond8/core](https://github.com/Cond8/core)** — Structured AI “text-to-workflow” engine for TypeScript: compose observable actors/directors into testable pipelines. ([cond8.dev](https://cond8.dev/), [app](https://app.cond8.dev/))
- **[nixos-ram-tmp-lru](https://github.com/veighnsche/nixos-ram-tmp-lru)** — NixOS module: mount `/tmp` as tmpfs + systemd timer that evicts LRU entries when tmpfs is close to full.

## Project notes

<details>
<summary><strong>LevitateOS — AI-assisted Linux distribution + offline package building</strong></summary>

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

</details>

<details>
<summary><strong>sovereign-vault — hosting Forgejo/Vaultwarden on a Pixel 6 via AVF microVMs</strong></summary>

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

</details>

<details>
<summary><strong>Tanzanite — Aurora (uBlue) developer workstation image</strong></summary>

### What it is

Tanzanite is a pre-configured developer workstation image based on **Aurora (Universal Blue)** and built with **BlueBuild**. The goal is a batteries-included daily-driver setup (including COSMIC) that can be installed as an immutable image.

### What’s included

- Language toolchains: Python (uv), Go, Rust, Node.js (pnpm/ts/eslint/prettier), Bun, Flutter/Dart
- Dev tooling: Android SDK/NDK + emulator, Gradle, container tooling (Podman/Buildah/Skopeo), Windsurf IDE
- Build essentials: clang/cmake/ninja, AOSP build dependencies, Java 21

### How you install it

- Switch from an existing Fedora Atomic system via `bootc switch`
- Or build/install via ISO releases

</details>

<details>
<summary><strong>tenxten — proving ground for 10x10 (100x) architects</strong></summary>

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

</details>

<details>
<summary><strong>nixos-ram-tmp-lru — /tmp tmpfs LRU cleaner module</strong></summary>

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

</details>

<details>
<summary><strong>rbee — your private AI cloud across all your GPUs</strong></summary>

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
<summary><strong>cond8/core — structured AI text-to-workflow for TypeScript</strong></summary>

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

## What you’ll find here

- Short descriptions of projects
- Links to repositories and demos
- Notes on tools, prompts, and learnings

## Contact

- GitHub: @veighnsche
