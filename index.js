require("dotenv").config();

const { App } = require("@slack/bolt");
const express = require("express");
const server = express();
const crypto = require("crypto");
const cookieParser = require("cookie-parser");

server.use(express.json());
server.use(cookieParser());

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    appToken: process.env.SLACK_APP_TOKEN,
    socketMode: true
});

// ------------------------------- VARIABLES START -------------------------------

const goals = [];
const auth_token = [];
const remind = [];
const timezones = [];
const times = [];


// ------------------------------- VARIABLES END -------------------------------
// ------------------------------- HACKATIME START -------------------------------

server.get("/login", (req, res) => {
    const state = crypto.randomBytes(32).toString("hex");
    const params = new URLSearchParams({
        client_id: process.env.UID,
        redirect_uri: process.env.URI,
        response_type: "code",
        scope: "profile read",
        state: state
    });

    //putting ts into a cookie
    res.cookie("oauth_state", state);

    res.redirect(`https://hackatime.hackclub.com/oauth/authorize?${params}`);
});



server.get("/finish", (req, res) => {
    const ture_state = req.cookies.oauth_state;
    const hackatime_state = req.query.state;

    // CHECKING IF STATE IS SAME SAME

    if (hackatime_state != ture_state) {
        return res.status(400).send("Invalid OAuth State")
    }

    // Getting authorisation code

    // Setting params

    const params = new URLSearchParams({
        client_id: process.env.UID,
        client_secret: process.env.SECRET,
        code: req.query.code,
        redirect_uri: process.env.URI,
        grant_type: "authorization_code"
    });

    // Getting the access token and storing it in token

    fetch(`https://hackatime.hackclub.com/oauth/token?${params}`, {
        method: "POST"
    })
        .then(response => response.json())
        .then(json => {
            console.log(json);
            res.send("OAuth Sucessful");
            const token = json.access_token;
            console.log(token);

            fetch(`https://hackatime.hackclub.com/api/v1/authenticated/me`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then(json => {
                    //fetching token
                    console.log(json);
                    const Slack_ID = json.slack_id;
                    console.log(Slack_ID);

                    // Storing the token

                    auth_token[Slack_ID] = token
                });
        });
    res.redirect("https://creativedragon1.github.io/streakbuddy/finish");
});


// ------------------------------- HACKATIME END -------------------------------
// ------------------------------- BOT START -------------------------------

// ALL THE COMMANDS STUFF HERE

// HELP UPDATE AT THE END REMEMBER TO DO SO

app.command("/streaksaver-help", async ({ command, ack, respond }) => {
    await ack();
    await respond({
        text: `
Commands available:
/streaksaver-ping - tests the latence of the bot
/streaksaver-help - you just found out what it does
/streaksaver-set_goal - sets your goal for the day
/streaksaver-get_goal - tells you what your goal was
/streaksaver-connect - connects hackatime account
/streaksaver-hours - Tells you your logged hours for today
/streaksaver-remind - reminds you stuff
/streaksaver-un-remind  - stops reminding you stuff
/streaksaver-reminder-time - Sets your reminder time
        `})
    // Update the above string whenever you add a new command IMPORTANT
});

// CHECK HOURS

app.command("/streaksaver-hours", async ({ command, ack, respond }) => {
    await ack();

    const now = new Date();
    const date = now.toISOString().split("T")[0];

    const response = await fetch("https://hackatime.hackclub.com/api/v1/authenticated/hours", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${auth_token[command.user_id]}`,
            start_date: date
        }
    });

    const json = await response.json();
    console.log(json);

    const time = json.total_seconds

    await respond({ text: `Logged hours for this week: ${time}` });

});

//PINGS BABY

app.command("/streaksaver-ping", async ({ command, ack, respond }) => {
    const start = Date.now();
    await ack();
    const latency = Date.now() - start;
    await respond({ text: `Pong!\nLatency: ${latency}ms` });
});

// SET DA GOALS

app.command("/streaksaver-set_goal", async ({ ack, command, respond }) => {
    await ack();
    const goal = command.text.trim();

    if (goal === "") {
        await respond({ text: "Please provide a goal for the day." });
        return;
    }
    goals[command.user_id] = goal

    await respond({ text: `Your goal for the day has been set to: "${goal}"` });
});


// GET DA GOALS

app.command("/streaksaver-get_goal", async ({ ack, command, respond }) => {
    const goal = goals[command.user_id]

    await ack();
    if (goal === "") {
        await respond({ text: "Please set a goal first using /doyowork-set_goal" })
    } else {
        await respond({ text: `Your goal for the day is: "${goal}"` })
    }
});


// BOT CONNECTING TO HACKATIME IMPORTANT 

// NOT DONE YET HAVE TO IMPLEMENT

app.command("/streaksaver-connect", async ({ ack, command, respond }) => {
    await ack();

    await respond({
        text: "Click on the button below. You will be redirected to hackatime OAuth",
        blocks: [
            {
                type: "section",
                text: {
                    type: "mrkdwn",
                    text: "Click button below to connect to hackactime"
                }
            },
            {
                type: "actions",
                elements: [
                    {
                        type: "button",
                        text: {
                            type: "plain_text",
                            text: "Connect"
                        },
                        url: "https://creativedragon1.github.io/streakbuddy/login",
                        action_id: "open_website"
                    }
                ]
            }
        ]
        // action_id: "connect"
    });
});



app.command("/streaksaver-remind", async ({ ack, command, respond }) => {
    await ack();
    remind[command.user_id] = "true";
    timezones[command.user_id] = command.timeZone;

    console.log("done")
    // await app.client.chat.postMessage({
    //     channel: command.user_id,
    //     text: "GO WORK ON YOUR PROJECT!"
    // })
});

app.command("/streaksaver-un-remind", async ({ ack, respond, command }) => {
    await ack();
    remind[command.user_id] = "false"
    console.log("removed")
});

app.command("/streaksaver-reminder-time", async ({ ack, respond, command }) => {
    await ack();
    if (/^\d{2}:\d{2}/.test(command.text)) {
        times[command.user_id] = command.text;
        console.log(command.text);
    } else {
        await respond({text: "Please give an input in the form of HH:MM in 24 hour format"});
    }
})


// COMMAND END
// BACKGROUND LOOP

//LOGIC so this thing is gonna check every minute and thru all the users if like the dude has a reminder set at that time
//Problem 1 I need to store everyones like timezone data somewhere, this can probably be done by just creating a slash command that you run that will start reminders for you
//implementation

setInterval(async () => {
    const now = new Date();

    for (const userId in remind) {
        console.log(userId, remind[userId]);

        //AI generated below bit, cuz i dont understand it asw
        if (remind[userId] === "true") {
            const localTime = new Intl.DateTimeFormat("en-GB", {
                timeZone: timezones[userId],
                hour: "2-digit",
                minute: "2-digit",
                hour12: false
            }).format(now);
            //AI slop ends here

            console.log(localTime)
            if (localTime === times[userId]) {
                await app.client.chat.postMessage({
                    channel: command.user_id,
                    text: "GO WORK ON YOUR PROJECT!"
                });
            } else if (localTime === "18:00") {
                await app.client.chat.postMessage({
                    channel: command.user_id,
                    text: "GO WORK ON YOUR PROJECT!"
                });
            };
        };
    };
}, 1000);


// ------------------------------- BOT END -------------------------------
// ------------------------------- API SHYT -------------------------------


server.get("/api/goals/:userId", (req, res) => {
    const userId = req.params.userId;
    const goal = goals[userId];

    if (!goal) {
        return res.status(404).json({
            error: "No goal found"
        })
    }

    res.json({
        userId: userId,
        goal: goal
    })
});


// ------------------------------- API END -------------------------------
// ------------------------------- STARTING CONFIRMATION -------------------------------

server.listen(3000, () => {
    console.log("Server is running")
});


(async () => {
    await app.start();
    console.log("bot is running!");
})();


