# Nova Group

Website for Nova Group — construction and architecture company (project catalog, services, contacts).

## Stack

- **Next.js 15** (App Router)
- **Chakra UI** — components and theme
- **Framer Motion** — animations
- **GSAP** — animations
- **Swiper** — sliders and galleries
- **Vercel Analytics** & Speed Insights

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Install and run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment

For production build, optional env files are supported (see `scripts/check-env-before-build.js`). Contact form uses `EMAIL_USER` and `EMAIL_PASS` (e.g. in `.env.local`).

## Scripts

| Command      | Description                    |
| ------------ | ------------------------------ |
| `npm run dev`   | Start dev server               |
| `npm run build` | Check env, then production build |
| `npm run start` | Start production server        |
| `npm run lint`   | Run ESLint                     |
| `npm run format` | Format with Prettier           |

## Project structure

- `src/app/` — App Router pages (home, projects, project/[id], design, services, contacts, privacy-policy)
- `src/components/` — UI and feature components
- `src/lib/` — data and client helpers (`projects.ts`, `projects-client.tsx`)
- `src/constant/` — paths, config, content references
- `src/app/api/` — API routes (e.g. `projects`, `contact`)

Projects data is loaded via `getProjects()` (cached per request and with revalidation). Optional client hook: `useProjects()` from `lib/projects-client` inside `ProjectsProvider`.

## Deploy

Optimized for [Vercel](https://vercel.com). Connect the repo and deploy; set env vars in the dashboard if using the contact form.

### Update on Timeweb

1. SSH into the server:
   ```bash
   ssh root@46.***.**.***
   ```
   Enter password when prompted.

2. Go to project and pull latest:
   ```bash
   cd /var/www/nova
   git pull origin main
   ```

3. If dependencies changed, reinstall:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

4. Build (with increased memory for Node):
   ```bash
   NODE_OPTIONS="--max-old-space-size=1536" npm run build
   ```

5. Restart the app:
   ```bash
   pm2 restart all
   ```
