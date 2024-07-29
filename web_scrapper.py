from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import NoSuchElementException, TimeoutException
import time

driver = webdriver.Chrome()

# Gets to the Chrome website 
driver.get("https://inciteprojects.idea.rpi.edu/studysafe/app/studysafe")

# Waits until the window of the first button is pressed
wait = WebDriverWait(driver, 10,ignored_exceptions=(NoSuchElementException))
try:
    # Waiting for the button to be present
    startingButton = wait.until(lambda d: d.find_element(By.CSS_SELECTOR, ".btn.btn-default.action-button.shiny-bound-input"))
    # Presses the button
    startingButton.click()
except TimeoutException:
    # If button was not found
    print("The element was not found within the given time.")

print("click complete")

