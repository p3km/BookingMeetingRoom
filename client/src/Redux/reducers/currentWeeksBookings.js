const initialState = {
    isInit: false,
    bookings: []
}
const currentWeeksBooking = (state = initialState, action) => {
    switch (action.type) {
        case ("initWeeklyBooking"):
            return state = {
                isInit: true,
                bookings: action.payload
            };
        // todo add the other mehtods
        default:
            return state;
    }
}

export default currentWeeksBooking;