from munchi_maps_model import MunchiMaps_model

def greedy(distance_store, start_address):
    """
    Using Greedy Algorithm to calculate the shortest path from the start point to all other nodes
    and returns a list of nodes in the order they are visited.
    
    Args:
        distance_store: a dictionary where the keys are tuples of two addresses and the value is the distance between them
        start_address: the starting address

    Returns:
        shortest_path: a list of nodes in the order they are visited starting from the start address
    """
    shortest_path = [start_address] # record the shortest path
    visited = set() # record the visited nodes
    graph = {} # a dictionary of dictionaries to store all the distances from one location to others
    for (address1, address2), distance in distance_store.items():
        if (address1 not in graph):
            graph[address1] = {}
            visited.add(address1)
        if (address2 not in graph):
            graph[address2] = {}
            visited.add(address2)
        graph[address1][address2] = distance
        graph[address2][address1] = distance
    # sort the graph by the distance
    sorted_graph = {} # a sorted version of the graph container
    for i in graph.keys():
        for _, distance in graph[i].items():
            sorted_distance = dict(sorted(graph[i].items(), key=lambda x: x[1]))
            sorted_graph[i] = sorted_distance
    current_location = start_address # set the start address as the current location
    visited.remove(current_location)
    while (len(visited) != 0):
        for next_location in sorted_graph[current_location].keys():
            if (next_location in visited):
                shortest_path.append(next_location)
                visited.remove(next_location)
                current_location = next_location
                break
            else:
                continue
    return shortest_path

if __name__ == "__main__":
    data = "vending_machine.csv" # default vending machine data file
    munchimaps_info = MunchiMaps_model(data)
    # collect all the vending machines info into self.vendings, a list of dictionaries
    munchimaps_info.collect_vendings()
    # get all the distance between the locations into a dictionary
    distance_store = munchimaps_info.collect_distance()
    # set the first address in vending_machine.csv as the start address for test
    shortest_path_record = greedy(distance_store, "Folsom Library")
    print(shortest_path_record) # print the shortest path record
    """
    ['Folsom Library', 'Voorhees Computing Center', 'Jonsson–Rowland Science Center', 
    'j Erik Jonsson Engineering Center', 'Greene Building', 'Russell Sage Laboratory', 
    'Amos Eaton Hall', 'Pittsburgh Building', 'West Hall', 'North Hall', 'Quadrangle Complex', 
    'Rensselaer Student Union', 'RPI Public Safety', 'Mueller Center', 'Warren Hall', 'Sharp Hall', 
    'Davison Hall', 'Darrin Communication Center']
    """
    
    # calculate the whole distance of the shortest path
    total_distance = 0
    for i in range(1, len(shortest_path_record)):
        # handle the key difference in the distance_store dictionary
        if ((shortest_path_record[i - 1], shortest_path_record[i]) in distance_store.keys()):
            total_distance += distance_store[(shortest_path_record[i - 1], shortest_path_record[i])]
        elif ((shortest_path_record[i], shortest_path_record[i - 1]) in distance_store.keys()):
            total_distance += distance_store[(shortest_path_record[i], shortest_path_record[i - 1])]
    # print the total distance of the shortest path
    print("The total distance of the shortest path is: ", total_distance, "miles.")