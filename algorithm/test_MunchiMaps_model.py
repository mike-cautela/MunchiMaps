from munchi_maps_model import MunchiMaps_model
if __name__ == "__main__":
    data = input("Type the name of the file: ").strip() # strip() removes leading and trailing whitespaces
    vending_machine_data = MunchiMaps_model(data)
    # print(vending_machine_data)
    vending_machine_data.collect_vendings()
    # print(vending_machine_data.vendings_collection)
    
    # test: check function get_vending_info()
    test1 = vending_machine_data.get_vending_info("DCC")
    if (test1 == "The vending machines' location is not found.\n"):
        print("get_vending_info() test 1 passed.")
    else:
        print("get_vending_info() test 1 failed.")
    test2 = vending_machine_data.get_vending_info("Rensselaer Student Union")
    if (test2 == "Building: Rensselaer Student Union\nAmount: 2\nDrink: TRUE\nFood: TRUE\nLocation description: 1st floor\nHours of operation: Monday-Friday 7AM-12AM|Weekend 9AM-12AM\nAccess information: RPI ID\n"):
        print("get_vending_info() test 2 passed.")
    else:
        print("get_vending_info() test 2 failed.")
        
    # test: