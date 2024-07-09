import re

#Detects comments with bad words. 
def filter(words, database):
    bad_comments = []

def load(filename):
    with open(filename, 'r') as f:
        text = f.read()
        banned_words = text.split()
    return banned_words

#Right just will check for a list of banned words. Need to create algo for spam too. 
def main():
    #.txt file for banned words on repo is bad idea; put in database and fetch later...
    database = load('[DATABASE].sql')
    banned_words = load('banned_words.txt')
    print(banned_words)
    filter(banned_words, database)

if __name__ == "__main__":
    main()