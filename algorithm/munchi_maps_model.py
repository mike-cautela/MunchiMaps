import csv

class MunchiMaps_model(object):
    def __init__(self, csv_file):
        self.data = csv_file
        self.building = list()
        self.amount = list()
        self.drink = list()
        self.food = list()
        self.location_description = list()
        self.hours_of_operation = list()
        self.access_information = list()
        self.coordinates = list()
        self.load_data() # load the data from the CSV file
        self.vendings_collection = list() # a list of dictionaries [{}], store all the vending machines info
    
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
    
    # collect all the vending machines info into self.vendings, a list of dictionaries
    def collect_vendings(self):
        vendings = []
        if (len(self.building) == len(self.amount) == len(self.drink) == len(self.food) == len(self.location_description) == len(self.hours_of_operation) == len(self.access_information) == len(self.coordinates)):
            for i in range(len(self.building)):
                vending = {
                    "Building": self.building[i],
                    "Amount": self.amount[i],
                    "Drink": self.drink[i],
                    "Food": self.food[i],
                    "Location description": self.location_description[i],
                    "Hours of operation": self.hours_of_operation[i],
                    "Access information": self.access_information[i],
                    "Coordinates": self.coordinates[i]
                }
                vendings.append(vending)
            self.vendings_collection = vendings
        else:
            print("Error: The length of the lists are not equal. Please check the data.\n")
    
    # print the certain vending machine info
    def get_vending_info(self, vending_machine_location):
        for i in self.vendings_collection:
            if (i["Building"] == vending_machine_location):
                return "Building: {}\nAmount: {}\nDrink: {}\nFood: {}\nLocation description: {}\nHours of operation: {}\nAccess information: {}\n".format(i["Building"], i["Amount"], i["Drink"], i["Food"], i["Location description"], i["Hours of operation"], i["Access information"])
        return "The vending machines' location is not found.\n"
        
    
    
