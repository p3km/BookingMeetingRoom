# Meeting Room Booking API documentation
## Table of contents
---
- ## Getting bookings given dates and other parameters
    - ### [Getting all bookings between specific dates](#getting-all-bookings-given-specific-start-and-end-dates)
    - ### [Getting all bookings between specific dates and for a organizer](#getting-all-bookings-given-specific-dates-and-a-organizer)
    - ### [Getting all bookings between specific dates and for a room](#getting-all-bookings-given-specific-dates-and-a-room)
- ## Getting bookings/organziers/rooms/repeating patterns on their own
    - ### [Getting a specific booking](#getting-a-specific-booking-by-id)
    - ### [Getting all available bookings](#getting-all-bookings)
    - ### [Getting all available organizers](#getting-all-organizers)
    - ### [Getting all available rooms](#getting-all-rooms)
    - ### [Getting all available repeating patterns](#getting-all-repeating-patterns)
- ## Creating new bookings/repeating patterns
    - ### [Creating a new booking](#creating-new-bookings)
    - ### [Creating a new reapeating pattern](#creating-new-repeating-patterns)
- ## Updating a specific booking/repeating pattern
    - ### [Updating a specific booking](#updating-a-selected-booking)
    - ### [Updating a specific repeating pattern](#updating-a-selected-repeating-pattern)
- ## Deleting a specific booking/repeating pattern
    - ### [Deleting a specific booking](#deleting-a-selected-booking)
    - ### [Deleting a specific repeating pattern](#deleting-a-selected-repeating-pattern)
---
# Getting all dates
## Getting all bookings given specific start and end dates.
``` GET /dates?start=&end= ```

- returns all bookings from the start date to the end date in all meeting rooms
    - The format for the dates is "year"-"month"-"day", 2020-12-02 for example.
    Also if there were to be a single digit number like 2 it needs to be preceeded by a 0

## Getting all bookings given specific dates and a organizer
``` GET /dates?start=&end=&organizer=:id ```
- returns all bookings from the start date to the end date for all rooms given a specific organizer

## Getting all bookings given specific dates and a room
``` GET /dates?start=&end=&room=:id ```
- returns all bookings from the start date to the end date for a specifc meeting room

--- 
# Getting bookings/organziers/rooms/repeatingPatterns on their own

## Getting a specific booking by id
``` GET /booking/:id ```
- returns all the data for a specific booking given an id

## Getting all bookings
 ```GET /bookings``` 
- returns an array with all the bookings in all the meeting rooms (example output below)
~~~
[{
    "id": 302137
    "organizerID": Jessica,
    "repeatID": null,
    "roomID": 23097,
    "year": 2019,
    "month": 3,
    "day": 2,
    "timeStart": 1300,
    "timeEnd": 1430,
    "reason": Interview with new Front end dev
},
{
    "id": 409881
    "organizerID": Bob,
    "repeatID": 30872,
    "roomID":0632,
    "year":2020,
    "month":6,
    "day":4,
    "timeStart":1015,
    "timeEnd":1100,
    "reason": Monthly review with team
},
{
    "id": 70935
    "organizerID": Bob,
    "repeatID": null,
    "roomID": 23097,
    "year":2021,
    "month":12,
    "day":20,
    "timeStart":1015,
    "timeEnd":1100,
    "reason": Office Christnams Party
}]
~~~
- The time is written in 24 hour time (from 00:00 to 23:59) and there is no ":" separating the hours and minitues, 
so 14:05 is just 1405

## Getting all organizers
``` GET /organizers ```
- returns all organizer IDs and names (as shown below) in an array
~~~
[{ "organizerID": number, "name": string (max 100 characters) }]
~~~

## Getting all rooms
``` GET /rooms ```
- returns all room IDs and names (as shown below)
~~~
[{ "roomID": number, "name": string (max 100 characters) }]
~~~

