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