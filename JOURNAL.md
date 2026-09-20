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

Github Commit: will come in next commit

## AI DISCLOSURE

I was learning some more ways the slack bot can respond in and try creating a button which can run a action. I used AI to understand how to style, requirements and syntax in which I have to create the buttons and everything. learnt about .actions as well

## What I did
Renamed the bot to streaksaver from Do Yo Work, which was a temoprary name anyway. And yeah, worked on this which was really fun, as I crashed out cause no matter what I did, I couldn't get the json format right from memory, I had to reference to chatgpt quite a bit and I believe ive figured it out - kinda.

Project is coming along pretty nicely, I have to write a README.md soon as well, and finish the hackatime integration. I also need to write the actual reminder system my self which is gonna be fun (its not) and I get why people hate on JS now. 

P.S I've had to alt tab into edge/slack to test the bot in my private channel. Hopefully no time deductions. 

I also did some housekeeping in the ```index.js``` considering its the place im gonna be yapping a lot in so yeah.

# DELETE BELOW BEFORE SHIPPING
# FORMAT

# Journal (number)

Time spent ~

Github Commit: will come in next commit

## AI DISCLOSURE

## What I did
