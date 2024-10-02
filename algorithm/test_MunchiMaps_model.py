from munchi_maps_model import MunchiMaps_model
if __name__ == "__main__":
    data = input("Type the name of the file: ").strip() # strip()函数用于去除字符串两端的空格
    vending_machine_data = MunchiMaps_model(data)
    print(vending_machine_data)