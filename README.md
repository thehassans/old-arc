# Old Arcade 🎮

A premium e-commerce platform for retro gaming enthusiasts. Built with Node.js, React, and MariaDB.

## Features

- **Premium UI/UX**: Dark mode with neon accents, glassmorphism effects, and smooth animations
- **Product Catalog**: Browse games, consoles, and accessories with category filters
- **Shopping Cart**: Add items, manage quantities, and checkout
- **Admin Dashboard**: Manage orders, view queries, and track stats
- **Responsive Design**: Optimized for mobile and desktop

## Tech Stack

### Backend
- Node.js + Express
- MariaDB + Sequelize ORM
- JWT Authentication
- RESTful API

### Frontend
- React + Vite
- Tailwind CSS
- Framer Motion (animations)
- Lucide React (icons)
- React Router

## Installation

### Prerequisites
- Node.js (LTS version)
- MariaDB (running on port 3306)

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/thehassans/old-arc.git
   cd old-arc
   ```

2. **Setup Backend**
   ```bash
   cd server
   npm install
   ```
   
   Update `.env` with your database credentials:
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=old_arcade
   JWT_SECRET=your_secret_key
   ```
   
   Run database setup:
   ```bash
   node setupDb.js
   ```
   
   Start the server:
   ```bash
   node index.js
   ```

3. **Setup Frontend**
   ```bash
   cd ../client
   npm install
   npm run dev
   ```

The app will be available at `http://localhost:5173`

## Project Structure

```
old-arcade/
├── client/          # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.jsx
│   └── package.json
├── server/          # Express backend
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── schema.sql
│   └── index.js
└── README.md
```

## API Endpoints

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/orders` - Create order
- `GET /api/admin/stats` - Admin dashboard stats
- `GET /api/admin/queries` - Get customer queries

## License

MIT
