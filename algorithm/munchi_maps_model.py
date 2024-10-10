import csv # read the CSV file
from datetime import datetime # get the current date and time

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
    
    # helper function: print the certain vending machine info
    def get_vending_info(self, vending_machine_location):
        for i in self.vendings_collection:
            if (i["Building"] == vending_machine_location):
                return "Building: {}\nAmount: {}\nDrink: {}\nFood: {}\nLocation description: {}\nHours of operation: {}\nAccess information: {}\n".format(i["Building"], i["Amount"], i["Drink"], i["Food"], i["Location description"], i["Hours of operation"], i["Access information"])
        return "The vending machines' location is not found.\n"
    
    # helper function: check if the current time is within the vending machine's hours of operation
    def check_time(self, time, day, time_range):
        # process the time_range string
        day_range, hours_range = time_range.split() # split the time_range by space
        start_time, end_time = hours_range.split("–") # split the hours_range by "–"
        
        # make sure the given day and the day_range are the same, so ignore the upper and lower case
        if (day.lower() != day_range.lower()):
            return False
        
        # need to convert the time to 24-hour format
        if ("AM" in start_time):
            start_hour = int(start_time.replace("AM", ""))
            # corner case: 12AM equals to 00
            if (start_hour == 12):
                start_hour = "00"
            else:
                # f"{start_hour:02d}" means insert the value of the variable start_hour into the string and format it.
                # 02 means fill the number to two digits, and fill it with leading zeros if it is less than two digits.
                start_hour = f"{start_hour:02d}"
        # PM
        else:
            start_hour = int(start_time.replace("PM", ""))
            # corner case: 12PM equals to 12(noon)
            if (start_hour == 12):
                start_hour = "12"
            else:
                start_hour += 12 # add 12 hours to other PM times
                start_hour = f"{start_hour:02d}"
        if ("AM" in end_time):
            end_hour = int(end_time.replace("AM", ""))
            # corner case: 12AM equals to 00
            if (end_hour == 12):
                end_hour = "00"
            else:
                end_hour = f"{end_hour:02d}"
        # PM
        else:
            end_hour = int(end_time.replace("PM", ""))
            # corner case: 12PM equals to 12(noon)
            if (end_hour == 12):
                end_hour = "12"
            else:
                end_hour += 12
                end_hour = f"{end_hour:02d}"
        # handling multi-day situations, for example: 7AM–12AM (early morning of the next day)
        if (end_hour == "00"):
            end_hour = "24"
        # check if the current time is within the vending machine's hours of operation
        # given time is available
        if (start_hour <= time < end_hour):
            return True
        # given time is earlier than the start time
        elif (time < start_hour):
            return False
        # given time is later than the end time
        elif (time >= end_hour):
            return False
    
    # helper function: A real time system to check if the current time is within the vending machine's hours of operation  
    def time_system(self, time, day_of_week, vending_machine_location):
        for i in self.vendings_collection:
            if (i["Building"] == vending_machine_location):
                time_str = i["Hours of operation"]
                time_list = time_str.split("|") # hours is a list of strings
        for current_day in time_list:
            if (day_of_week in current_day):
                if (self.check_time(time, day_of_week, current_day) == True):
                    return True
        return False
    
    # filter out all the vending machines that are available and print out their info
    def filtration_system(self):
        time = datetime.now().strftime("%H") # get the current time, only want the hour
        day_of_week = datetime.now().strftime("%A") # get the current day of the week
        available_vendings = [] # store all the location of the vending machines that are available
        for location in self.building:
            if (self.time_system(time, day_of_week, location) == True):
                available_vendings.append(location)
        # print out all the available vending machines' info  
        for location in available_vendings:
            self.get_vending_info(location)