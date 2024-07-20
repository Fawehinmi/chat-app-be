const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require('./routes/userRoutes')
const chatRoutes = require('./routes/chatRoutes')
const {notFound, errorHandler} = require('./middleware/errorMiddleware')

const app = express();
dotenv.config();
connectDB()
app.use(express.json())

app.get("/", (req, res) => {
  res.send("Api is running");
});

app.use('/api/user', userRoutes)
app.use('/api/chat', chatRoutes)


app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000;

app.listen(5000, console.log(`app started on ${PORT}`));
