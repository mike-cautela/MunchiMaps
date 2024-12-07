
const building_data = [
  {name:"Academy Hall", x_coord:42.72749913373329, y_coord:-73.67858048827672, time_opens:8.00, time_closes:18.00, num_snack_machines:1, num_drink_machines:1},
  {name:"Amos Eaton Hall", x_coord:42.730287323346445, y_coord:-73.68258918979996, time_opens:7.00, time_closes:22.00, num_snack_machines:0, num_drink_machines:1},
  {name:"Davison Hall", x_coord:42.72731130298223, y_coord:-73.67414636096385, time_opens:0.00, time_closes:24.00, num_snack_machines:0, num_drink_machines:1},
  {name:"DCC", x_coord:42.72934781129576, y_coord:-73.67895862471251, time_opens:7.00, time_closes:21.00, num_snack_machines:1, num_drink_machines:1},
  {name:"Folsom Library", x_coord:42.72954131606436, y_coord:-73.68250278794625, time_opens:8.00, time_closes:11.00, num_snack_machines:1, num_drink_machines:2},
  {name:"Greene Building", x_coord:42.73022009495838, y_coord:-73.68115317445492, time_opens:7.00, time_closes:21.00, num_snack_machines:1, num_drink_machines:1},
  {name:"JEC", x_coord:42.729847677153444, y_coord:-73.68020218979997, time_opens:6.00, time_closes:22.00, num_snack_machines:1, num_drink_machines:1},
  {name:"JROWL", x_coord:42.72900301770575, y_coord:-73.68045377630875, time_opens:6.00, time_closes:22.00, num_snack_machines:1, num_drink_machines:1},
  {name:"Mueller Center", x_coord:42.72891902003062, y_coord:-73.67684441122128, time_opens:8.00, time_closes:10.00, num_snack_machines:1, num_drink_machines:2},
  {name:"North Hall", x_coord:42.73142413669011, y_coord:-73.67987080514486, time_opens:7.00, time_closes:24.00, num_snack_machines:1, num_drink_machines:2},
  {name:"Pittsburgh Building", x_coord:42.73125174093247, y_coord:-73.68330210329108, time_opens:7.00, time_closes:21.00, num_snack_machines:1, num_drink_machines:1},
  {name:"Pub Safe", x_coord:42.72930295751444, y_coord:-73.67676008238502, time_opens:0.00, time_closes:24.00, num_snack_machines:0, num_drink_machines:1},
  {name:"Quad", x_coord:42.730706041764584, y_coord:-73.67756264747236, time_opens:0.00, time_closes:24.00, num_snack_machines:0, num_drink_machines:2},
  {name:"Sage Labs", x_coord:42.73097906477598, y_coord:-73.68164141863616, time_opens:7.00, time_closes:24.00, num_snack_machines:1, num_drink_machines:1},
  {name:"Sharp Hall", x_coord:42.72711006590162, y_coord:-73.67448712656643, time_opens:0.00, time_closes:24.00, num_snack_machines:0, num_drink_machines:1},
  {name:"Union", x_coord:42.730159761978896, y_coord:-73.67663391678252, time_opens:7.00, time_closes:24.00, num_snack_machines:1, num_drink_machines:1},
  {name:"Voorhees Computing Center", x_coord:42.72931448709032, y_coord:-73.68164350143745, time_opens:7.00, time_closes:23.00, num_snack_machines:1, num_drink_machines:2},
  {name:"Warren Hall", x_coord:42.72809422047715, y_coord:-73.67536297260132, time_opens:7.00, time_closes:21.00, num_snack_machines:0, num_drink_machines:1},
  {name:"West Hall", x_coord:42.731807801585866, y_coord:-73.68320404747236, time_opens:0.00, time_closes:24.00, num_snack_machines:0, num_drink_machines:1},
];
var buildings = []; //this is initialized in initMap()

class EventEmitter {
  constructor() {
    this.events = {};
  }
        
  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  }
}

