# Ordering App

## Technologies used: React.js, Express.js, Node.js, MongoDB, Firebase.

The e-food ordering app is a web application that allows users to browse and order food from their favorite restaurants online.
It is built using React, a popular JavaScript library for building user interfaces, as the frontend framework.
The backend is built using Express.js, a Node.js framework for building web applications, and MongoDB, a NoSQL database, is used to store the data.
Firebase, a platform for developing mobile and web applications, is used for user authentication and login.

The app's interface allows users to view a list of available restaurants, browse their menus, and place orders for delivery.
Users can also view their previous orders and track their current orders in real-time.
The app also allows users to create an account and save their personal information and preferred delivery addresses for a faster checkout experience.

The app's backend is responsible for handling all the data-related operations, such as fetching and updating information from the MongoDB database.
The backend communicates with the frontend through an API, which allows for seamless integration between the two.

Overall, the e-food ordering app provides a convenient and user-friendly way for customers to order food online.

## Live website

```bash
https://ordering-app.fzachopoulos.com
```

Note that the backend is hosted on a free tier on render.com. It might need a few seconds for a cold startup!

## Getting Started

Clone the repositories (client and server) to your local machine

```bash
git clone https://github.com/zachfotis/orderingApp-React.git
git clone https://github.com/zachfotis/orderingApp-Server.git
```

Install the necessary packages

```bash
npm install
```

Start the development server

```bash
npm run dev
```

## Backend

The backend of the e-food ordering app is built using Express.js, a Node.js framework for building web applications. It communicates with the frontend through an API and also handles all the data-related operations. The folloning environmental variables are need in order to run the server:

```bash
  GOOGLE_PLACES_API_KEY = ''
  MONGODB_URI = ''
  ORIGIN_URI = ''
```

If you are itended to cooperate in the project please request for the actual keys.

## Database

The app uses MongoDB, a NoSQL database, to store all the data. The database connection is set up in the server.js file and the database models are located in the models folder.

## API

The API routes are defined in the router folder. Each route corresponds to a specific functionality in the app, such as fetching restaurant data, placing orders, and getting geolocation using Places and Geolocation APIs.

## Authentication and Authorization

The app uses Firebase for user authentication and authorization. The Firebase configuration is set up in the .env file using the following variables.

```bash
VITE_APP_apiKey = ''
VITE_APP_authDomain = ''
VITE_APP_projectId = ''
VITE_APP_storageBucket = ''
VITE_APP_messagingSenderId = ''
VITE_APP_appId = ''
```

## Frontend

The frontend of the e-food ordering app is built using React, a popular JavaScript library for building user interfaces. The app's interface is divided into several components, each located in the src/components folder.

Also, in order for the client app to connect to the server the following env variable is required

```bash
VITE_APP_SERVER_URL = ''
```

## State Management

The app uses the context API for state management. The context is set up in the src/context folder and is used to share data between components and make it accessible throughout the app.

## Deployment

The app is currently deployed on Vercel.com (client) and Render.com (server).

## Next Steps

Several features of the app have not been implemented yet. The features to be developed are:

- User Registration and Login using Firebase
- Previous orders page (client)
- Change registered user info page (client)
- Add/remove favorite store functionality and page (client)
- Logout option (client)
- Implement Stripe and Paypal payment methods (client and server)
- Validate registered user (server)
- Add order on MongoDB, when user is registered (server)
- Secure backend routes (server)
