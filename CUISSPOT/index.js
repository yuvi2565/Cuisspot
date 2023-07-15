const { MongoClient } = require('mongodb');

async function main() {
    // var num;
    // var axios = require('axios');
    // var data = JSON.stringify({
    //     "collection": "FoodData",
    //     "database": "LogInDB",
    //     "dataSource": "Cluster0",
    //     "projection": { 
    //         "_id":num,
    //         // "mealName": `${num.mealName()}`
    //     }
    // });
    // var config = {
    //     method: 'post',
    //     url: 'https://data.mongodb-api.com/app/data-wowga/endpoint/data/v1/action/findOne',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Access-Control-Request-Headers': '*',
    //         'api-key': '6Vdl1C5DCt9XO7Lz9cwVGWdHZoghygYhWLCZLdH4t1VojORjkPakdWt7n9nswpDv',
    //     },
    //     data: data
    // };
    // axios(config)
    //     .then(function (response) {
    //         console.log(JSON.stringify(response.data));
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     });
    
    var express = require("express")
    var bodyParser = require("body-parser")
    var mongoose = require("mongoose")
    const app = express();
    var db = mongoose.connection;
    const DB = "mongodb+srv://yuvraj:z10Vdokmycwpqox5@cluster0.gu3ajht.mongodb.net/LogInDB?retryWrites=true&w=majority"

    const client = new MongoClient(DB);
    // var LogInDB = null;
    var registers;

    var name;

    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
    app.use(bodyParser.json())
    app.use(express.static('public'))
    app.use(bodyParser.urlencoded({
        extended: true
    }))

    mongoose.connect(DB, connectionParams).then(() => {
        console.info("connected to the database");
    })
        .catch((e) => {
            console.log("Error occured: ", e);
        })


    app.post("/sign_up", (req, res) => {
        var name = req.body.username;
        var email = req.body.email;
        var phno = req.body.phno;
        var password = req.body.password;
        var cpassword = req.body.cpassword

        var data = {
            "name": name,
            "email": email,
            "phno": phno,
            "password": password,
            "cpassword": cpassword
        }
        if(password == "" || cpassword == "" || name=="" || email=="" || phno==""){
            res.send("Please fill out all the fields ")
            return res.redirect("form.html");
        }
        else 
        {
            if (password === cpassword) {
                db.collection('registers').insertOne(data, (err, collection) => {
    
                    if (err) {
                        console.log("Failed to insert into database due to: " + err);
                    }
                    else{ console.log("Record Inserted Successfully");}
                   
                    return res.redirect("Home.html")
                });
            }
    
            else {
                console.log("Passwords do not match");
                res.send("Passwords do not match")
                return res.redirect("form.html")
            }
        }


    })

    app.post("/login", async (req, res) => {
        try {
            const email = req.body.loginEmail;
            const password = req.body.loginPassword;
            console.log(`ID: ${email} and password: ${password}`);
            const useremail = await db.collection('registers').findOne({ email: email });
            console.log(useremail);

            if (useremail.password === password) {
                
                return res.redirect("Home.html");
            }
            else {
                res.send("Invalid email or password");
            }

            name = useremail.name;
        }
        catch (error) {
            console.log(error);
            res.status(400).send("Invalid email or password");
        }


    })

    // try {
    //     await listDatabases(client);
    // }
    // catch (error) {
    //     console.log(error);
    // }


    // app.get('/getData',async (req,res)=>{
    //     const d = await Coll.find();
    //     res.json(d);.
    // })

    app.get("/", (req, res) => {
        res.set({
            "Allow-access-Allow-Origin": '*'
        })
        return res.redirect("Home.html");
    }).listen(8000);

    app.get("/login", (req, res) => {
        res.render("Login.html");
    })

    console.log(`Listening on PORT 8000`);

}
main().catch(console.error);

// async function listDatabases(client) {
//     databasesList = await client.db().admin().listDatabases();
//     console.log("Databases:  ");

//     databasesList.databases.forEach(db => console.log(` -${db.name}`))
// }