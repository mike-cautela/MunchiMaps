import csv

class MunchiMaps_model(object):
    def __init__(self, csv_file):
        self.data = csv_file
        self.building = []
        self.amount = []
        self.drink = []
        self.food = []
        self.location_description = []
        self.hours_of_operation = []
        self.access_information = []
        self.coordinates = []
        self.load_data() # load the data from the CSV file
    
    # read the CSV file and populate the lists
    def load_data(self):
            with open(self.data, mode='r') as file:
                csv_reader = csv.DictReader(file)
                for row in csv_reader:
                    self.building.append(row['Building'])
                    self.amount.append(row['Amount'])
                    self.drink.append(row['Drink'])
                    self.food.append(row['Food'])
                    self.location_description.append(row['Location description'])
                    self.hours_of_operation.append(row['Hours of operation'])
                    self.access_information.append(row['Access information'])
                    self.coordinates.append(row['Coordinates'])
    
    # print out all the data we read from the CSV file
    def __str__(self):
        return "{}:\n\nBuilding: {}\n\nAmount: {}\n\nDrink: {}\n\nFood: {}\n\nLocation description: {}\n\nHours of operation: {}\n\nAccess information: {}\n\nCoordinates: {}".format(self.data, self.building, self.amount, self.drink, self.food, self.location_description, self.hours_of_operation, self.access_information, self.coordinates)
