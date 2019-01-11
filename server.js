// Dependencies
// =============================================================
const express = require('express')

var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

var currentReservations = [{
    routeName: "Bill",
    customerName: "Bill",
    customerEmail: "bill@bill.com",
    phoneNumber: "123-456-7890",
    customerID: "iAmBill",
}];

let waitingList = [{
    routeName: "Ted",
    customerName: "Ted",
    customerEmail: "Ted@Bill.com",
    phoneNumber: "321-654-9879",
    customerID: "History101"
}]



// Routes
// =============================================================
// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/makereservation", function (req, res) {
    res.sendFile(path.join(__dirname, "make-reservation.html"));
});

app.get("/viewtables", function (req, res) {
    res.sendFile(path.join(__dirname, "view-tables.html"));
});

// Displays all current reservations
app.get("/api/reservations", function (req, res) {
    return res.json(currentReservations);
});
app.get("/api/waitlist", function (req, res) {
    return res.json(waitingList);
});

// Create New Characters - takes in JSON input
app.post("/api/reservations", function (req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newTable = req.body;

    // Using a RegEx Pattern to remove spaces from newCharacter
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    newTable.routeName = newTable.name.replace(/\s+/g, "").toLowerCase();

    console.log(newTable);

    if (currentReservations.length < 5) {
        currentReservations.push(newTable);
    } else {
        waitingList.push(newTable);
    }

    // characters.push(newTable);

    res.json(newTable);
});

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});