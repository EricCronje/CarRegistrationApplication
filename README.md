# CarRegistrationApplication
This is a demonstrates of a full stack application. 
With a C# 8 back-end and a React front-end.

In order to run the applictation. Both the C# back-end and the frontend application must be running.

#The Backend Links:
This is the link to C# 8 backend without a filter:
https://localhost:7216/api/cars

Link with a filter:
https://localhost:7216/api/cars?make=Tesla

There is alos a background SignalR service:
https://localhost:7216/registrationHub

Tested the signalR with this utility:
https://gourav-d.github.io/SignalR-Web-Client/dist/
with the skip Negotioations option.
The background service is running every 3 seconds.
This is a bit fast for production - would then set it every 1 minute.

#The Frontend Links:
http://localhost:3000/				- using the link https://localhost:7216/api/cars
http://localhost:3000/registration	- using the SignalR link https://localhost:7216/registrationHub


#Data returned
For this demonstration there are three cars.