//generating the description based on image that it is given
       function generatedescription(image1, image2, image3) {
        let results = ["This vending machine accepts: "];
        
        if (image1 === "https://github.com/mike-cautela/MunchiMaps/blob/main/Website/MunchiMaps%20Assets/Map%20Icons/CreditCheck.png?raw=true") {
            results.push("card");
        } else if (image1 === "https://github.com/mike-cautela/MunchiMaps/blob/main/Website/MunchiMaps%20Assets/Map%20Icons/CreditX.png?raw=true") {
            results.push("");
        }
        
        if (image2 === "https://github.com/mike-cautela/MunchiMaps/blob/main/Website/MunchiMaps%20Assets/Map%20Icons/CashCheck.png?raw=true") {
            if (image1 === "https://github.com/mike-cautela/MunchiMaps/blob/main/Website/MunchiMaps%20Assets/Map%20Icons/CreditX.png?raw=true") {
                results.push("cash");
            } else {
                results.push(", cash");
            }
        } else if (image2 === "https://github.com/mike-cautela/MunchiMaps/blob/main/Website/MunchiMaps%20Assets/Map%20Icons/CashX.png?raw=true") {
            results.push("");
        }
        
        if (image3 === "https://github.com/mike-cautela/MunchiMaps/blob/main/Website/MunchiMaps%20Assets/Map%20Icons/PhoneCheck.png?raw=true") {
            if (image1 === "https://github.com/mike-cautela/MunchiMaps/blob/main/Website/MunchiMaps%20Assets/Map%20Icons/CreditX.png?raw=true" && image2 === "https://github.com/mike-cautela/MunchiMaps/blob/main/MunchiMaps%20Assets/Map%20Icons/CashX.png?raw=true") {
                results.push("wireless payments");
            } else {
                results.push(", wireless payments");
            }
        } else if (image3 === "https://github.com/mike-cautela/MunchiMaps/blob/main/Website/MunchiMaps%20Assets/Map%20Icons/PhoneX.png?raw=true.png") {
            results.push("");
        }
        return results.join("");
      }

      function vendingOffered(numSnack, numDrinks) {
        let img_icon;
        if(numSnack > 0 && numDrinks > 0) {
          img_icon = 0;
        } else if(numSnack > 0) {
          img_icon = 1;
        } else if(numDrinks > 0) {
          img_icon = 2;
        }
        return img_icon;
      }

       function setImages(name, numSnack, numDrinks) {
        console.log("Welcome to setImages");
        let images;
        let image = name.split(" ").join("");
        let active = false;
        if(numSnack >= 1) {
          images = "<img src='../MunchiMaps Assets/" + name + "/" + image + "Snack1.jpg'?raw=true\" alt=\"Logo 1\" class=\"active\">";
          active = true;
          
          for(let i = 2; i <= numSnack; i++) {
            
            images += "<img src='../MunchiMaps Assets/" + name + "/" + image + "Snack" + i + ".jpg'?raw=true\" alt=\"Logo " + i + "\">";
            console.log(images);
          }
        }
        //console.log(images);
        
        if(numDrinks >= 1) {
          if(!active) {
            images = "<img src='../MunchiMaps Assets/" + name + "/"+image+"Drink1.jpg'?raw=true\" alt=\"Logo 1\" class=\"active\">";
            active = true;
          } else {
            images += "<img src='../MunchiMaps Assets/" + name + "/" + image + "Drink1.jpg'?raw=true\" alt=\"Logo 1\">";
          }
          for(let i = 2; i <= numDrinks; i++) {
            images += "<img src='../MunchiMaps Assets/" + name + "/" + image + "Drink" +i + ".jpg'?raw=true\" alt=\"Logo " + i + "\">";
          }
        }
        
        //console.log(images);
        return images;
      }



      // generate images for payment.
      function paymentOptions(images, hasCash, hasCard, hasTap) {

      }
      

