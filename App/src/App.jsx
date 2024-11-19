import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Image, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // If required for dropdowns
import { WebView } from 'react-native-webview'; // For rendering maps (Leaflet won't work directly)
import styles from './styles/MunchiMaps_stylesheet.css';
import darkStyles from './styles/dark.css';
import locationStyles from './styles/Location_Style_Sheet.css';
import loadingStyles from './styles/loading_animation_stylesheet.css';

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);
  const [reportPopupVisible, setReportPopupVisible] = useState(false);
  const [mapKeyPopupVisible, setMapKeyPopupVisible] = useState(false);
  const [helpPopupVisible, setHelpPopupVisible] = useState(false);

  const buildingData = [
    // Add your building data here
    { name: 'Folsom Library' },
    { name: 'Sharp Hall' },
    { name: 'Rensselaer Student Union' },
    { name: 'Quadrangle Complex' },
    // Add the rest of your buildings...
  ];

  // Sort buildings alphabetically
  buildingData.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));

  const search = (text) => {
    setSearchTerm(text);
    const filtered = buildingData.filter((building) =>
      building.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredResults(filtered);
  };

  const handleBuildingClick = (building) => {
    // Implement map plotting logic here
    console.log('Building selected:', building.name);
  };

  const renderSearchResults = () => {
    if (filteredResults.length === 0) {
      return <Text style={styles.noResults}>No results found</Text>;
    }
    return (
      <ScrollView style={styles.searchResults}>
        {filteredResults.map((building, index) => (
          <TouchableOpacity key={index} onPress={() => handleBuildingClick(building)}>
            <Text style={styles.searchResultItem}>{building.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  const renderPopup = (popupType) => {
    if (popupType === 'help' && helpPopupVisible) {
      return (
        <View style={styles.popup}>
          <TouchableOpacity onPress={() => setHelpPopupVisible(false)}>
            <Text style={styles.closeButton}>&times;</Text>
          </TouchableOpacity>
          <Text style={styles.popupTitle}>How to Use MunchiMaps:</Text>
          <Text>Look at the MunchiMap to find the nearest vending machine!</Text>
          {/* Add more help content here */}
        </View>
      );
    }

    if (popupType === 'mapKey' && mapKeyPopupVisible) {
      return (
        <View style={styles.popup}>
          <TouchableOpacity onPress={() => setMapKeyPopupVisible(false)}>
            <Text style={styles.closeButton}>&times;</Text>
          </TouchableOpacity>
          <Text style={styles.popupTitle}>Map Key:</Text>
          {/* Add map key content here */}
        </View>
      );
    }

    if (popupType === 'report' && reportPopupVisible) {
      return (
        <View style={styles.popup}>
          <TouchableOpacity onPress={() => setReportPopupVisible(false)}>
            <Text style={styles.closeButton}>&times;</Text>
          </TouchableOpacity>
          <Text style={styles.popupTitle}>Report Issue</Text>
          <View>
            <Text>Title:</Text>
            <TextInput style={styles.input} placeholder="Enter title" />
            <Text>Type of Issue:</Text>
            <Picker style={styles.picker}>
              <Picker.Item label="Vending Machine Issue" value="vending_machine" />
              <Picker.Item label="Location Issue" value="location" />
              <Picker.Item label="App Functionality Issue" value="app_functionality" />
              <Picker.Item label="Other" value="other" />
            </Picker>
            <Text>Description:</Text>
            <TextInput
              style={[styles.input, { height: 100 }]}
              multiline
              placeholder="Describe the issue"
            />
            <Button title="Submit" onPress={() => setReportPopupVisible(false)} />
          </View>
        </View>
      );
    }

    return null;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{
            uri: 'https://github.com/mike-cautela/MunchiMaps/blob/main/Website/MunchiMaps%20Assets/MunchiMaps%20Logos/MunchiMapsCroppedLogo.png?raw=true',
          }}
          style={styles.logo}
        />
      </View>

      <View style={styles.mapContainer}>
        <WebView source={{ uri: 'your-map-url-here' }} style={styles.map} />
      </View>

      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          value={searchTerm}
          placeholder="Search for a building..."
          onChangeText={search}
        />
        {renderSearchResults()}
      </View>

      <View style={styles.footerButtons}>
        <TouchableOpacity onPress={() => setHelpPopupVisible(true)}>
          <Image source={{ uri: 'your-help-icon-url' }} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setMapKeyPopupVisible(true)}>
          <Image source={{ uri: 'your-map-key-icon-url' }} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setReportPopupVisible(true)}>
          <Image source={{ uri: 'your-report-icon-url' }} style={styles.icon} />
        </TouchableOpacity>
      </View>

      {renderPopup('help')}
      {renderPopup('mapKey')}
      {renderPopup('report')}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 100,
    height: 50,
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  searchBar: {
    margin: 10,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  searchResults: {
    marginTop: 10,
  },
  searchResultItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  footerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
  popup: {
    position: 'absolute',
    top: '30%',
    left: '10%',
    right: '10%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  popupTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
  },
  picker: {
    marginVertical: 5,
  },
  closeButton: {
    alignSelf: 'flex-end',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
