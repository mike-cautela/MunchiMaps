MunchiMaps is a dynamic website hosted on Glitch.

MunchiMaps stores vending machine information and its reviews in a 
persistent SQLite server hosted on Glitch.

Files & Folders:

<- Documents: Holds documentation for the project. Documentation includes
              maintenance notes, conventions to follow, and other documentation.
              
<- Website: Is the static folder that is the front-end for the project. Hosts
            images, main script.js file, html, and stylesheets.
            
<- src: Holds server.js file and routes directory. Used for node.
    
<- database: Holds data pertaining to SQL database.

<- scripts: Holds functions pertaining to the back-end, some front-end, and SQLite
            interactions.
            
<- comment_filter.py: *
            
<- imagetodescription.py: *
              
<- package.json: Is the main file that is used to identify dependencies that need
                 to be installed. It then calls server.js to begin the construction 
                 of the website and database.
                 
<- web_scrapper.py: *