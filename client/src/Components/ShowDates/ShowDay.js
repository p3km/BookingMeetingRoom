import React from "react";
import BookingSnippet from "./BookingSnippet";
import "./ShowDay.css";

const ShowDay = ({ date, allBookingsToday }) => {
    const sortedBookingsToday = allBookingsToday.slice().sort((a, b) => {
        return a.timeStart - b.timeStart;
    });
    const isBookingsEmpty = allBookingsToday.length === 0 ? <p>No bookings today</p> : <></>;
    return (
        <div className="ShowDay">
            <h3>{date}</h3>
            {<div>{isBookingsEmpty}</div>}
            {sortedBookingsToday.map((booking) => {
                return <BookingSnippet key={booking.id} {...booking}/>;
            })}
        </div>
    )
}
export default ShowDay;
