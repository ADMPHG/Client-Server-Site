# SpaceX Fanclub Website
This is a webpage for fans of SpaceX to share their favourite rockets. Visiting the website will present you with a list of fanclub members, which you can filter based on their information:

<img src="./website1.gif">

You can also view the stats of each rocket, and see which members have it listed as their favourite:

<img src="./website2.gif">

An admin page is used to create new members and delete existing members from the list:

<img src="./website3.gif">

## Instructions 
- For development, start the server with `npm run dev`  
- For standard operation, start the server with `npm start`
- To access the website, visit 127.0.0.1:8090 
- Linting can be performed with `npm pretest`
- Jest testing can be performed with `npm test`

## API Documentation
The site uses two entities: 'members', and 'rockets'. A REST API using Fetch and Express is used to serve JSON content via AJAX. The available methods are detailed below.

### Members
>GET members/  
Returns a list of all members

>GET members/:id  
:id integer  
Returns the data for the member with the ID ':id'. If the specified member does not exist, the server returns status 404.

>POST members/  
To create a member, POST a JSON object of the format:
```javascript
{
    "id": string,
    "name": string
    "email": string
    "favRocket": string | null,
}
```
>DELETE member/:id  
:id integer  
Deletes the member with the id entered from the 'members' JSON object on the server

### Rockets
>GET rockets/  
Returns a list of all rockets

>GET rockets/:name  
:name string  
Returns the data for the rocket with the name ':name'. If the specified rocket does not exist, the server returns status 404.