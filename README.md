# micro-front

This repository contains a set of small React micro-frontends (MFEs) wired together with Module Federation using Vite and @originjs/vite-plugin-federation. Each MFE builds a static `dist/` folder that can be deployed independently; the `host-starter` app composes them at runtime.

Key goals:
- Fast local development with individual dev servers for each MFE
- Independent builds and deployments for each micro-frontend
- Production-ready builds that work when uploaded under a subpath (for example: `https://users.metropolia.fi/~hussaink/host`)

Contents (top-level folders of interest)
- `host-starter/` — the host application that composes remotes
- `store-starter/` — mediastore (provides contexts and hooks; remote name `mediastore`)
- `juutube-front-and-sidebar-starter/` — front_and_sidebar remote
- `video-player/` — video_player remote
- `profile-starter/` — profile remote
- `topbar-starter/` — TopBar remote
- `upload/` — upload remote

Tech
- Vite (build & dev)
- React + TypeScript
- Module Federation via `@originjs/vite-plugin-federation`

Quick local dev
1. Install dependencies in the workspace root or per-package as needed.
	cd into a package and run `npm install`.
2. Start remotes first, then host. Example order and ports used in this repo:
	- `store-starter` (mediastore) — port 3001
	- `juutube-front-and-sidebar-starter` (front_and_sidebar) — port 3002
	- `video-player` — port 3003
	- `topbar-starter` — port 3004
	- `profile-starter` — port 3005
	- `upload` — port 3006
	- `host-starter` — any port for the host dev server

Run :
```
cd ...\store-starter
npm install
npm run dev
```
Repeat for the other packages (start remotes before the host so host can resolve remoteEntry during dev).

Production build & deployment
- Build order (important): build remotes first, upload their `dist/` folders to your server, then build and upload the host last. The host's production bundle references remoteEntry URLs of uploaded remotes.
- Build command (PowerShell):
```
cd <project-folder>
$env:NODE_ENV='production'; npm run build
```
- Upload each project's `dist/*` into a matching server subfolder. Example production upload layout used in this repo:
  - `/~hussaink/host/` ← `host-starter/dist/*`
  - `/~hussaink/mediastore/` ← `store-starter/dist/*`
  - `/~hussaink/front_and_sidebar/` ← `juutube-front-and-sidebar-starter/dist/*`
  - `/~hussaink/video_player/` ← `video-player/dist/*`
  - `/~hussaink/topbar/` ← `topbar-starter/dist/*`
  - `/~hussaink/profile/` ← `profile-starter/dist/*`
  - `/~hussaink/upload/` ← `upload/dist/*`

Important configuration notes
- Each project's `vite.config.ts` in production sets `base` to the subpath used on the server (for example `base: '/~hussaink/host/'`). Keep these bases consistent with where you upload the built `dist/`.
- `index.html` files in this repo use the `%BASE_URL%vite.svg` placeholder so favicons and static references resolve when the project is served under a subpath.
- In code, use `import.meta.env.BASE_URL` when referencing runtime assets (images, logos) so built bundles resolve assets relative to the app's base.
- The host `vite.config.ts` has a `remotes` mapping that points to each remote's `assets/remoteEntry.js` in production.



