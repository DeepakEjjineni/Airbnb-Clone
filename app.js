if (process.env.NODE_ENV != "production") {
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

// ✅ FIX 1: Use MONGO_URI env variable (not hardcoded local URL)
const MONGO_URL = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/GlobeTrotter';

main().then(() => {
    console.log("connected to db");
}).catch((err) => {
    console.log("error occurred in db connection", err);
});

async function main() {
    await mongoose.connect(MONGO_URL);
}

// CORS configuration
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}));

// Middleware setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);

// ✅ FIX 2: Single clean session config (removed duplicate)
const sessionOptions = {
    secret: process.env.SESSION_SECRET || "fallbacksecret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: MONGO_URL }),
    cookie: {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
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

// Flash middleware
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

// Import route files
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

// Routes
app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

// Current user endpoint
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

// Demo user route
app.get("/demouser", async (req, res) => {
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

// 404 handler
app.use((req, res, next) => {
    next(new expressError(404, "Page not Found"));
});

// Error handling middleware
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong" } = err;
    res.status(statusCode).json({
        success: false,
        error: message,
        statusCode: statusCode
    });
});

// ✅ FIX 3: Single app.listen using PORT env variable
const PORT = process.env.PORT || 9494;
app.listen(PORT, () => {
    console.log(`GlobeTrotter API listening on port ${PORT}`);
});