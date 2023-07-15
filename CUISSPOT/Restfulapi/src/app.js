const express = require("express");
require("./db/conn");

const Food = require("./models/Foods")
const app = express();
var cors = require('cors')
app.use(cors())
app.use(express.json());
const port = process.env.PORT || 3000;

app.get("/", (req,res)=>{
    res.send("Hello from other side")
})

app.use(express.json());

app.post("/food",async(req,res)=> {
   // console.log(req.body);
   // const user = new Food(req.body);
   // user.save().then(()=>{
   //     res.send(user);
   // }).catch((e) => {
   //    res.send(e);
   // })
   //  res.send("Hello from other sides.");

   try{
    const user = new Food(req.body);
    const createUser = await user.save();
    res.json(createUser);
   }  
   catch(e){res.json(e);}
})

app.get("/food", async(req,res) => {
    try{
        const Fooddata = await Food.find({});
        res.json(Fooddata);
    }
    catch(e){res.json(e);}
})

// app.get("/food/:mealName", async(req,res)=>{

// })

app.listen(port, () => {
    console.log(`connection is setup ${port}`);
})