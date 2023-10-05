// const express = require("express")
// const apiRoute = require("./Routes/ApiRoutes")
// const app = express()
// const PORT = 8080 
// const cors = require("cors")
// app.use(cors())
// app.use("/",apiRoute)

// app.listen(PORT,()=>{
//     console.log(`server is running on ${PORT}`)
// })

const express = require("express")
const { MongoClient } = require('mongodb');
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const app = express()
const PORT = 8080
app.use(express.json())
app.use(cors())

const MONGOURL = "mongodb://0.0.0.0:27017/"
const client = new MongoClient(MONGOURL)

const connectDB = async () => {
    try {
        await client.connect()
        console.log("MONGODB CONNECTED")
        return client
    } catch (error) {
        console.log(error.message)
    }
}
connectDB()

let DataBase = client.db("foodsdatabase").collection("foods")

app.get("/", (req, res) => {
      res.send("HELLOW BACKEND")
 })

app.get("/post", async (req, res) => {
    const result = await DataBase.find().toArray();
    res.status(200).json(result)

})

app.post("/post", async (req, res) => {
    const Post = req.body;
    const result = await DataBase.insertOne(Post);
    res.send(result);
})



app.post("/posts", async (req, res) => {
    const Post = req.body;
    const result = await DataBase.insertMany(Post);
    res.send(result);
})



require('./userDetails')
const User = mongoose.model("UserInfo")

app.post('/register',async (req,res)=>{
    // const fName = req.body;
    // const lName = req.body;
    // const email = req.body;
    // const password = req.body;
    const { fName,lName, email, password } = req.body;
    try {
        // await User.create({
        //     fName,
        //     lName,
        //     email,
        //     password
        // })
        // res.send("ok")
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Email or username already exists' });
    }
   
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
})



app.listen(PORT, () => {
    console.log("server is running")
})


































































// const express = require("express")
// const app = express()
// const cors = require("cors")
// app.use(cors())
// const parser = require("body-parser")
// const bodyParser = require("body-parser")
// app.use(bodyParser.json())
// const bycrypt = require("bcrypt")
// const arr = []

// const mid = (req,res,next)=>{
//     const payload = req.body;
//     if(payload.name && payload.email){
//         next()
//     }else{
//         res.send("NOT FOUND")
//     }

// }
// app.get("/",mid,(req,res)=>{
//     res.send("hellow")
// })
// app.post("/cart",async(req,res)=>{
//       const saltround = 10
//       const name = req.body.name
//       const email = req.body.email
//       const pwd = req.body.pwd

//       const hashpwd = await bycrypt.hash(pwd,saltround)
//       const result = {
//         name:name,
//         email:email,
//         pwd:hashpwd
//       }
//       arr.push(result)
//       res.send(arr)
// })
// app.listen(5000,console.log("server is running on port 5000"))