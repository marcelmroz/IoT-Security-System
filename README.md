# IoT Security System

This repository contains the source code for an IoT Security System, which uses an ESP32 device equipped with an HC-SR04 ultrasonic sensor to monitor and manage access to a secure area. The system includes a backend developed in Node.js and a frontend built with React.

## Features

- **Real-time Threat Monitoring**: Utilizes an ultrasonic distance sensor to detect and log unauthorized access attempts.
- **Web-Based Interface**: Allows for real-time monitoring and administration via a web application.
- **Secure Communication**: Ensures data integrity and security from the IoT device to the web application.
- **User Management**: Supports multiple user roles with different access controls, including administrators and regular users.

## Getting Started

Follow these instructions to get the IoT Security System running on your local machine.

### Prerequisites

Ensure you have the following installed:
- Node.js
- npm (Node Package Manager)

### Installation

1. Clone the repository:

`git clone https://github.com/marcelmroz/IoT-Security-System`

2. Navigate to the frontend directory and build the React application:

` cd IoT-Security-System/frontend && npm install && npm run build `

3. Navigate to the backend directory and start the server:

`cd ../backend && npm install && node server.js`

4. Configure and run esp32 accordingly

5. Access the web interface at `http://localhost:3000` (ensure the backend and frontend are configured to run on this port).
Use the system to monitor access, manage users, and view logs of detected threats.
