import re

#Detects comments with bad words. 
def filter(banned_words, comment):
    for word in banned_words:
        if re.search(word, comment, re.IGNORECASE):
            print("BAD COMMENT: " + comment)

    
def load(filename):
    with open(filename, 'r') as f:
        text = f.read()
        banned_words = text.split()
    return banned_words

#TODO: Place banned_words in database when deployed, change it to fetch from db and add spam comment filter. 
def main():
    comment = input("Comment: ").strip()
    banned_words = load('banned_words.txt')
    filter(banned_words, comment)

if __name__ == "__main__":
    main()