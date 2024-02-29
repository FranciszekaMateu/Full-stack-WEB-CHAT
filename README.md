
**Full-stack WEB CHAT**

**Description**
A full-stack real-time chat application built using Supabase for the backend, Express for the REST API, React for the frontend, and Axios for communication between client and server. 

**Features**

* User authentication and registration
* Real-time messaging with chat rooms or channels.
* Direct/private messaging
* Presence indicators (online/offline)
* File/image sharing

**Technologies**

* **Backend:**
    * Supabase (Database)
    * Node.js 
    * Express.js 
    + Json Web Token for authentication
* **Frontend:**
    * React.js
    * Axios
    + Chakra UI
**Getting Started**

**Prerequisites**

* Node.js and npm (or yarn)
* A Supabase account and project with API keys

**Installation**

1. Clone this repository:
   ```bash
   git clone https://github.com/FranciszekaMateu/Full-stack-WEB-CHAT.git
   ```

2. Install dependencies: 
   ```bash
   cd client
   npm install
   cd ..
   cd server
   npm install
   ```

**Configuration**

1. Create a `.env` file in the project root.
2. Add the following environment variables:
   ```
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   JWT_SECRET=yourSecretKey
   ```

**Running the Application**

1. Start the client development server:
   ```bash
   cd client
   npm run dev
   ```
2. Start the client development server:
   ```bash
   cd server
   nodemon
   ```
**Deployment** 
* **Backend:** Deploy your Express server to a platform of your choice (e.g., Heroku, AWS, DigitalOcean).
* **Frontend:** Build and deploy your React application to a static hosting provider (e.g., Netlify, Vercel, GitHub Pages).