// Icons for vending machines object class ========================================================================================================
      class icon extends EventEmitter {
      constructor(name, x_coord, y_coord, time_opens, time_closes, num_snack_machines, num_drink_machines, num_ratings, average_ratings, needs_service) {
        super();
        this.name = name;
        this.x_coord = x_coord;
        this.y_coord= y_coord;
        this.time_opens = time_opens;
        this.time_closes = time_closes;
        this.num_snack_machines =  num_snack_machines;
        this.num_drink_machines = num_drink_machines;
        this.num_ratings = num_ratings;
        this.average_ratings = average_ratings;
        this.needs_service = needs_service;

        this.image1 = "https://github.com/mike-cautela/MunchiMaps/blob/main/Website/MunchiMaps%20Assets/Map%20Icons/CreditCheck.png?raw=true";
        this.image2 = "https://github.com/mike-cautela/MunchiMaps/blob/main/Website/MunchiMaps%20Assets/Map%20Icons/CashCheck.png?raw=true";
        this.image3 = "https://github.com/mike-cautela/MunchiMaps/blob/main/Website/MunchiMaps%20Assets/Map%20Icons/PhoneX.png?raw=true";

        this.description = generatedescription(this.image1, this.image2, this.image3);
        //this.payments = paymentOptions(images, 1, 1, 1);
        this.img_icon = vendingOffered(this.num_snack_machines, this.num_drink_machines);

        this.images = setImages(this.name, this.num_snack_machines, this.num_drink_machines);

        this.infoWindowContent = `
        <div class="info-window-content">
          <div class="info-window-image">
            ${this.images}
              <div class="carousel-controls">
                  <button class="prev">&lt;</button>
                  <button class="next">&gt;</button>
              </div>
          </div>
          <div class="info-window-text">
            <div class="info-window-title">${this.name}</div>
            <div class="info-window-icons">
                <img src="${this.image1}">
                <img src="${this.image2}" alt="Image 2">
                <img src="${this.image3}" alt="Image 3">
            </div>
            <div class="info-window-subtitle">${this.description}</div>
            <div class="review-section">
              <div class="reviews">
                <!-- Existing reviews will be appended here -->
              </div>
              <h4>Write a Review</h4>
              <div class="rating_block>
                <form class="submit-review">
                <textarea id="review-text" placeholder="Write your review here..." required></textarea>
                <div class="rating">
                  <span rating-star="5"><img src="https://github.com/mike-cautela/MunchiMaps/blob/main/Website/MunchiMaps%20Assets/CookieFavicon.png?raw=true" alt="Star 5" width="30" height="30"></span>
                  <span rating-star="4"><img src="https://github.com/mike-cautela/MunchiMaps/blob/main/Website/MunchiMaps%20Assets/CookieFavicon.png?raw=true" alt="Star 4" width="30" height="30"></span>
                  <span rating-star="3"><img src="https://github.com/mike-cautela/MunchiMaps/blob/main/Website/MunchiMaps%20Assets/CookieFavicon.png?raw=true" alt="Star 3" width="30" height="30"></span>
                  <span rating-star="2"><img src="https://github.com/mike-cautela/MunchiMaps/blob/main/Website/MunchiMaps%20Assets/CookieFavicon.png?raw=true" alt="Star 2" width="30" height="30"></span>
                  <span rating-star="1"><img src="https://github.com/mike-cautela/MunchiMaps/blob/main/Website/MunchiMaps%20Assets/CookieFavicon.png?raw=true" alt="Star 1" width="30" height="30"></span>
                </div>
                <button type="submit">Submit</button>
                </form>
              </div>
            </div>
        </div>
        </div>`;
        this.infoWindow;
      }
        plot() {
          this.marker = L.marker([this.x_coord, this.y_coord], { icon: options[this.img_icon] }).addTo(map);

          this.marker.on('click', () => {
            this.infoWindow = L.popup({ maxWidth: 500 })
              .setLatLng([this.x_coord, this.y_coord])
              .setContent(this.infoWindowContent)
              .openOn(map);

            const images = document.querySelectorAll('.info-window-image img');
            const prevButton = document.querySelector('.prev');
            const nextButton = document.querySelector('.next');
            let currentIndex = 0;

            function showImage(index) {
              images.forEach((img, i) => {
                img.classList.toggle('active', i === index);
              });
            }

            prevButton.addEventListener('click', () => {
              currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
              showImage(currentIndex);
            });

            nextButton.addEventListener('click', () => {
              currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
              showImage(currentIndex);
            });
          });
        }
      } // Icon object declaration ending.


 //initializes the map
    function initMap() {
      map = L.map('map').setView([42.72941085967446, -73.6792590320996], 17);


      var currentMarker = null;  // Variable to keep track of the current marker

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  detectRetina: true,
   maxZoom: 50

      }).addTo(map);

        var locationDot = L.divIcon({
            className: 'custom-icon',
            html: '<div class="location-circle"></div><div class="location-dot"></div>',
            iconSize: [40, 40],
            iconAnchor: [1, 3]  // Center the icon
        });

        // Function to handle location found
            function onLocationFound(e) {
                console.log("Location found: ", e.latlng);

                // Remove the old marker if it exists
                if (currentMarker) {
                    map.removeLayer(currentMarker);
                }

                // Add a new marker
                currentMarker = L.marker(e.latlng, {icon: locationDot}).addTo(map).bindPopup('<div class="location-text">You are here</div>').openPopup();
                map.setView(e.latlng, 18); // Center the map on the user's location
            }

            // Function to handle location errors
            function onLocationError(e) {
                console.log("Location error: ", e.message);
                alert(e.message);
            }

            // Initial location finding
            map.locate({
                setView: true,
                maxZoom: 18,
                watch: false
            }).on('locationfound', onLocationFound).on('locationerror', onLocationError);

            // Define the centerMap function
            function centerMap(){
                map.locate({
                    setView: true,
                    maxZoom: 18,
                    watch: false
                }).on('locationfound', onLocationFound).on('locationerror', onLocationError);
            }

            var button = document.getElementById("Location");
            if (button) {
                console.log("Button found, adding event listener");
                button.addEventListener("click", centerMap);
            } else {
                console.log("Button not found");
            }

            var mapKeyButton = document.getElementById("MapKey");
            if (mapKeyButton) {
              console.log("MapKey button found, adding event listener");
              mapKeyButton.addEventListener("click", openMapKey);  // Call the openMapKey function
            } else {
              console.log("MapKey button not found");
            }
      //Puts the zoom in bottom left corner
      map.zoomControl.setPosition('bottomleft');

      //Gets the icon for vending machines available from github.
      const foodanddrink = L.icon({
        iconUrl: 'https://github.com/mike-cautela/MunchiMaps/blob/main/Website/MunchiMaps%20Assets/Map%20Icons/Food&Drink.png?raw=true',
        iconSize: [80, 50],
        iconAnchor: [50, 25]
        
      });

      const food = L.icon({
        iconUrl: 'https://github.com/mike-cautela/MunchiMaps/blob/main/Website/MunchiMaps%20Assets/Map%20Icons/Food.png?raw=true',
        iconSize: [50, 50],
        iconAnchor: [50, 25]
        
      });

      const drink = L.icon({
        iconUrl: 'https://github.com/mike-cautela/MunchiMaps/blob/main/Website/MunchiMaps%20Assets/Map%20Icons/Drink.png?raw=true',
        iconSize: [50, 50],
        iconAnchor: [50, 25]
        
      });
      
      // Test area ------------------------------------------- 

      options = [foodanddrink, food, drink];
      
