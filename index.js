import express from 'express'
import dbConnection from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js'

const app = express();
const PORT = 4100;

dbConnection();

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes)
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to Mongoose Store");
});

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});
