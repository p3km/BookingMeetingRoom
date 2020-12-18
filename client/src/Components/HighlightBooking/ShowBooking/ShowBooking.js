import React from "react";
import { useSelector } from "react-redux";
import "./ShowBooking.css";

const ShowBooking = () => {
    const highlighted = useSelector(state => state.highlightedBooking);
    const [booking, repeatPattern] = [highlighted.booking, highlighted.repeatPattern];

    const room = useSelector(state => state.rooms).find((room) =>{
        return room.roomID === booking.roomID
    });
    const organizer = useSelector(state => state.organizers).find( organizer => {
        return organizer.organizerID === booking.organizerID
    });
    
    const renderRepeat = () => {
        let output = <></>;
        if (highlighted.booking.repeatID) {
            output = (<>
                <li>Repeat Cycle: {repeatPattern.repeatCycle}</li>
                <li>Repeat Days: {repeatPattern.repeatDays}</li>
                <li>End date: {repeatPattern.endDay}.{repeatPattern.endMonth}.{repeatPattern.endYear}</li>
            </>);
        };
        return output;
    }
    
    return (
        <div>
        <ul>
            <li>Date: {booking.day}.{booking.month}.{booking.year}</li>
            <li>Start Time: {toReadableTime(booking.timeStart)}</li>
            <li>End Time: {toReadableTime(booking.timeEnd)}</li>
            {/* <li>Room: {room.name}</li> */}
            {/* <li>Organizer: {organizer.name}</li> */}
            <li>Reason: {booking.reason}</li>
            {renderRepeat()}
        </ul>
        </div>);
};

export default ShowBooking;

// Repeats in BookingSnippet.js
const toReadableTime = (time) => {
    const hours = Math.floor(time/100);
    const minutes = (time%100 < 10)? "0"+(time%100) : (time%100);  
    return `${hours}:${minutes}`;
}