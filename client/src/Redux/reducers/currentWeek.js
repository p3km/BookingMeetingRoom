const currentWeek = (state = [], action) => {
    switch (action.type) {
        case "storeDates":
            return state = action.payload;
        default:
            return state;
    }
};

export default currentWeek;