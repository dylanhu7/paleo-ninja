# Paleo-Ninja

Are you a Fortnite Professional? An up and coming talent in the Fortnite scene? Or just a casual player?

Whichever category you fall into, if you have a developed interest in paleontology and all things dino, Paleo-Ninja is the site for you!

Simply provide your Fortnite username and, based on your stats, Paleo-Ninja will match you with a dinosaur!

To run the server: navigate to paleo-ninja/Server and enter into the command line:
`yarn install`
to install all necessary dependencies.

Then start the Express server with:
`yarn start`

Finally, navigate to localhost:3000 to reach the homepage of Paleo-Ninja!

Repository structure:

    paleo-ninja - project folder

        Server - folder containing Express app
    
            bin
        
                www - server properties
            
            public
        
                css - contains css for pages
            
                    dino-match.css - styling for dino-match page
                
                    index.css - styling for homepage
                
                    styles.css - styles shared by multiple pages
                
                    fonts - contains fonts for pages
                
                    favicon.ico - site icon
                
            routes - contains Express routes (handles GET and POST requests)
        
                dino-match.js - handles POST request from Fortnite username form
            
                index.js - handles GET request for homepage
            
            views - contains Jade templates for pages
        
                index.jade - homepage template
            
                error.jade - error page template
            
                dino-match.jade - dino match page template
            
            app.js - Express controller
        
    
