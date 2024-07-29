MunchiMaps is a dynamic website hosted on Glitch.

MunchiMaps stores vending machine information and its reviews in a 
persistent SQLite server hosted on Glitch.

Files & Folders:

<- MunchiMaps Assets: Holds all images, logos, and assets for the website.

<- src: 
    * 
    
<- styles: Holds all css files that is used to format website.

<- database.js: Is a script that sets up the SQL database to store the 
                vending machine information that the website relies on.
                
<- new.html: Is the main website that the end-user will see.

<- script.js: Is the collection of functions that are called by the end-user
              (i.e, clicking a button on the website) to edit information
              the end-user will see.
              
<- server.js: Is the main js file that is invoked when users access the website.
              It calls database.js to create or connect to the SQL database and 
              directs user to the main page.
              
<- package.json: Is the main file that is used to identify dependencies that need
                 to be installed. It then calls server.js to begin the construction 
                 of the website and database.