import api from "../../axios";

export const rooms = (payload = []) => {
    return {
        type: "setRooms",
        payload
    }
}
export const organizers = (payload = []) => {
    return {
        type: "setOrganizers",
        payload
    }
}
// Initially getting all room and organizer data
export const getOrganizers = () => {
    return (dispatch) => {
        api.get("/organizers")
            .then((res) => {
                dispatch(organizers(res.data))
            })
            .catch((res) => {
                return "NO organizers gotten";
            });
    };
}
export const getRooms = () => {
    return (dispatch) => {
        api.get("/rooms")
            .then((res) => {
                dispatch(rooms(res.data))
            })
            .catch((res) => {
                return "NO roms gotten";
            });
    };
}
// Days of the week
export const getWeekDays = () => {
    return {
        type: "getDates",
    }
}
export const storeWeekDays = (payload = []) => {
    return {
        type: "storeDates",
        payload
    }
}