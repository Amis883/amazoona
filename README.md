
![amazona](https://github.com/user-attachments/assets/b4a3020a-1eab-4031-98dd-22e438242dd0)

##React + MERN - Build E-Commerce Website

This project is a full-stack e-commerce application built using the MERN stack (MongoDB, Express.js, React, Node.js).
It is inspired by Amazon and includes features like product listing, shopping cart, user authentication, and admin dashboard.


##Demo Website

 Render: https://amazona.onrender.com

##Run Locally
 1. Clone Repo
git clone git@github.com:amis883/amazoona.git
cd amazoona

2. Create .env File

Duplicate .env.example from the backend folder and rename it to .env.

Update the variables inside according to your MongoDB setup.

3. Setup MongoDB

Local MongoDB
Install from MongoDB Community Server In .env, set:
MONGODB_URI=mongodb://localhost/amazoona


Cloud MongoDB (Atlas)
Create a free cluster at MongoDB Atlas In .env, set:
MONGODB_URI=mongodb+srv://your-db-connection

4. Run Backend
   cd backend
npm install
npm start

5. Run Frontend
bash
Copy code
# open new terminal
cd frontend
npm install
npm start

6. Seed Users and Products
Visit: http://localhost:5000/api/seed
This will generate:
Admin account (email & password shown in response)

6 sample products

7. Admin Login
Visit: http://localhost:3000/signin
Enter the admin email & password from the seed data.

 Support
Author: Hoda
