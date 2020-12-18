import openSocket from 'socket.io-client';

const initialState = openSocket("localhost:12345");

const personalSocket = (state = initialState) =>{
    return state;
}

export default personalSocket;