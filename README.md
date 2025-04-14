# DXF Decoder

A full‑stack web application that allows users to upload, parse, and interactively explore CAD DXF files by viewing their blocks, layers, and entities. The backend is built with Node.js, Express, PostgreSQL, and Sequelize, while the frontend is a React/Vite application using TanStack Router.

[GitHub Repository](https://github.com/HimjyotiSarma/dxf-decoder)

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Environment Variables](#environment-variables)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Installation & Setup](#installation--setup)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Running the Application](#running-the-application)
  - [Backend](#running-the-backend)
  - [Frontend](#running-the-frontend)
- [API Endpoints](#api-endpoints)
- [Frontend Pages & Functionality](#frontend-pages--functionality)
- [Testing](#testing)
- [Future Work](#future-work)
- [License](#license)
- [Contact](#contact)

---

## Features

- **DXF Upload & Parsing**: Upload DXF files via the API, parse blocks, layers, and entities.
- **Persistent Storage**: Store file metadata, block data, layer definitions, and entity properties in PostgreSQL.
- **Interactive Frontend**: Browse uploaded files, view details of blocks, layers, and entities with search & pagination.
- **Thumbnail Generation**: Automatically generate SVG→PNG thumbnails for uploaded DXF files.
- **AI‑friendly Workflow**: Leverage AI coding assistants in development (e.g., GitHub Copilot).

## Tech Stack

- **Backend**: Node.js, Express.js, Sequelize ORM, PostgreSQL
- **Frontend**: React, Vite, TanStack Router, Axios
- **Parsing & Visualization**: `dxf-parser`, `dxf2svg`, `sharp`
- **File Upload**: `multer`
- **Testing**: Jest, Supertest

## Prerequisites

- [Node.js](https://nodejs.org/) v20+
- [npm](https://npmjs.com/) v10+
- [PostgreSQL](https://postgresql.org/) v16+

## Environment Variables

### Backend

Create a `.env` file in the **backend** root:

```dotenv
PORT=3000
DB_NAME=cad_decoder_app
DB_USER=username
DB_PASSWORD=password
DB_HOST=localhost
DB_PORT=5432
DB_DIALECT=postgres
NODE_ENV=production
CLIENT_ORIGIN=http://localhost:5173
```

### Frontend

Create a `.env` file in the **frontend** root:

```dotenv
VITE_API_BASE_URL=http://127.0.0.1:3000/api/v1
```

## Installation & Setup

### Backend Setup

1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create the PostgreSQL database:
   ```sql
   CREATE DATABASE cad_decoder_app;
   ```
4. Ensure your `.env` is configured (see above).

### Frontend Setup

1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Ensure your `.env` is configured (see above).

## Running the Application

### Running the Backend

- **Development** (with auto‑reload via `nodemon`):
  ```bash
  npm run dev
  ```
- **Production**:
  ```bash
  npm start
  ```

### Running the Frontend

- **Development** (Vite):
  ```bash
  npm run dev
  ```
- **Production Build**:
  ```bash
  npm run build
  ```

## API Endpoints

Base URL: `http://<host>:<port>/api/v1`

| Method | Endpoint                | Description                                              |
| ------ | ----------------------- | -------------------------------------------------------- |
| POST   | `/files`                | Upload & parse a DXF file                                |
| GET    | `/files`                | List uploaded files (with pagination)                    |
| GET    | `/files/:fileId`        | Retrieve file details (layers, blocks, entities, counts) |
| GET    | `/files/:fileId/layers` | List layers for a file                                   |
| GET    | `/files/:fileId/blocks` | List blocks for a file                                   |
| GET    | `/blocks/:blockId`      | Get block details (with nested entities)                 |
| GET    | `/entities/:entityId`   | Get entity details                                       |
| GET    | `/layers/:layerId`      | Get layer details (with nested blocks)                   |

All responses follow the structure:

```json
{
  "statusCode": 200,
  "message": "...",
  "data": {
    /* payload */
  },
  "success": true
}
```

## Frontend Pages & Functionality

- **Home** (`/`) – Upload a DXF file and navigate to its details.
- **Files List** (`/files`) – Browse all uploaded files, with pagination.
- **File Details** (`/files/:fileId`) – Overview of a single file: metadata, counts, lists of layers, blocks, and entities.
- **Layers List** (`/files/:fileId/layers`) – Searchable list of layers in a file, with color & visibility.
- **Blocks List** (`/files/:fileId/blocks`) – Searchable list of blocks, showing block type & layer.
- **Block Details** (`/blocks/:blockId`) – Detailed view of a block and its entities.
- **Layer Details** (`/layers/:layerId`) – Detailed view of a layer and associated blocks.
- **Entity Details** (`/entities/:entityId`) – Detailed view of a single entity’s properties.

## Testing

Backend tests use **Jest** + **Supertest** with mocks for all database calls:

```bash
cd backend
npm test
```

## Future Work

- Expand unit & integration tests coverage.
- Add user authentication & permissions.
- Support DWG format parsing.
- Enhance frontend visualization (e.g., SVG renderings of blocks).

## License

This project is licensed under the MIT License.

## Contact

Himjyoti Sarma – [himjyotisarma.dev@gmail.com](mailto:himjyotisarma.dev@gmail.com)

[Repository](https://github.com/HimjyotiSarma/dxf-decoder)
