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

Github Commit: will come in next commit

## AI DISCLOSURE

User AI to understand what OAuth is, I used it initally to understand how hackatime app integration works as well. Also learnt on how to use cookies, cause I have 0 clue how to use it. In general, its my first time codding in javascript, a bot and making a thing which has api end points by myself and not having ai do it for me.

## What I did
I feel like I did quite a bit in this time, I made a new hackatime OAuth app and integrated it into the ```index.js``` slack bot. Although there is no way for you to actually use it through the bot as of now, the important thing is it works! 

You would use it by going to ```http://localhost:3000/login``` which will redirect you automatically to ```https://hackatime.hackclub.com/oauth``` where it would automatically fill all required parameters. Once you're logged in, it would redirect you to ```http://localhost:3000/finish``` with the code

Important security feature I implemented was using states, when I try logging in to the website through hackatime, the current a random 32 character string is passwed on to hackatime. After login, same string must be returned inorder for me to validate the code. 

This state is stored in the users cookies, so lives locally on the users browsers and should be safe, atleast I hope so.



# DELETE BELOW BEFORE SHIPPING
# FORMAT

# Journal (number)

Time spent ~

Github Commit: will come in next commit

## AI DISCLOSURE

## What I did
