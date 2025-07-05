# 🛒 Product Management API

A simple full-stack ready REST API for managing products using **Node.js**, **Express**, **TypeScript**, **PostgreSQL**, and **TypeORM**.

---

## 🔧 Tech Stack

- **Backend**: Node.js, Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **HTTP Client**: Postman (for testing)

---

## 📁 Project Structure

```

src/
├── config/                 # Database config (TypeORM DataSource)
├── entity/                 # TypeORM entities (tables)
├── controller/             # Request handlers (business logic)
├── routes/                 # API route definitions
└── index.ts                # Main app entry point

````

---

## 🚀 Setup Instructions

1. **Install dependencies**

```bash
npm install
````

2. **Configure PostgreSQL**

Make sure PostgreSQL is running locally with a database named `crudpost`. Update credentials in `AppDataSource`:

```ts
username: "postgres",
password: "root",
database: "crudpost",
```

3. **Start the app in dev mode**

```bash
npm run dev
```

or build and start:

```bash
npm run build
npm start
```

---

## 📦 API Endpoints

Base URL: `http://localhost:3000/products`

| Method   | Endpoint          | Description          |
| -------- | ----------------- | -------------------- |
| `GET`    | `/get`            | Get all products     |
| `POST`   | `/add`            | Add a new product    |
| `GET`    | `/getproduct/:id` | Get product by ID    |
| `PUT`    | `/update/:id`     | Update product by ID |
| `DELETE` | `/delete/:id`     | Delete product by ID |

---

## 🧪 Sample Request (POST /add)

```json
{
  "name": "iPhone 15 Pro",
  "price": 129999,
  "description": "Apple's latest flagship with titanium frame and A17 Pro chip"
}
```

---

## ✅ Response Example (GET /get)

```json
[
  {
    "id": 1,
    "name": "iPhone 15 Pro",
    "price": 129999,
    "description": "Apple's latest flagship with titanium frame and A17 Pro chip"
  }
]
```

---

## 📝 Notes

* TypeORM auto-generates table schema if `synchronize: true` is enabled
* Use Postman or any REST client to test endpoints

---

## 📄 License

MIT
