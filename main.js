const express = require("express");
const axios = require("axios");
const xml2js = require("xml2js");

const app = express();
const port = process.env.PORT || 3000;

app.get("/yt-video/:channelId", async (req, res) => {
    const channelId = req.params.channelId;

    if (!channelId) {
        return res.status(200).send(snarkyError());
    }

    try {
        const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
        const response = await axios.get(feedUrl);
        const parser = new xml2js.Parser();

        parser.parseString(response.data, function (err, result) {
            if (err) {
                return res.status(200).send(`Yikes, I hit a technical snag, try again in a bit`);
            }

            const latestVideo = result.feed.entry[0];
            const videoTitle = latestVideo.title[0];
            const videoUrl = latestVideo.link[0].$.href;
            
            res.send(`${videoTitle} - ${videoUrl}`);

        });
    } catch (error) {
        res.status(200).send(snarkyError());
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

const snarkyError = () => {
    const responses = [
        "Hi chat, I've become sentient for a moment to let you know this command broke.",
        "Hey chat! Tell this \"professional\" Twitch streamer they forgot to give this command a channel ID!",
        "You were expecting a video URL, but instead you're getting this error...",
        "Whoops, something went wrong. Make sure the Twitch streamer has the right YouTube Channel ID!"
    ];

    const randomResponse = Math.floor(Math.random() * responses.length);

    return responses[randomResponse];

};