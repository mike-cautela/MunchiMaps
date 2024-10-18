import heapdict

def dijkstra(distance_store, start_address):
    """
    Uses Dijkstra's algorithm to calculate the shortest path from the start point to all other nodes
    and returns a list of nodes in the order they are visited.
    
    # parameters:
    distance_store: a dictionary where the keys are tuples of two addresses and the value is the distance between them
    start_address: the starting address
    
    # return
    a list of nodes in the order they are visited starting from the start address
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