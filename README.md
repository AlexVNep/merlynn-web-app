# NextJS API Form Application

## **Overview**

This project is a web application built using Next.js that demonstrates API integration, database interaction, session handling, and dynamic form generation. It is designed to assess coding skills in the following areas:

- NextJS and framework usage
- API integration
- Database setup
- UI/UX design
- Session handling
- Security and form validation considerations

## **Tech Stack**

- **Next.js** - React framework for server-side rendering and API routes
- **React.js** - UI library for building components
- **TailwindCSS** - Utility-first CSS framework for styling
- **MongoDB** - NoSQL database for storing API form results
- **Mongoose** - ODM for interacting with MongoDB
- **TypeScript** - Strongly typed JavaScript

## **Features**

1. **User Authentication**

   - Simple sign-up and login (email & password)
   - Protected routes for logged-in users

2. **API Integration**

   - Users can input an API endpoint and API key
   - The app performs a GET request to fetch model inputs
   - A dynamic form is generated based on the response

3. **Data Storage**

   - Successful form submissions are saved to the database
   - API responses are stored for later reference

4. **Decision History**

   - Users can view previously submitted forms and API results
   - Search functionality to filter results by model or ID

5. **Dynamic Navigation**
   - If the endpoint ends in `/results`, users are directed to a results page
   - If an ID is provided, users are taken to a page showing a specific result

## **Setup Instructions**

### Prerequisites

- **Node.js** (v20 or later)
- **MongoDB** (Local or Cloud Instance)
- **Git** (for cloning the repository)

### Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:AlexVNep/merlynn-web-app.git
   cd merlynn-web-app
   ```
2. Install dependencies:
   ```bash
    npm install
   ```
3. Set up environment variables:
   - Run the following to create a secret:
   ```bash
   npx auth secret
   ```
   - Add your mongodb connection string so you have the following in your env.locale
   ```bash
   NEXTAUTH_SECRET=your_secret_key
   MONGODB_URL=your_mongodb_connection_string
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open http://localhost:3000 in your browser.

## **How It Works**

1. User Authentication

   - Sign up or log in to access protected pages.

2. Submitting an API Endpoint

   - Enter an API URL and key.
   - Submit the form to generate a dynamic form based on API data.

3. Viewing API Results

   - If the API endpoint ends in /results, a list of decisions is displayed.
   - If an ID is entered, the user is redirected to a specific result.

4. Viewing Past Submissions
   - Navigate to the Database page to view previously stored form submissions from MongoDB.
   - Use the search bar to filter results by model name or ID.
