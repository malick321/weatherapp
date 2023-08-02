const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5002;

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

// Use middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose
  .connect("mongodb+srv://munibmcs56:5656780@cluster0.hll7qet.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

// Define schema and model for users
const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

// Define endpoint to create a new user
app.post("/users", async (req, res) => {
    try {
      const {Signemail, Signpassword, confirmPassword } = req.body;
      console.log("Signpassword:", Signpassword);
      console.log("confirmPassword:", confirmPassword);

      // Check if password and confirm password match
      if (Signpassword !== confirmPassword) {
        console.log("not equal")
        return res.status(400).json({ error: "Password and confirm password do not match" });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(Signpassword, 10);
      console.log(hashedPassword)
      // Create a new user with the hashed password
      const newUser = new User({
        email: Signemail,
        password: hashedPassword,
      });
  
      // Save the user to the database
      await newUser.save();
     console.log("user created successfully")
      res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  

// Start the server
app.listen(port, () => console.log(`Server started listening at ${port}...`));
