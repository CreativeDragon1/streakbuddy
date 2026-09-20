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

// ------------------------------- VARIABLES END -------------------------------
// ------------------------------- HACKATIME START -------------------------------

server.get("/login", (req, res) => {
    const state = crypto.randomBytes(32).toString("hex");
    const params = new URLSearchParams({
        client_id: process.env.UID,
        redirect_uri: "http://localhost:3000/finish",
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
});


// ------------------------------- HACKATIME END -------------------------------
// ------------------------------- BOT START -------------------------------

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
        `})
    // Update the above string whenever you add a new command IMPORTANT
});

// CHECK HOURS

app.command("/streaksaver-hours", async ({ command, ack, respond }) => {
    await ack();    

    const response = await fetch("https://hackatime.hackclub.com/api/v1/authenticated/hours", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${auth_token[command.user_id]}`,
            start_date: Date.now()
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


// BOT CONNECTING TO HACKATIM IMPORTANT 

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
                        action_id: "connect"
                    }
                ]
            }
        ]
        // action_id: "connect"
    });
});

app.action("connect", async ({ ack, respond }) => {
    await ack();

    await respond("hello")
})

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


