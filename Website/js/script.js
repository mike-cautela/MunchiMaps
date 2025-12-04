// We want to cleanly handle the URL paths used for icons
const ASSETS_BASE_URL = "https://github.com/mike-cautela/MunchiMaps/blob/main/Website/MunchiMaps%20Assets";
const ICONS_PATH = `${ASSETS_BASE_URL}/Map%20Icons`;

const PAYMENT_ICONS = {
    CREDIT: {
        CHECK: `${ICONS_PATH}/CreditCheck.png?raw=true`,
        X: `${ICONS_PATH}/CreditX.png?raw=true`
    },
    CASH: {
        CHECK: `${ICONS_PATH}/CashCheck.png?raw=true`,
        X: `${ICONS_PATH}/CashX.png?raw=true`
    },
    PHONE: {
        CHECK: `${ICONS_PATH}/PhoneCheck.png?raw=true`,
        X: `${ICONS_PATH}/PhoneX.png?raw=true`
    }
};

const MAP_ICONS = {
    FOOD_AND_DRINK: `${ICONS_PATH}/Food&Drink.png?raw=true`,
    FOOD: `${ICONS_PATH}/Food.png?raw=true`,
    DRINK: `${ICONS_PATH}/Drink.png?raw=true`
};

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

// This generates the blurb underneath the payment icons
function generatedescription(image1, image2, image3) {
  let results = ["This vending machine accepts: "];
  
  if (image1 === PAYMENT_ICONS.CREDIT.CHECK) {
      results.push("card");
  }
  if (image2 === PAYMENT_ICONS.CASH.CHECK) {
      if (image1 === PAYMENT_ICONS.CREDIT.X) {
          results.push("cash"); // Cash and no card
      } else {
          results.push(", cash");
      }

       function setImages(name, numSnack, numDrinks) {
        console.log("Welcome to setImages");
        let images;
        let image = name.split(" ").join("");
        let active = false;
        if(numSnack >= 1) {
          images = "<img src='./MunchiMaps Assets/" + name + "/" + image + "Snack1.jpg'?raw=true\" alt=\"Logo 1\" class=\"active\">";
          active = true;
          
          for(let i = 2; i <= numSnack; i++) {
            
            images += "<img src='./MunchiMaps Assets/" + name + "/" + image + "Snack" + i + ".jpg'?raw=true\" alt=\"Logo " + i + "\">";
            console.log(images);
          }
        }
        //console.log(images);
        
        if(numDrinks >= 1) {
          if(!active) {
            images = "<img src='./MunchiMaps Assets/" + name + "/" + image + "Drink1.jpg'?raw=true\" alt=\"Logo 1\" class=\"active\">";
            active = true;
          } else {
            images += "<img src='./MunchiMaps Assets/" + name + "/" + image + "Drink1.jpg'?raw=true\" alt=\"Logo 1\">";
          }
          for(let i = 2; i <= numDrinks; i++) {
            images += "<img src='./MunchiMaps Assets/" + name + "/" + image + "Drink" + i + ".jpg'?raw=true\" alt=\"Logo " + i + "\">";
          }
        }
        
        //console.log(images);
        return images;
      }
  }
  return results.join(""); // We end up with a fully-formed sentence
}

function vendingOffered(numSnack, numDrinks) { // These are the blue and gray markers throughout the map
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
  let images = '';
  const folder = `../MunchiMaps Assets/${name}`;
  const image = name.split(" ").join("");
  let active = false;

  if (numSnack >= 1) {
    images += `<img src="${encodeURI(`${folder}/${image}Snack1.jpg`)}" alt="Snack 1" class="active">`;
    active = true;
    for (let i = 2; i <= numSnack; i++) {
      images += `<img src="${encodeURI(`${folder}/${image}Snack${i}.jpg`)}" alt="Snack ${i}">`;
    }
  }

  if (numDrinks >= 1) {
    if (!active) {
      images += `<img src="${encodeURI(`${folder}/${image}Drink1.jpg`)}" alt="Drink 1" class="active">`;
      active = true;
    } else {
      images += `<img src="${encodeURI(`${folder}/${image}Drink1.jpg`)}" alt="Drink 1">`;
    }
    for (let i = 2; i <= numDrinks; i++) {
      images += `<img src="${encodeURI(`${folder}/${image}Drink${i}.jpg`)}" alt="Drink ${i}">`;
    }
  }

  return images;
}

