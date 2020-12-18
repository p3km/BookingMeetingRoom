import React from "react";
import SearchDates from "../Components/ShowDates/SearchDates";
import { useSelector } from "react-redux";
import ShowRoom from "../Components/ShowDates/ShowRoom";
import "./ShowDates.css";

const ShowDates = () => {
    const allRooms = useSelector(store => store.rooms);
    const thisWeeksBookings = useSelector(store => store.bookingsThisWeek.bookings);
    const getBookingsInRoom = (roomID) => {
        return thisWeeksBookings.filter((booking)=>{
            return booking.roomID === roomID;
        })
    }
    return (
        <div className="flex-container">
            <h1>ShowDates</h1>
            {allRooms.map((room) => {
                return (
                    <div key={room.roomID} className="ShowRoom">
                        <h3>{room.name}</h3>
                        <hr></hr>
                        <ShowRoom bookings={getBookingsInRoom(room.roomID)}/>
                    </div>
                );
            })}
        </div>
    );
};

export default ShowDates;