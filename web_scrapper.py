from selenium import webdriver
import time

driver = webdriver.Chrome()

driver.get("https://inciteprojects.idea.rpi.edu/studysafe/app/studysafe")
driver.implicitly_wait(30) 
