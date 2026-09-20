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

// Variables

const goals = [];

app.command("/doyowork-help", async ({ command, ack, respond }) => {
    await ack();
    await respond({
        text: `
Commands available:
/doyowork-ping - tests the latence of the bot
/doyowork-help - you just found out what it does
/doyowork-set_goal - sets your goal for the day
/doyowork-get_goal - tells you what your goal was
        `})
    // Update the above string whenever you add a new command IMPORTANT
});

app.command("/doyowork-ping", async ({ command, ack, respond }) => {
    const start = Date.now();
    await ack();
    const latency = Date.now() - start;
    await respond({ text: `Pong!\nLatency: ${latency}ms` });
});

app.command("/doyowork-set_goal", async ({ ack, command, respond }) => {
    await ack();
    const goal = command.text.trim();

    if (goal === "") {
        await respond({ text: "Please provide a goal for the day." });
        return;
    }
    goals[command.user_id] = goal

    await respond({ text: `Your goal for the day has been set to: "${goal}"` });


});

app.command("/doyowork-get_goal", async ({ ack, command, respond }) => {
    const goal = goals[command.user_id]

    await ack();
    if (goal === "") {
        await respond({ text: "Please set a goal first using /doyowork-set_goal" })
    } else {
        await respond({ text: `Your goal for the day is: "${goal}"` })
    }
});



// API STUFF


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

// HACKATIME STUFF

server.get("/login", (req, res) => {
    const state = crypto.randomBytes(32).toString("hex");
    const params = new URLSearchParams({
        client_id: process.env.UID,
        redirect_uri: "http://localhost:3000/finish",
        response_type: "code",
        scope:"profile read",
        state: state
    });

    //putting ts into a cookie
    res.cookie("oauth_state", state);
    
    res.redirect(`https://hackatime.hackclub.com/oauth/authorize?${params}`);
});

server.get("/finish", (req, res) => {
    const true_state = req.cookies.oauth_state;
    const hackatime_state = req.query.state;

    if (true_state === hackatime_state){
        console.log("IT WORKED BABYYY");
        // res.cookie("code", res.query.code);
    }
    // console.log(req.cookies.code);
})

// Turning on server and bot

server.listen(3000, () => {
    console.log("Server is running")
});


(async () => {
    await app.start();
    console.log("bot is running!");
})();

