# Journal 1

Time spent ~ 1hr 22min

Github Commit: https://github.com/CreativeDragon1/streakbuddy/commit/c9a0d14ba94a554dafba26aa5c8eb10784c22603

## AI DISCLOSURE

I used a bit of AI to understand how to make like API endpoints for slack bots cuz tbh I have no clue, I understood you need to use something called as "express" and how it works is by basically creating get/post requests to the server whichh was really cool

## What I did

I made a bot ofc using help from the stardance bot help, made the following 4 commands
```
/doyowork-ping
/doyowork-help
/doyowork-set_goal
/doyowork-get_goal  
```

I also made API Endpoints for the same thing, where if you make a request in the format

```
localhost:3000/api/goals/USERID
```

it returns it in the form
```
{"userId":"U07LVRHN74G","goal":"test"}
```
Aditionally, I've added a few fail safes as well like trying to set a goal without a goal, or making incorrect api requestss for users with no goal.



# Journal 2

Time spent ~ 1hr 30 min

Github Commit: https://github.com/CreativeDragon1/streakbuddy/commit/9ccb1897669f7f356a4cfe1d5e459ab612572b2a

## AI DISCLOSURE

User AI to understand what OAuth is, I used it initally to understand how hackatime app integration works as well. Also learnt on how to use cookies, cause I have 0 clue how to use it. In general, its my first time codding in javascript, a bot and making a thing which has api end points by myself and not having ai do it for me.

## What I did
I feel like I did quite a bit in this time, I made a new hackatime OAuth app and integrated it into the ```index.js``` slack bot. Although there is no way for you to actually use it through the bot as of now, the important thing is it works! 

You would use it by going to ```http://localhost:3000/login``` which will redirect you automatically to ```https://hackatime.hackclub.com/oauth``` where it would automatically fill all required parameters. Once you're logged in, it would redirect you to ```http://localhost:3000/finish``` with the code

Important security feature I implemented was using states, when I try logging in to the website through hackatime, the current a random 32 character string is passwed on to hackatime. After login, same string must be returned inorder for me to validate the code. 

This state is stored in the users cookies, so lives locally on the users browsers and should be safe, atleast I hope so.


# FORMAT

# Journal 3

Time spent ~40min

Github Commit: https://github.com/CreativeDragon1/streakbuddy/commit/250bcd76fe3c1806285931f1ecdf491ebf718530

## AI DISCLOSURE

I was learning some more ways the slack bot can respond in and try creating a button which can run a action. I used AI to understand how to style, requirements and syntax in which I have to create the buttons and everything. learnt about .actions as well

## What I did
Renamed the bot to streaksaver from Do Yo Work, which was a temoprary name anyway. And yeah, worked on this which was really fun, as I crashed out cause no matter what I did, I couldn't get the json format right from memory, I had to reference to chatgpt quite a bit and I believe ive figured it out - kinda.

Project is coming along pretty nicely, I have to write a README.md soon as well, and finish the hackatime integration. I also need to write the actual reminder system my self which is gonna be fun (its not) and I get why people hate on JS now. 

P.S I've had to alt tab into edge/slack to test the bot in my private channel. Hopefully no time deductions. 

I also did some housekeeping in the ```index.js``` considering its the place im gonna be yapping a lot in so yeah.

# Journal 4

Time spent ~ 1hr and like 10 min

Github Commit: https://github.com/CreativeDragon1/streakbuddy/commit/d91c5a60b22d9497c940bc9067d4ea6f1322fb59

## AI DISCLOSURE

Mainly used it for checking me code cause for some dumb ah reason it just won't WORK like WHY and used the ai gen for commits cuz its easier and my friend told me that I dont write good commits

## What I did
So yeah, after like a bajilliion crashouts with my friends, hackatime api just being stupid, I FINALLY GOT THE ACCESS TOKEN YAYYAYAYAYYAY. I WAS ABLE TO STORE IT in a variable called ```token```. Now i have to figure out how to actually use this Access token, which I spent like 10 min just reading the docs for AND I STILL COULDNT UNDERSTAND SHI like who made it bru, its geniunely so hard to follow as a beginner and considering hackclub is a place where your gonna find a lot of beginners its way to hard to understand. welp this journal slowly becoming a meta post anyway.

So yeah, I re worked how the access token is collected, before I was doing it in a way too big if statement and then the indexes got to me as I couldnt follow where what was, i heavily commented and FINALLY it sort of works, I still need to find a way to get like get the slack id using it which imma figure out next. Using that slack ID ill be able to store the access token for later use :0.

# Journal 5

Time spent ~ 1 hour

Github Commit: https://github.com/CreativeDragon1/streakbuddy/commit/b104460e3eebe8be04de156cf8a625fba1bd757f

## AI DISCLOSURE

Using AI for commit message again, and use it again to help me debug, cuz I keep making stupid typos and I am still understanding how this whole thing works. I am doing this with like broken knowledge about JS, C++ and Python which is a task for me, BUT I AM LEARNING WHICH IS IMPORTANT

## What I did

I GOT THE HOUR THINGY WORKING BABYYY, now when you use the command ```/streaksaver-hours```, its going to output the number of seconds you spent coding that week so yeah lets gooooo man, finally got that bit working as well. YAY

I am learning the importance of comments now and HOW Much they help us undersstand what we have written. Although my code migght seem repetitive whit me just changing some logic, it still requires a lot of my brain cells which im slowly loosing as I continue coding.

Next, I am going to implement a reminder system which should hopefully DM you at times YOU can set (default to 9pm) to do work if you haven't done work already. Not sure HOW I am gonna implement it but where there is a will there is a way I gues, and there is ChatGPT asw /j

WISH ME LUCK AHHH

# Journal 6

Time spent ~ 1 hour

Github Commit: will come in next commit

## AI DISCLOSURE

Using AI for commit again. Same usage as before, understand what the code is acc all about and how to use certain stuff. Like I did not know how to make a bot send a dm to you so I used chatgpt to understand the syntax, and yeah, I did use gpt to fully generate a small bit of the code where I get each persons local time, cuz I do NOT know how to do that its gen so hard

## What I did

Its currently 12:20am, my eyes are dead and my brain processing speed has fallen more than my grades. I didn't do that much or considerably that much but i created 2 new commands ```/streaksaver-remind``` and ```/streaksaver-un-remind``` which as the name says will opt you in or out for a reminder message. The way it works is when you run ```/streaksaver-remind```, you load your timezone (taken from your slack data) and you opt in for reminders. ```/streaksaver-un-remind``` simply removes you from the list.

I also implemented a new set interval that will cycle every second (going to increase it to a min or every 5 min) where its going to cycle through every single users current time zone and if it matches with the time they have set to be reminded at. 


AHHH im so tired


# DELETE BELOW BEFORE SHIPPING
# FORMAT

# Journal (number)

Time spent ~

Github Commit: will come in next commit

## AI DISCLOSURE

## What I did