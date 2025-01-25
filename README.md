# Car Registration Application

This repository demonstrates a full-stack application with a **C# 8 back-end** and a **React front-end**.

---

## Prerequisites
- C# 8.0
- Node.js and npm

Both the back-end and front-end applications must be running for the system to function properly.

---

## Initial Setup (Front-end)
1. Navigate to the `car-registration-frontend` directory.
2. Install required dependencies by running:
   ```bash
   npm install react-scripts
   ```

---

## Running the Application
### Step 1: Start the Back-end
1. Open a command window.
2. Navigate to the back-end implementation directory:
   ```bash
   CarRegistrationApplication\CarRegistrationApp
   ```
3. Start the back-end application:
   ```bash
   dotnet run
   ```
4. Ensure that C# 8.0 is installed on your system.

#### Expected Output:
```plaintext
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
```

### Step 2: Start the Front-end
1. Open a second command window.
2. Navigate to the front-end implementation directory:
   ```bash
   C:\_FLAP03\GBZZBEBJ\Working\dotnet\CarRegistrationApplication\car-registration-frontend
   ```
3. Start the front-end application:
   ```bash
   npm start
   ```

#### Expected Output:
```plaintext
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
```

---

## Application Links

### Back-end Links
- **API without a filter:** [https://localhost:7216/api/cars](https://localhost:7216/api/cars)
- **API with a filter (e.g., Tesla):** [https://localhost:7216/api/cars?make=Tesla](https://localhost:7216/api/cars?make=Tesla)
- **SignalR Service:** [https://localhost:7216/registrationHub](https://localhost:7216/registrationHub)

### Front-end Links
- **Home:** [http://localhost:3000/](http://localhost:3000/) (uses `https://localhost:7216/api/cars`)
- **Registration Page:** [http://localhost:3000/registration](http://localhost:3000/registration) (uses `https://localhost:7216/registrationHub`)

---

## SignalR Testing
- **Testing Tool:** [SignalR Web Client](https://gourav-d.github.io/SignalR-Web-Client/dist/)
- **Options:** Enable the "Skip Negotiations" option.
- **Service Frequency:** Runs every 3 seconds during testing. For production, adjust the interval to 1 minute.

![Screenshot](https://github.com/EricCronje/CarRegistrationApplication/blob/main/SIgnalR_Test.png?raw=true)
---

## Screenshots
For a visual demonstration, refer to the screenshot below:

![Screenshot](https://github.com/EricCronje/CarRegistrationApplication/blob/main/Results.png?raw=true)