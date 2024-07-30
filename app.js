// const express = require("express");
// const bodyParser = require("body-parser");
// const mongoose = require("mongoose");
// const User = require("./models/user");
// const Attendance = require("./models/attendance");

// const app = express();
// app.use(bodyParser.json());

// server.js
const express = require("express");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "ajibolafareedah02@gmail.com",
    pass: "fainptdzrfcmkxbm ",
  },
});

mongoose.connect(
  "mongodb+srv://faa:u18cps1005@atlascluster.uyrfcoq.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// CREATE API
app.post("/users/sign_up", async (req, res) => {
  // Configure the mailoptions object

  // const mailOptions = {
  //   from: '"fareedah" <ajibolafareedah02@gmail.com>',
  //   to: "ajibolafareedah02@gmail.com",
  //   subject: "Sending Email using Node.js",
  //   text: "That was easy!",
  // };

  // Send the email
  transporter.sendMail(req.body, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
  // // async..await is not allowed in global scope, must use a wrapper
  // async function main() {
  //   // send mail with defined transport object
  // const info = await transporter.sendMail({
  //   from: '"fareedah" <ajibolafareedah02@gmail.com>', // sender address
  //   to: "dbupanyiam@gmail.com, baz@example.com", // list of receivers
  //   subject: "Hello ✔", // Subject line
  //   text: "Hello world?", // plain text body
  //   // html: "<b>Hello world?</b>", // html body
  // });

  //   console.log("Message sent: %s", info.messageId);
  //   // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
  // }
  // main().catch(console.error);
  try {
    const userData = req.body;

    const info = await transporter.sendMail({
      from: `fareedah ${userData?.from}`, // sender address
      to: `${userData?.to}`, // list of receivers
      subject: `${userData?.subject}`, // Subject line
      text: `${userData?.text}`, // plain text body
      // html: "<b>Hello world?</b>", // html body
    });

    // const newUser = new User(userData);
    // await newUser.save();
    res.status(201).json({ message: "User added successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add user", error: error.message });
  }
});

// GET API
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch users", error: error.message });
  }
});

// EDIT API
app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const userData = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(id, userData, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update user", error: error.message });
  }
});

// DELETE API
app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Find the user by ID and delete it
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User deleted successfully", user: deletedUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete user", error: error.message });
  }
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
