Here’s a step-by-step guide to running your Next.js project, "whatbytes", in detail. These instructions assume the project has already been pushed to the GitHub repository successfully.

1. Clone the Repository
To get the project code from GitHub onto your local machine:

bash
Copy
Edit
git clone https://github.com/khushanpoptani/whatbytes.git
2. Navigate to the Project Directory
Move into the project folder:

bash
Copy
Edit
cd whatbytes
3. Install Dependencies
Next.js projects require dependencies listed in the package.json file. Install them using:

bash
Copy
Edit
npm install
This command will:

Download all required dependencies.
Create a node_modules folder locally.
4. Verify Environment Variables
If the project relies on environment variables, you need a .env.local file. Ask your internship supervisor for any required credentials or configuration keys, or check for a .env.example file in the repository.

For example:

plaintext
Copy
Edit
API_URL=https://api.example.com
NEXT_PUBLIC_API_KEY=your-public-api-key
Create the .env.local file in the root of your project and copy the necessary variables into it.

5. Run the Development Server
Start the local development server:

bash
Copy
Edit
npm run dev
Details:

By default, the app runs at http://localhost:3000/.
You can access this link in your browser to see the project.
