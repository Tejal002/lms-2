import express from "express";
import cors from "cors";
import chalk from "chalk";
import userRoutes from "./routes/userRoutes.js";
import courseRoutes from "./routes/courseRoutes.js"
import lectureRoutes from "./routes/lectureRoutes.js"
import cookieParser from "cookie-parser";
import enrollmentRoutes from "./routes/enrollmentRoutes.js";
import { connect, disconnect } from "./db.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cors()--remaining
app.use(cors({
    origin: process.env.FRONTNED_URL,
    credentials: true
}));
app.use(cookieParser());
app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/lectures", lectureRoutes);
app.use("/api/enrollment", enrollmentRoutes);

app.use((err, req, res, next) => {
    if (err) {
        res.status(500).send({
            Error: {
                Error: "Failed to Process!",
                info: err.message
            },
            Data: null
        })
    }
})

app.listen(process.env.PORT, async (req, res) => {
    console.log(`App is listening on the port ${process.env.PORT}`);
    await connect(process.env.CONNECTION_STRING,{
        dbName: "lms", 
    });
})

process.on("SIGINT", async () => {
    console.log(chalk.redBright("Received SIGNINT..!Shutting down server grcefully!"));
    await disconnect();
    app.close();
    process.exit()
})
