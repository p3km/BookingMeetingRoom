
const allQuerys ={
    getDates : (yearS,monthS, dayS, yearE, monthE, dayE, value = '') => {
        return (`SELECT * FROM Bookings\
        WHERE year BETWEEN ${yearS} AND ${yearE}\
        AND month BETWEEN ${monthS} AND ${monthE}\
        AND day BETWEEN ${dayS} AND ${dayE} ${value};`).replace(new RegExp("        ", "g"), " ");
    },
    getABooking : (id) => `SELECT * FROM Bookings WHERE id = ${id};`, 
    getAllBookings : "SELECT * FROM Bookings;", // dunno if ; is manditory
    getAllOrganizers : "SELECT * FROM Organizers;",
    getAllRooms : "SELECT * FROM Rooms;",
    getAllRepeats : "SELECT * FROM Repeats;",
    postABooking : (booking) => {
        return (`INSERT INTO Bookings (organizerID, repeatID, roomID, year, month, day, timeStart, timeEnd, reason)\
        VALUES (${booking.organizerID},\
        ${booking.repeatID},\
        ${booking.roomID},\
        ${booking.year},\
        ${booking.month},\
        ${booking.day},\
        ${booking.timeStart},\
        ${booking.timeEnd},\
        ${booking.reason});`).replace(new RegExp("        ", "g"), " ");
    },
    postARepeat : (repeat) => { // may remove id from this table's columns
        return (`INSERT INTO Repeats (id, repeatCycle, repeatDays, endYear, endMonth, endDay)\
        VALUES (${repeat.id},\
        ${repeat.repeatCycle},\
        ${repeat.repeatDays},\
        ${repeat.endYear},\
        ${repeat.endMonth},\
        ${repeat.endDay});`).replace(new RegExp("        ", "g"), " ");
    },
    patchABooking : (id, newBooking) => {
        const keys = Object.keys(newBooking);
        keys[0] = `${keys[0]} = ${newBooking[keys[0]]}`; // may throw error (catch before entering into api)
        const updateParam = keys.reduce((total, key) => total + `, ${key} = ${newBooking[key]}`);
        return `UPDATE Bookings SET ${updateParam} WHERE id = ${id};`;
    },
    patchARepeat : (repeatID, newRepeat) => {
        const keys = Object.keys(newRepeat);
        keys[0] = `${keys[0]} = ${newRepeat[keys[0]]}`; // may throw error (catch before entering into api)
        const updateParam = keys.reduce((total, key) => total + `, ${key} = ${newRepeat[key]}`);
        return `UPDATE Repeats SET ${updateParam} WHERE repeatID = ${repeatID};`;
    },
    deleteABooking : (bookingID) => `DELETE FROM Bookings WHERE id = ${bookingID};`,
    deleteARepeat : (repeatID) => `DELETE FROM Repeats WHERE repeatID = ${repeatID};`,
}

// returns an object with all possible querys for this api
module.exports = allQuerys;