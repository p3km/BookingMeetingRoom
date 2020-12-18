import React from "react";
import CreateBooking from "../Components/HighlightBooking/CreateBooking/CreateBooking";
import ShowBooking from "../Components/HighlightBooking/ShowBooking/ShowBooking";
import { useSelector, useDispatch } from "react-redux";
import { hideBooking, deleteBooking, editBooking } from "../Redux/actions/bookingActions";
import "./HighlightBooking.css";
import { Button, Icon } from 'semantic-ui-react';

const HighlightBooking = () => {
    const viewBooking = useSelector(state => state.highlightedBooking);
    const socket = useSelector(state => state.socket);
    const dispatch = useDispatch();
    const render = () => {
        switch (viewBooking.viewState) {
            case "create":
                return (
                    <>
                        <h1>Create a new post</h1>
                        <CreateBooking />
                    </>
                );
            case "edit":
                return (
                    <>
                        <h1>Editing booking</h1>
                        <CreateBooking />
                    </>
                );
            case "view":
                return (
                    <>
                        <Button icon onClick={() => dispatch(deleteBooking(viewBooking.booking.id, socket))} className="button">
                            <Icon name="trash" />
                        </Button>
                        <Button icon onClick={() => dispatch(editBooking(viewBooking.booking))} className="button">
                            <Icon name="pencil" />
                        </Button>
                        <h1>Viewing Booking</h1>
                        <ShowBooking />
                    </>
                );
            default:
                return <h1>NO BOOKING FOUND</h1>
        }
    };
    return (
        <div className="HighlightBooking">
            <Button icon onClick={() => dispatch(hideBooking())} className="button exitButton">
                <Icon name="x" />
            </Button>
            {render()}
        </div>
    );
}
export default HighlightBooking;