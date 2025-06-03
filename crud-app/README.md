# CRUD App

This project is a simple CRUD application built with the following technologies:

- **Backend**: Node.js with Fastify and PostgreSQL
- **Frontend**: React with Tailwind CSS and Vite
- **Desktop**: Tauri

## Project Structure

```
crud-app
├── backend
│   ├── src
│   │   ├── server.js          # Entry point for the Fastify server
│   │   ├── routes
│   │   │   └── api.js         # API routes for CRUD operations
│   │   ├── controllers
│   │   │   └── controller.js   # Controller for handling CRUD logic
│   │   ├── models
│   │   │   └── model.js        # Data model for PostgreSQL interaction
│   │   └── config
│   │       └── database.js     # Database connection configuration
│   ├── package.json            # Backend dependencies and scripts
│   └── .env                    # Environment variables for database connection
├── frontend
│   ├── src
│   │   ├── App.jsx             # Main React component
│   │   ├── main.jsx            # Entry point for the React application
│   │   ├── components
│   │   │   └── CrudComponent.jsx # UI for CRUD operations
│   │   └── styles
│   │       └── index.css       # Global styles including Tailwind CSS
│   ├── index.html              # Main HTML file for the React app
│   ├── package.json            # Frontend dependencies and scripts
│   ├── vite.config.js          # Vite configuration
│   └── tailwind.config.js      # Tailwind CSS configuration
├── src-tauri
│   ├── src
│   │   └── main.rs             # Entry point for the Tauri application
│   ├── Cargo.toml              # Rust project configuration
│   └── tauri.conf.json         # Tauri application configuration
└── README.md                   # Project documentation
```

## Getting Started

### Prerequisites

- Node.js
- PostgreSQL
- Rust (for Tauri)

### Backend Setup

1. Navigate to the `backend` directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the `backend` directory with your PostgreSQL connection settings:
   ```
   DATABASE_URL=your_database_url
   ```

4. Start the backend server:
   ```
   node src/server.js
   ```

### Frontend Setup

1. Navigate to the `frontend` directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the frontend development server:
   ```
   npm run dev
   ```

### Tauri Setup

1. Navigate to the `src-tauri` directory:
   ```
   cd src-tauri
   ```

2. Build and run the Tauri application:
   ```
   cargo tauri dev
   ```

## Usage

Once the backend and frontend servers are running, you can access the application in your web browser. The Tauri application will allow you to run the same functionality as a desktop application.

## License

This project is licensed under the MIT License.