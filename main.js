const express = require("express");
const axios = require("axios");
const xml2js = require("xml2js");

const app = express();
const port = process.env.PORT || 3000;

app.get("/yt-video/:channelId", async (req, res) => {
    const channelId = req.params.channelId;
    const filter = req.query.filter?.toUpperCase() || "";

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

            if (!result.feed.entry) {
                return res.status(200).send(`I think you've become a bit too eager... looks like you don't have any videos yet!`);
            }

            for (item in result.feed.entry) {
                const videoFeedItem = result.feed.entry[item];

                const video = {
                    title: videoFeedItem.title,
                    url: videoFeedItem.link[0].$.href
                }

                const chatMessage = `${video.title} - ${video.url}`

                if (filter) {
                    if (!video.title.toString().toUpperCase().includes(filter)) {
                        return res.send(chatMessage);
                    }
                } else {
                    return res.send(chatMessage);
                }

            }

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
        "Hey chat! Tell this \"professional\" streamer they forgot to give this command a channel ID!",
        "You were expecting a video, but instead you're getting this error...",
        "Whoops, something went wrong. Make sure the streamer has the right YouTube Channel ID!"
    ];

    const randomResponse = Math.floor(Math.random() * responses.length);

    return responses[randomResponse];

};