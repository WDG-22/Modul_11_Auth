# WBS Travel Journal API
BLAHAHA

lt `8000`

## Commands

- `npm run dev`: Starts development server, pulling environment variables from `.env` file
- `npm start`: Starts production server, pulling environment variables from the system

## Usage

- The code is organised as follows:

```
wbs-travel-journal-api/
|- controllers/ => Our controller functions per resource
|- db/
|   \_ index.js => Database connection with Mongoose
|- middlewares/ => custom middlewares
|- models/ => Our models per resource
|- routers/ => Our routers per resource
|- zod/
|   \_ schemas.js => Zod schemas for data validations
\_ index.js
```
