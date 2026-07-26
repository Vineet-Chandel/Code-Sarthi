export default {
  topics: [
    {
      id: "setup",
      title: "Setup & Locators',",
      sections: [
        {
          heading: "WebDriver setup (Python)",
          description: "Selenium drives real browsers. selenium-manager auto-downloads the correct ChromeDriver.",
          language: "python",
          code: `from selenium import webdriver
from selenium.webdriver.chrome.options import Options

# Headless Chrome (for CI)
options = Options()
options.add_argument("--headless=new")
options.add_argument("--no-sandbox")
options.add_argument("--disable-dev-shm-usage")

driver = webdriver.Chrome(options=options)

# Chrome with DevTools
driver = webdriver.Chrome()

# Firefox
driver = webdriver.Firefox()

driver.get("https://devcheats.in")
print(driver.title)

driver.quit()  # always quit to free resources`,
        },
        {
          heading: "Locators",
          description: "By.CSS_SELECTOR is the most versatile locator — same syntax as JavaScript querySelector.",
          language: "python",
          code: `from selenium.webdriver.common.by import By

# CSS selector (preferred)
el = driver.find_element(By.CSS_SELECTOR, "button.primary")
driver.find_elements(By.CSS_SELECTOR, ".card-grid .card")

# ID — fastest
el = driver.find_element(By.ID, "search-input")

# XPath — for complex/attribute queries
el = driver.find_element(By.XPATH, "//button[@aria-label='Submit']")
el = driver.find_element(By.XPATH, "//td[contains(text(),'Vineet')]")

# Text content
el = driver.find_element(By.LINK_TEXT, "Sign In")
el = driver.find_element(By.PARTIAL_LINK_TEXT, "Sign")`,
        },
      ],
    },
    {
      id: "actions",
      title: "Actions & Interactions',",
      sections: [
        {
          heading: "Basic interactions",
          description: "Always locate elements before interacting. Elements become stale after page navigation.",
          language: "python",
          code: `from selenium.webdriver.common.keys import Keys

btn  = driver.find_element(By.CSS_SELECTOR, "button[type='submit']")
inp  = driver.find_element(By.ID, "email")
link = driver.find_element(By.LINK_TEXT, "About")

# Click & type
btn.click()
inp.send_keys("v@devcheats.in")
inp.send_keys(Keys.RETURN)     # press Enter

# Clear and type
inp.clear()
inp.send_keys("new@value.com")

# Read content
print(btn.text)
print(inp.get_attribute("placeholder"))
print(inp.get_attribute("value"))
print(btn.is_enabled())
print(btn.is_displayed())`,
        },
        {
          heading: "ActionChains — complex interactions",
          description: "ActionChains enables hover, drag-and-drop, keyboard combinations, and context menus.",
          language: "python",
          code: `from selenium.webdriver.common.action_chains import ActionChains

actions = ActionChains(driver)

# Hover (mouseover)
menu = driver.find_element(By.CSS_SELECTOR, "nav .dropdown")
actions.move_to_element(menu).perform()

# Drag and drop
src  = driver.find_element(By.ID, "drag-item")
dest = driver.find_element(By.ID, "drop-zone")
actions.drag_and_drop(src, dest).perform()

# Key combinations
actions.key_down(Keys.CONTROL).send_keys("a").key_up(Keys.CONTROL).perform()

# Chained actions
(actions
  .move_to_element(el)
  .click()
  .send_keys("hello")
  .perform())`,
        },
      ],
    },
    {
      id: "waits",
      title: "Waits & Assertions',",
      sections: [
        {
          heading: "Explicit waits",
          description: "Never use time.sleep(). Use WebDriverWait with expected_conditions for reliable tests.",
          language: "python",
          code: `from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

wait = WebDriverWait(driver, timeout=10)

# Wait for element to appear
el = wait.until(EC.presence_of_element_located((By.ID, "result")))

# Wait until clickable (visible + enabled)
btn = wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, ".submit-btn")))
btn.click()

# Wait for text to appear
wait.until(EC.text_to_be_present_in_element((By.ID, "status"), "Success"))

# Wait for URL change
wait.until(EC.url_contains("/dashboard"))

# Wait for element to disappear
wait.until(EC.invisibility_of_element_located((By.CSS_SELECTOR, ".spinner")))`,
        },
        {
          heading: "Page Object pattern",
          description: "Page Objects encapsulate page interactions — tests become readable and maintainable.",
          language: "python",
          code: `class LoginPage:
    URL = "https://devcheats.in/login"

    def __init__(self, driver):
        self.driver = driver
        self.wait   = WebDriverWait(driver, 10)

    def load(self):
        self.driver.get(self.URL)
        return self

    @property
    def email_field(self):
        return self.driver.find_element(By.ID, "email")

    @property
    def submit_button(self):
        return self.wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, "[type='submit']")))

    def login(self, email: str, password: str):
        self.email_field.send_keys(email)
        self.driver.find_element(By.ID, "password").send_keys(password)
        self.submit_button.click()
        return DashboardPage(self.driver)

# In tests:
page = LoginPage(driver).load()
dashboard = page.login("v@example.com", "secret")`,
        },
      ],
    },
  ],
};
