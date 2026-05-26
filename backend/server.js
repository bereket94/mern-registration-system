const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/studentDB")
    .then(() => console.log("MongoDb Connected"))
    .catch(err => console.log(err));

const studentschema = new mongoose.Schema({
    fname: String,
    mname: String,
    lname: String,
    age: Number,
    id: Number,
    gender: String,
    department: String,
    email: String,
    address: String,
    image: String,
    hobbies: {
        reading: Boolean,
        music: Boolean,
        sports: Boolean
    },
    comment: String
});

const Student = mongoose.model("student", studentschema);
app.post("/addstudent", async (req, res) => {
    try {
        const newStudent = new Student(req.body);
        await newStudent.save();
        res.json({ message: "Student added successfully" });
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({
                error: "Id already exists. Duplication is not allowed"
            });
        }

        res.status(500).json({ error: err.message });
    }
}); 

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});