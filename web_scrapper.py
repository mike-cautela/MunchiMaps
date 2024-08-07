from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import NoSuchElementException, TimeoutException
import time

# Initialize Chrome options
chrome_options = Options()
driver = webdriver.Chrome(options=chrome_options)

# Open the website
driver.get('https://publicsafety.rpi.edu/campus-security/card-access-schedule')
print("Website opened")

# Wait until the table is present on the page
wait = WebDriverWait(driver, 10, ignored_exceptions=(NoSuchElementException))
wait.until(
    EC.presence_of_element_located((By.XPATH, '//*[@id="block-paperclip-content"]/div/article/div/div/div/div/div/table'))
)

# Find the tbody element
tbody = driver.find_element(By.XPATH, '//*[@id="block-paperclip-content"]/div/article/div/div/div/div/div/table/tbody')

data = []

# Iterate through all rows in the table body
for tr in tbody.find_elements(By.XPATH, './/tr'):  # Use find_elements here to get all rows
    row = [item.text for item in tr.find_elements(By.XPATH, '//table/tbody/tr[1]/td[3]')]
    data.append(row)

# //table/tbody/tr[1]/td[3]

print(data)