## Getting all repeating patterns
``` GET /repeats ```
- returns an array filled with objects (exmple below)
~~~
[
    {
        "repeatID": 20045
        "id": 70935
        "repeatCycle": {
            "day":0,
            "week":0,
            "month":0,
            "year":0,
        },
        "repeatDays": {
            "sunday":0,
            "monday":0,
            "tuesday":0,
            "wednesday":0,
            "thursday":0,
            "friday":0,
            "saturday":0,
        },
            "endYear": 2020,
            "endMonth": 10,
            "endDay": 27,
    },
    {
        "repeatID": 992207
        "id": 409881
        "repeatCycle": {
            "day":0,
            "week":0,
            "month":1,
            "year":0,
        },
        "repeatDays": {
            "sunday":0,
            "monday":0,
            "tuesday":0,
            "wednesday":0,
            "thursday":0,
            "friday":0,
            "saturday":0,
        },
        "endYear": 2020,
        "endMonth": 10,
        "endDay": 27
    }
]
~~~

---
# Creating new bookings/repeating patterns

## Creating new bookings
``` POST /booking ```
- creates a new booking by submitting the following parameters
~~~
{
    "organizerID": number,
    "repeatID": number,
    "roomID": number,
    "year":number,
    "month":number,
    "day":number,
    "timeStart":number,
    "timeEnd":number,
    "reason":string (max 100 characters)
}
~~~
- returns the booking id if data is saved into the database (example of how to access the id in the client side is below)
~~~
res.data.insertId
~~~

## Creating new repeating patterns
``` POST /repeat ```
- creates a new repeat row for a given event (the parameters needed are shown below)
~~~
{
    "id": number,
    "repeatCycle": {
        "day":0,
        "week":0,
        "month":0,
        "year":0,
    },
    "repeatDays": {
        "sunday":0,
        "monday":0,
        "tuesday":0,
        "wednesday":0,
        "thursday":0,
        "friday":0,
        "saturday":0,
    },
    "endYear": number,
    "endMonth": number,
    "endDay": number
}
~~~
- the id parameter links the repeating pattern to a specific booking
- returns the repeatID (the unique id for the specific repeating pattern)

- "repeatCycle" describes at what intervals the event will repeat,
 so it will differenciate between daily, weekly, monthly and yearly repetitions.
 The 4 types will be reperesent by 4 bits 0000 where each zero represents a type.
 The first bit represents days, the second weeks, the third months and the fourth years.
 If the bit is a 1 then it is on. Only one of the 4 bits can be on at a time.
 Also if the month or year options are selected then the event repeats on that day.
 If the day isn't availiable like a leap day, then it places it on the next available day.

- "repeatDays" describes on what days of the week the repeat will be happening.
 Like "repeatCycle" each bit represents a different time, but there can be more than one bit can be on at a time.
 In "repeatDays" the first bit represnts Sunday, the second Monday, the third Tuesday and so on until
 the seventh bit which is Saturday.

---
# Updating a specific booking/repeating pattern

## Updating a selected booking
``` PATCH /booking/:id ```
- updates booking some details of a specific booking given an id
    - the details that are selected can be selected from a list of optional parameters, shown below
~~~
{
    "organizerID": number,
    "repeatID": number,
    "roomID": number,
    "year":number,
    "month":number,
    "day":number,
    "timeStart":number,
    "timeEnd":number,
    "reason":string (max 100 characters)
}
~~~

- returns the old values (useful when implementing an undo button)

## Updating a selected repeating pattern
``` PATCH /repeat/:repeatID```
- updates the entries given a specific repeatID

---
# Deleting a specific booking/repeating pattern

## Deleting a selected booking
``` DELETE /booking/:id ```
- deletes a specific booking (and a specific repeat data entry if the booking has a repeatID) and returns it 
(example of what is returned shown below)
~~~
{
    "id": 70935,
    "organizerID": Megan,
    "repeatID": null,
    "roomID": 23097,
    "year":2021,
    "month":12,
    "day":20,
    "timeStart":1015,
    "timeEnd":1100,
    "reason": Office Christnams Party
}
~~~

- A undo button can be implemented where once the booking is deleted from he database it can be stored in the sessions data

## Deleting a selected repeating pattern
``` DELETE /repeat/:repeatID```
- deletes a specific repeat event and returns it (example of what is returned is shown below)
~~~
{
    "repeatID": 20045,
    "id": 70935,
    "repeatCycle": {
        "day":0,
        "week":1,
        "month":0,
        "year":0,
    },
    "repeatDays": {
        "sunday":0,
        "monday":1,
        "tuesday":0,
        "wednesday":0,
        "thursday":1,
        "friday":1,
        "saturday":0,
    },
    "endYear": 2020,
    "endMonth": 10,
    "endDay": 27
}
~~~

- the return can be used for implementing an undo button for example