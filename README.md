# AbySalto Junior - Restaurant Order Management Frontend

A React + TypeScript frontend for the Restaurant Order Management System.

## Tech Stack

- React 18
- TypeScript
- Vite
- Axios

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/)
- Backend API running (see [backend repository](https://github.com/YOUR_USERNAME/YOUR_BACKEND_REPO))

## Related Repositories
- [Backend Repo](https://github.com/LovreGobin/AbySalto_junior)

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/abysalto-frontend.git
cd abysalto-frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure the API URL

Open `src/services/api.ts` and make sure the `BASE_URL` matches your backend port:
```typescript
const BASE_URL = 'http://localhost:5074/api/Restaurant'
```

### 4. Start the development server
```bash
npm run dev
```

Navigate to `http://localhost:5173` in your browser.

## Features

-  View all orders in a table
-  Create new orders with multiple items
-  Update order status (Pending → InPreparation → Completed)
-  Sort orders by total amount
-  Multi-currency support (defaults to EUR)

## Important

Make sure the backend is running before starting the frontend. Follow the setup instructions in the backend repository.
