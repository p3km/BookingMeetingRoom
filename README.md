# The main README file of the booking a meeting room project

## Project Description
This project allows users and organisors to check the availability and book meeting rooms in the office. This is achieved by having a ReachJS with Redux front end interface. The front end interface is connected to the server through custom API calls (there is more documentation detailing those calls). The server stores all bookings and events on a database. All the bookings and data is synchronised across front end instaces via the use of WebSockets, which allow for a two way connection between client and server. All the client's actions are logged on the server via middleware.

## Other documentation
- ### [API documentation](./routes/api_design_v3.md)
- ### [Running Locally](./docs/RunningLocally.md)

