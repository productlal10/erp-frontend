# ERP Frontend

This folder contains the **frontend** of the ERP application. Follow the steps below to run the frontend locally for testing and development.

---

## Prerequisites

Make sure you have the following installed on your computer:

* Node.js (v16 or above)
* npm (comes with Node.js)
* Git

> Node.js needs to be installed only once on your computer.

---

## Install Required Software

### Install Node.js & npm
Download and install from:
https://nodejs.org

Verify installation:
```bash
node -v
npm -v
Install Git
Download and install from: https://git-scm.com

Verify installation:

Bash

git --version
Clone the Repository
Bash

git clone [https://github.com/productlal10/erp-frontend.git](https://github.com/productlal10/erp-frontend.git)
cd erp-frontend
Install Dependencies
Bash

npm install
Environment Setup
Create a .env file inside the frontend folder:

Code snippet

REACT_APP_API_BASE_URL=http://localhost:4000
Update the API URL if your backend runs on a different port.

Run the Frontend
Bash

npm start
Frontend will run on:

http://localhost:3000
Verify Frontend
Application loads in the browser

API calls connect to backend

Pages and forms work correctly

Common Issues
Blank screen → Check browser console

API not working → Make sure backend is running

Environment variables not working → Restart frontend server
