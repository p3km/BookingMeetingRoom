export const organizersReducer = (state = [], action) => {
    switch (action.type) {
        case "setOrganizers":
            return state = action.payload;
        default:
            return state;
    }
}
export const roomsReducer = (state = [], action) => {
    switch (action.type) {
        case "setRooms":
            return state = action.payload;
        default:
            return state;
    }
}