// NOTE: this code replaces the old way of plotting icons
// It allows the search feature and the map plotting to use the same building_data array (which can be found at the top of this file)
      for(let i=0; i<building_data.length; i++) {
        temp = new icon(
            building_data[i].name,
            building_data[i].x_coord,
            building_data[i].y_coord,
            building_data[i].time_opens,
            building_data[i].time_closes,
            building_data[i].num_snack_machines,
            building_data[i].num_drink_machines,
            0, //num_ratings
            0, //average_ratings
            "N" //needs_service
          )
        buildings.push(temp);
      }

      for(let i=0; i<buildings.length; i++) {
        buildings[i].plot();
      }

      // Toggle between dark mode and light mode CSS sheets.
      let darkMode = false;
      function toggleDarkMode() {
        darkMode = !darkMode;
        const light = document.getElementById('light-mode');
        const dark = document.getElementById('dark-mode');
        if (darkMode){
          dark.disabled = false;
          setTimeout(() => {
            light.disabled = true;
          }, 200); //Delay for smooth transition
        } else {
          light.disabled = false;
          setTimeout(() => {
            dark.disabled = true;
          }, 200);
        }
      }

      //Toggles dark mode when user presses 'd' or 'D.'
      document.addEventListener('keydown', function(event) {
        if ((event.key === 'd' || event.key === 'D') && 
        (document.activeElement.tagName !== 'INPUT' && 
          document.activeElement.tagName !== 'TEXTAREA' && 
          document.activeElement.contentEditable !== 'true')){
          toggleDarkMode();
        }
      });
    } // init map ending bracket here

    function openHelp() {
      closeAllPopups('Report');
      document.getElementById("help-popup").style.display = "block";
    }

    function closeHelp() {
      document.getElementById("help-popup").style.display = "none";
    }

    // Close the help popup if the user clicks outside of the help content
    window.onclick = function(event) {
      const popup = document.getElementById("help-popup");
      if (event.target === popup) {
        popup.style.display = "none";
      }
    }

    function openMapKey(){
      closeAllPopups('Report');
      document.getElementById("map-key-popup").style.display = "block";
    }
    function closeMapKey(){
        document.getElementById("map-key-popup").style.display = "none";
    }


