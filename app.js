const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const db = require("./config/db");
const allRoutes = require("./routes");
const authMiddleware = require("./middlewares/auth");

db.then(() => {
  console.log("Berhasil Terkoneksi");
})
.catch(() => {
  console.log("Gagal Terkoneksi");
});

app.use(express.json());
app.use("/", allRoutes); 
app.listen(PORT, () => {
  console.log("server running on port " + PORT);
});