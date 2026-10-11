// app.js
const express = require("express");
const cors = require("cors");
const os = require("os");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const cartRoutes = require("./routes/cartRoutes");
const userToken = require("./routes/userTokenRoute")

const app = express();

app.use(cors());
app.use(express.json());

// Connect to the database

// Shallow health check for the load balancer (does not touch the database)
app.get("/api/health", (req, res) => {
    res.json({
        status: "ok",
        instanceId: process.env.INSTANCE_ID || os.hostname(),
        availabilityZone: process.env.AVAILABILITY_ZONE || "unknown",
        hostname: os.hostname(),
    });
});

// Mount routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/token", userToken)

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
