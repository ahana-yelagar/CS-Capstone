# CS-Capstone-Campus-Safety-App

A mobile application built with **React Native** to enhance campus safety for students, staff, and visitors at **Drake University**. The app provides quick access to emergency resources, allows for safety reporting, and connects to a live backend hosted on **AWS** with an SQL database. Much of the code in this repository is built by ExpoGo, our sandbox client. The actual features we developed are all located inside the `ReactApp` folder. We also developed code to support our SQL server and to style our Javascript.

## 🚨 Features

-  **Register and Login**
  Create an account in our user database and sign in.

-  **Emergency Help Button**  
  Instantly notifies campus Public Safety in the event of an emergency.

- **Safety Timer**  
  Set a timer when walking alone. If not canceled before the countdown ends, Public Safety is automatically notified.

- **Report an Incident**  
  Submit reports either officially (with your identity) or anonymously. Reports are pushed to our database backend via an API.

- **Chaperone Request**  
  Request a campus escort to walk you safely to your destination. This feature is currently in a demo state as we are not currently communicating directly with Public Safety

- **Live Map of Campus Activity**  
  View a real-time map of campus with safety reports.

## 📡 Backend & Data Flow

- **Database**: AWS-hosted **SQL database**
- **API Integration**: App interactions like logins, map views, and reports communicate with the backend through **APIs**.

## 📱 Technologies Used

- **Frontend**: React Native (cross-platform)
- **Networking**: Axios
- **Maps**: React Native Maps
- **Backend**: AWS EC2 / RDS (SQL) with custom API endpoints (Node.js)


Adapted from: https://chatgpt.com/share/68210ed4-0c10-800e-98d5-d1f3c15e520c
