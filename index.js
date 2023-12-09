const  express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

const port = process.env.PORT || 3000;

const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;

mongoose.connect(`mongodb+srv://adsunnyyadav:8wcUxtN9YXQgcZMX@cluster0.5d0ofcj.mongodb.net/?retryWrites=true&w=majority`,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


//registration Schema
const registrationSchema = new mongoose.Schema({
    name : String,
    email :String,
    password :String

});

//model of registration Schema
const  Registration = mongoose.model("Registration", registrationSchema);

app.use(bodyParser.urlencoded({ extended:true}));
app.use(bodyParser.json());

app.get("/" , function(req , res){
    res.sendFile(__dirname + "/pages/index.html");

});

app.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const registrationData = new Registration({
            name,
            email,
            password,
        });
        await registrationData.save();
        res.redirect("/success");

  
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/success", (req,res)=>{
    res.sendFile(__dirname+"/pages/success.html");
})

app.get("/error", (req, res)=>{
    res.sendFile (__dirname +"/pages/error.html");
})

app.listen(port, ()=>{
    console.log(`server is running on port ${port}`);


});
