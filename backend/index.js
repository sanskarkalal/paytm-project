const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const router = require("./routes/index");

app.use("/api/v1", router);


console.log("listening on 3000");
app.listen(3000);
