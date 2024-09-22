# Stream Elements Custom Chat Commands

Stream Elements allows for the use of "variables" in it's custom chat commands. One of which is the [`${customapi}`](https://docs.streamelements.com/chatbot/variables/customapi) command.

This is just a simple server that will facilitate command responses.

## Latest YouTube Video

By using the route `/yt-video/:channelId` you can create a custom chat command that will automaticaly return in chat your latest YouTube video title and a URL to that video.

Example usage: 
```
url.com/yt-video/UCIUZtjtiVIp4O8v8bAohcYg
```

Will return:
```
I bought the $500 Game Boy.... (Analogue Pocket Aluminum Review) - https://www.youtube.com/watch?v=Ooy6bjUppuU
```