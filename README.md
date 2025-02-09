# Whatbytes - Next.js Project Setup Guide

This guide explains how to set up and run the "whatbytes" Next.js project on your local machine.

---

## **1. Clone the Repository**
To get the project code from GitHub onto your local machine:
```bash
git clone https://github.com/khushanpoptani/whatbytes.git
```

---

## **2. Navigate to the Project Directory**
Move into the project folder:
```bash
cd whatbytes
```

---

## **3. Install Dependencies**
Next.js projects require dependencies listed in the `package.json` file. Install them using:
```bash
npm install
```

This command will:
- Download all required dependencies.
- Create a `node_modules` folder locally.

---

## **4. Verify Environment Variables (If needed)**
If the project relies on environment variables, you need a `.env.local` file. Ask your internship supervisor for any required credentials or configuration keys, or check for a `.env.example` file in the repository.

For example:
```plaintext
API_URL=https://api.example.com
NEXT_PUBLIC_API_KEY=your-public-api-key
```

Create the `.env.local` file in the root of your project and copy the necessary variables into it.

---

## **5. Run the Development Server**
Start the local development server:
```bash
npm run dev
```

**Details:**
- By default, the app runs at `http://localhost:3000/`.
- You can access this link in your browser to see the project.

---

## **6. Troubleshooting Steps**

### Port Issues
If port 3000 is busy, start the server on another port using:
```bash
PORT=5000 npm run dev
```
Then access `http://localhost:5000`.

### Dependency Errors
If there are issues with dependencies, try:
```bash
npm install --legacy-peer-deps
```

### Missing Environment Variables
If `.env.local` is missing or incomplete, ensure all required environment variables are available. Check the project's README or documentation.

---

Let us know if you encounter any issues during the setup process!
