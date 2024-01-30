## Overview
Welcome to my exercise tracking app! I created this as a convenient and easy-to-use solution to keeping track of weightlifting stats. You can save your workouts
to your calendar and edit the sets, reps, and weight amounts for those exercises. It also keeps a log of your PR (personal record) for each exercise, that way you can implement progressive overload when entering a new workout. 

I'd like to thank Prime Digital Academy and my instructor Chris Black for teaching my classmates and I everything that we know!


## Prerequisites
Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)


## Setup
Create a database called exercise_tracker_app. If you would like to name your database something else, you will need to change `exercise_tracker_app` to the name of your new database name in `server/modules/pool.js`
Fork and clone this repository
To generate all necessary tables and seed data, go to the database.sql and run the queries in Postico (we recommend using PostgreSQL and Postico)
Open up your editor of choice (we recommend Visual Studio Code) and run "npm install"
Open two terminals: run "npm run server" in one, and "npm run client" in the other-- the second one will automatically open a new browser tab for you


## Using the App
Create an account and login-- you will now be taken to your calendar! You can select a day, click the "let's go" button and you will be taken to the page associated with that day. You can click the "add exercise" button to add your exercises to your workout for that day, and enter all of the sets/reps/weight amounts that you plan to complete. If you need to edit any of these numbers, or delete an exercise, there are buttons on each of the cards that will allow you to do so. 


## Technologies
PostgreSQL: database
Node.js
Express
Redux: state management
React.js: front end
Material UI: styled components