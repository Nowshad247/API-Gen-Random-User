const expree = require("express");
const cors = require("cors");
const bp = require("body-parser");
const app = expree();
const port = 5050;
const userRoutes = require("./routes/v1/userRoutes.route");

app.use(cors());
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json("Server is runing on the Home route ");
});

app.use("/api/v1/user", userRoutes);

app.use("*", (req, res) => {
  res.send("No Result Found");
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
