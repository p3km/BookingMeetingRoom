# Meeting Room Booking API documentation
---

```GET /dates```
- returns an array with all the bookings in all the meeting rooms (example output below)
~~~
[{
    id: 302137
    year:2019,
    month:3,
    day:2,
    timeStart:1300,
    timeEnd:1430,
    room: 23097,
    reason:Interview with new Front end dev,
    organizer: Jessica,
    repeat:false,
    repeatPattern:null,
    repeatEndDate:null
},
{
    id: 409881
    year:2020,
    month:6,
    day:4,
    timeStart:1015,
    timeEnd:1100,
    room:0632,
    reason: Monthly review with team,
    organizer: Bob,
    repeat: true,
    repeatPattern:int,  // change to reflect new system
    repeatEndDate:"2020-12-31"
},
{
    id: 70935
    year:2021,
    month:12,
    day:20,
    timeStart:1015,
    timeEnd:1100,
    room:23097,
    reason: Office Christnams Party,
    organizer: Bob,
    repeat: false,
    repeatPattern:null,
    repeatEndDate:null
}]
~~~
- The time is written in 24 hour time (from 00:00 to 23:59) and there is no ":" separating the hours and minitues, 
so 14:05 is just 1405

``` POST /dates ```
- creates a new booking by submitting the following parameters
~~~
{
    year:number,
    month:number,
    day:number,
    timeStart:number,
    timeEnd:number,
    room:id,
    reason:string (max 100 characters),
    organizer:id,
    repeat:boolean,
    repeatPattern:int,
    repeatEndDate:string
}
~~~
- repeatPattern states what days of the week the booking will repeat.
The days of the week are numbered 0-6 where Sunday is the first day (day 0)
and Saturday is the last day (day6).
    + For example the number 124 means that the booking repeats on day 1, day 2 and day 4,
    which is Monday, Tuesday, Thursday respectively.
- returns the booking id if data is saved into the database (example shown below)
~~~
{id: 409881}
~~~

``` GET /dates?start=&end= ```
- returns all bookings from the start date to the end date in all meeting rooms
    - The format for the dates is year-month-day, 2020-12-02 for example.
    Also if there were to be a single digit number like 2 it needs to be preceeded by a 0

``` GET /organizers ```
- returns all organizer IDs and names (as shown below) in an array
~~~
[{ organizerID: id, name: string (max 100 characters) }]
~~~

``` GET /rooms ```
- returns all room IDs and names (as shown below)
~~~
[{ roomID: id, name: string (max 100 characters) }]
~~~

``` GET /dates?start=&end=&room=:id ```
- returns all bookings from the start date to the end date for a specifc meeting room

``` GET /dates?start=&end=&organizer=:id ```
- returns all bookings from the start date to the end date for all rooms given a specific organizer

``` GET /booking/:id ```
- returns all the data for a specific booking given an id

``` PATCH /booking/:id ```
- updates booking some details of a specific booking given an id
    - the details that are selected can be selected from a list of optional parameters, shown below
~~~
Booking {
    year:number,
    month:number,
    day:number,
    timeStart:number,
    timeEnd:number,
    room:id,
    reason:string (max 100 characters),
    organizer:id,
    repeat:boolean,
    repeatPattern:int,
    repeatEndDate:string
}
~~~
- repeatPattern states what days of the week the booking will repeat.
The days of the week are numbered 0-6 where Sunday is the first day (day 0)
and Saturday is the last day (day6).
    + For example the number 124 means that the booking repeats on day 1, day 2 and day 4,
    which is Monday, Tuesday, Thursday respectively.
- returns the old values (useful when implementing an undo button)

``` DELETE /booking/:id ```
- deletes a specific booking and returns it (example of what is returned shown below)
~~~
{
    id: 70935
    year:2021,
    month:12,
    day:20,
    timeStart:1015,
    timeEnd:1100,
    room:23097,
    reason: Office Christnams Party,
    organizer: Megan,
    repeat: false,
    repeatPattern:null,
    repeatEndDate:null
}
~~~
- A undo button can be implemented where once the booking is deleted from he database it can be stored in the sessions data