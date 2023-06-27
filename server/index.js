const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connectDb = require("./config/db");
const genreRouter = require("./router/Genre");
const movieRoter = require("./router/Movie");
const userRouter = require("./router/user");
const { notificationRouter } = require("./router/notification");
const { errorHandle } = require("./middleware/errorHandle");

const app = express();
//const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];
//app.use(cors({ origin: allowedOrigins }));
app.use(cors());

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (!origin || allowedOrigins.indexOf(origin) !== -1) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//   })
// );
app.use(express.json());
app.use(express.static("public"));
connectDb();

app.use("/api/genre", genreRouter);

app.use("/api/movie", movieRoter);

app.use("/api/user", userRouter);

app.use("/api/notification/sse", notificationRouter);

app.use(errorHandle);

const PORT = process.env.PORT || 3457;
app.listen(PORT, () => console.log("server started at " + PORT));
