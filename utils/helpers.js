const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const fs = require("fs");

async function checkIdentityNumber(identityNumber) {
  const chromeOptions = new chrome.Options();
  chromeOptions.addArguments("headless");
  chromeOptions.addArguments("window-size=1280x800");
  chromeOptions.addArguments("headless");
  chromeOptions.addArguments("no-sandbox");
  chromeOptions.addArguments("disable-dev-shm-usage");
  chromeOptions.addArguments(
    'user-agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537"'
  );

  const driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(chromeOptions)
    .build();
  await driver.sleep(3000);

  let screenshot = null;
  let thisTime = new Date()
    .toLocaleString("sv-SE", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hourCycle: "h23",
    })
    .replaceAll("-", "")
    .replaceAll(" ", "_")
    .replaceAll(":", "_");

  try {
    await driver.get("https://cekdptonline.kpu.go.id");

    const inputField = await driver.wait(
      until.elementLocated(By.css('input[type="text"].form-control')),
      5000
    );
    await inputField.sendKeys(identityNumber);
    const button = await driver.findElement(
      By.xpath('//button[normalize-space()="Pencarian"]')
    );
    await button.click();

    const content = await driver.wait(
      until.elementLocated(By.css(".showMap")),
      5000
    );
    screenshot = await driver.takeScreenshot();
    fs.writeFileSync(
      `storage/voter-results/${thisTime}_${identityNumber}.png`,
      screenshot,
      "base64"
    );

    let fullName = await content
      .findElement(By.xpath('//span[text()="Nama Pemilih"]/parent::p'))
      .getText();
    let pollingStationNumber = await content
      .findElement(By.xpath('//span[text()="TPS"]/parent::p'))
      .getText();
    let familyIdentityNumber = await content
      .findElement(By.xpath('//span[text()="NKK"]/parent::p'))
      .getText();
    let pollingStationRegencyName = await content
      .findElement(By.xpath('//span[text()="Kabupaten"]/parent::p'))
      .getText();
    let pollingStationDistrictName = await content
      .findElement(By.xpath('//span[text()="Kecamatan"]/parent::p'))
      .getText();
    let pollingStationVillageName = await content
      .findElement(By.xpath('//span[text()="Kelurahan"]/parent::p'))
      .getText();
    let pollingStationAddress = await content
      .findElement(By.xpath('//span[text()="Alamat Potensial TPS"]/parent::p'))
      .getText();

    pollingStationNumber = pollingStationNumber.split("\n")[1];

    return {
      meta: {
        success: true,
        code: 200,
        message: "Identity number found",
        errors: [],
      },
      data: {
        full_name: fullName.split("\n")[1],
        identity_number: String(identityNumber),
        family_identity_number: familyIdentityNumber.split("\n")[1],
        polling_station: {
          name: `TPS ${String(pollingStationNumber).padStart(3, "0")}`,
          number: pollingStationNumber,
          regency_name: pollingStationRegencyName.split("\n")[1],
          district_name: pollingStationDistrictName.split("\n")[1],
          village_name: pollingStationVillageName.split("\n")[1],
          address: pollingStationAddress.split("\n")[1],
        },
      },
    };
  } catch (errorMessage) {
    screenshot = await driver.takeScreenshot();
    fs.writeFileSync(
      `storage/error-results/${thisTime}_${identityNumber}.png`,
      screenshot,
      "base64"
    );

    return {
      meta: {
        success: false,
        code: 500,
        message: `${errorMessage}`,
        errors: [],
      },
      data: null,
    };
  } finally {
    await driver.quit();
  }
}

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

module.exports = {
  checkIdentityNumber,
  normalizePort,
};
