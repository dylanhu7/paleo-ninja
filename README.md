# Paleo-Ninja

Are you a Fortnite Professional? An up and coming talent in the Fortnite scene? Or just a casual player?

Whichever category you fall into, if you have a developed interest in archaeology, paleobiology, and especially all things dino, Paleo-Ninja is the site for you!

Simply provide your Fortnite username (or the Fortnite username of your choice) and, based on your stats, Paleo-Ninja will match you with a dinosaur!
## How to Run

To run the server: navigate to paleo-ninja/Server and enter into the command line:
`yarn install`
to install all necessary dependencies.

Then start the Express server with:
`yarn start`

To setup the MySQL server the website uses:
```
CREATE DATABASE paleoninja;
USE paleoninja;
CREATE TABLE pro-dino (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    pro TEXT NOT NULL,
    wins TEXT NOT NULL,
    dino TEXT NOT NULL,
    eatingHabits TEXT NOT NULL
);
```

Finally, navigate to localhost:3000 to reach the homepage of Paleo-Ninja! Enter in your desired Fortnite usernames (examples: Ninja, Pzuhs, Axis3122), and based on that player's Fortnite stats, we'll match that player with a paleobiologic organism and that organism's eating habits.

## Repository structure:
<pre>
    <b>paleo-ninja</b>                              #project folder
        <b>Server</b>                               #folder containing Express app
            <b>bin</b>
                <b>www</b>                          #server properties
            <b>public</b>
                <b>css</b>                          #contains css for pages
                    <b>dino-match.css</b>           #styling for dino-match page
                    <b>index.css</b>                #styling for homepage
                    <b>styles.css</b>               #styles shared by multiple pages
                    <b>fonts</b>                    #contains fonts for pages
                    <b>favicon.ico</b>              #site icon
            <b>routes</b>                           #contains Express routes (handles GET and POST requests)
                <b>dino-match.js</b>                #handles POST request from Fortnite username form
                <b>index.js</b>                     #handles GET request for homepage
            <b>views</b>                            #contains Jade templates for pages
                <b>index.jade</b>                   #homepage template
                <b>error.jade</b>                   #error page template
                <b>dino-match.jade</b>              #dino match page template
            <b>app.js</b>                           #Express controller
</pre>
  
## Known bugs:
  
-[bugs]
  
## Contributions:
  
##### Linus Sun:
-retrieving and processing data from fortnite-api.com and paleobiodb.org
  
##### Avi Trost:
-implementing usage of MySQL (storing and displaying search results on the main page)
  
##### Dylan Hu:
-front-end design, user interface implementation, routing and handling GET/POST requests
    
   
