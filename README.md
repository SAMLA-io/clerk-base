# SAMLA Clerk Auth Testing App

A basic Next.js application for testing Clerk authentication integration into SAMLA systems.

This is a bare minimum application to which enables user authentication into SAMLA systems.

## Prerequisites

- Node.js 18.x or later
- pnpm 8.x or later

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/samla-io/clerk-base.git
cd clerk-base
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory with the following variables:
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key
```

4. Run the development server:
```bash
pnpm dev
```

The application will be available at `http://localhost:3000`.

## Features

- SAMLA authentication integration with Clerk
- User profile display
- Responsive design

## Tech Stack

- Next.js 14
- Clerk Authentication
- Tailwind CSS
- TypeScript

## Development

- `pnpm dev` - Start development server

## Contributors

- [@jpgtzg](https://github.com/jpgtzg)
