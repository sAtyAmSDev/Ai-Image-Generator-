const express = require("express");
const puppeteer = require("puppeteer");
const cors = require("cors"); // Import cors

const app = express();
const PORT = 5000;

app.use(cors()); // Enable CORS for all routes

app.get("/GetImages", async (req, res) => {
    try {
      const browser = await puppeteer.launch({
        headless: true,
        args: ['--disable-gpu'],
      });
      const page = await browser.newPage();
      
      console.log("Navigating to lexica.art...");
      await page.goto("https://lexica.art/", { waitUntil: "networkidle2", timeout: 60000 });
      console.log("Navigation completed.");
  
      const images = await page.evaluate(() => {
        const imgElements = document.querySelectorAll("img");
        return Array.from(imgElements).map((img) => img.src);
      });
      
      await browser.close();
      res.json(images);
    } catch (error) {
      console.error("Error fetching images:", error);
      res.status(500).send("Error fetching images");
    }
  });
  

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
