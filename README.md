# The Strivers' Network

A modern, high-performance blog and website built with **Next.js 15**, **Payload CMS 3.0**, and **Tailwind CSS**. This project serves as the digital home for **The Strivers' Network**, featuring a dynamic blog, commentary system, and robust content management.

## Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org)
- **CMS**: [Payload CMS 3.0](https://payloadcms.com) (Beta/Release Candidate)
- **Database**: [Postgres](https://www.postgresql.org/) (via [Neon](https://neon.tech/))
- **Storage**: [Vercel Blob](https://vercel.com/docs/storage/vercel-blob)
- **Styling**: [Tailwind CSS](https://tailwindcss.com) & [Shadcn UI](https://ui.shadcn.com)
- **Email**: [Resend](https://resend.com)
- **Analytics**: Vercel Analytics & Speed Insights, Google Analytics 4

## Key Features

### Content Management

- **Visual Editor**: Full Lexical-based rich text editor for Posts and Pages.
- **Live Preview**: Real-time content preview as you edit in the Admin panel.
- **Draft System**: Publish workflow with draft/published states.
- **Layout Builder**: Flexible block-based layout system for dynamic page construction.
- **Media Management**: Automatic image resizing and optimization with focal point control.
- **SEO Control**: Complete control over meta tags, OpenGraph data, and JSON-LD schema.

### User Experience

- **Comments System**: Rich-text comment system with moderation capabilities.
- **Search**: Integrated site-wide search functionality.
- **Responsive Design**: Mobile-first design using Tailwind CSS.
- **Dark Mode**: Built-in themes support.

### DevOps & Performance

- **On-demand Revalidation**: Instant content updates via Next.js ISR.
- **Type Safety**: End-to-end TypeScript support with auto-generated types from Payload schema.
- **CI/CD**: Automated builds and deployments via Vercel.

## Quick Start

### Prerequisites

- Node.js >= 20.9.0
- pnpm (managed via Corepack or installed globally)

### Setup

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd tsn-website-blog
    ```

2.  **Install dependencies:**

    ```bash
    pnpm install
    ```

3.  **Environment Configuration:**
    Copy the example environment file and configure your secrets.

    ```bash
    cp .env.example .env
    ```

    You will need to provide:
    - `POSTGRES_URL`: Connection string for your Neon/Postgres database.
    - `PAYLOAD_SECRET`: A random string for session security.
    - `BLOB_READ_WRITE_TOKEN`: Vercel Blob token.
    - `RESEND_API_KEY`: API key for email services.
    - `NEXT_PUBLIC_SERVER_URL`: URL of your local or production server.

4.  **Run Development Server:**
    ```bash
    pnpm dev
    ```
    The app will be available at `http://localhost:3000`.
    The Admin panel is at `http://localhost:3000/admin`.

## scripts

- `pnpm dev`: Start the development server.
- `pnpm build`: Build the application for production.
- `pnpm start`: Start the production server.
- `pnpm generate:types`: Generate TypeScript types from Payload schema.
- `pnpm lint`: Run ESLint.

## Project Structure

- `/src/app`: Next.js App Router pages and layouts.
- `/src/collections`: Payload CMS collection definitions (Posts, Users, Comments, etc.).
- `/src/components`: React components (UI, specific features).
- `/src/globals`: Payload CMS global configs (Header, Footer, Settings).
- `/src/payload.config.ts`: Main Payload configuration.
- `/public`: Static assets.

## License

MIT
