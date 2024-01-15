# Saida Jewellers WebApp - Backend API

Welcome to the Saida Jewellers WebApp backend repository! This backend application serves as the server-side component for the web application. It utilizes technologies like JWT for authentication, Multer for handling file uploads, and MongoDB as the database for storing catalog and pricing information.

## Getting Started

Follow these steps to set up and run the backend project locally:

1. Create a `.env` file from the provided `.env.example` file and configure the following variables:
   - `JWT_SECRET`: Secret key for JWT token generation.
   - `JWT_EXPIRES_IN`: Expiration time for JWT tokens (e.g., 1h for 1 hour).
   - `MONGODB_URI`: MongoDB connection URI.
   - `USER_USERNAME`: Username for login
   - `USER_PASSWORD`: Password for login

2. Install the required dependencies:

```bash
npm install

#Run the development server:

npm start
```

### Note: Ensure that MongoDB is running and accessible for the application to connect.

API Routes

-   POST /login
        
        Description: Log in to the application and receive a JWT token.

-    GET /login

         Description: Log out and invalidate the JWT token.
        Authentication: Required

-    GET /login/check

         Description: Check the validity of the JWT token to maintain user authentication state.
        Authentication: Required

-    GET /prices
        
         Description: Fetch prices.

-    POST /prices
        
         Description: Post prices.
        Authentication: Required

-    POST /catalog
        
         Description: Add new images to the catalog.
        Authentication: Required

-    GET /catalog/:category?pageNumber=(number)

         Description: Get items from the catalog based on the category with pagination.
        Authentication: Not required

        Query Parameters:page (Page number for pagination)

-   DELETE /catalog/:id

        Description: Delete a particular item in the catalog.
    Authentication: Required