/*function showInfoHelper(locationName){
  const icon = icons[locationName];
  console.log("External function called for:", icon);
  console.log('Toggling icon:', icon);
  console.log('Coordinates:', icon.x_coord, icon.y_coord);

  // if (icon.infoWindow && map.hasLayer(icon.infoWindow)) {
  //   // If the popup is open, close it
  //   map.closePopup(icon.infoWindow);
  // } else {
    // If the popup is closed, open it
    icon.infoWindow = L.popup({ maxWidth: 500 })
      .setLatLng([icon.x_coord, icon.y_coord])
      .setContent(icon.infoWindowContent)
      .openOn(map);
  //}
  
}*/


function showInfoHelper(id){
  const icon = buildings[id];
  console.log("External function called for:", icon);
  console.log('Toggling icon:', icon);
  console.log('Coordinates:', icon.x_coord, icon.y_coord);

    icon.infoWindow = L.popup({ maxWidth: 500 })
      .setLatLng([icon.x_coord, icon.y_coord])
      .setContent(icon.infoWindowContent)
      .openOn(map);  

  closeSearch();
}


function openSearch() {
    closeAllPopups('Report');
    const searchPopup = document.getElementById("popup-search");
    searchPopup.style.display = "block";
    setTimeout(() => {
        searchPopup.classList.add("show");
    }, 10); // Slight delay to trigger the CSS transition
}

function closeSearch() {
    const searchPopup = document.getElementById("popup-search");
    searchPopup.classList.remove("show");
    setTimeout(() => {
        searchPopup.style.display = "none";
    }, 500); // Match the delay to the transition duration
}

// document.addEventListener('DOMContentLoaded', function() {
//     const searchButton = document.querySelector(".button[onclick='openSearch()']");
//     if (searchButton) {
//         searchButton.addEventListener("click", openSearch);
//     }
// });
document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.querySelector(".button[onclick='openSearch()']");
    if (searchButton) {
        searchButton.addEventListener("click", openSearch);
    }
});


    window.onclick = function(event) {
      const popup = document.getElementById("mapKeyPopup");
      if (event.target === popup) {
        popup.style.display = "none";
      }
    }

    function openPopup(id) {
      closeAllPopups(id);
      document.getElementById('popup-' + id.toLowerCase()).style.display = 'block';
    }

    function closePopup(id) {
  document.getElementById('popup-' + id.toLowerCase()).style.display = 'none';
}
  //Closes all popups when user clicks on second popup. 
  function closeAllPopups(id) {
    document.getElementById("map-key-popup").style.display = "none";
    document.getElementById("help-popup").style.display = "none";
    document.getElementById("popup-search").style.display = "none";
    document.getElementById('popup-' + id.toLowerCase()).style.display = 'none';
}

   document.addEventListener('DOMContentLoaded', function () {
      initMap();
    });
// Handle report form submission
document.addEventListener('DOMContentLoaded', function () {
    initMap();

    const reportForm = document.getElementById('reportForm');
    reportForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const reportTitle = document.getElementById('reportTitle').value;
        const reportDescription = document.getElementById('reportDescription').value;

        // Handle the form data (e.g., send it to a server or display it)
        console.log('Report Title:', reportTitle);
        console.log('Report Description:', reportDescription);

        // Display a confirmation message or handle the submission
        alert('Report submitted successfully!');

        // Close the popup
        closePopup('Report');

        // Clear the form
        reportForm.reset();
    });
});

document.querySelector(".btn-fixx").onclick = function () {
    window.location.href = "https://www.google.com";
};
