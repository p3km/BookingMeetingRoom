import React from "react";
import { useSelector } from "react-redux";
import ShowDay from "./ShowDay";
import "./ShowRoom.css"

const ShowRoom = ({bookings}) => {
    const weekDays = useSelector(state => state.currentWeek);
    const getBookingsToday = (today) => {
        return (bookings.filter((booking) =>{
            return constructDateString(booking.year, booking.month, booking.day) === today;
        }));
    };
    return (
        <div className="ShowRoom">
            {weekDays.map((day) => {
                return <ShowDay key={day} date={day} allBookingsToday={getBookingsToday(day)} />; // does the key have to be entirely unique or just in context
            })}
        </div>
    );
};
export default ShowRoom;

// SAME IN CreateBooking.js
const constructDateString = (year, month, day) => {
    if(year && month && day){
        let date = new Date(year,month-1,day); // cause Jan is 0
        return date.toISOString().substring(0,10);
    }
    return null;
}