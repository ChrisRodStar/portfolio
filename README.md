# Christopher Rodriguez — Portfolio

A modern developer portfolio showcasing projects, notes, and real-time GitHub activity.

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge)](https://chrisrodriguez.dev/)

![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=flat-square&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Neon](https://img.shields.io/badge/Neon_DB-00E599?style=flat-square&logo=postgresql&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)

---

## Features

| Feature | Details |
|---------|---------|
| **Catppuccin Theming** | 4 flavors (Latte, Frappé, Macchiato, Mocha) × 14 accent colors |
| **Live GitHub Feed** | Real-time commit activity pulled from GitHub API |
| **Interactive Counter** | Persistent click counter backed by Neon PostgreSQL |
| **Bento Grid Layout** | Modern card-based design with smooth animations |
| **Typography** | JetBrains Mono for that dev aesthetic |
| **Responsive** | Mobile-first with fluid layouts |

---

## Tech Stack

- **Framework:** Next.js 16 with React 19 & React Compiler
- **Styling:** Tailwind CSS 4
- **Database:** Neon (serverless PostgreSQL)
- **Deployment:** Vercel

---

## Run Locally

```bash
bun install && bun dev
```

Create a `.env.local` with:

```env
DATABASE_URL=your_neon_connection_string
GITHUB_TOKEN=your_github_pat
API_SECRET=your_random_secret_key
NEXT_PUBLIC_SITE_URL=https://chrisrodriguez.dev
```

---

