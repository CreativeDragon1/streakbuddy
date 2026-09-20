# streaksaver

## Features

- Track hours logged using hackatime
- Set goals that you must complete
- Get daily reminders at times you set to do atleast 30 min of coding. If you have done atleast 30 min, you won't be reminded
- Some API support
- Uses Hackatime, so its very accurate when it comes to measuring your coding time in the IDE
- OAuth Authentication
- A SLACK BOT YOU CAN TALK TO?!
- Opensource

## How to set it up

1. You invite the bot to your slack workspace
2. You connect your hackatime account to it using ```/streaksaver-connect```
3. When you connect, the browser will automatically send requests and check if the request is good or bad and uses a OAuth Security protocol.
4. That's it, set up is done*

*as of now, bot must be hosted locally on your server/computer to be used. You must use your own hackatime api keys as well to set it up.

1. Run the following command: 
```bash
cp .env.example .env  
```
2. Go to ``` api.slack.com/apps ``` and create a slack bot. 
3. Select upload from manifest, and upload the ```manifest.json``` file
4. Copy paste the app secrets into ```.env```
5. Create your hackatime OAuth App and copy the ``` UID ``` and ``` SECRET ``` into the ``` .env ```
6. Run ``` index.js ``` using ```  node index.js ```
7. Follow the steps above to continue :0 

## Commands

|Command | Description|
| ---- | ---- |
|```/streaksaver-ping``` | tests the latence of the bot|
|```/streaksaver-help``` | you just found out what it does|
|```/streaksaver-set_goal``` | sets your goal for the day|
|```/streaksaver-get_goal ```| tells you what your goal was|
|```/streaksaver-connect ```| connects hackatime account|
|```/streaksaver-hours``` | Tells you your logged hours for today|
|```/streaksaver-remind``` | reminds you stuff|
|```/streaksaver-un-remind ``` | stops reminding you stuff|
|```/streaksaver-reminder-time``` | Sets your reminder time|


## API Usage

| API | Description|
|----|----|
|``` api/goals/:userId ``` | Gets the goals set by a person |
|``` api/streak/:userId ``` | Gets the users hackatime daily streak |
|``` api/hours/:userId ``` | Gets the users hackatime daily hours logged|

## Project file structure

```
streaksaver
|-- node_modules/
|-- .env
|-- .env.example
|-- .gitignore
|-- finish.html
|-- login.html
|-- index.js
|-- JOURNAL.md
|-- README.md
|-- manifest.json
|-- package-lock.json
|-- package.json
```
