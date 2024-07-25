const express = require("express");
const { MongoClient } = require("mongodb");
const bodyParser = require("body-parser");

const app = express();
const port = 4055;

app.use(bodyParser.urlencoded({ extended: true }));
const mongoUrl = "mongodb://localhost:27017";
const dbName = "mydatabase";
let db;

MongoClient.connect(mongoUrl)
    .then((client) => {
        db = client.db(dbName);
        console.log(`Connected to MongoDB: ${dbName}`);
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
        process.exit(1);
    });

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/insert", async (req, res) => {
    const { name, email, dob, address, phone } = req.body;
    if (!db) {
        res.status(500).send("Database not initialized");
        return;
    }
    try {
        await db.collection("items").insertOne({ name, email, dob, address, phone });
        console.log("Document inserted successfully");
        res.send(`
            <html>
            <head>
                <style>
                    body {
                        background-image: url('https://www.hdwallpapers.in/download/pink_cosmos_flowers_buds_blur_background_hd_pink_aesthetic-2560x1440.jpg');
                        background-size: cover;
                        text-align: center;
                        color: black;
                        font-family: Algerian, sans-serif;
                    }
                    a {
                        display: inline-block;
                        margin-top: 20px;
                        text-decoration: none;
                        padding: 10px 20px;
                        border: 2px solid white;
                        border-radius: 5px;
                        color: white;
                        background-color: rgba(0, 0, 0, 0.5);
                    }
                    a:hover {
                        background-color: rgba(0, 0, 0, 0.8);
                    }
                </style>
            </head>
            <body>
                <h1>Data inserted successfully</h1>
                <a href='/'>Back to form</a>
            </body>
            </html>
        `);
    } catch (err) {
        console.error("Error inserting data:", err);
        res.status(500).send("Failed to insert data");
    }
});

app.post("/update", async (req, res) => {
    const { name, email, dob, address, phone } = req.body;
    if (!db) {
        res.status(500).send("Database not initialized");
        return;
    }
    try {
        const result = await db.collection("items").updateOne(
            { name: name },
            { $set: { email, dob, address, phone } }
        );
        console.log("Number of documents updated: " + result.modifiedCount);
        console.log("Document updated successfully");
        res.send(`
            <html>
            <head>
                <style>
                    body {
                        background-image: url('https://www.hdwallpapers.in/download/pink_cosmos_flowers_buds_blur_background_hd_pink_aesthetic-2560x1440.jpg');
                        background-size: cover;
                        text-align: center;
                        color: black;
                        font-family: Algerian, sans-serif;
                    }
                    a {
                        display: inline-block;
                        margin-top: 20px;
                        text-decoration: none;
                        padding: 10px 20px;
                        border: 2px solid white;
                        border-radius: 5px;
                        color: white;
                        background-color: rgba(0, 0, 0, 0.5);
                    }
                    a:hover {
                        background-color: rgba(0, 0, 0, 0.8);
                    }
                </style>
            </head>
            <body>
                <h1>Data updated successfully</h1>
                <a href='/'>Back to form</a>
            </body>
            </html>
        `);
    } catch (err) {
        console.error("Error updating data:", err);
        res.status(500).send("Failed to update data");
    }
});

app.post("/delete", async (req, res) => {
    const { name } = req.body;
    if (!db) {
        res.status(500).send("Database not initialized");
        return;
    }
    try {
        const result = await db.collection("items").deleteOne({ name: name });
        console.log("Number of documents deleted: " + result.deletedCount);
        console.log("Document deleted successfully");
        res.send(`
            <html>
            <head>
                <style>                    
                body {
                    background-image: url('https://www.hdwallpapers.in/download/pink_cosmos_flowers_buds_blur_background_hd_pink_aesthetic-2560x1440.jpg');
                    background-size: cover;
                    text-align: center;
                    color: black;
                    font-family: Algerian, sans-serif;
                }
                a {
                    display: inline-block;
                    margin-top: 20px;
                    text-decoration: none;
                    padding: 10px 20px;
                    border: 2px solid white;
                    border-radius: 5px;
                    color: white;
                    background-color: rgba(0, 0, 0, 0.5);
                }
                a:hover {
                    background-color: rgba(0, 0, 0, 0.8);
                }
            </style>
        </head>
        <body>
            <h1>Data deleted successfully</h1>
            <a href='/'>Back to form</a>
        </body>
        </html>
    `);
} catch (err) {
    console.error("Error deleting data:", err);
    res.status(500).send("Failed to delete data");
}
});

