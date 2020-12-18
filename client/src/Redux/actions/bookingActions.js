import api from "../../axios";

// Static actions
export const createBooking = () => {
    return {
        type: "create"
    };
};
export const editBooking = (booking = {}, repeatPattern = {}) => {
    return {
        type: "edit",
        booking,
        repeatPattern
    };
};
export const viewBooking = (booking, repeatPattern) => {
    return {
        type: "view",
        booking,
        repeatPattern
    };
};
export const hideBooking = () => {
    return {
        type: "hide"
    };
};

export const getBooking = (id) => {
    return (dispatch) => {
        //TODO ADD REPEAT DATA
        api.post(`/booking/${id}`)
            .then((res) => {
                dispatch(viewBooking(res.data));
            })
            .catch((res) => {
                return res; // TODO BETTER ERROR HANDLING
            })
    };
};
export const postBooking = (data, socket, repeat = {}) => {
    return (dispatch) => {
        //TODO ADD REPEAT DATA
        api.post("/booking", data)
            .then( (res) =>{
                socket.emit('update');
                // dispatch(viewBooking(data, repeat));
                dispatch(hideBooking())
            })
            .catch((res) =>{
                return res; // TODO BETTER ERROR HANDLING
            })
    };
};
export const patchBooking = (id, data, socket, repeat = {}) => {
    return (dispatch) => {
        //TODO ADD REPETITION
        let repeatID = null;
        if(repeat !== null){
            if(data.repeatID === null){
                repeatID = postRepeat(repeat, socket);
            }else{
                api.patch(`/repeat/${id}`, repeat)
                    .catch((res) =>{
                        return res;
                    });
            }
        }
        api.patch(`/booking/${id}`, data)
            .then((res) => {
                socket.emit('update');
                dispatch(viewBooking(data));
            })
            .catch((res) => {
                return res; // TODO BETTER ERROR HANDLING
            })
    };
};
export const deleteBooking = (id, socket) => {
    return (dispatch) => {
        //TODO ADD REPETITION
        api.delete(`/booking/${id}`)
            .then((res) => {
                socket.emit('update');
                dispatch(hideBooking());
            })
            .catch((res) => {
                return res; // TODO BETTER ERROR HANDLING
            })
    };
};
const postRepeat = (data, socket) =>{
    api.post("/repeat")
};
export const deleteRepeat = (id,socket) =>{
    return () => {
        //TODO ADD REPETITION
        api.delete(`/repeat/${id}`)
            .then((res) => {
                socket.emit('update');
            })
            .catch((res) => {
                return res; // TODO BETTER ERROR HANDLING
            })
    };
}
