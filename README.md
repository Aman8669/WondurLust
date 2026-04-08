# 🌍 Wonderlust

Wonderlust is a full-stack travel listing web application where users can explore, create, edit, and manage travel stay listings.  
It allows users to sign up, log in, upload listing images, add reviews, and securely manage their own listings.

## 🚀 Live Demo
🔗 https://wondurlust-dh5y.onrender.com

---

## 📌 Features

- 🔐 User Authentication (Signup / Login / Logout)
- 🏡 Create, Edit, and Delete Travel Listings
- 🖼️ Upload Listing Images using Cloudinary
- ⭐ Add and Delete Reviews
- 👤 Authorization for Listing Owners and Review Authors
- 🔎 Search Listings by Title, Location, or Country
- 📂 Filter Listings by Category
- 💬 Flash Messages for Better User Experience
- 🌐 Fully Deployed on Render

---

## 🛠️ Tech Stack

### Frontend
- HTML
- CSS
- Bootstrap
- EJS Templates

### Backend
- Node.js
- Express.js

### Database
- MongoDB Atlas
- Mongoose

### Authentication & Session
- Passport.js
- passport-local
- passport-local-mongoose
- express-session
- connect-mongo

### Image Upload
- Multer
- Cloudinary
- multer-storage-cloudinary

### Other Tools
- Joi (Validation)
- Method-Override
- Connect-Flash
- Dotenv

---

## 📁 Project Structure

major-project/
│
├── controllers/
├── model/
├── routes/
├── views/
├── public/
├── utils/
├── app.js
├── cloudConfig.js
├── middleware.js
├── schema.js
├── package.json
└── README.md


---
http://localhost:8080
🔐 Authentication & Authorization
Authentication

Users can:

Sign up
Log in
Log out
Authorization
Only logged-in users can create listings and reviews
Only the listing owner can edit or delete their listing
Only the review author can delete their review

---
🌐 Deployment

The project is deployed on Render.

Deployment Includes:
Render for hosting
MongoDB Atlas for cloud database
Cloudinary for image hosting

---

📚 Learning Outcomes

Through this project, I learned:

Building a full-stack web application using Node.js and Express
Designing RESTful routes and MVC architecture
Implementing user authentication and authorization
Working with MongoDB Atlas and Mongoose
Uploading and managing images with Cloudinary
Validating data using Joi
Deploying a production-ready app on Render

---
👨‍💻 Author

Aman Naikwade

GitHub: [https://github.com/Aman8669]
LinkedIn: ([https://www.linkedin.com/in/aman-naikwade-04331b308/])

```bash

git clone https://github.com/Aman8669/WondurLust.git
cd WondurLust



