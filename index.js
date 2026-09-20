require("dotenv").config();
const express = require("express");
const server = express();

server.use(express.json());


const { App } = require("@slack/bolt");

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

    if (!goal){
        return res.status(404).json({
            error: "No goal found"
        })
    }

    res.json({
        userId: userId,
        goal: goal
    })
});

server.listen(3000, () => {
    console.log("Server is running")
});

(async () => {
    await app.start();
    console.log("bot is running!");
})();

