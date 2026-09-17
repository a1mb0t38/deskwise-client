# DeskWise — Frontend Client 🖥️

**DeskWise** is a modern IT Helpdesk web application built as an educational CTF (Capture The Flag) platform to teach the **OWASP Top 10:2025** security vulnerabilities. The frontend interface provides a clean, responsive user experience for helpdesk operations while giving players intuitive tools to test and exploit backend vulnerabilities, submit flags, and track their progress.

---

## 🚀 Features

- **Authentication & User Profiles**: Complete onboarding flow, role-based views (User, Agent, Admin), and session management via Better Auth.
- **Helpdesk Ticket Management**:
  - View personal or department-wide tickets
  - Create new support tickets with title, description, and priority level
  - Update status, priority, and assignment (Staff/Admin)
- **CTF Dashboard & Progress Tracker**:
  - **Flag Submission**: Dedicated `/flags` interface to submit discovered `CATEGORY{...}` flags.
  - **Progress Tracking**: Real-time progress bar showing percentage of OWASP challenges completed.
- **Admin Panel**: Management view for user roles, privilege escalation testing, and audit log inspection.
- **Rules & CTF Sitemap**: Interactive `/rules` page explaining challenge categories, rules of engagement, and hints.

---

## 🛠 Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Styling**: Modern CSS / Utility Components
- **Authentication**: Better Auth Client Integration (`credentials: "include"`)
- **API Communication**: Native `fetch` wrapper targeting Express 5 backend

---

## 📁 Directory Structure

```text
deskwise-client/
├── src/
│   ├── app/
│   │   ├── admin/             # Admin panel & role management
│   │   ├── dashboard/         # Helpdesk main ticket dashboard
│   │   ├── flags/             # Flag submission & progress tracker
│   │   ├── login/             # User authentication (Login)
│   │   ├── profile/complete/  # Profile completion & role setup
│   │   ├── progress/          # Solved challenge statistics
│   │   ├── rules/             # CTF rules and OWASP documentation
│   │   ├── signup/            # Account registration
│   │   └── tickets/           # Ticket creation and detailed view
│   ├── components/            # Reusable UI components (Navbar, TicketTable, Badges)
│   └── lib/                   # API helpers (`api.js`, `api-server.js`)
├── public/                    # Static assets
└── package.json
```

---

## ⚙️ Prerequisites & Setup

### 1. Requirements
- Node.js (v18+)
- Running DeskWise Server instance (`http://localhost:5000`)

### 2. Environment Configuration
Create a `.env.local` file in the root of `deskwise-client`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### 3. Installation
```bash
npm install
```

### 4. Running the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🎯 Target Pages & Vulnerability Interfaces

| Route | Purpose | OWASP Category Target |
|---|---|---|
| `/login` | Account authentication | A07 (Auth Failures / Brute Force) |
| `/profile/complete` | Onboarding profile setup | A01 (Mass Assignment / Role Escalation) |
| `/tickets/new` | Support ticket creation | Helpdesk domain operation |
| `/tickets/[id]` | Detailed ticket view | A01 (BOLA / IDOR) & A10 (Fail-Open Exception) |
| `/admin` | Admin dashboard | A01 (BFLA Header Trust) & A09 (Audit Log Blindspot) |
| `/flags` | Flag submission & progress | CTF Scoring System |

---

## 📜 License

Educational Security Training Tool — for authorized educational and laboratory use only.
