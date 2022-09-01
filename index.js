const express= require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const app = express();
const port=process.env.PORT || 5000;


//middleware 
const cors=require("cors")
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.yxlplna.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        await client.connect();
       const carCollection = client.db("theCarDoctor").collection("services");
       const expertsCollection = client.db("theCarDoctor").collection("experts");

        // Get services data
        app.get("/services", async (req, res) => {
            const query={};
            const cursor=carCollection.find(query);
            const service= await cursor.toArray();
            res.send(service);
        })
        // Get experts data
        app.get("/experts", async (req, res) => {
            const query={};
            const cursor=expertsCollection.find(query);
            const experts= await cursor.toArray();
            res.send(experts);
        })


        // Get spicepic data
        app.get("/services/:id",async (req, res) => {
            const id=req.params.id;
            const query={_id:ObjectId(id)};
            const service =await carCollection.findOne(query);
            res.send(service);
        })
    }finally{

    }
}
run().catch(console.dir)




app.listen(port,()=>{
    console.log("listing on port",port)
})