#ifndef __LOCATIONS_H__
#define __LOCATIONS_H__
#include "Node.h"
#include <vector>
#include <string>
#include <iostream>

class Locations{
    public:
        Locations(std::string name, double locationX, double locationY, Node* connection, bool hasFood, bool hasDrink);
    private:
        std::string name;
        double locationX;
        double locationY;
        Node* connection;
        bool hasFood;
        bool hasDrink;

};

Locations::Locations(std::string name, double locationX, double locationY, Node* connection, bool hasFood, bool hasDrink){
    this->name = name;
    this->locationX = locationX;
    this->locationY = locationY;
    this->connection = connection;
    this->hasFood = hasFood;
    this->hasDrink = hasDrink;
}

#endif