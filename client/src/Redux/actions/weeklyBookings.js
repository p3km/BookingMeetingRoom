import api from "../../axios";

// Managing this weeks bookings
const initWeeklyBooking = (payload = []) => {
    return {
        type: "initWeeklyBooking",
        payload
    };
};
const getWeeklyBookings = (startDate, endDate) => {
    return (dispatch) => {
        api.get(`/dates?start=${startDate}&end=${endDate}`)
            .then((res) => {
                dispatch(initWeeklyBooking(res.data));
            })
            .catch((res) => {
                return res; // TODO HANDLE ERR BETTER
            });
    };
};

export default getWeeklyBookings;