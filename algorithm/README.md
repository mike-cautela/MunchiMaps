# MunchiMaps Vending Machine System

This project is a Python-based system for managing and interacting with vending machine data from a CSV file. The data includes information about building locations, amounts, drinks, foods, location descriptions, hours of operation, access information, and coordinates for each vending machine. The system allows you to load, store, and process this data, as well as check the availability of vending machines in real-time based on the current day and time. Additionally, the system provides functionalities to display vending machine locations on a map, find the nearest vending machine based on the user's current location and specific needs (food or drink), calculate the shortest path between vending machines if a single location does not meet all needs, and visualize the shortest distances between machines on a map, connecting the closest options with lines.

## Installation

To use this model, you must have Python 3.x installed on your system.

Additionally, you will need the following modules:

- `csv`: to read data from the CSV file.
- `datetime`: to handle current time and date operations.

These are part of Python's standard library, so no external packages are needed.

## How to Use

1. Prepare a CSV file containing the vending machine information. The CSV file should have the following headers:
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

#### `load_data(self)`
Reads the CSV file and populates the lists for building names, amounts, drinks, foods, and other details. This method is automatically called when the class is initialized.

- **No parameters.**

#### `__str__(self)`
Returns a string representation of all the vending machine data loaded from the CSV file.

- **Returns:**
  - A formatted string containing all the details read from the CSV file.

#### `collect_vendings(self)`
Collects all the vending machine data into a list of dictionaries (`self.vendings_collection`). Each dictionary contains information for one vending machine.

- **No parameters.**