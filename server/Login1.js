const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const generateSecretKey = () => {
  return crypto.randomBytes(64).toString("hex");
};

const secretKey = generateSecretKey();
console.log(`Your secret key is: ${secretKey}`);


const app = express();
const port = process.env.PORT || 5001;

// Use middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect("mongodb+srv://munibmcs56:5656780@cluster0.hll7qet.mongodb.net/?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected...")).catch((err) => console.log(err));

// Define schema and model for users
const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});


const User = mongoose.model("User", userSchema);

// Set up CORS
const whitelist = ["http://localhost:3000"]; // Add the URL of your client-side application here
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
app.use(cors(corsOptions));

// Define login endpoint
app.post("/login", (req, res) => {
  console.log("Received login request");
  const { email, password } = req.body;

  if (!email || !password) {
    console.log("Email password not matched")
    return res.status(400).json({ error: "Email and password are required" });
  }
  User.find().then(users => console.log(users));


  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        console.log("user not found")
        return res.status(400).json({ error: "User not found. Please sign up." });
        
      } else {
        console.log(user);
        bcrypt.compare( password ,user.password, (err, result) => {
          if (err || !result) {
            console.log("Invalid Credentials")
            console.log("Password:", password);
            console.log("User Password:", user.password);
            res.status(401).json({ error: "Invalid credentials" });
          } else {
            const token = jwt.sign(
              { email: user.email, id: user._id },
              secretKey,
              { expiresIn: "1h" }
            );
            console.log(token)
            res.status(200).json({ token: token });
          }
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    });
});

// Start the server
app.listen(port, () => console.log(`Server started listening at ${port}...`));
