// HINTS:
// 1. Import express and axios

// 2. Create an express app and set the port number.

// 3. Use the public folder for static files.

// 4. When the user goes to the home page it should render the index.ejs file.

// 5. Use axios to get a random secret and pass it to index.ejs to display the
// secret and the username of the secret.

// 6. Listen on your predefined port and start the server.

import express from "express";
import axios from "axios";
const app = express();
const port = 3000;
app.use(express.static("public"));
const API_URL="https://secrets-api.appbrewery.com/random"


app.get("/",async(req,res)=>{
    try {
        const result=await axios.get(API_URL);
        const user = result.data.username;
const secret = result.data.secret;
        
        res.render("index.ejs",{user:user,secret:secret});
        

        console.log(secret,user);
        
    } catch (error) {
          const statusCode = error.response?.status || 500;
  const errorData = error.response?.data || { message: error.message || "Server Error" };
  
  console.error("Error caught:", errorData);
  res.status(statusCode).json(errorData);

        
    }
})
app.listen(port,()=>{
    console.log(`server running on port no:${port}`);

})



