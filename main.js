const express = require("express");
const axios = require("axios");
const xml2js = require("xml2js");

const app = express();
const port = process.env.PORT || 3000;

app.get("/yt-video/:channelId", async (req, res) => {
    const channelId = req.params.channelId;

    if (!channelId) {
        return res.status(400).send("Hey chat! Tell this professional Twitch streamer they forgot to give this command a channel ID!");
    }

    try {
        const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
        const response = await axios.get(feedUrl);
        const parser = new xml2js.Parser();

        parser.parseString(response.data, function (err, result) {
            if (err) {
                return res.status(500).send(`Yikes, I hit a technical snag, try again in a bit`);
            }

            const latestVideo = result.feed.entry[0];
            const videoTitle = latestVideo.title[0];
            const videoUrl = latestVideo.link[0].$.href;
            
            res.send(`${videoTitle} - ${videoUrl}`);

        });
    } catch (error) {
        res.status(500).send(`There was an error getting the latest video, sorry about that!, ${error}`)
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});