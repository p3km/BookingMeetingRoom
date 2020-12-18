import getWeeklyBookings from "./weeklyBookings";

// Synchronising with server
export const upToDate = () => {
    return {
        type : "UP_TO_DATE",
        isNew: true
    };
};
export const outOfDate = () => {
    return {
        type: "OUT_OF_DATE",
        isNew: false
    };
};
export const updateData = (startDate, endDate) =>{
    return (dispatch) =>{
        dispatch(getWeeklyBookings(startDate, endDate));
        // TODO add the updating of currently viewed bookings
        dispatch(upToDate());
    };
};