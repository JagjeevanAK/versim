import express from "express";
import cors from "cors";
import routes from "./routes";
import authRoutes from "./routes/auth";

const app = express();
const port = process.env.PORT;

app.use(cors({
    exposedHeaders: ['X-Sandbox-URL', 'X-Sandbox-ID']
}));
app.use(express.json());

app.use("/", routes);
app.use("/auth", authRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
