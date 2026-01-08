const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
require("./conn/conn");
const User = require("./routes/user");
const Books = require("./routes/book");
const Favourites = require("./routes/favourite");
const Cart = require("./routes/cart");
const Order = require("./routes/order");
const AI = require("./routes/ai"); 
const bookRequestRoute = require("./routes/bookRequest");



app.use(cors({
  origin: ["https://bookverse-ashik.netlify.app"], // frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

//routes
app.use("/api/v1", User);
app.use("/api/v1", Books);
app.use("/api/v1", Favourites);
app.use("/api/v1", Cart);
app.use("/api/v1", Order);
app.use("/api/ai", AI); 
app.use("/api/book-request", bookRequestRoute);

//creating port
app.listen(process.env.PORT, () => {
    console.log(`Server Started at port ${process.env.PORT}`);
});

