const express = require("express");
const puppeteer = require("puppeteer");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());

app.get("/sendText", async (req, res) => {
    const meass = req.query.name;

    try {
        const browser = await puppeteer.launch({
          headless: true,
          args: ["--no-sandbox", "--disable-setuid-sandbox"],
        });
        const page = await browser.newPage();
    
        console.log("Navigating to lexica.art...");
        await page.goto(`https://lexica.art/?q=${meass}`, {
          waitUntil: "networkidle2",
          timeout: 60000,
        });
        console.log("Navigation completed.");
    
        const images = new Set();
        const scrollCount = 5;
        const waitTime = 2500;
    
        for (let i = 0; i < scrollCount; i++) {
          const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    
          await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
          await sleep(waitTime);
    
          const newImages = await page.evaluate(() => {
            return Array.from(document.querySelectorAll("img"))
              .map((img) => img.src)
              .filter((src) => src);
          });
    
          newImages.forEach((img) => images.add(img.toString()));
        }
    
        await browser.close();
        res.json(Array.from(images));
      } catch (error) {
        console.error("Error fetching images:", error);
        res.status(500).send("Error fetching images");
      }

  });

app.get("/GetImages", async (req, res) => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();

    console.log("Navigating to lexica.art...");
    await page.goto("https://lexica.art/", {
      waitUntil: "networkidle2",
      timeout: 60000,
    });
    console.log("Navigation completed.");

    const images = new Set();
    const scrollCount = 5;
    const waitTime = 2500;

    for (let i = 0; i < scrollCount; i++) {
      const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await sleep(waitTime);

      const newImages = await page.evaluate(() => {
        return Array.from(document.querySelectorAll("img"))
          .map((img) => img.src)
          .filter((src) => src);
      });

      newImages.forEach((img) => images.add(img.toString()));
    }

    await browser.close();
    res.json(Array.from(images));
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).send("Error fetching images");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
