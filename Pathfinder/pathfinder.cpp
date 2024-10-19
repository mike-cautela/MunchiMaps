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
    for(const auto& route : jsonData["routes"]){
        if(route["hasVendingMachine"] == "true"){
            Locations loc;
            loc.setName(route["name"]);
            std::cout << route["name"] << std::endl;
            loc.setLocationX(stod(route["location"][0].get<std::string>()));
            loc.setLocationY(stod(route["location"][1].get<std::string>()));
            loc.food(route["food"] == "true");
            loc.drinks(route["drink"] == "true");
            locations.push_back(loc);
        }
        num++;
    }
    std::cout << locations.size();
    return locations;
}

int main(){
    std::ifstream infile("nodes.json");
    std::vector<Locations> locations;
    locations = getnodes(infile);
    return 0;
}