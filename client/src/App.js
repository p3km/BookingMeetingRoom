import React, { useEffect } from 'react';
// Redux
import { useDispatch, useSelector } from 'react-redux';
// Redux actions
import getWeeklyBookings from './Redux/actions/weeklyBookings';
import { outOfDate, updateData } from "./Redux/actions/personalSocket";
import { getRooms, storeWeekDays, getOrganizers } from './Redux/actions/permenantData';
//Files
import ShowDates from "./Containers/ShowDates";
import HighlightBooking from "./Containers/HighlightBooking";
// css
import { Dimmer } from "semantic-ui-react";
import './App.css';
import { createBooking, hideBooking } from './Redux/actions/bookingActions';


function App() {
  // #region old code grave

  // const posting = () => {
  //   let data = {
  //     organizerID: 3, repeatID: null, roomID: 1,
  //     year: 2020, month: 7, day: 28, timeStart: 900,
  //     timeEnd: 1000, reason: "Intern Initiation"
  //   };

  //   const repeatData = {
  //     id: 8, repeatCycle: 10, repeatDays: 0,
  //     endYear: 2021, endMonth: 12, endDay: 12
  //   };
  // console.log("Button pressed");
  // api.get("/dates?start=2020-01-09&end=2020-12-31&room=2")
  //   .then(res => {
  //     console.log(res.data);
  //   })
  //   .catch(res => console.log(res));
  // api.post("/booking", data)
  //   .then(resp => console.log(resp.data.insertId, resp))
  //   .catch(resp => console.log(resp));
  // api.patch("/booking/6", { roomID: 2 })
  //   .then(res => console.log(res))
  //   .catch(res => console.log(res));
  // api.delete("/booking/8")
  //   .then(resp => console.log(resp))
  //   .catch(resp => console.log(resp));
  // }
  //#endregion

  const socket = useSelector(state => state.socket);
  const dimmer = useSelector(state => state.highlightedBooking.isDimmed);
  const dispatch = useDispatch();

  //Initial load
  useEffect(() => {
    // CALCULATE this weekday's dates
    const datesThisWeek = calcDates();
    // STORE the dates
    dispatch(storeWeekDays(datesThisWeek));
    // GET rooms thunk reference
    dispatch(getRooms())
    // GET organizers thunk reference
    dispatch(getOrganizers())
    // GET bookings this week
    dispatch(getWeeklyBookings(datesThisWeek[0], datesThisWeek[4]));
  }, []);

  // Loading data which can change over time
  const dates = useSelector(state => state.currentWeek);
  const bookingData = useSelector(state => state.bookingsThisWeek);
  const isSynched = useSelector(state => state.isSynched);
  useEffect(() => {
    if (!isSynched) { // just so that the intial empty array doesn't mess up everything
      dispatch(updateData(dates[0], dates[4]));
    }
  }, [isSynched]);

  // TODO change loading screen
  let content = <h1>Loading ...</h1>; // Potentially implement semantic ui loader
  if (bookingData.isInit && isSynched) {
    content = <ShowDates />
  }


  //Sockets stuff
  if (socket) { // initial value is null
    socket.on("update", () => {
      dispatch(outOfDate());
    });
  }


  return (
    <div className="App">
      <Dimmer.Dimmable dimmed={dimmer} className="Dimmer">
        <button onClick={() => dispatch(createBooking())}> ADD BOOKING </button>
        {content}
        <Dimmer active={dimmer} onClickOutside={() => dispatch(hideBooking())}>
          <HighlightBooking />
        </Dimmer>
      </Dimmer.Dimmable>
    </div>
  );
}
export default App;

const calcDates = () => {
  let week = []
  let sunday = new Date();
  let day = sunday.getDay() || 7; // Get current day number, converting Sun. to 7
  if (day !== 1)                // Only manipulate the date if it isn't Mon.
    sunday.setHours(-24 * (day - 1));   // Set the hours to day number minus 1
  for (let i = 1; i < 6; i++) {
    let day = new Date(sunday);
    day.setHours(24 * i);
    week.push(day.toISOString().substring(0, 10));
  }
  return week;
};