if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}

const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const expressError = require("./utils/expressError.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const cors = require("cors");
const MongoStore = require('connect-mongo');

const PORT = process.env.PORT || 9494;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Import route files
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

const Mongo_URL = 'mongodb://127.0.0.1:27017/GlobeTrotter';

main().then(() => {
    console.log("connected to db");
}).catch((err) => {
    console.log("error occurred in db connection");
})

async function main() {
    mongoose.connect(Mongo_URL);
}

// CORS configuration - IMPORTANT for React frontend
app.use(cors({
    origin: 'http://localhost:3000', // React dev server
    credentials: true // Allow cookies
}));

// Middleware setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Parse JSON bodies
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// View engine setup (keep for backward compatibility or admin panel)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);

// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: {
      httpOnly: true,
      expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // 1 week
      maxAge: 1000 * 60 * 60 * 24 * 7
    }
  }));

  const sessionOptions = {
    secret: process.env.SESSION_SECRET || "fallbacksecret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: {
      httpOnly: true,
      expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
      maxAge: 1000 * 60 * 60 * 24 * 7
    }
  };

app.use(session(sessionOptions));
app.use(flash());

// Passport configuration
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Flash middleware - make flash messages available to all responses
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

// API Routes for React frontend
app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

// Get current user endpoint (for React auth check)
app.get("/currentuser", (req, res) => {
    if (req.isAuthenticated()) {
        res.json({ 
            success: true,
            user: {
                _id: req.user._id,
                username: req.user.username,
                email: req.user.email
            }
        });
    } else {
        res.status(401).json({ 
            success: false,
            user: null 
        });
    }
});

// Demo user route (optional - for testing)
app.get("/demouser", async(req, res) => {
    try {
        let fakeUser = new User({
            email: `student${Date.now()}@gmail.com`,
            username: `student${Date.now()}`,
        });
        let registeredUser = await User.register(fakeUser, "password2");
        res.json({ 
            success: true,
            message: "Demo user created",
            user: registeredUser 
        });
    } catch (err) {
        res.status(500).json({ 
            success: false,
            error: err.message 
        });
    }
});

// Root route
app.get("/", (req, res) => {
    res.json({ 
        message: "GlobeTrotter API",
        version: "1.0.0",
        endpoints: {
            listings: "/listings",
            login: "/login",
            signup: "/signup",
            currentUser: "/currentuser"
        }
    });
});

// 404 handler - catches all unmatched routes
app.use((req, res, next) => {
    next(new expressError(404, "Page not Found"));
});

// Error handling middleware
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong" } = err;
    
    // Return JSON for API errors
    res.status(statusCode).json({
        success: false,
        error: message,
        statusCode: statusCode
    });
});

app.listen(port, () => {
    console.log(`GlobeTrotter API listening on port ${port}`);
    console.log(`Frontend should run on http://localhost:3000`);
    console.log(`Backend API: http://localhost:${port}`);
});