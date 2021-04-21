API
To access the website, visit localhost:$PORT. Trying to open a URL that isn't the index in the browser will return an error page, redirecting you back home.\

API endpoints are accessed from the $HOSTNAME/api/ endpoint, where $HOSTNAME is URL the server is being run from (e.g. localhost:3002, mysite.net). For example, GET $HOSTNAME/api/exhibits/42 would return the exhibit with the exhibitID 42.

Exhibits
GET api/exhibits
Returns a list of exhibits.

GET api/exhibits/:exhibitID
exhibitID: number
Returns the data for the exhibit with the ID :exhibitID.
If the specified exhibit does not exist, the endpoint returns status 404.
If :exhibitID is malformed (not a number), the endpoint returns status 400.
POST api/exhibits
To create an exhibit, POST a JSON object of the format
{
    "title": string,
    "body": string | null,
    "type": "text" | "local-image" | "external-image",
    "source": string | null,
    "imagedata": string | null,
    "author": string
}
If creating an exhibit of type "text", "body" should be a string containing the content of the post, and "source" and "imagedata" should be null.
If creating an exhibit of type "local-image", "body" and "source" should be null, and "imagedata" should be a string containing the contents of the image encoded in "base64".
If creating an exhibit of type "external-image", "body" and "imagedata" should be null, and "source" should be a string containing the URL of the external image being posted.
Comments
GET api/comments/:exhibitID
:exhibitID: number
Returns a list of comments for the exhibit whose ID is :exhibitID.
WebSockets
Comments are created using a WebSocket API. To post a comment, connect to the WebSocket server hosted at ws://$HOSTNAME, and register your client to an exhibit by sending a message of the format:

{
    "type": "changeExhibit",
    "exhibitID": int
}
where the key exhibitID is the integer ID of the exhibit you are connecting to.
Once registered, post a comment by sending a message of the format:

{
    "type": "message",
    "body": string
}
where the key body contains the comment you would like to post.