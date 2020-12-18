import React from "react";
import { useDispatch } from "react-redux";
import { viewBooking } from "../../Redux/actions/bookingActions";
import "./BookingSnippet.css";

const BookingSnippet = (booking) => {
    const dispatch = useDispatch();
    return (
        <div onClick={() => {dispatch(viewBooking(booking)); console.log(booking)}} className="snippet">
            <p>Time: {toReadableTime(booking.timeStart)} - {toReadableTime(booking.timeEnd)}</p>
            <hr></hr>
            <p>{booking.reason}</p>
        </div>
    );
}
export default BookingSnippet;

// repeats in ShowBooking.js
const toReadableTime = (time) => {
    const hours = Math.floor(time/100);
    const minutes = (time%100 < 10)? "0"+(time%100) : (time%100);  
    return `${hours}:${minutes}`;
}