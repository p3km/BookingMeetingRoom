const initialState = {
    booking: {},
    repeatPattern: {},
    viewState: "", // change back to "" after testing is done
    isDimmed: false // change back to false after testing
}

const currentlyViewedBookings = (state = initialState, action) => {
    switch (action.type) {
        case "create":
            return state = {
                booking: {},
                repeatPattern: {},
                viewState : "create",
                isDimmed : true
            };
        case "edit":
            return state = {
                booking: action.booking,
                repeatPattern: action.repeatPattern,
                viewState : "edit",
                isDimmed : true
            }
        case "view":
            return state = {
                booking: action.booking,
                repeatPattern: action.repeatPattern,
                viewState : "view",
                isDimmed : true
            }
        case "hide":
            return state = {
                booking: {},
                repeatPattern: {},
                viewState : "hide",
                isDimmed : false
            }
        default:
            return state;
    }
};

export default currentlyViewedBookings;