import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';

const router = Router();

// In-memory user store (replace with a database in production)
const users: any = [];

router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user already exists
    if (users.find((u: any) => u.username === username)) {
      return res.status(400).send({ message: "Username already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = { id: uuidv4(), username, password: hashedPassword };
    users.push(newUser);

    // Generate a JWT token
    const token = jwt.sign({ userId: newUser.id }, "your-secret-key", { expiresIn: "1h" });

    // Set the JWT token as a cookie
    res.cookie("token", token, { httpOnly: true, secure: true, sameSite: 'strict' });

    res.status(201).send({ message: "User created successfully", token });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Failed to create user" });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user
    const user = users.find((u: any) => u.username === username);

    if (!user) {
      return res.status(401).send({ message: "Invalid credentials" });
    }

    // Verify the password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).send({ message: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user.id }, "your-secret-key", { expiresIn: "1h" });

    // Set the JWT token as a cookie
    res.cookie("token", token, { httpOnly: true, secure: true, sameSite: 'strict' });

    res.status(200).send({ message: "User signed in successfully", token });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Failed to sign in" });
  }
});

export default router;