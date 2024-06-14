#decription based on the image presented

def generate_description(image):
    if image == 'CashCheck.png':
        return "This vending machine accepts cash"
    if image == 'PhoneCheck.png':
        return "This vending machine accepts tap to pay"
    if image == "CreditCheck.png":
        return "This vending machine accepts cards"
    if image == "CashX.ong":
        "This vending machine does not accept cash"
    if image == "PhoneX.png":
        "This vending machine does not accept tap to pay"
    if image == "CreditX.png":
        "This vending machine does not accept cards"  
    else:
        return "Sorry, I don't have a decription for that image."
    
 

if __name__ == "__main__":
    char = input("Enter the image name: ")
    decription = generate_description(char)
    print(decription)