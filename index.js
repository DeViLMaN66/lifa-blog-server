const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

const PORT = process.env.PORT || 5000
app.use(cors())

dotenv.config({ path: "./config.env" });
app.use(express.json());
app.use("/images", express.static(path.join(__dirname,"/images")));

mongoose.connect(process.env.MONGO_URL,{
})
.then(console.log("Connected to MongoDB"))
.catch((err) => console.log(err));

const storage = multer.diskStorage({
	destination:(req, file, cb) => {
		cb(null, "images");
	}, filename:(req, file, cb) => {
		cb(null, req.body.name);
	},
});

const upload = multer({storage:storage});
app.post("/API/upload", upload.single("file"), (req,res) => {
	res.status(200).json("File has been uploaded")
});

app.use("/API/auth", authRoute);
app.use("/API/users", userRoute);
app.use("/API/posts", postRoute);
app.use("/API/categories", categoryRoute);

app.listen(PORT, ()=>{
	console.log("Backend is running.")
});