// This represents a given location on the map
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
    // Load reviews from localStorage if available
    const storedReviews = localStorage.getItem(`reviews_${this.name}`);
    this.reviews = storedReviews ? JSON.parse(storedReviews) : [];

    this.image1 = PAYMENT_ICONS.CREDIT.CHECK;
    this.image2 = PAYMENT_ICONS.CASH.CHECK;
    this.image3 = PAYMENT_ICONS.PHONE.X;

    this.description = generatedescription(this.image1, this.image2, this.image3);
    this.img_icon = vendingOffered(this.num_snack_machines, this.num_drink_machines);
    this.images = setImages(this.name, this.num_snack_machines, this.num_drink_machines);
  }

  getReviewsHTML() { // Display existing reviews
    if (this.reviews.length === 0) {
      return "<div>No reviews yet.</div>";
    }
    const cookieImg = `<img src="${ASSETS_BASE_URL}/CookieFavicon.png?raw=true" alt="cookie" width="20" height="20">`;
    return this.reviews.map((r, index) => {
      const author = r.author || 'Anonymous';
      return `
        <div class="review">
          <div class="review-header">
            <div class="review-author">${author}</div>
            <div class="review-rating">${cookieImg.repeat(r.rating)}</div>
            <button class="review-edit-btn" data-review-index="${index}" title="Edit review">&#9998;</button>
            <button class="review-delete-btn" data-review-index="${index}" title="Delete review">&times;</button>
          </div>
          <div class="review-text">${r.text}</div>
        </div>
      `;
    }).join('');
  }

  editReview(index, newText, newRating) { // Edit a review by index
    if (index >= 0 && index < this.reviews.length) {
      this.reviews[index].text = newText;
      this.reviews[index].rating = newRating;
      // Save updated reviews to localStorage
      localStorage.setItem(`reviews_${this.name}`, JSON.stringify(this.reviews));
    }
  }

  deleteReview(index) { // Delete a review by index
    if (index >= 0 && index < this.reviews.length) {
      this.reviews.splice(index, 1);
      // Save updated reviews to localStorage
      localStorage.setItem(`reviews_${this.name}`, JSON.stringify(this.reviews));
    }
  }

  updateInfoWindowContent() { // Build the popup when clicking on a marker
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
            <div class="rating_block">
              <form class="submit-review">
                <textarea id="review-text" placeholder="Write your review here..." required></textarea>
                <div class="rating-row">
                  <div class="rating">
                    <span rating-star="5"><img src="${ASSETS_BASE_URL}/CookieFavicon.png?raw=true" alt="Star 5" width="30" height="30"></span>
                    <span rating-star="4"><img src="${ASSETS_BASE_URL}/CookieFavicon.png?raw=true" alt="Star 4" width="30" height="30"></span>
                    <span rating-star="3"><img src="${ASSETS_BASE_URL}/CookieFavicon.png?raw=true" alt="Star 3" width="30" height="30"></span>
                    <span rating-star="2"><img src="${ASSETS_BASE_URL}/CookieFavicon.png?raw=true" alt="Star 2" width="30" height="30"></span>
                    <span rating-star="1"><img src="${ASSETS_BASE_URL}/CookieFavicon.png?raw=true" alt="Star 1" width="30" height="30"></span>
                  </div>
                  <input type="hidden" id="selected-rating" value="0">
                  <button type="submit">SUBMIT</button>
                </div>
              </form>
            </div>
            <div class="reviews">
              ${this.getReviewsHTML()}
            </div>
          </div>
      </div>
      </div>`;
  }

  plot() { // Handle event listeners and info window content
    this.marker = L.marker([this.x_coord, this.y_coord], { icon: options[this.img_icon] }).addTo(map);

    this.marker.on('click', () => { // On click, handle popup and cookie rating events
      this.updateInfoWindowContent();
      this.infoWindow = L.popup({ maxWidth: 500 })
        .setLatLng([this.x_coord, this.y_coord])
        .setContent(this.infoWindowContent)
        .openOn(map);

      // Helper to attach popup listeners (use .onclick/.onsubmit to avoid duplicate handlers)
      const attachPopupListeners = () => {
        const images = document.querySelectorAll('.info-window-image img');
        const prevButton = document.querySelector('.prev');
        const nextButton = document.querySelector('.next');
        let currentIndex = 0;

        function showImage(index) {
          images.forEach((img, i) => {
            img.classList.toggle('active', i === index);
          });
        }

        if (prevButton) {
          prevButton.onclick = (ev) => {
            ev && ev.stopPropagation();
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
            showImage(currentIndex);
          };
        }
        if (nextButton) {
          nextButton.onclick = (ev) => {
            ev && ev.stopPropagation();
            currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
            showImage(currentIndex);
          };
        }

        let selectedRating = 0;
        const ratingStars = document.querySelectorAll('.rating span');
        ratingStars.forEach(star => {
          star.onclick = (ev) => {
            ev && ev.stopPropagation();
            selectedRating = parseInt(star.getAttribute('rating-star'));

            // We want to highlight all stars with lower or equal rating
            ratingStars.forEach(s => {
              const starRating = parseInt(s.getAttribute('rating-star'));
              if (starRating <= selectedRating) {
                s.classList.add('selected');
              } else {
                s.classList.remove('selected');
              }
            });
            const selEl = document.getElementById('selected-rating');
            if (selEl) selEl.value = selectedRating;
            // Clear previous validity messages
            const reviewTextClear = document.getElementById('review-text');
            if (reviewTextClear) {
              reviewTextClear.setCustomValidity('');
            }
          };
        });

        const reviewForm = document.querySelector('.submit-review');
        if (reviewForm) {
          reviewForm.onsubmit = (event) => {
            event.preventDefault(); // Stops page from refreshing on submit
            event.stopPropagation();
            const reviewTextEl = document.getElementById('review-text');
            const reviewText = reviewTextEl.value.trim();
            const rating = parseInt(document.getElementById('selected-rating').value);

            if (!reviewText) {
              if (reviewTextEl && typeof reviewTextEl.reportValidity === 'function') {
                reviewTextEl.reportValidity();
              } else {
                alert('Please provide a review.');
              }
              return;
            }

            if (!rating) {
              if (reviewTextEl) {
                try {
                  const temp = document.createElement('input');
                  temp.type = 'text';
                  temp.required = true;
                  // Position the popup within the viewport bounds
                  const rect = reviewTextEl.getBoundingClientRect();
                  const left = Math.max(rect.left + window.scrollX + 10, 10);
                  const top = Math.max(rect.top + window.scrollY + rect.height + 6, 10);
                  temp.style.position = 'absolute';
                  temp.style.left = left + 'px';
                  temp.style.top = top + 'px';
                  temp.style.width = Math.max(rect.width - 20, 50) + 'px';
                  temp.style.height = '20px';
                  temp.style.opacity = '0';
                  temp.style.zIndex = 100000;
                  document.body.appendChild(temp);
                  try { temp.focus(); } catch (e) { }
                  if (typeof temp.reportValidity === 'function') {
                    try { temp.reportValidity(); } catch (e) { }
                  }
                  setTimeout(() => {
                    try { if (temp && temp.parentNode) temp.parentNode.removeChild(temp); } catch (e) { }
                    try { reviewTextEl.focus(); } catch (e) { }
                  }, 2000);
                } catch (e) {
                  alert('Please select a rating.');
                }
              }
              return;
            }

            this.reviews.push({ text: reviewText, rating: rating });
            // Save reviews to localStorage
            localStorage.setItem(`reviews_${this.name}`, JSON.stringify(this.reviews));

            // Re-render info window content and reattach listeners without closing popup
            this.updateInfoWindowContent();
            if (this.infoWindow) this.infoWindow.setContent(this.infoWindowContent);
            // Reattach listeners for new content
            attachPopupListeners();
          };
        }

        // Attach delete handlers
        const deleteButtons = document.querySelectorAll('.review-delete-btn');
        deleteButtons.forEach(button => {
          button.onclick = (ev) => {
            ev && ev.stopPropagation();
            const reviewIndex = parseInt(button.getAttribute('data-review-index'));
            this.deleteReview(reviewIndex);

            // Re-render info window content and reattach listeners without closing popup
            this.updateInfoWindowContent();
            if (this.infoWindow) this.infoWindow.setContent(this.infoWindowContent);
            attachPopupListeners();
          };
        });

        // Attach edit handlers
        const editButtons = document.querySelectorAll('.review-edit-btn');
        editButtons.forEach(button => {
          button.onclick = (ev) => {
            ev && ev.stopPropagation();
            const reviewIndex = parseInt(button.getAttribute('data-review-index'));
            const review = this.reviews[reviewIndex];

            // Get the current review text and rating
            const currentText = review.text;
            const currentRating = review.rating;

            // Prompt user to edit text (you could use a modal for better UX)
            const newText = prompt('Edit your review:', currentText);
            if (newText === null) return; // User cancelled
            if (!newText.trim()) {
              alert('Review text cannot be empty');
              return;
            }

            // Prompt user to edit rating
            const newRatingStr = prompt('Edit your rating (1-5):', currentRating.toString());
            if (newRatingStr === null) return; // User cancelled

            const newRating = parseInt(newRatingStr);
            if (isNaN(newRating) || newRating < 1 || newRating > 5) {
              alert('Please enter a valid rating between 1 and 5');
              return;
            }

            // Update the review
            this.editReview(reviewIndex, newText, newRating);

            // Re-render info window content and reattach listeners without closing popup
            this.updateInfoWindowContent();
            if (this.infoWindow) this.infoWindow.setContent(this.infoWindowContent);
            attachPopupListeners();
          };
        });
      };

      // Initial attach of listeners after popup is opened
      attachPopupListeners();
    });
  }
} // End icon object declaration

const buildings = [
  new icon("Academy Hall",              42.72749913373329, -73.67858048827672, 8.00, 18.00, 1, 1, 0, 0, "N"),
  new icon("Amos Eaton Hall",           42.73028732334645, -73.68258918979996, 7.00, 22.00, 0, 1, 0, 0, "N"),
  new icon("Davison Hall",              42.72731130298223, -73.67414636096385, 0.00, 24.00, 0, 1, 0, 0, "N"),
  new icon("DCC",                       42.72934781129576, -73.67895862471251, 7.00, 21.00, 1, 1, 0, 0, "N"),
  new icon("Folsom Library",            42.72954131606436, -73.68250278794625, 8.00, 24.00, 1, 2, 0, 0, "N"),
  new icon("Greene Building",           42.73022009495838, -73.68115317445492, 7.00, 21.00, 1, 1, 0, 0, "N"),
  new icon("JEC",                       42.72984767715344, -73.68020218979997, 6.00, 22.00, 1, 1, 0, 0, "N"),
  new icon("JROWL",                     42.72900301770575, -73.68045377630875, 6.00, 22.00, 1, 1, 0, 0, "N"),
  new icon("Mueller Center",            42.72891902003062, -73.67684441122128, 8.00, 23.00, 1, 2, 0, 0, "N"),
  new icon("North Hall",                42.73142413669011, -73.67987080514486, 7.00, 24.00, 1, 2, 0, 0, "N"),
  new icon("Pittsburgh Building",       42.73125174093247, -73.68330210329108, 7.00, 21.00, 1, 1, 0, 0, "N"),
  new icon("Pub Safe",                  42.72930295751444, -73.67676008238502, 0.00, 24.00, 0, 1, 0, 0, "N"),
  new icon("Quad",                      42.73070604176458, -73.67756264747236, 0.00, 24.00, 0, 2, 0, 0, "N"),
  new icon("Sage Labs",                 42.73097906477598, -73.68164141863616, 7.00, 24.00, 1, 1, 0, 0, "N"),
  new icon("Sharp Hall",                42.72711006590162, -73.67448712656643, 0.00, 24.00, 0, 1, 0, 0, "N"),
  new icon("Union",                     42.73015976197890, -73.67663391678252, 7.00, 24.00, 1, 1, 0, 0, "N"),
  new icon("Voorhees Computing Center", 42.72931448709032, -73.68164350143745, 7.00, 23.00, 1, 2, 0, 0, "N"),
  new icon("Warren Hall",               42.72809422047715, -73.67536297260132, 7.00, 21.00, 0, 1, 0, 0, "N"),
  new icon("West Hall",                 42.73180780158587, -73.68320404747236, 0.00, 24.00, 0, 1, 0, 0, "N")
];

 // Initializes the map
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
  // Puts the zoom in bottom left corner
  map.zoomControl.setPosition('bottomleft');

  // Gets the icon for vending machines available from GitHub
  const foodanddrink = L.icon({
    iconUrl: MAP_ICONS.FOOD_AND_DRINK,
    iconSize: [80, 50],
    iconAnchor: [50, 25]
    
  });

  const food = L.icon({
    iconUrl: MAP_ICONS.FOOD,
    iconSize: [50, 50],
    iconAnchor: [50, 25]
    
  });

  const drink = L.icon({
    iconUrl: MAP_ICONS.DRINK,
    iconSize: [50, 50],
    iconAnchor: [50, 25]
    
  });
  
  // Test area ------------------------------------------- 

  options = [foodanddrink, food, drink];
  
  // Plot the icons for the buildings on the map
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

  // Toggles dark mode when user presses 'd' or 'D.'
  document.addEventListener('keydown', function(event) {
    if ((event.key === 'd' || event.key === 'D') && 
    (document.activeElement.tagName !== 'INPUT' && 
      document.activeElement.tagName !== 'TEXTAREA' && 
      document.activeElement.contentEditable !== 'true')){
      toggleDarkMode();
    }
  });
} // End initMap function

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

// Closes all popups when user clicks on second popup.
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
