# saga.uto
Saga Auto - Car Rental, Buying, and Leasing Platform
Saga Auto is a comprehensive platform where users can rent, buy, or lease cars. The platform provides a full-featured admin dashboard that allows for managing car listings, including adding, updating, and deleting cars, as well as handling user interactions through modals.

Saga Auto is designed to facilitate seamless car rental, buying, and leasing experiences. The platform includes a fullstack version:

Frontend: Built with React, offering a user-friendly interface for customers and administrators.
Backend: Powered by Node.js and PostgreSQL, providing robust data management and API functionalities.
Key Features
Car Management: Admins can add, update, and delete car listings.
User Interaction: Customers can browse, rent, buy, or lease cars.
Responsive Design: The platform is fully responsive, ensuring optimal user experience on all devices.
Modals: Used extensively for interactions like adding or editing car details, confirming actions, etc.
Installation
To set up this project locally, follow these steps:

1. Clone the Repository
bash
git clone [https://github.com/gunt4r/saga.uto.git](https://github.com/gunt4r/sag-auto-client.git)
cd SAG-AUTO-CLIENT
2. Install Dependencies
bash
npm install
4. Set Up the Database  
Ensure PostgreSQL is installed and running on your machine.
Create a new database for the project.
Set up the database configuration in the server/config/database.js file.
5. Run the Application
Backend
bash
npm run  start
This will start the backend server on http://localhost:5000.

Frontend
bash
npm run dev
This will start the frontend development server on http://localhost:5173.

Usage
Admin Dashboard
The admin dashboard allows administrators to manage car listings and other related data.

Example Workflow
Adding a Car:

Navigate to the admin dashboard.
Click on "Add a New Car" to open the modal.
Fill in the car details, upload images, and submit the form.

Editing a Car:
Click on "Edit" next to a car listing.
Update the necessary details and submit the changes.

Deleting a Car:
Click on "Delete" next to a car listing.
Confirm the deletion in the modal.

Customer Interaction
Customers can browse the available cars, view details, and choose to rent, buy, or lease a vehicle.

Features
Car Management: Full CRUD operations (Create, Read, Update, Delete) for car listings.
Responsive Design: Ensures usability across different screen sizes and devices.
Modals: Intuitive modals for adding, editing, and deleting car details.
Database Integration: All data is stored and managed in a PostgreSQL database.

Technologies Used
Frontend:
React: For building the user interface.
React-Bootstrap: For styling and responsive design.
Axios: For making HTTP requests to the backend.

Backend:
Node.js: Server-side runtime environment.
Express: Web framework for Node.js.
PostgreSQL: Relational database management system.
Sequelize: ORM for managing PostgreSQL database.
JWT: Used for authentication.
