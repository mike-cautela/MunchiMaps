#include "node.h"
#include "locations.h"
#include <fstream>
#include <vector>
#include <string>
#include <iostream>
#include "json.hpp"
#include <ctime>



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

std::vector<Locations> checkTimes(std::vector<Locations> machines){
    
}


int main(){
    std::ifstream infile("nodes.json");
    std::vector<Locations> locations;
    locations = getnodes(infile);
    std::time_t currentTime = time(0);
    tm* localTime = localtime(&currentTime);
    int hour = localTime->tm_hour;
    int min = localTime->tm_min;
    std::cout << hour << " " << min << std::endl;

    return 0;
}