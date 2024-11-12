# Compare Greedy Algorithm and Dijkstra Algorithm

## Overview

I provide an implementation of two well-known algorithms, **Dijkstra's Algorithm** and the **Greedy Algorithm**, to compute the shortest path between locations based on distance data. Both algorithms are applied to calculate the shortest path from a starting location (`Folsom Library`) to all other locations, and the total distance traveled along that path is recorded.

- **Dijkstra's Algorithm**: This algorithm is a classical approach for finding the shortest path between nodes in a graph, considering the optimal shortest path at each step and updating the distances for all neighboring nodes.
- **Greedy Algorithm**: This algorithm makes locally optimal choices at each step, selecting the nearest unvisited node. However, it does not guarantee finding the global shortest path.

## Results

### Dijkstra's Algorithm:

The result from running Dijkstra's algorithm produces the following order of locations visited and calculates the total distance for the shortest path:

**Visited Path**:  
`['Folsom Library', 'Voorhees Computing Center', 'Amos Eaton Hall', 'Greene Building', 'Russell Sage Laboratory', 'Jonsson–Rowland Science Center', 'j Erik Jonsson Engineering Center', 'Pittsburgh Building', 'West Hall', 'Darrin Communication Center', 'North Hall', 'Quadrangle Complex', 'Mueller Center', 'RPI Public Safety', 'Rensselaer Student Union', 'Warren Hall', 'Sharp Hall', 'Davison Hall']`

**Total Distance**:  
2769 miles

### Greedy Algorithm:

The result from running the Greedy algorithm produces a different path of locations visited, as the algorithm chooses the nearest neighbor at each step without necessarily finding the global optimal solution.

**Visited Path**:  
`['Folsom Library', 'Voorhees Computing Center', 'Jonsson–Rowland Science Center', 'j Erik Jonsson Engineering Center', 'Greene Building', 'Russell Sage Laboratory', 'Amos Eaton Hall', 'Pittsburgh Building', 'West Hall', 'North Hall', 'Quadrangle Complex', 'Rensselaer Student Union', 'RPI Public Safety', 'Mueller Center', 'Warren Hall', 'Sharp Hall', 'Davison Hall', 'Darrin Communication Center']`

**Total Distance**:  
2238 miles

## Final Choice:

Given the characteristics of this problem and the results, the **Greedy Algorithm** has been chosen primarily because it produces a shorter total distance compared to Dijkstra's Algorithm. While the Greedy Algorithm does not guarantee the absolute shortest path and may sacrifice some accuracy, it delivers a more efficient solution in terms of minimizing travel distance.