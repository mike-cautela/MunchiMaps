from munchi_maps_model import MunchiMaps_model
if __name__ == "__main__":
    data = input("Type the name of the file: ").strip() # strip() removes leading and trailing whitespaces
    vending_machine_data = MunchiMaps_model(data)
    # print(vending_machine_data)
    vending_machine_data.collect_vendings()
    # print(vending_machine_data.vendings_collection)
    
    # test: check get_vending_info()
    if (vending_machine_data.get_vending_info("DCC") == "The vending machines' location is not found.\n"):
        print("get_vending_info() test 1 passed.")
    else:
        print("get_vending_info() test 1 failed.")
    if (vending_machine_data.get_vending_info("Rensselaer Student Union") == "Building: Rensselaer Student Union\nAmount: 2\nDrink: TRUE\nFood: TRUE\nLocation description: 1st floor\nHours of operation: Monday 7AM–12AM|Tuesday 7AM–12AM|Wednesday 7AM–12AM|Thursday 7AM–12AM|Friday 7AM–12AM|Saturday 9AM–12AM|Sunday 9AM–12AM\nAccess information: RPI ID\n"):
        print("get_vending_info() test 2 passed.")
    else:
        print("get_vending_info() test 2 failed.")
    
    #test: check_time()
    time_range = "Monday 7AM–12AM"
    if (vending_machine_data.check_time("08", "Monday", time_range) == True):
        print("check_time() test 1 passed.")
    else:
        print("check_time() test 1 failed.")
    if(vending_machine_data.check_time("06", "Monday", time_range) == False):
        print("check_time() test 2 passed.")
    else:
        print("check_time() test 2 failed.")
    if (vending_machine_data.check_time("01", "Monday", time_range) == False):
        print("check_time() test 3 passed.")
    else:
        print("check_time() test 3 failed.")
    if (vending_machine_data.check_time("11", "Sunday", time_range) == False):
        print("check_time() test 4 passed.")
    else:
        print("check_time() test 4 failed.")
        
    # test: check time_system()
    # vending_machine_data.time_system("Rensselaer Student Union")
    
    # test: check filtration_system()
    # vending_machine_data.filtration_system()