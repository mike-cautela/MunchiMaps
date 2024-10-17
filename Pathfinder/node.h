#ifndef __NODE_H__
#define __NODE_H__
#include <vector>
#include <string>
#include <iostream>

class Node{
    public:
    
    Node(double locationX, double locationY);
    private:
        double locationX;
        double locationY;
        std::vector<Node*> connections;
};

Node::Node(double locationX, double locationY){
    this->locationX = locationX;
    this->locationY = locationY;
}

#endif