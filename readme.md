# 🌍 GlobeTrotter

A full-stack Airbnb-inspired travel listing platform where users can discover, create, and review travel stays around the world.

![Node.js](https://img.shields.io/badge/Node.js-18.x-green?logo=node.js)
![Express](https://img.shields.io/badge/Express-5.x-lightgrey?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-green?logo=mongodb)
![EJS](https://img.shields.io/badge/Template-EJS-yellow)
![Cloudinary](https://img.shields.io/badge/Images-Cloudinary-blue?logo=cloudinary)

---

## 📌 Features

- 🔐 **User Authentication** — Register, login, and logout using Passport.js with local strategy
- 🏠 **Listing CRUD** — Create, read, update, and delete travel stay listings
- 📸 **Image Uploads** — Upload listing images directly to Cloudinary via Multer
- ⭐ **Reviews** — Authenticated users can post and delete reviews on listings
- 🔒 **Authorization** — Only listing/review owners can edit or delete their content
- ✅ **Server-side Validation** — Input validation using Joi schemas
- 💬 **Flash Messages** — User-friendly success and error notifications
- 📱 **Responsive UI** — Built with Bootstrap 5 for mobile-friendly layouts

---

## 🛠 Tech Stack

| Layer      | Technology                          |
|------------|--------------------------------------|
| Runtime    | Node.js                              |
| Framework  | Express.js                           |
| Database   | MongoDB + Mongoose                   |
| Auth       | Passport.js + passport-local-mongoose|
| Templating | EJS + EJS-Mate (layouts)             |
| Storage    | Cloudinary + Multer                  |
| Validation | Joi                                  |
| Styling    | Bootstrap 5                          |
| Sessions   | express-session + connect-flash      |

---

## 📁 Project Structure

```
GlobeTrotter/
├── controllers/         # Route handler logic (MVC controllers)
├── models/              # Mongoose data models
├── routes/              # Express route definitions
├── views/               # EJS templates
│   └── layouts/         # EJS-Mate layout files
├── public/              # Static assets (CSS, JS, images)
├── utils/               # Helper utilities (error handler, async wrapper)
├── init/                # Database seed data
├── globetrotter-frontend/  # React frontend (separate app)
├── middleware.js        # Custom middleware (auth, validation)
├── cloudConfig.js       # Cloudinary configuration
├── schema.js            # Joi validation schemas
├── app.js               # Express app entry point
├── .env.example         # Environment variable template
└── package.json
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- A [Cloudinary](https://cloudinary.com/) account

### 1. Clone the Repository

```bash
git clone https://github.com/DeepakEjjineni/GlobeTrotter.git
cd GlobeTrotter
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory using the template below:

```bash
cp .env.example .env
```

Fill in your values:

```env
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
SESSION_SECRET=your_session_secret_key
MONGO_URI=mongodb://localhost:27017/globetrotter
```

### 4. Seed the Database (Optional)

```bash
node init/index.js
```

### 5. Run the App

```bash
# Development (with nodemon)
npm run dev

# Production
npm start
```

Visit: [http://localhost:3000](http://localhost:3000)

---

## 🔐 Environment Variables

| Variable          | Description                          |
|-------------------|--------------------------------------|
| `CLOUD_NAME`      | Cloudinary cloud name                |
| `CLOUD_API_KEY`   | Cloudinary API key                   |
| `CLOUD_API_SECRET`| Cloudinary API secret                |
| `SESSION_SECRET`  | Secret key for express-session       |
| `MONGO_URI`       | MongoDB connection string            |

> ⚠️ **Never commit your `.env` file.** It is already listed in `.gitignore`.

---

## 🚀 Deployment

- **Backend:** [Render](https://render.com) / [Railway](https://railway.app)
- **Database:** [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **Images:** Cloudinary (already integrated)

Set all environment variables in your hosting platform's dashboard before deploying.

---

## 👤 Author

**Deepak Ejjineni**
- GitHub: [@DeepakEjjineni](https://github.com/DeepakEjjineni)

---

## 📄 License

This project is open source and available under the [ISC License](LICENSE).