app.get("/report", async (req, res) => {
    try {
        const items = await db.collection("items").find().toArray();
        console.log("Retrieved items:", items);

        let tableContent = `
            <!DOCTYPE html>
            <html lang='en'>
            <head>
                <meta charset='UTF-8'>
                <title>Report</title>
                <style>
                    body {
                        background-image: url('https://t3.ftcdn.net/jpg/04/87/74/22/360_F_487742206_kopZjYy0HeiSupV7zUFbubHHZkKMg092.jpg');
                        background-size: cover;
                        background-repeat: no-repeat;
                        color: white;
                        font-family: Arial, sans-serif;
                    }
                    h1 {
                        text-align: center;
                        color: black;
                        font-weight: bold;
                    }
                    table {
                        margin: 0 auto;
                        border-collapse: collapse;
                        width: 80%;
                    }
                    th, td {
                        border: 1px solid white;
                        padding: 10px;
                        text-align: center;
                    }
                    th {
                        background-color: rgba(0, 0, 0, 0.7);
                        color: white;
                    }
                    td {
                        background-color: rgba(255, 255, 255, 0.5);
                        color: black;
                    }
                    a {
                        display: block;
                        margin: 20px auto;
                        text-align: center;
                        color: black;
                        font-weight: bold;
                        text-decoration: none;
                        padding: 10px 20px;
                        border: 2px solid black;
                        border-radius: 5px;
                        background-color: rgba(255, 255, 255, 0.8);
                    }
                    a:hover {
                        background-color: rgba(255, 255, 255, 1);
                    }
                </style>
            </head>
            <body>
                <h1>Report</h1>
                <table>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Date of Birth</th>
                        <th>Address</th>
                        <th>Phone</th>
                    </tr>
                    ${items.map(item => `<tr><td>${item.name}</td><td>${item.email}</td><td>${item.dob}</td><td>${item.address}</td><td>${item.phone}</td></tr>`).join("")}
                </table>
                <a href='/'>Back to form</a>
            </body>
            </html>
        `;

        res.send(tableContent);
    } catch (err) {
        console.error("Error fetching data:", err);
        res.status(500).send("Failed to fetch data");
    }
});

app.post("/find", async (req, res) => {
    const { name } = req.body;
    if (!db) {
        res.status(500).send("Database not initialized");
        return;
    }
    try {
        const items = await db.collection("items").find({ name }).toArray();
        console.log("Found items:", items);

        let tableContent = `
            <!DOCTYPE html>
            <html lang='en'>
            <head>
                <meta charset='UTF-8'>
                <title>Find Results</title>
                <style>
                    body {
                        background-image: url('https://t3.ftcdn.net/jpg/04/87/74/22/360_F_487742206_kopZjYy0HeiSupV7zUFbubHHZkKMg092.jpg');
                        background-size: cover;
                        background-repeat: no-repeat;
                        color: white;
                        font-family: Arial, sans-serif;
                    }
                    h1 {
                        text-align: center;
                        color: black;
                        font-weight: bold;
                    }
                    table {
                        margin: 0 auto;
                        border-collapse: collapse;
                        width: 80%;
                    }
                    th, td {
                        border: 1px solid white;
                        padding: 10px;
                        text-align: center;
                    }
                    th {
                        background-color: rgba(0, 0, 0, 0.7);
                        color: white;
                    }
                    td {
                        background-color: rgba(255, 255, 255, 0.5);
                        color: black;
                    }
                    a {
                        display: block;
                        margin: 20px auto;
                        text-align: center;
                        color: black;
                        font-weight: bold;
                        text-decoration: none;
                        padding: 10px 20px;
                        border: 2px solid black;
                        border-radius: 5px;
                        background-color: rgba(255, 255, 255, 0.8);
                    }
                    a:hover {
                        background-color: rgba(255, 255, 255, 1);
                    }
                </style>
            </head>
            <body>
                <h1>Find Results</h1>
                <table>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Date of Birth</th>
                        <th>Address</th>
                        <th>Phone</th>
                    </tr>
                    ${items.map(item => `<tr><td>${item.name}</td><td>${item.email}</td><td>${item.dob}</td><td>${item.address}</td><td>${item.phone}</td></tr>`).join("")}
                </table>
                <a href='/'>Back to form</a>
            </body>
            </html>
        `;

        res.send(tableContent);
    } catch (err) {
        console.error("Error finding data:", err);
        res.status(500).send("Failed to find data");
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
