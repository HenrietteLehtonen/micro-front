


## What this package provides
- Federation name: `profile` (declared in `vite.config.ts`)
- Dev server port: `3005` (see `server.port` in `vite.config.ts`)
- Exposed modules (federation):
  - `./Profile` -> `./src/components/ProfileView`  (host import: `import Profile from 'profile/Profile'`)
  - `./ProfileThumbnail` -> `./src/components/ProfileThumbnail` (host import: `import ProfileThumbnail from 'profile/ProfileThumbnail'`)

## Core components (in this folder)
- `src/components/ProfileView.tsx` — main profile page component (consumes `useUserContext`).
- `src/components/ProfileThumbnail.tsx` — media thumbnail used in profile listing. It uses `ThumbCarousel` from the `front_and_sidebar` remote.
- `src/components/ui/card.tsx` — a tiny local Card wrapper used by `ProfileThumbnail` to allow standalone preview.

## External runtime dependencies
These remotes must be available when you run the profile MFE in dev or when the host loads it:
- `mediastore` (store-starter) — provides `UserProvider`, `MediaProvider`, and `contextHooks` (user/media state). Expected URL in host/config: `http://localhost:3001/assets/remoteEntry.js`.
- `front_and_sidebar` (juutube-front-and-sidebar-starter) — provides `ThumbCarousel`. Expected URL: `http://localhost:3002/assets/remoteEntry.js`.

