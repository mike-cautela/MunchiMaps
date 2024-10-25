#include "node.h"
#include "locations.h"
#include <fstream>
#include <vector>
#include <string>
#include <iostream>
#include "json.hpp"


std::vector<Locations> getnodes(std::ifstream &infile){
    nlohmann::json jsonData;
    infile >> jsonData;
    std::vector<Locations> locations;
    int num = 0;
    for(const auto& machines : jsonData["machiness"]){
        if(machines["hasVendingMachine"] == "true"){
            Locations loc;
            loc.setName(machines["name"]);
            std::cout << machines["name"] << std::endl;
            loc.setLocationX(stod(machines["location"][0].get<std::string>()));
            loc.setLocationY(stod(machines["location"][1].get<std::string>()));
            loc.food(machines["food"] == "true");
            loc.drinks(machines["drink"] == "true");
            locations.push_back(loc);
        }
        num++;
    }
    return locations;
}



int main(){
    std::ifstream infile("nodes.json");
    std::vector<Locations> locations;
    locations = getnodes(infile);
    

    return 0;
}