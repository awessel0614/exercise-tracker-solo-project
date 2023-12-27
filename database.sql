
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "session" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT references "user",
	"session_date" DATE

);

CREATE TABLE "session_details" (
	"id" SERIAL PRIMARY KEY,
	"session_id" INT references "session",
	"exercise_id" INT references "exercise",
	"set_number" INT,
	"reps" INT,
	"weight" INT,
	"isToggled" BOOLEAN DEFAULT FALSE
);


CREATE TABLE "exercise" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT references "user",
	"exercise_name" VARCHAR (1000) NOT NULL
);



INSERT INTO "exercise" 
	("exercise_name")
	VALUES
	('Squat'), ('Sumo Squat'), ('Deadlift'), ('Romanian Deadlift'), ('Bicep Curls');