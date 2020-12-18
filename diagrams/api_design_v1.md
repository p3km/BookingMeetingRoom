# Meeting Room Booking API documentation
---

```GET /dates```
- returns all the bookings for the current week (Monday - Friday) in all the meeting rooms

``` POST /dates ```
- creates a new booking with the folowing paramters
~~~
Booking {
    year:number,
    month:number,
    day:number,
    date:string,
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
- returns a redirection to previous endpoint

``` GET /dates?start=&end= ```
- returns all bookings from the start date to the end date in all meeting rooms

``` GET /organizers ```
- returns all organizer IDs

``` GET /rooms ```
- returns all room IDs

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
    date:string,
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
- returns the updated values 

``` DELETE /booking/:id ```
- deletes a specific booking and returns it