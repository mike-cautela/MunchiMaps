# MunchiMaps Vending Machine System

This project is a Python-based system for managing and interacting with vending machine data from a CSV file. The data includes information about building locations, amounts, drinks, foods, location descriptions, hours of operation, access information, and coordinates for each vending machine. The system allows you to load, store, and process this data, as well as check the availability of vending machines in real-time based on the current day and time. Additionally, the system provides functionalities to display vending machine locations on a map, find the nearest vending machine based on the user's current location and specific needs (food or drink), calculate the shortest path between vending machines if a single location does not meet all needs, and visualize the shortest distances between machines on a map, connecting the closest options with lines.

## Installation

To use this model, you must have Python 3.x installed on your system.

Additionally, you will need the following modules:

- `csv`: to read data from the CSV file.
- `datetime`: to handle current time and date operations.
- `folium`: to generate and display maps.
- `haversine`: to calculate the distance between geographical coordinates.

To install the additional modules:
```bash
pip install folium
pip install haversine
```

## How to Use

### Data

The `vending_machine.csv` file is the final version of all the vending machine data.

- **Precautions**:
  - For the `Hours of operation` field, ensure hours are provided for each day of the week, even if they are the same, except when open 24 hours. Use `en dash —`, not `em dash –`, in `check_time(self, time, day, time_range)`, as the latter may cause issues. On Mac, use `option -` for `en dash`.

1. Prepare a CSV file containing the vending machine information with the following headers:
   - `Building`
   - `Amount`
   - `Drink`
   - `Food`
   - `Location description`
   - `Hours of operation`
   - `Access information`
   - `Coordinates`

2. Use the `MunchiMaps_model` class to load the data from the CSV file and interact with it.

## Class and Method Descriptions

### Class: `MunchiMaps_model`

This is the main class responsible for managing vending machine data. It reads from the CSV file, processes the data, and provides methods for retrieving specific information.

### Methods:

#### `__init__(self, csv_file)`
The constructor method initializes the class with a CSV file containing vending machine information and prepares the relevant lists to store the data.

- **Parameters:**
  - `csv_file` (str): The path to the CSV file.
  
- **Attributes:**
  - `data`: Stores the CSV file.
  - `building`: A list to store building names.
  - `amount`: A list to store the amount of vending machines.
  - `drink`: A list to store available drinks.
  - `food`: A list to store available food.
  - `location_description`: A list to store location descriptions.
  - `hours_of_operation`: A list to store operating hours for each machine.
  - `access_information`: A list to store access details.
  - `coordinates`: A list to store coordinates of the machines.
  - `vendings_collection`: A list of dictionaries to store all the vending machine data collected.
  - `distance_store`: A dictionary for distances between locations.
  - `shortest_path`: A list representing the shortest path in terms of vending machine visits.

#### `load_data(self)`
Reads the CSV file and populates the lists for building names, amounts, drinks, foods, and other details. This method is automatically called when the class is initialized.

#### `__str__(self)`
Returns a string representation of all the vending machine data loaded from the CSV file.

#### `collect_vendings(self)`
Collects all the vending machine data into a list of dictionaries (`self.vendings_collection`). Each dictionary contains information for one vending machine.

#### `get_vending_info(self, vending_machine_location)`
Retrieves the information for a vending machine located in the specified building.

#### `check_time(self, time, day, time_range)`
Checks if the given time is within the vending machine's hours of operation for a specific day.

#### `time_system(self, time, day_of_week, vending_machine_location)`
A real-time system that checks if a vending machine is operational based on the current time and day of the week.

#### `filtration_system(self)`
Filters all the vending machines that are operational at the current time and prints out their details.

#### `get_distance(self, location1, location2)`
Calculates the distance between two vending machine locations using their coordinates.

- **Parameters:**
  - `location1` (str): The coordinates (latitude and longitude) of the first location.
  - `location2` (str): The coordinates of the second location.
  
- **Returns:**
  - The distance in meters between the two locations.

#### `collect_distance(self)`
Generates a dictionary of distances between all pairs of vending machines, storing them in `self.distance_store` for efficient lookup in routing algorithms.

- **Returns:**
  - `distance_store` (dict): A dictionary with distances between locations.

#### `nearest_vending_machine(self, user_lat, user_lon)`
Finds the closest vending machine to the user's current location based on latitude and longitude.

- **Parameters:**
  - `user_lat` (float): The user's latitude.
  - `user_lon` (float): The user's longitude.
  
- **Returns:**
  - The name of the nearest vending machine.

#### `greedy(self, distance_store, start_address)`
Implements a greedy algorithm to find the shortest path from a starting location to all other vending machines.

- **Parameters:**
  - `distance_store` (dict): A dictionary of distances between vending machines.
  - `start_address` (str): The initial vending machine location.
  
- **Returns:**
  - A list representing the shortest path in order of vending machine locations.

#### `vending_machine_recommendation(self, drink, food, user_lat, user_lon)`
Provides a vending machine recommendation based on the user's location and need for food or drink, using the shortest path.

- **Parameters:**
  - `drink` (bool): Indicates if the user wants a drink.
  - `food` (bool): Indicates if the user wants food.
  - `user_lat` (float): User's latitude.
  - `user_lon` (float): User's longitude.
  
- **Returns:**
  - Instructions on the optimal vending machine(s) to visit.

#### `vendings_map(self)`
Generates an HTML map with vending machine locations marked, highlighting the shortest path using lines between the closest machines.

- **How it works:**
  - Places markers on a map based on `self.shortest_path` locations.
  - Draws lines between locations to represent the shortest path.

### Error Handling

- The system will print an error message if the lengths of the lists (such as `building`, `amount`, etc.) are not equal. This ensures that the CSV data is consistent.

- The `check_time` method raises `ValueError` if the time range format is incorrect or the dash separating start and end times is missing.