# Stream Elements Custom Chat Commands

Stream Elements allows for the use of "variables" in it's custom chat commands. One of which is the [`${customapi}`](https://docs.streamelements.com/chatbot/variables/customapi) command.

This is just a simple server that will facilitate command responses.

You can access the server with this url: https://stream-elements-chat-b545fcac86d2.herokuapp.com/

## Latest YouTube Video

By using the route `/yt-video/:channelId` you can create a custom chat command that will automaticaly return in chat your latest YouTube video title and a URL to that video.

Example usage: 
```
https://stream-elements-chat-b545fcac86d2.herokuapp.com/yt-video/UCIUZtjtiVIp4O8v8bAohcYg
```

Will return:
```
I bought the $500 Game Boy.... (Analogue Pocket Aluminum Review) - https://www.youtube.com/watch?v=Ooy6bjUppuU
```

### Filter out videos

If you have a pattern that you want to filter out so the command doesn't show those videos, you can include a query parameter for `filter` in the URL.

For example, on my YouTube channel I am consistent with the inclusion of `🔴 LIVE:` in my video titles for a live stream, and I do not want those to come up as my "latest video" for this comamnd.

My URL would be `https://stream-elements-chat-b545fcac86d2.herokuapp.com/yt-video/UCIUZtjtiVIp4O8v8bAohcYg?filter=🔴 LIVE:`

The request will be transformed into acceptable characters, so in this case, the filter would be encoded to be `🔴%20LIVE:`.

Now any video title that contains that string would be skipped, and the next video that does not contain that content will be sent to chat.

The filter content is not case sensitive.

## Setting up a custom command in Stream Elements

1. Log into [Stream Elements](https://streamelements.com)
2. On the left navigation, expand "Chatbot" then select "Custom Commands"
3. Switch to the "Custom Commands" tab
4. Or use [this link](https://streamelements.com/dashboard/bot/commands/custom)
5. Select the "Add new command" button
6. Decide what to call your command, for this example, we'll want to make the commad `!video`
7. The "Response type" field will make use of the `$(customapi)` variable from Stream Elements
8. I want to use the latest YouTube API, so we'll make the command `$(customapi https://stream-elements-chat-b545fcac86d2.herokuapp.com/yt-video/UCIUZtjtiVIp4O8v8bAohcYg)`
9. If you need help getting your YouTube channel ID, just go to YouTube studio and take the channel URL from there. Example: `https://studio.youtube.com/channel/UCIUZtjtiVIp4O8v8bAohcYg`, so `UCIUZtjtiVIp4O8v8bAohcYg` is my chanel ID.