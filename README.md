# API Documentation

## Tasks API

### List tasks

```http
GET /test/tasks
```

Query parameters:

| Parameter  | Type   | Description                      |
| ---------- | ------ | -------------------------------- |
| `q`        | string | Search by task title or assignee |
| `status`   | string | Filter by task status            |
| `priority` | string | Filter by priority               |
| `assignee` | string | Filter by assignee               |

Example:

```http
GET /test/tasks?q=backend&status=in-progress&priority=high&assignee=dmitry
```

---

### Get task by ID

```http
GET /test/tasks/:id
```

Example:

```http
GET /test/tasks/123
```

---

### Create task

```http
POST /test/tasks
```

Request body:

```json
{
  "title": "Implement authentication",
  "assignee": "dmitry",
  "description": "Add login and authorization",
  "status": "todo",
  "priority": "high",
  "deadline": "2026-08-20"
}
```

Required fields:

* `title`
* `assignee`

Optional fields:

* `description`
* `status`
* `priority`
* `deadline`

---

### Update task

```http
PATCH /test/tasks/:id
```

Updates one or more task fields.

Example:

```json
{
  "title": "Implement authentication",
  "priority": "high",
  "deadline": "2026-08-22"
}
```

---

### Delete task

```http
DELETE /test/tasks/:id
```

Example:

```http
DELETE /test/tasks/123
```

---

### Update task status

```http
PATCH /test/tasks/:id/status
```

Request body:

```json
{
  "status": "in-progress"
}
```

Available statuses:

```text
todo
in-progress
done
```

---

### Update task priority

```http
PATCH /test/tasks/:id/priority
```

Request body:

```json
{
  "priority": "high"
}
```

Available priorities:

```text
low
medium
high
```

---

## Study Authentication

> **Note:** This authentication is intended for study/testing purposes only and is **not production-ready admin authentication**.

### Login

```http
POST /test/auth
```

Request body:

```json
{
  "user": "dmitry",
  "password": "task"
}
```

Available users:

```text
ivan
maria
alex
olga
dmitry
```

Password for all study users:

```text
task
```

Successful response:

```json
{
  "token": "jwt-token",
  "user": "dmitry"
}
```

Use the returned token in subsequent authenticated requests:

```http
Authorization: Bearer <token>
```

---

## Users API

### Get available users

```http
GET /test/users
```

Returns the list of available assignee values.

Example response:

```json
[
  "ivan",
  "maria",
  "alex",
  "olga",
  "dmitry"
]
```

---

## Endpoint Summary

| Method   | Endpoint                   | Description             |
| -------- | -------------------------- | ----------------------- |
| `POST`   | `/test/auth`               | Study authentication    |
| `GET`    | `/test/users`              | Get available assignees |
| `GET`    | `/test/tasks`              | List and filter tasks   |
| `GET`    | `/test/tasks/:id`          | Get task by ID          |
| `POST`   | `/test/tasks`              | Create task             |
| `PATCH`  | `/test/tasks/:id`          | Update task             |
| `DELETE` | `/test/tasks/:id`          | Delete task             |
| `PATCH`  | `/test/tasks/:id/status`   | Update task status      |
| `PATCH`  | `/test/tasks/:id/priority` | Update task priority    |
