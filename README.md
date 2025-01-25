# CarRegistrationApplication
This is a demonstration of a full stack application. 
With a C# 8 back-end and a React front-end.

In order to run the applictation. Both the C# back-end and the frontend application must be running.
# Initial install (Fron-end)
Please run "npm install react-scripts" in the "car-registration-frontend" directory in the command prompt.

# To run the applications
Open two command windows.

## First command window
In the first windows - browse to the backend implementation
... CarRegistrationApplication\CarRegistrationApp>dotnet run
And run "dotnet run". Please ensure that you have c# 8.0 installed.

### Expected output:

C:\Working\CarRegistrationApplication\CarRegistrationApp>dotnet run
Using launch settings from C:\Working\CarRegistrationApplication\CarRegistrationApp\Properties\launchSettings.json...
Building...
info: Microsoft.EntityFrameworkCore.Update[30100]
      Saved 3 entities to in-memory store.
info: Microsoft.Hosting.Lifetime[14]
      Now listening on: https://localhost:7216
info: Microsoft.Hosting.Lifetime[0]
      Application started. Press Ctrl+C to shut down.
info: Microsoft.Hosting.Lifetime[0]
      Hosting environment: Development
info: Microsoft.Hosting.Lifetime[0]
      Content root path: C:\Working\CarRegistrationApplication\CarRegistrationApp

## Second command window

Browse to the front-end part.

### Expected output:

Microsoft Windows [Version 10.0.26100.2894]
(c) Microsoft Corporation. All rights reserved.

C:\_FLAP03\GBZZBEBJ\Working\dotnet\CarRegistrationApplication\car-registration-frontend>npm start

> car-registration-frontend@0.1.0 start
> react-scripts start 

Compiled successfully!

You can now view car-registration-frontend in the browser.

  Local:            http://localhost:3001
  On Your Network:  http://10.96.0.72:3001

Note that the development build is not optimized.
To create a production build, use npm run build.

webpack compiled successfully


# The Backend Links:
This is the link to C# 8 backend without a filter:
https://localhost:7216/api/cars

Link with a filter:
https://localhost:7216/api/cars?make=Tesla

There is also a background SignalR service:
https://localhost:7216/registrationHub

# Tested the signalR with:
Tested the signalR with this utility:
https://gourav-d.github.io/SignalR-Web-Client/dist/
with the skip Negotioations option.
The background service is running every 3 seconds.
This is a bit fast for production - would then set it every 1 minute.

# The Frontend Links:
http://localhost:3000/				- using the link https://localhost:7216/api/cars
http://localhost:3000/registration	- using the SignalR link https://localhost:7216/registrationHub


# Data returned
For this demonstration there are three cars.
