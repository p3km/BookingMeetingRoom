import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Transition } from 'semantic-ui-react'
import "./CreateBooking.css";
import { postBooking, patchBooking, deleteRepeat } from "../../../Redux/actions/bookingActions";

const CreateBooking = () => {
    const [radioInput, setRadio] = useState(0);
    const highlighted = useSelector(state => state.highlightedBooking);
    const socket = useSelector(state => state.socket);
    const dispatch = useDispatch();
    const [booking, view, repeatPattern] = [highlighted.booking, highlighted.viewState, highlighted.repeatPattern];
    const [isVisible, setVisible] = useState((booking.repeatID === null ? true : false)); // for when editing
    const { register, handleSubmit, errors } = useForm();
    
    // Submitting
    const onSubmit = (data) => {
        if (view === "create") {
            let repeat = null;
            if (data.isRepeat) {
                // destructure end date for repeating pattern
                const repeatCycle = radioInput;
                const repeatDays = parseInt(data.monday || 0) + parseInt(data.tuesday || 0) + parseInt(data.wednesday || 0) + parseInt(data.thursday || 0) + parseInt(data.friday || 0) + parseInt(data.saturday || 0) + parseInt(data.sunday || 0);
                const [year, month, day] = data.endDate.split("-").map((num) => { return parseInt(num) });
                repeat = {
                    repeatCycle: repeatCycle, // reformat input data
                    repeatDays: repeatDays, // reformat input data
                    endYear: year,
                    endMonth: month,
                    endDay: day
                };
            }
            // destructure date for booking 
            const [year, month, day] = data.date.split("-").map((num) => { return parseInt(num) });
            const postData = {
                organizerID: data.organizerID,
                repeatID: null,
                roomID: data.roomID,
                year: year,
                month: month,
                day: day,
                timeStart: parseInt(data.startHours) * 100 + parseInt(data.startMinutes),
                timeEnd: parseInt(data.endHours) * 100 + parseInt(data.endMinutes),
                reason: data.reason
            };
            dispatch(postBooking(postData, socket, repeat));
        } else if (view === "edit") {
            // patching repeat
            let repeatData = null;
            if (booking.repeatID !== null && !data.isRepeat) {
                dispatch(deleteRepeat(booking.repeatID)); // if repeat is unchecked and repeating pattern didn't exist
            } else if (data.isRepeat) {
                // destructure the end date for repeating pattern
                const [year, month, day] = data.endDate.split("-").map((num) => { return parseInt(num) });
                repeatData = {
                    id: booking.id,
                    repeatCycle: data.repeatCycle,
                    repeatDays: data.repeatDays,
                    endYear: year,
                    endMonth: month,
                    endDay: day
                };
            }
            // patching booking
            const [year, month, day] = data.date.split("-").map((num) => { return parseInt(num) });
            const patchData = {
                organizerID: data.organizerID,
                repeatID: booking.repeatID,
                roomID: data.roomID,
                year: year,
                month: month,
                day: day,
                timeStart: parseInt(data.startHours) * 100 + parseInt(data.startMinutes),
                timeEnd: parseInt(data.endHours) * 100 + parseInt(data.endMinutes),
                reason: data.reason
            };

            dispatch(patchBooking(booking.id, patchData, socket, repeatData))
        }
    };
    // Additional form logic
    
    // Rendering 
    const rooms = useSelector(state => state.rooms).map((room) => {
        const isSelected = (view === "edit") && (room.roomID === booking.roomID)
        return (
            <option key={room.roomID} value={`${room.roomID}`} selected={isSelected}>{room.name}</option>
        );
    });
    const organizers = useSelector(state => state.organizers).map((organizer) => {
        const isSelected = (view === "edit") && (organizer.roomID === organizer.roomID)
        return (
            <option key={organizer.organizerID} value={`${organizer.organizerID}`} selected={isSelected}>{organizer.name}</option>
        );
    });
    const renderRepeat = () => {
        return (<>
            <div id="repeatingCycle">
                <label>Repeating cycle</label>
                <label>Daily</label>
                <input type="radio" name="daily" checked={radioInput === 1000} onChange={() => setRadio(1000)} ref={register()} />
                <label>Weekly</label>
                <input type="radio" name="weekly" checked={radioInput === 100} onChange={() => setRadio(100)} ref={register()} />
                <label>Monthly</label>
                <input type="radio" name="monthly" checked={radioInput === 10} onChange={() => setRadio(10)} ref={register()} />
                <label>Yearly</label>
                <input type="radio" name="yearly" checked={radioInput === 1} onChange={() => setRadio(1)} ref={register()} />
            </div>
            <div id="repeatingDays" >
                <label>Repeating cycle</label>
                <label>Sunday</label>
                <input type="checkbox" value="1000000" name="sunday" ref={register()} />
                <label>Monday</label>
                <input type="checkbox" value="100000" name="monday" ref={register()} />
                <label>Tuesday</label>
                <input type="checkbox" value="10000" name="tuesday" ref={register()} />
                <label>Wednesday</label>
                <input type="checkbox" value="1000" name="wednesday" ref={register()} />
                <label>Thursday</label>
                <input type="checkbox" value="100" name="thursday" ref={register()} />
                <label>Friday</label>
                <input type="checkbox" value="10" name="friday" ref={register()} />
                <label>Saturday</label>
                <input type="checkbox" value="1" name="saturday" ref={register()} />
            </div>
            <div id="endDate" className="formInput">
                <label>End Date: </label>
                <input name="endDate" type="date" className={(errors.endDate) ? "error" : ""} defaultValue={isEditingValue(constructDateString(repeatPattern.endYear, repeatPattern.endMonth, repeatPattern.endDay))} ref={register({ required: true })} />
                {errors.endDate && <span className="error">This field is required</span>}
            </div>
        </>);
    }
    const isEditingValue = (value) => {
        return (view === "edit") ? value : "";
    };
    const getSplitTime = (time) => {
        return [Math.floor(time / 100), time % 100];
    };
    const reasonPlaceholder = (err) => {
        return (err) ? "This field is required" : "What is the reason for booking this room? (Max 100 characters)"
    }
    // SAME IN ShowRoom.js
    const constructDateString = (year, month, day) => {
        if (year && month && day) {
            let date = new Date(year, month - 1, day); // cause Jan is 0
            return date.toISOString().substring(0, 10);
        }
        return null;
    }
    console.log(isVisible);
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div id="date" className="formInput">
                <label>Date: </label>
                <input name="date" type="date" className={(errors.date) ? "error" : ""} defaultValue={isEditingValue(constructDateString(booking.year, booking.month, booking.day))} ref={register({ required: true })} />
                {errors.date && <span className="error">This field is required</span>}
            </div>
            <div id="startTime" className="formInput">
                <label>Starting time: </label>
                <input type="number" min="0" max="23" name="startHours" placeholder="HH" defaultValue={getSplitTime(isEditingValue(booking.timeStart))[0]} className={(errors.startHours) ? "error" : ""} ref={register({ required: true })} />
                <p className="timeColumn">:</p>
                <input type="number" min="0" max="59" name="startMinutes" placeholder="mm" defaultValue={getSplitTime(isEditingValue(booking.timeStart))[1]} className={(errors.startMinutes) ? "error" : ""} ref={register({ required: true })} />
                {(errors.startHours || errors.startMinutes) && <span className="error">This field is required</span>}
            </div>
            <div id="endTime" className="formInput">
                <label>Ending time: </label>
                <input type="number" min="0" max="23" name="endHours" placeholder="HH" defaultValue={getSplitTime(isEditingValue(booking.timeEnd))[0]} className={(errors.endHours) ? "error" : ""} ref={register({ required: true })} />
                <p className="timeColumn">:</p>
                <input type="number" min="0" max="59" name="endMinutes" placeholder="mm" defaultValue={getSplitTime(isEditingValue(booking.timeEnd))[1]} className={(errors.endMinutes) ? "error" : ""} ref={register({ required: true })} />
                {(errors.endHours || errors.endMinutes) && <span className="error">This field is required</span>}
            </div>
            <select name="roomID" className="formInput" ref={register({ required: true })} >
                <option value="none" selected={view === "create"} disabled>{(errors.roomID) ? "Must select a room" : "Select a room"}</option>
                {rooms}
            </select>
            {/* TODO CHANGE TO search organizers */}
            <select name="organizerID" className="formInput" ref={register({ required: true })} >
                <option value="none" selected={view === "create"} disabled>{(errors.organizerID) ? "Must select a organizer" : "Select a organizer"}</option>
                {organizers}
            </select>
            <div id="reason" className="formInput">
                <label>Reason: </label>
                <textarea name="reason" className={(errors.reason) ? "error" : ""} placeholder={reasonPlaceholder(errors.reason)} defaultValue={isEditingValue(booking.reason)} ref={register({ required: true })}></textarea>
            </div>
            <div id="repeat" className="formInput">
                <label>Repeating event: </label>
                <input type="checkbox" name="isRepeat" className={(errors.repeat) ? "error" : ""} onChange={() => setVisible(!isVisible)} ref={register} />
            </div>
            <Transition visible={isVisible} animation='fade up' duration={325} unmountOnHide={true}>
                {/* <p>{`${isVisible}`}</p> */}
                {/* <p>hi</p> */}
                {renderRepeat()}
            </Transition>
            <input type="submit" className="submit formInput" />
        </form>

    );
};

export default CreateBooking;