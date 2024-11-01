import './Website/styles/MunchiMaps_stylesheet.css';
import './Website/styles/dark.css';
import './Website/styles/Location_Style_Sheet.css';
import './Website/styles/loading_animation_stylesheet.css';
import './Website/js/script.js';

function App() {
  return (
    <div>
      {/* Logo Title */}
      <div className="logo-title">
        <img
          src="https://github.com/mike-cautela/MunchiMaps/blob/main/Website/MunchiMaps%20Assets/MunchiMaps%20Logos/MunchiMapsCroppedLogo.png?raw=true"
          alt="MunchiMaps"
        />
      </div>

      {/* Map Container */}
      <div id="map-container">
        <div id="map"></div>
      </div>

      {/* Help Button */}
      <button className="help-button" onClick={openHelp}>
        <img
          src="https://raw.githubusercontent.com/mike-cautela/MunchiMaps/main/Website/MunchiMaps%20Assets/MenuIcons/help-circle-grey.svg"
          alt="Help"
          className="help-button-img"
        />
      </button>

      {/* Map Key Button */}
      <button className="map-key-button" onClick={openMapKey}>
        <img
          src="https://github.com/mike-cautela/MunchiMaps/blob/main/Website/MunchiMaps%20Assets/CookieFavicon.png?raw=true"
          alt="Map Key"
          className="map-key-button-img"
        />
      </button>

      {/* Help Popup */}
      <div id="help-popup" className="help-popup">
        <div className="help-content">
          <span className="close" onClick={closeHelp}>
            &times;
          </span>
          <h2>How to Use MunchiMaps:</h2>
          <p>
            Look at the MunchiMap to find the nearest Vending Machine to you!
          </p>
          <p>
            Make sure to check to see if the machine sells Snacks and/or drinks
          </p>

          <h3>MunchiMap Functions:</h3>
          <table className="icons-description">
            <tbody>
              <tr className="icon-item">
                <td>
                  <svg className="help-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </td>
                <td>
                  <span>Use the search feature to find the specific building on Campus you're snacking in!</span>
                </td>
              </tr>
              {/* Add other table rows similarly */}
            </tbody>
          </table>
        </div>
      </div>

      {/* Map Key Popup */}
      <div id="map-key-popup" className="map-key-popup">
        <div className="map-key-content">
          <span className="close" onClick={closeMapKey}>
            &times;
          </span>
          <h3>Map Key:</h3>
          <table className="map-key">
            <tbody>
              <tr className="icon-item">
                <td>
                  <img src="MunchiMaps Assets/Map Icons/Food.png" alt="FoodOnly" className="map-icon" />
                </td>
                <td>
                  <span>Food Only Vending Machine</span>
                </td>
              </tr>
              {/* Add other table rows similarly */}
            </tbody>
          </table>
        </div>
      </div>

      {/* Popup Search */}
      <div id="popup-search" style={{ display: 'none' }}>
        <div className="search-bar">
          <span className="close" onClick={closeSearch}>
            &times;
          </span>
          <input type="search" id="searchInput" placeholder="Search for a building..." />
          <div id="searchResult" className="result"></div>
        </div>
      </div>

      {/* Popup Report */}
      <div id="popup-report" className="popup-container">
        <div className="popup">
          <div className="popup-header">
            <span className="popup-close" onClick={() => closePopup('Report')}>
              &times;
            </span>
            <h2>Report Issue</h2>
          </div>
          <form id="reportForm" className="popup-form">
            <div className="form-group">
              <label htmlFor="reportTitle">Title:</label>
              <input type="text" id="reportTitle" className="form-control" required />
            </div>
            <div className="form-group">
              <label htmlFor="reportType">Type of Issue:</label>
              <select id="reportType" className="form-control" required>
                <option value="vending_machine">Vending Machine Issue</option>
                <option value="location">Location Issue</option>
                <option value="app_functionality">App Functionality Issue</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="reportDescription">Description:</label>
              <textarea id="reportDescription" className="form-control" required></textarea>
            </div>
            <button type="submit" className="btn-submit">
              Submit
            </button>
          </form>
        </div>
      </div>

      {/* Buttons Container */}
      <div id="buttons-container">
        <button className="button" onClick={openSearch}>
          <img
            src="https://raw.githubusercontent.com/mike-cautela/MunchiMaps/main/Website/MunchiMaps%20Assets/MenuIcons/search-grey.svg"
            alt="Search"
            className="button-img"
          />
        </button>

        <button className="button" onClick={() => openPopup('Report')}>
          <img
            src="https://raw.githubusercontent.com/mike-cautela/MunchiMaps/main/Website/MunchiMaps%20Assets/MenuIcons/alert-triangle-grey.svg"
            alt="Report"
            className="button-img"
          />
        </button>

        <button className="button" id="Location">
          <img
            src="https://raw.githubusercontent.com/mike-cautela/MunchiMaps/main/Website/MunchiMaps%20Assets/MenuIcons/crosshair-grey.svg"
            alt="Location"
            className="button-img"
          />
        </button>
      </div>
    </div>
  );
}

export default App;
