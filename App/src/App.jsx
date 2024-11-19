import { useState, useRef } from 'react';
import './styles/MunchiMaps_stylesheet.css';
import './styles/dark.css';
import './styles/Location_Style_Sheet.css';
import './styles/loading_animation_stylesheet.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const searchPopupRef = useRef(null);

  const buildings = [
    { name: 'Folsom Library', drink: true, food: true },
    { name: 'Sharp Hall', drink: true, food: true },
    { name: 'Rensselaer Student Union', drink: true, food: true },
    { name: 'Quadrangle Complex', drink: true, food: false },
    { name: 'Darrin Communication Center', drink: true, food: true },
    { name: 'Woorhees Computing Center', drink: true, food: true },
    { name: 'Amos Eaton Hall', drink: true, food: false },
    { name: 'Mueller Center', drink: true, food: true },
    { name: 'J Erik Jonsson Engineering Center', drink: true, food: true },
    { name: 'Russell Sage Laboratory', drink: true, food: true },
    { name: 'Jonsson-Rowland Science Center', drink: true, food: true },
    { name: 'Pittsburgh Building', drink: true, food: true },
    { name: 'Warren Hall', drink: true, food: false },
    { name: 'Greene Building', drink: true, food: true },
    { name: 'Davison Hall', drink: true, food: false },
    { name: 'RPI Public Safety', drink: true, food: false },
    { name: 'North Hall', drink: true, food: true },
    { name: 'West Hall', drink: true, food: false },
  ];

  const filterBuildings = (term) => {
    return buildings.filter((building) =>
      building.name.toLowerCase().includes(term.toLowerCase())
    );
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleResultClick = (building) => {
    console.log(`Selected: ${building.name}`);
    closeAllPopups();
    highlightBuildingOnMap(building);
  };

  const highlightBuildingOnMap = (building) => {
    console.log(`Highlighting building on map: ${building.name}`);
    // Implement map API integration here to highlight the building
  };

  const closeAllPopups = () => {
    if (searchPopupRef.current) {
      searchPopupRef.current.style.display = 'none';
      searchPopupRef.current.classList.remove('show');
    }
  };

  const openSearch = () => {
    closeAllPopups();
    if (searchPopupRef.current) {
      searchPopupRef.current.style.display = 'block';
      setTimeout(() => {
        searchPopupRef.current.classList.add('show');
      }, 10); // Trigger CSS transition
    }
  };

  return (
    <>
      <div className="logo-title">
        <img
          src="https://github.com/mike-cautela/MunchiMaps/blob/main/Website/MunchiMaps%20Assets/MunchiMaps%20Logos/MunchiMapsCroppedLogo.png?raw=true"
          alt="MunchiMaps"
        />
      </div>

      <div id="map-container">
        <div id="map"></div>
      </div>

      <button className="help-button" onClick={() => console.log('Open Help')}>
        <img
          src="https://raw.githubusercontent.com/mike-cautela/MunchiMaps/main/Website/MunchiMaps%20Assets/MenuIcons/help-circle-grey.svg"
          alt="Help"
          className="help-button-img"
        />
      </button>

      <button className="map-key-button" onClick={() => console.log('Open Map Key')}>
        <img
          src="https://github.com/mike-cautela/MunchiMaps/blob/main/Website/MunchiMaps%20Assets/CookieFavicon.png?raw=true"
          alt="Map Key"
          className="map-key-button-img"
        />
      </button>

      <div id="popup-search" ref={searchPopupRef} style={{ display: 'none' }}>
        <div className="search-bar">
          <span className="close" onClick={closeAllPopups}>&times;</span>
          <input
            type="search"
            id="searchInput"
            placeholder="Search for a building..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <div id="searchResult" className="result">
            {searchTerm ? (
              filterBuildings(searchTerm).length > 0 ? (
                <ul>
                  {filterBuildings(searchTerm).map((building, index) => (
                    <li key={index} onClick={() => handleResultClick(building)}>
                      {building.name}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No results found.</p>
              )
            ) : null}
          </div>
        </div>
      </div>

      <div id="popup-report" className="popup-container">
        <div className="popup">
          <div className="popup-header">
            <span className="popup-close" onClick={closeAllPopups}>
              &times;
            </span>
            <h2>Report Issue</h2>
          </div>
          <form
            id="reportForm"
            className="popup-form"
            onSubmit={(e) => {
              e.preventDefault();
              console.log('Submit Report');
            }}
          >
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
              <textarea id="reportDescription" className="form-control" required />
            </div>
            <button type="submit" className="btn-submit">
              Submit
            </button>
          </form>
        </div>
      </div>

      <div id="buttons-container">
        <button className="button" onClick={openSearch}>
          <img
            src="https://raw.githubusercontent.com/mike-cautela/MunchiMaps/main/Website/MunchiMaps%20Assets/MenuIcons/search-grey.svg"
            alt="Search"
            className="button-img"
          />
        </button>
        <button className="button" onClick={() => console.log('Open Report')}>
          <img
            src="https://raw.githubusercontent.com/mike-cautela/MunchiMaps/main/Website/MunchiMaps%20Assets/MenuIcons/alert-triangle-grey.svg"
            alt="Report"
            className="button-img"
          />
        </button>
        <button className="button" id="Location" onClick={() => console.log('Update Location')}>
          <img
            src="https://raw.githubusercontent.com/mike-cautela/MunchiMaps/main/Website/MunchiMaps%20Assets/MenuIcons/crosshair-grey.svg"
            alt="Location"
            className="button-img"
          />
        </button>
      </div>
    </>
  );
}

export default App;
