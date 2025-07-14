import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/", async (req, res) => {
  try {
    const result = await axios.get("https://secrets-api.appbrewery.com/random");
    res.render("index.ejs", {
      secret: result.data.secret,
      user: result.data.username,
    });
  } catch (error) {
  const statusCode = error.response?.status || 500;
  const errorData = error.response?.data || { message: error.message || "Server Error" };
  
  console.error("Error caught:", errorData);
  res.status(statusCode).json(errorData);
}

});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
