# 🔗 Tiny It API

A minimalist and fast URL shortening API built with [Bun](https://bun.sh) and [Elysia.js](https://elysiajs.com). Supports local development with SQLite and cloud-scale production using Azure Table Storage.

---

## 🧰 Getting Started

### Prerequisites

- [**Bun**](https://bun.sh/docs/installation) – JavaScript runtime (v1.0+)
- [**Docker**](https://www.docker.com/get-started) – For containerized builds
- [**Azure Storage Account**](https://portal.azure.com/) – For cloud data persistence (Azure Table Storage)

---

## 🚀 Running the Application

### 🐳 Docker

To build and run the app in a container:

```bash
docker build -t tinyit-api .
docker run -p 3000:3000 \
  -e NODE_ENV=production \
  -e AZURE_CONN_STRING="<your_connection_string>" \
  -e AZURE_TABLE_NAME="<your_table_name>" \
  -e AZURE_PARTITION_KEY="<your_partition_key>" \
  tinyit-api
```

> ⚠️ Replace the environment variables with your Azure credentials.

---

### 🖥 Locally with Bun

Install dependencies and run the server:

```bash
bun install
bun run dev
```

To run using Azure Table Storage, set up a `.env` file:

```env
ENV=production
AZURE_CONN_STRING=UseDevelopmentStorage=true;
AZURE_TABLE_NAME=<your_table_name>
AZURE_PARTITION_KEY=<your_partition_key>
```

---

## 📘 Endpoints

### ✨ `PUT /api/shorten`

Creates a shortened URL.

#### Request Body

```json
{
  "url": "https://example.com"
}
```

#### Response

```json
{
  "id": "abc123",
  "url": "https://example.com"
}
```

---

### 🔁 `GET /:id`

Redirects to the original URL for the given short ID.

#### Response

```json
{
    "url": "https://example.com"
}
```

---

## 📝 License

MIT © 2025 Oneiro Contributors
