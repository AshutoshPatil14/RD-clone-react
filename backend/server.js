import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import mainRouter from "./routes/mainRouter.js";
import Product from "./models/productModel.js";

const app = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: ["https://rd-clone-react.vercel.app", "http://localhost:5173", "http://192.168.1.181:5173"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());

connectDB();

app.get("/", (req, res) => {
  res.send(`Welcome to Reliance Digital!`);
});

app.use("/api/v1", mainRouter);

// app.get("/test", async (req, res) => {
//   // res.status(200).json({ message: "Test route" });

//   try {
//     // const products = await Product.find({ color: { $eq: "blue" } });

//     // const products = await Product.find({ color: { $ne: "blue" } });

//     // const products = await Product.find({ price: { $gt: 200000 } });

//     // const products = await Product.find({ price: { $lt: 1000 } });

//     const products = await Product.find({ price: { $gt: 1000, $lt: 100000 } });

//     res.status(200).json(products);
//   } catch (err) {
//     res.status(500).json({ message: err });
//   }
// });

// app.get("/matching-grouping", async (req, res) => {
//   try {
//     const products = await Product.aggregate([
//       {
//         $match: {
//           color: "blue",
//           price: { $gt: 10000 },
//         },
//       },
//       {
//         $group: {
//           _id: "$category",
//           totalPrice: {
//             $sum: {
//               $multiply: ["$price", "$stock"],
//             },
//           },
//         },
//       },
//     ]);
//     res.status(200).json(products);
//   } catch (err) {
//     res.status(500).json({ message: err });
//   }
// });

app.get("/unwinding-project", async (req, res) => {
  try {
    const products = await Product.aggregate([
      {
        $project: {
          _id: 0,
          name: 1,
          stock: 1,
          price: 1,
        },
      },
    ]);
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
