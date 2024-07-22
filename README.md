# E-commerce Website

This project is an e-commerce website developed using Next.js, Prisma, PostgreSQL, and Nodemailer, based on the design flow provided by Roc8.


## Installation
- Clone the repository.
- Install dependencies using npm install.
- Set up environment variables.
``` DATABASE_URL=postgresql://username:password@localhost:5432/database_name
MAILTRAP_HOST=smtp.mailtrap.io
MAILTRAP_PORT=2525
MAILTRAP_USER=<mailtrap_username>
MAILTRAP_PASS=<mailtrap_password>
JWT_SECRET=<your_jwt_secret_key> 
```
- Run database migrations
``` npx prisma migrate dev ```

- Start the development server with npm start.

## Tehnologies Used

- **Next.js:** React framework for front-end and back-end.
- **Prisma:** ORM (Object-Relational Mapping) for database interaction.
- **PostgreSQL:** Relational database for storing user data and category information.
- **Nodemailer:** Used for sending emails.
- **JWT:** JSON Web Tokens for authentication.
- **Cookie:** Storage mechanism for JWT token with an expiry time.
- **Middleware:** Custom middleware for handling requests in Next.js.

## Features

- **Signup Page:** Includes fields for name, email, and password. Proper validation ensures the minimum length of the name is 3 characters and the password is 5 characters.

- **Login Page:** Requires email and password for authentication.

- **Email Verification:** Upon login, if the user is not verified, they are redirected to a verify page. An OTP (One-Time Password) is sent to the user's email using Nodemailer. For development, Mailtrap is used to handle email sending.

- **Home Page:** Once verified, users are redirected to the home page where they see a list of categories.

- **Category Selection:** Users can select checkboxes corresponding to categories they are interested in. The selected categories' data is stored in the database.

- **Pagination:** There are a total of 100 categories, displayed in pagination mode with 6 categories shown per page.

- **JWT Authentication:** When the user successfully logs in with correct credentials, a JWT token is generated and stored in a cookie. The cookie's expiry time is set to 1 hour (1000 * 60 milliseconds). This token is sent with every backend request.

- **Middleware:** Middleware is implemented to handle every request sent to the backend. If a user tries to access the home page without being logged in, the middleware redirects them to the login page.


**Note :**
- Ensure PostgreSQL is installed and running locally.
- For production deployment, Next.js middleware will not work.