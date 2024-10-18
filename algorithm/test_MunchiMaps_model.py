from munchi_maps_model import MunchiMaps_model

if __name__ == "__main__":
    data = input("Type the name of the file: ").strip() # strip() removes leading and trailing whitespaces
    vending_machine_tester = MunchiMaps_model(data)
    # print(vending_machine_tester)
    vending_machine_tester.collect_vendings()
    # print(vending_machine_tester.vendings_collection)
    
    # test: get_vending_info()
    if (vending_machine_tester.get_vending_info("DCC") == "The vending machines' location is not found.\n"):
        print("get_vending_info() test 1 passed.")
    else:
        print("get_vending_info() test 1 failed.")
    if (vending_machine_tester.get_vending_info("Rensselaer Student Union") == "Building: Rensselaer Student Union\nAmount: 2\nDrink: TRUE\nFood: TRUE\nLocation description: 1st floor\nHours of operation: Monday 7AM–12AM|Tuesday 7AM–12AM|Wednesday 7AM–12AM|Thursday 7AM–12AM|Friday 7AM–12AM|Saturday 9AM–12AM|Sunday 9AM–12AM\nAccess information: RPI ID\n"):
        print("get_vending_info() test 2 passed.")
    else:
        print("get_vending_info() test 2 failed.")
    
    #test: check_time()
    time_range = "Monday 7AM–12AM"
    if (vending_machine_tester.check_time("08", "Monday", time_range) == True):
        print("check_time() test 1 passed.")
    else:
        print("check_time() test 1 failed.")
    if(vending_machine_tester.check_time("06", "Monday", time_range) == False):
        print("check_time() test 2 passed.")
    else:
        print("check_time() test 2 failed.")
    if (vending_machine_tester.check_time("01", "Monday", time_range) == False):
        print("check_time() test 3 passed.")
    else:
        print("check_time() test 3 failed.")
    if (vending_machine_tester.check_time("11", "Sunday", time_range) == False):
        print("check_time() test 4 passed.")
    else:
        print("check_time() test 4 failed.")
    if (vending_machine_tester.check_time("07", "Monday", time_range) == True):
        print("check_time() test 5 passed.")
    else:
        print("check_time() test 5 failed.")
    if (vending_machine_tester.check_time("23", "Monday", time_range) == True):
        print("check_time() test 6 passed.")
    else:
        print("check_time() test 6 failed.")
        
    # test: time_system()
    if (vending_machine_tester.time_system("07", "Wednesday", "Rensselaer Student Union") == True):
        print("time_system() test 1 passed.")
    else:
        print("time_system() test 1 failed.")
    if (vending_machine_tester.time_system("06", "Wednesday", "Rensselaer Student Union") == False):
        print("time_system() test 2 passed.")
    else:
        print("time_system() test 2 failed.")
    if (vending_machine_tester.time_system("21", "Wednesday", "Darrin Communication Center") == False):
        print("time_system() test 3 passed.")
    else:
        print("time_system() test 3 failed.")
    if (vending_machine_tester.time_system("22", "Wednesday", "Darrin Communication Center") == False):
        print("time_system() test 4 passed.")
    else:
        print("time_system() test 4 failed.")
    if (vending_machine_tester.time_system("24", "Saturday", "RPI Public Safety") == True):
        print("time_system() test 5 passed.")
    else:
        print("time_system() test 5 failed.")
    if (vending_machine_tester.time_system("00", "Sunday", "RPI Public Safety") == True):
        print("time_system() test 6 passed.")
    else:
        print("time_system() test 6 failed.")
    if (vending_machine_tester.time_system("01", "Sunday", "Russell Sage Laboratory") == False):
        print("time_system() test 7 passed.")
    else:
        print("time_system() test 7 failed.")
    
    # test: filtration_system()
    vending_machine_tester.filtration_system()
    
    # test: get_distance()
    if (vending_machine_tester.get_distance("42.72954131606436\–73.68250278794625", "42.72954131606436\–73.68250278794625") == 0):
        print("get_distance() test 1 passed.")
    else:
        print("get_distance() test 1 failed.")
    if (vending_machine_tester.get_distance("42.72954131606436\–73.68250278794625", "42.73022009495838\–73.68115317445492") == 134):
        print("get_distance() test 2 passed.")
    else:
        print("get_distance() test 2 failed.")
    
    # test: collect_distance()
    print(vending_machine_tester.collect_distance())
    # combination problemC: (n, 2) = \dfrac{n(n - 1)}{2} = \dfrac{18 * 17}{2} = 153
    # because there are 18 vending machines, the number of distances should be 153
    if (len(vending_machine_tester.distance_collect) == 153):
        print("collect_distance() test 1 passed.")
    else:
        print("collect_distance() test 1 failed.")