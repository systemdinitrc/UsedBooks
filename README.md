# UsedBooks Web App

This is a Next.js application for a used book bidding platform. It allows users to view books, their descriptions, covers, suggested prices, and current bids.

## Working Demo
[http://kiddie.0177417.xyz](http://kiddie.0177417.xyz)<br>
**Note:** Due to app running on a free vps, there is a chance it might load slow, on machine hosting this doesn't occur.

## Prerequisites

- Node.js (v20 or higher recommended)
- `pnpm` (or `npm`)

## Setup Instructions

1. **Install dependencies:**
   Using `pnpm` (Preferred)
   ```bash
   pnpm install
   ```
   Or using `npm`:
   ```bash
   npm install
   ```

2. **Database Initialization and Seeding:**
   The application uses a local SQLite database (`database.sqlite`). The schema is defined in `src/lib/db/schema.ts` and will be created if it doesn't exist.
   
   To seed the database with sample book data, run:
   ```bash
   pnpm seed:demo
   # or npm run seed:demo
   ```
   This will execute `mock_data_script/seed-demo-books.mjs` and populate the database with demo books and bids.

## Execution Instructions

1. **Run the development server:**
   ```bash
   pnpm dev
   # or npm run dev
   ```

2. **Access the application:**
   Open [http://localhost:3000](http://localhost:3000) in your web browser.

- **Database schema**: Located in `src/lib/db/schema.ts`.
