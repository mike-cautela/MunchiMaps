# MunchiMaps Vending Machine System

This project is a Python-based system for managing and interacting with vending machine data from a CSV file. The data includes information about building locations, amounts, drinks, foods, location descriptions, hours of operation, access information, and coordinates for each vending machine. The system allows you to load, store, and process this data, as well as check the availability of vending machines in real-time based on the current day and time. Additionally, the system provides functionalities to display vending machine locations on a map, find the nearest vending machine based on the user's current location and specific needs (food or drink), calculate the shortest path between vending machines if a single location does not meet all needs, and visualize the shortest distances between machines on a map, connecting the closest options with lines.

## Installation

To use this model, you must have Python 3.x installed on your system.

Additionally, you will need the following modules:

- `csv`: to read data from the CSV file.
- `datetime`: to handle current time and date operations.

These are part of Python's standard library, so no external packages are needed.

## How to Use

### Data

The vending_machine_update.csv is the updated version of all the vending machine data.

- Precautions
    - For the section `Hours of operation`, better to type the hours of operation for each day in a week, even though every day have the same time. Except open 24 hours. And remember using `em dash —`, not `en dash –`, which may lead a bug in function `check_time(self, time, day, time_range)`. If you using mac, `em dash` is `option shift -`.

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

#### `get_vending_info(self, vending_machine_location)`
Retrieves the information for a vending machine located in the specified building.

- **Parameters:**
  - `vending_machine_location` (str): The building name of the vending machine.
  
- **Returns:**
  - A formatted string with the vending machines' details, including building, amount, drinks, foods, location description, hours of operation, and access information. If the vending machine location is not found, it returns a message saying "The vending machines' location is not found."

#### `check_time(self, time, day, time_range)`
Checks if the given time is within the vending machine's hours of operation for a specific day.

- **Parameters:**
  - `time` (str): The current time in 24-hour format (e.g., "14" for 2 PM).
  - `day` (str): The current day of the week (e.g., "Monday").
  - `time_range` (str): The hours of operation for that day, as listed in the CSV file (e.g., "Monday 9AM–5PM").
  
- **Returns:**
  - `True` if the vending machine is operational at the given time, `False` otherwise.

#### `time_system(self, time, day_of_week, vending_machine_location)`
A real-time system that checks if a vending machine is operational based on the current time and day of the week.

- **Parameters:**
  - `time` (str): The current time in 24-hour format.
  - `day_of_week` (str): The current day of the week.
  - `vending_machine_location` (str): The building name of the vending machine.
  
- **Returns:**
  - `True` if the vending machine is operational, `False` otherwise.

#### `filtration_system(self)`
Filters all the vending machines that are operational at the current time and prints out their details.

- **No parameters.**

- **How it works:**
  - It gets the current time and day of the week using `datetime.now()`.
  - It checks each vending machine's hours of operation and prints the details of those that are currently open.

## Error Handling

- The system will print an error message if the lengths of the lists (such as `building`, `amount`, etc.) are not equal. This ensures that the CSV data is consistent.

- The `check_time` method raises `ValueError` if the time range format is incorrect or the dash separating start and end times is missing.