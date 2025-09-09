import express from "express";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import { User } from "../models/user.model.js";

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// POST /api/auth/google
router.post("/google", async (req, res) => {
  try {
    const { token } = req.body;
    // console.log("Received token:", token);
    if (!token) {
      return res.status(400).json({ message: "No token provided" });
    }
    // Verify token with Google
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();

    // Extract user info
    const { sub, email, name, picture } = payload;

    // Check if user exists, else create
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({
        fullName: name,
        email,
        password: null, // not needed
        googleId: sub,
        profileImage: picture,
      });
      await user.save();
    }

    // Generate your JWT
    const jwtToken = jwt.sign(
      { id: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.json({
      accessToken: jwtToken,
      user,
    });
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Google authentication failed" });
  }
});

export default router;
