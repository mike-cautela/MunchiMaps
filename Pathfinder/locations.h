#ifndef __LOCATIONS_H__
#define __LOCATIONS_H__
#include "Node.h"
#include <vector>
#include <string>
#include <iostream>

class Locations{
    public:
        Locations();
        Locations(std::string name, double locationX, double locationY, Node* connection, bool hasFood, bool hasDrink);
        void setName(std::string name);
        void setLocationX(double X);
        void setLocationY(double Y);
        void food(bool exists);
        void drinks(bool exists);

    private:
        std::string name;
        double locationX;
        double locationY;
        Node* connection;
        bool hasFood;
        bool hasDrinks;

};
Locations::Locations(){
    name = "";
    locationX = 0;
    locationY = 0;
    hasFood = false;
    hasDrinks = false;
}

Locations::Locations(std::string name, double locationX, double locationY, Node* connection, bool hasFood, bool hasDrink){
    this->name = name;
    this->locationX = locationX;
    this->locationY = locationY;
    this->connection = connection;
    this->hasFood = hasFood;
    this->hasDrinks = hasDrink;
}

void Locations::setName(std::string name){
    this->name = name;
}
void Locations::setLocationX(double X){
    locationX = X;
}
void Locations::setLocationY(double Y){
    locationY = Y;
}
void Locations::food(bool exists){
    hasFood = exists;
}
void Locations::drinks(bool exists){
    hasDrinks = exists;
}
#endif