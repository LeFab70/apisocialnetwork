const express = require("express");
const dotenv = require("dotenv");
const bodyparse = require("body-parser");
const morgan = require("morgan");
require("./config/db.js");
const userRoutes = require("./routes/user.routes");
dotenv.config({ path: "./config/.env" });
const PORT = process.env.PORT || 8080;

const app = express();
app.use(bodyparse.json());
app.use(bodyparse.urlencoded({ extended: true }));
app.use(morgan("tiny"));
//routes
app.use("/api/user", userRoutes);

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
