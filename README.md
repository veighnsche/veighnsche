# [veighnsche](https://github.com/veighnsche)

> pronounced: Vinch

<!-- TEAM_007: Added developer profile and project analysis -->
I’m a systems‑first builder focused on **safety, determinism, and autonomy** across OS tooling, AI infrastructure, and device‑level platforms. My work pairs deep systems engineering (Rust/Go, kernel/virtualization, packaging) with AI‑assisted workflows that stay auditable and reversible.

## Projects

- 🤖 **[ralph4days](https://github.com/veighnsche/ralph4days)** — Tauri app for multi-agent build loops running Claude Haiku in a loop to complete PRD-defined tasks
- 🚀 **[LevitateOS](https://github.com/LevitateOS/LevitateOS)** — Daily driver Linux distro where you make your own package repo
- 🌰 **[AcornOS](https://github.com/LevitateOS/AcornOS)** — Alpine-based distribution with OpenRC, musl, and busybox
- 🎮 **[rbee-keeper](https://github.com/rbee-keeper/rbee/tree/main/bin/00_rbee_keeper)** — Thin HTTP client (CLI + Tauri GUI) that manages queen lifecycle
- 🎭 **[@cond8/core](https://github.com/Cond8/core/tree/main/core)** — TypeScript workflow framework with actor-director architecture
- 🏗️ **[distro-builder](https://github.com/LevitateOS/distro-builder)** — Shared component system and build abstractions for ISO creation
- 📋 **[distro-spec](https://github.com/LevitateOS/distro-spec)** — Constants for boot entries, partition layouts, user specs, and service management
- 💿 **[leviso](https://github.com/LevitateOS/leviso)** — Downloads Rocky Linux, extracts packages, builds bootable UEFI ISO with EROFS rootfs
- 🔗 **[leviso-elf](https://github.com/LevitateOS/leviso-elf)** — Analyzes ELF binaries and copies library dependencies using readelf
- 📦 **[recipe](https://github.com/LevitateOS/recipe)** — Package manager where recipes are executable Rhai scripts with state in the files
- 📥 **[recstrap](https://github.com/LevitateOS/recstrap)** — Extracts EROFS/squashfs to target directory with 14 safety checks
- 📄 **[recfstab](https://github.com/LevitateOS/recfstab)** — Generates fstab entries from mounted filesystems
- 🔐 **[recchroot](https://github.com/LevitateOS/recchroot)** — Sets up bind mounts and enters chroot with automatic cleanup
- 🗜️ **[recinit](https://github.com/LevitateOS/recinit)** — Builds initramfs images without root using pure Rust CPIO
- 💽 **[reciso](https://github.com/LevitateOS/reciso)** — Creates bootable UEFI ISOs from kernel + initramfs + rootfs with systemd-boot
- 🖥️ **[recqemu](https://github.com/LevitateOS/recqemu)** — QEMU command builder with serial console and OVMF firmware discovery
- 🎯 **[recuki](https://github.com/LevitateOS/recuki)** — Builds Unified Kernel Images by wrapping systemd-ukify
- 🧪 **[install-tests](https://github.com/LevitateOS/install-tests)** — E2E tests that boot ISO in QEMU, install, reboot, verify
- ✅ **[rootfs-tests](https://github.com/LevitateOS/rootfs-test)** — User experience tests with systemd-nspawn for binaries, auth, filesystem
- 🔌 **[hardware-compat](https://github.com/LevitateOS/hardware-compat)** — Hardware compatibility verification for modern CPUs/GPUs
- 🛡️ **[cheat-guard](https://github.com/LevitateOS/cheat_guard)** — Runtime macros for error handling with documented invalid fixes
- 🎭 **[cheat-test](https://github.com/LevitateOS/cheat-test)** — Proc-macros that force documentation of how tests could be cheated
- 🔍 **[fsdbg](https://github.com/LevitateOS/fsdbg)** — Inspects and verifies archives (CPIO, EROFS, ISO) without extraction
- 🌐 **[docs/website](https://github.com/LevitateOS/website)** — Astro static site with dark/light theme at levitateos.org
- 📚 **[docs/content](https://github.com/LevitateOS/docs-content)** — Structured documentation content library consumed by website and TUI
- 🖼️ **[docs/tui](https://github.com/LevitateOS/docs-tui)** — Terminal UI documentation viewer with Ink-based rendering
- 🤖 **[llm-toolkit](https://github.com/LevitateOS/llm-toolkit)** — LoRA fine-tuning scripts for training, inference, and evaluation
- 👑 **[queen-rbee](https://github.com/rbee-keeper/rbee/tree/main/bin/10_queen_rbee)** — Brain daemon with job-based architecture that routes to hives
- 🏠 **[rbee-hive](https://github.com/rbee-keeper/rbee/tree/main/bin/20_rbee_hive)** — Worker manager daemon that spawns workers and manages models per machine
- 💬 **[llm-worker-rbee](https://github.com/rbee-keeper/rbee/tree/main/bin/30_llm_worker_rbee)** — LLM inference worker with llama.cpp backend (CUDA/Metal/CPU)
- 🎨 **[sd-worker-rbee](https://github.com/rbee-keeper/rbee/tree/main/bin/31_sd_worker_rbee)** — Stable Diffusion worker for text-to-image generation
- 🔌 **[rbee-openai-adapter](https://github.com/rbee-keeper/rbee/tree/main/bin/15_queen_rbee_crates/rbee-openai-adapter)** — OpenAI API compatibility layer with SSE streaming
- 📅 **[scheduler](https://github.com/rbee-keeper/rbee/tree/main/bin/15_queen_rbee_crates/scheduler)** — Job scheduling and GPU allocation logic
- 📊 **[telemetry-registry](https://github.com/rbee-keeper/rbee/tree/main/bin/15_queen_rbee_crates/telemetry-registry)** — Metrics collection and observability
- 📦 **[artifact-catalog](https://github.com/rbee-keeper/rbee/tree/main/bin/25_rbee_hive_crates/artifact-catalog)** — Downloaded model artifact tracking
- 🎮 **[device-detection](https://github.com/rbee-keeper/rbee/tree/main/bin/25_rbee_hive_crates/device-detection)** — GPU detection for CUDA, Metal, ROCm, and CPU
- 🗂️ **[model-catalog](https://github.com/rbee-keeper/rbee/tree/main/bin/25_rbee_hive_crates/model-catalog)** — SQLite model registry per hive
- ⏬ **[model-preloader](https://github.com/rbee-keeper/rbee/tree/main/bin/25_rbee_hive_crates/model-preloader)** — Background model downloading
- 📥 **[model-provisioner](https://github.com/rbee-keeper/rbee/tree/main/bin/25_rbee_hive_crates/model-provisioner)** — Model installation and verification
- 💓 **[monitor](https://github.com/rbee-keeper/rbee/tree/main/bin/25_rbee_hive_crates/monitor)** — Worker health monitoring
- 🔢 **[port-assigner](https://github.com/rbee-keeper/rbee/tree/main/bin/25_rbee_hive_crates/port-assigner)** — Dynamic port allocation for workers
- 💾 **[vram-checker](https://github.com/rbee-keeper/rbee/tree/main/bin/25_rbee_hive_crates/vram-checker)** — GPU memory availability detection
- 📒 **[worker-catalog](https://github.com/rbee-keeper/rbee/tree/main/bin/25_rbee_hive_crates/worker-catalog)** — Active worker registry
- ⚙️ **[worker-provisioner](https://github.com/rbee-keeper/rbee/tree/main/bin/25_rbee_hive_crates/worker-provisioner)** — Worker lifecycle management
- 🔄 **[auto-update](https://github.com/rbee-keeper/rbee/tree/main/bin/99_shared_crates/auto-update)** — Binary self-update mechanism
- 🌍 **[env-config](https://github.com/rbee-keeper/rbee/tree/main/bin/99_shared_crates/env-config)** — Environment variable configuration
- 💗 **[heartbeat-registry](https://github.com/rbee-keeper/rbee/tree/main/bin/99_shared_crates/heartbeat-registry)** — Distributed heartbeat coordination
- 📤 **[job-client](https://github.com/rbee-keeper/rbee/tree/main/bin/99_shared_crates/job-client)** — HTTP client for job submission
- 🌐 **[job-server](https://github.com/rbee-keeper/rbee/tree/main/bin/99_shared_crates/job-server)** — HTTP server for job handling
- 📝 **[narration-core](https://github.com/rbee-keeper/rbee/tree/main/bin/99_shared_crates/narration-core)** — Logging and event narrative system
- 🔑 **[ssh-config-parser](https://github.com/rbee-keeper/rbee/tree/main/bin/99_shared_crates/ssh-config-parser)** — SSH config file parsing
- ⏱️ **[timeout-enforcer](https://github.com/rbee-keeper/rbee/tree/main/bin/99_shared_crates/timeout-enforcer)** — Timeout enforcement macros
- ⚡ **[timeout-enforcer-macros](https://github.com/rbee-keeper/rbee/tree/main/bin/99_shared_crates/timeout-enforcer-macros)** — Proc-macros for timeout annotations
- 🔧 **[shared-worker-rbee](https://github.com/rbee-keeper/rbee/tree/main/bin/32_shared_worker_rbee)** — Common worker utilities
- ♻️ **[lifecycle](https://github.com/rbee-keeper/rbee/tree/main/bin/96_lifecycle)** — Component lifecycle management
- 📜 **[contracts](https://github.com/rbee-keeper/rbee/tree/main/bin/97_contracts)** — Shared type definitions
- 🔒 **[security-crates](https://github.com/rbee-keeper/rbee/tree/main/bin/98_security_crates)** — Auth, audit, and input validation crates
- 🌍 **[global-worker-catalog](https://github.com/rbee-keeper/rbee/tree/main/bin/80-global-worker-catalog)** — Cross-hive worker registry
- 🌐 **[browser-environment](https://github.com/Cond8/core/tree/main/browser-environment)** — React + Vite web app with Monaco editor and AI chat
- ☁️ **[VHX-starterkit](https://github.com/Cond8/core/tree/main/VHX-starterkit)** — Cloudflare Workers template with Hono + Preact SSR
- 🏰 **[sovereign-vault](https://github.com/veighnsche/sovereign-vault)** — Self-hosts Forgejo/Vaultwarden on Pixel 6 via AVF microVMs
- 💎 **[Tanzanite](https://github.com/veighnsche/Tanzanite)** — Aurora (uBlue) developer workstation image with COSMIC and toolchains
- 🏆 **[tenxten](https://github.com/veighnsche/tenxten)** — Proving ground for 10x engineers with native and AI-augmented certification
- 🧹 **[nixos-ram-tmp-lru](https://github.com/veighnsche/nixos-ram-tmp-lru)** — NixOS module for tmpfs /tmp with LRU eviction at 70% usage
- 🦀 **[oxidizr-arch](https://github.com/veighnsche/oxidizr-arch)** — Atomically switches Arch toolchains to Rust replacements with rollback
- 🔀 **[switchyard](https://github.com/veighnsche/switchyard)** — Auditable engine for atomic system changes with symlink swaps
- 🤖 **[android-root](https://github.com/veighnsche/android-root)** — MCP server for multi-device Android shells with hang detection
- 🥒 **[cukerust](https://github.com/veighnsche/cukerust)** — Zero-config Gherkin × Rust BDD extension for VS Code

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

## Contact

- GitHub: @veighnsche
