import express from "express";
import {MongoClient ,ObjectId} from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URL = process.env.MONGO_URL || "mongodb+srv://deepikaarugalla_db_user:CTwGuWP9yQWmDb3p@cluster0.wvbmzxj.mongodb.net"; //connecting to mongodb server
const dbName = process.env.DB_NAME || "booksDB";

const client = new MongoClient(MONGO_URL);
let db;

client.connect().then(() => {
    db=client.db(dbName);
    console.log(`Connected to database:${dbName}`);
}).catch((err) => {
    console.error("Error connecting to database:", err);
});

const app = express();
app.use(express.json());

// Root health check route
app.get("/", (req, res) => {
    res.status(200).json({ message: "Books API is running" });
});

//CURD
//create POST http://localhost:8080/api/v1/books
//payload: { "title", "author", "Category", "price"}
app.post("/api/v1/books",  (req, res, next) => {
    const body = req.body;
    db.collection("books").insertOne(body).then((result) => {
        res.status(201).json({ message: "Book created successfully", data:{ _id: result.insertedId } });
    }).catch((err) => {
        console.error("Error creating book:", err);
        res.status(500).json({ message: "Error creating book" });
    });
});

//Read GET http://localhost:8080/api/v1/books
app.get("/api/v1/books", async (req, res, next) => {
    const {category}=req.query;
    const query=category?{category}:{}; //if category is present then filter by category else return all books
    db.collection("books").find(query).toArray().then((result) => {
        res.status(200).json({message:"Books fetched successfully","data":result});
    }).catch((err) => {
        res.status(500).json({ message: "Problem in fetching books", error: err.message });
    });
});

//get a book by id
app.get("/api/v1/books/:id", (req, res, next) => {
    const {id}=req.params;
    db.collection("books").findOne({_id:new ObjectId(id)}).then((result) => {
        if(!result){
            res.status(404).json({"message":"book not found"});
        }else{
            res.status(200).json({"message":"Book fetched successfully","data":result});
        }
    }).catch((err) => {
        res.status(500).json({ message: "Problem in fetching book details", error: err.message });
    });
} );

//update the book by id
app.put("/api/v1/books/:id", (req,res, next)=>{
    const {id}=req.params;
    const updateData=req.body;
    db.collection("books").updateOne({_id:new ObjectId(id)},{$set:updateData}).then((result)=>{
        if(result.matchedCount===0){
            res.status(404).json({"message":"book not found"});
        }else{
            res.status(200).json({"message":"Book updated successfully"});
        }
    }).catch((err)=>{
        res.status(500).json({ message: "Problem in updating book details", error: err.message });
    });
})

//delete the book by id
app.delete("/api/v1/books/:id",(req,res, next)=>{
    const {id}=req.params;
    db.collection("books").deleteOne({_id:new ObjectId(id)}).then((result)=>{
        if(result.deletedCount===0){
            res.status(404).json({"message":"book not found"});
        }else{
            res.status(200).json({"message":"Book deleted successfully"});
        }
    }).catch((err)=>{
        res.status(500).json({ message: "Problem in deleting book details", error: err.message });
    });
});

//Error handling middleware
app.use((err, req, res, next) => {
    err.message = err.message || "Internal Server Error";
    res.status(500).json({ message: err.message });
});

//404 handler middleware
app.use((req, res, next) => {
    res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
});