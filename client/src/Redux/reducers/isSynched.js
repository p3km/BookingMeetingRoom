const isSynched = (state = true, action) => { // starts true cause when connect established client is synched
    switch (action.type) {
        case "UP_TO_DATE":
            return state = action.isNew; // true
        case "OUT_OF_DATE":
            return state = action.isNew; // false
        default:
            return state;
    };
};

export default isSynched;