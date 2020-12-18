const express = require("express");
const connection = require("../database/dbConnection");
const querys = require("../database/queryDB");


const router = express.Router({mergeParams: true});


router.get("/test", (req, res) =>{
    //#region testing query parameters (visually)
    const query = [];
    query.push(querys.getDates(2020, 12, 20, 2020, 12, 24));
    query.push(querys.getDatesAndOrganizer(2020, 12, 20, 2020, 12, 24, 1233512));
    query.push(querys.getDatesAndRoom(2020, 12, 20, 2020, 12, 24, 9078123));
    query.push(querys.getABooking(294595));
    query.push(querys.getAllBookings);
    query.push(querys.getAllOrganizers);
    query.push(querys.getAllRooms);
    query.push(querys.getAllRepeats);
    query.push(querys.postABooking({
        organizerID: 123123, repeatID: 5346, roomID: 12963,
        year: 2020, month: 04, day: 23, timeStart: 1230,
        timeEnd: 1400, reason: `\'Billy is getting a code review\'`
    }));
    query.push(querys.postARepeat({
        repeatCycle: 0010, repeatDays: 0000000,
        endYear: 2021, endMonth: 12, endDay: 12
    }));
    query.push(querys.patchABooking(12334123, {
        repeatID: null, reason: `\'John is getting a code review\'`
    }));
    query.push(querys.patchARepeat(3412340, {
        repeatCycle: 0001
    }));
    query.push(querys.deleteABooking(12234));
    query.push(querys.deleteARepeat(634431));
    
    res.send(query);
    console.log(query);
    //#endregion
});

/** GENREAL TODO
 * - if id not fount in db then it returns an empty array. Should that be the desired result?
 */
const dbConnection = (res, query) => {
    connection.query(query, (err, results) => {
        if(err){
            return res.send(err);
        }
        return res.send(results); // sends JSON of query
    });
}
// gets all bookings given a specific date and other params (start and end dates are inclusive)
router.get("/dates", (req,res) => { // WORKS
    let searchQuery;
    // constructs search query (searchQuery) mySQL string
    if(req.query.start && req.query.end){
        const start = req.query.start.split("-"); // year - month - day
        const end = req.query.end.split("-");
        const params = Object.keys(req.query);
        const value = (params.length == 3)? `AND ${params[2]}ID = ${req.query[params[2]]}` : '';
        searchQuery = querys.getDates(start[0], start[1], start[2], end[0], end[1], end[2], value);
    }else{
        return res.send("Invalid url parameters");
    }
    // performs search in db if searchQuery constructed
    dbConnection(res, searchQuery);
})
// gets specifc booking by id
router.get("/booking/:id", (req, res) => { // WORKS
    const id = req.params.id; // refactor to async await (to prevent callback hell)
    dbConnection(res, querys.getABooking(id));
});

// gets all bookings
router.get("/bookings", (req,res) => { // WORKS
    dbConnection(res, querys.getAllBookings);
});

// gets all organizers
router.get("/organizers", (req,res) => { // WORKS
    dbConnection(res, querys.getAllOrganizers);
});
// gets all rooms
router.get("/rooms", (req,res) => { // WORKS
    dbConnection(res, querys.getAllRooms);
});
// gets all repeating patterns
router.get("/repeats", (req,res) => { // WORKS
    dbConnection(res, querys.getAllRepeats);
});

// create a new booking
router.post("/booking", (req, res) =>{ // WORKS
    // check if all data is present is done in forntend
    let input = req.body;
    input.reason = `\'${input.reason}\'`;
    dbConnection(res, querys.postABooking(input));
});

// create a new repeating pattern
router.post("/repeat", (req,res) => { // WORKS
    // check if all data is present is done in forntend
    //TODO Figure out how to deal with bits
    dbConnection(res, querys.postARepeat(req.body));
});

// update a existing booking given an id
router.patch("/booking/:id", (req, res) => { // WORKS
    const id = req.params.id; // TODO check if number
    const input = req.body;
    if(input.reason){
        input.reason = `\'${input.reason}\'`; // makes a valid mySQL string
    }
    dbConnection(res, querys.patchABooking(id, input));
});

// update a existing repeating pattern given an id
router.patch("/repeat/:repeatID", (req, res) => { // WORKS
    const repeatID = req.params.repeatID;
    const input = req.body;
    dbConnection(res, querys.patchARepeat(repeatID, input));
});

// delete a booking given an id
router.delete("/booking/:id", (req, res) => { // WORKS 
    const id = req.params.id;
    dbConnection(res, querys.deleteABooking(id));
    /* By deleting booking the acompaning repeating pattern is also deleted
    *       due to the ON DELETE CASCADE mysql setting                  */
});

// delete a repeating pattern given an id
router.delete("/repeat/:repeatID", (req, res) => { // WORKS
    const repeatID = req.params.repeatID;
    dbConnection(res, querys.deleteARepeat(repeatID));
    /* because the database has an ON DELETE SET NULL by deleting the repeat row, the repeatID
    *     in the specific booking becomes null                              */
});

// catch all route
router.get("*", (req,res) => {
    res.send("Route no existo");
});

module.exports = router;