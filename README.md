# ERP Frontend

This folder contains the **frontend** of the ERP application. Follow the steps below to run the frontend locally for testing and development.

---

## Prerequisites

Make sure you have:

* Node.js (v16 or above)
* npm
* Git

---

## Clone the Repository

```bash
git clone https://github.com/productlal10/erp-frontend.git
```

---

## Install Dependencies

```bash
npm install
```

---

## Environment Setup

Create a `.env` file inside the **frontend** folder:

```env
REACT_APP_API_BASE_URL=http://localhost:4000
```

> Update the API URL if your backend runs on a different port.

---

## Run the Frontend

```bash
npm start
```

Frontend will run on:

```
http://localhost:3000
```

---

## Verify Frontend

* Application loads in the browser
* API calls connect to backend
* Forms and pages work as expected

---

## Common Issues

* Blank screen → Check console errors
* API not working → Ensure backend is running
* CORS issue → Configure backend CORS

---
