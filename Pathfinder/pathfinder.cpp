#include "node.h"
#include "locations.h"
#include <fstream>
#include <vector>
#include <string>
#include <iostream>
#include "json.hpp"




int main(){
    std::ifstream infile("nodes.json");
    std::vector<Locations> locations;
    locations = getnodes(infile);
    return 0;
}