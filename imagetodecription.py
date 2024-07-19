def generate_switch_sentence(image1, image2, image3):
    results = ["This vending machine accepts: "]
    
    if image1 == "CreditCheck.png":
        results.append("card")
    elif image1 == "CreditX.png":
        results.append("")
        
    if image2 == "CashCheck.png":
        if image1 == "CreditX.png":
            results.append("cash")   
        else: 
            results.append(", cash")
    elif image2 == "Cashx.png":
        results.append("")
        
    if image3 == "PhoneCheck.png":
        if image1 == "CreditX.png" and image2 == "CashX.png":
            results.append("wireless payments")
        else: 
            results.append(", wireless payments")
    elif image3 == "PhoneX.png":
        results.append("")
        
    return "".join(results)

def main():
    
    '''
    First image expects Credit image.
    Second image expects Cash image.
    Third image expects phone image.
    
    '''
    # Prompt the user to enter the state of each switch
    switch1_input = input("First image name: ").strip()
    switch2_input = input("second image name: ").strip()
    switch3_input = input("third image name: ").strip()

    # Generate and print the output sentence
    output_sentence = generate_switch_sentence(switch1_input, switch2_input, switch3_input)
    print(output_sentence)

if __name__ == "__main__":
    main()
