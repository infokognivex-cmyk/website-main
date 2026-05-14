# Kognivex Backend (TiDB Integrated)

This is the Node.js/Express backend for Kognivex, integrated with TiDB for distributed SQL storage.

## Tech Stack
- **Framework**: Express.js
- **Database**: TiDB (MySQL Compatible)
- **Driver**: `mysql2/promise`
- **Security**: Helmet, CORS

## Getting Started

1. **Install Dependencies**:
   ```bash
   cd backend
   npm install
   ```

2. **Database Setup**:
   - Install TiDB locally or use TiDB Cloud.
   - Run the initialization script found in `db/init.sql` to create the database and tables.
   - Update the `.env` file with your TiDB credentials.

3. **Run the Server**:
   ```bash
   node index.js
   ```

## API Endpoints

### Contacts
- `POST /api/contacts`: Submit a contact form.
- `GET /api/contacts`: Retrieve all contact submissions.

### Quotes
- `POST /api/quotes`: Submit a project quote request.
- `GET /api/quotes`: Retrieve all quote requests.

## Project Structure
- `config/`: Database connection settings.
- `controllers/`: Business logic and SQL queries.
- `routes/`: API endpoint definitions.
- `db/`: SQL scripts.
