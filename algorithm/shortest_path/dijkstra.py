import heapdict
from munchi_maps_model import MunchiMaps_model

def dijkstra(distance_store, start_address):
    """
    Using Dijkstra's Algorithm to calculate the shortest path from the start point to all other nodes
    and returns a list of nodes in the order they are visited.
    
    Args:
        distance_store: a dictionary where the keys are tuples of two addresses and the value is the distance between them
        start_address: the starting address
    
    Returns:
        shortest_path: a list of nodes in the order they are visited starting from the start address
    """
    # create an adjacency list representation of the graph
    graph = {}
    for (address1, address2), distance in distance_store.items():
        if (address1 not in graph.keys()):
            graph[address1] = {}
        if (address2 not in graph.keys()):
            graph[address2] = {}
        graph[address1][address2] = distance
        graph[address2][address1] = distance
    
    # initialize the distance dictionary, setting all distances to infinity (float('inf'))
    distances = {node: float('inf') for node in graph}
    distances[start_address] = 0  # the start address has a distance of 0
    
    # create a priority queue and add the start address to it
    priority_queue = heapdict.heapdict()
    priority_queue[start_address] = 0
    
    visited_order = []  # record the visit order
    
    while priority_queue:
        # remove the node with the smallest distance from the priority queue
        current_node, current_distance = priority_queue.popitem()
        
        # record the current node as visited
        visited_order.append(current_node)
        
        # explore all neighbors of the current node
        for neighbor, weight in graph[current_node].items():
            distance = current_distance + weight
            
            # If a shorter path is found, update the distance and add to the priority queue
            if (distance < distances[neighbor]):
                distances[neighbor] = distance
                priority_queue[neighbor] = distance
                
    # sort the distances by the shortest path
    distances = sorted(distances.items(), key=lambda x: x[1])
    shortest_path = []  # record the shortest path
    for i in distances:
        shortest_path.append(i[0])
    return shortest_path

if __name__ == "__main__":
    data = "vending_machine.csv" # default vending machine data file
    munchimaps_info = MunchiMaps_model(data)
    # collect all the vending machines info into self.vendings, a list of dictionaries
    munchimaps_info.collect_vendings()
    # get all the distance between the locations into a dictionary
    distance_store = munchimaps_info.collect_distance()
    # set the first address in vending_machine.csv as the start address for test
    shortest_path_record = dijkstra(distance_store, "Folsom Library")
    print(shortest_path_record) # print the shortest path record
    """
    ['Folsom Library', 'Voorhees Computing Center', 'Amos Eaton Hall', 'Greene Building', 
    'Russell Sage Laboratory', 'Jonsson–Rowland Science Center', 'j Erik Jonsson Engineering Center', 
    'Pittsburgh Building', 'West Hall', 'Darrin Communication Center', 'North Hall', 'Quadrangle Complex', 
    'Mueller Center', 'RPI Public Safety', 'Rensselaer Student Union', 'Warren Hall', 'Sharp Hall', 
    'Davison Hall']
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
    