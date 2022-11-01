const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xssClean = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");
const bodyParser = require("body-parser");

// Handling uncaught exception
process.on("uncaughtException", (err) => {
	console.log(`Error: ${err.message}`);
	console.log("Shutting down due to uncaught exception");
	process.exit(1);
});

const connectDatabase = require("./config/database");
const errorMiddleware = require("./middlewares/errors");
const ErrorHandler = require("./utils/errorHandler");

// setting up config env files variables
dotenv.config({ path: "./config/config.env" });

// connect to DB
connectDatabase();

// Setup body parser
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

// Setup security headers
app.use(helmet());

// Setup body parser
app.use(express.json());

// Set cookie parser
app.use(cookieParser());

// Handle file uploads
app.use(fileUpload());

// Sanitize Data
app.use(mongoSanitize());

// Prevent XSS attacks
app.use(xssClean());

// Prevent Parameter Pollution
app.use(
	hpp({
		whitelist: ["positions"],
	})
);

// Rate Limiting
const limiter = rateLimit({
	windowMs: 10 * 60 * 1000, // 10 minutes
	max: 100,
});

// Setup CORS - Accesible by others domains
app.use(cors());

app.use(limiter);

// Import all routes
const jobs = require("./routes/jobs");
const users = require("./routes/auth");
const user = require("./routes/user");

app.use(process.env.API_ROUTE_V1, jobs);
app.use(process.env.API_ROUTE_V1, users);
app.use(process.env.API_ROUTE_V1, user);

// Handle unhandled routes
app.all("*", (req, res, next) => {
	next(new ErrorHandler(`${req.originalUrl} route not found`, 404));
});

// Middleware to handle errors
app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
	console.log(
		`Server started on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`
	);
});

// Handle unhandled promise rejection
process.on("unhandledRejection", (err) => {
	console.log(`Error ${err.message}`);
	console.log("Shutting down the server due to unhandled promise rejection.");
	server.close(() => {
		process.exit(1);
	});
});
