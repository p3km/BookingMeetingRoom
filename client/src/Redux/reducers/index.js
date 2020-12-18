import {combineReducers} from "redux";
// import all reducers
import currentWeek from "./currentWeek";
import currentWeeksBookings from "./currentWeeksBookings";
import isSynched from "./isSynched";
import {roomsReducer, organizersReducer} from "./permenantData";
import personalSocket from "./personalSocket";
import currentlyViewedBookings from "./currentlyViewedBookings";

const rootReducer = combineReducers({
    // export an obj of all imported reducers
    rooms : roomsReducer,
    organizers : organizersReducer,
    currentWeek,
    bookingsThisWeek : currentWeeksBookings,
    isSynched,
    socket : personalSocket,
    highlightedBooking : currentlyViewedBookings
});

export default rootReducer;