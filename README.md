

```markdown
# ERP Frontend

This folder contains the **frontend** of the ERP application. Follow the steps below to run the frontend locally for testing and development.

---

## Prerequisites

Make sure you have the following installed on your computer:

* **Node.js** (v16 or above)
* **npm** (comes with Node.js)
* **Git**


---

## Install Required Software

### 1. Install Node.js & npm
Download and install from: [https://nodejs.org](https://nodejs.org)

**Verify installation:**
```bash
node -v
npm -v

```

### 2. Install Git

Download and install from: [https://git-scm.com](https://git-scm.com)

**Verify installation:**

```bash
git --version

```

---

## Getting Started

### 1. Clone the Repository

```bash
git clone [https://github.com/productlal10/erp-frontend.git](https://github.com/productlal10/erp-frontend.git)
cd erp-frontend

```

### 2. Install Dependencies

```bash
npm install

```

### 3. Environment Setup

Create a file named `.env` inside the **frontend** folder:

```env
REACT_APP_API_BASE_URL=http://localhost:4000

```

> **Note:** Update the API URL if your backend runs on a different port.

---

## Run the Frontend

```bash
npm start

```

The frontend will run on: [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000)

---

## Verify Frontend

* **Browser:** Application loads in the browser.
* **Connectivity:** API calls connect to backend.
* **Functionality:** Pages and forms work correctly.

---

## Common Issues

* **Blank screen** → Check browser console.
* **API not working** → Make sure backend is running.
* **Environment variables not working** → Restart frontend server.
