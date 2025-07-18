import puppeteer from 'puppeteer';
import fs from 'fs/promises';

type Options = {
  url: string;
  id: string;
  width?: number;
  height?: number;
  path?: string;
  replace?: boolean;
};

const TIMEBAR_HEIGHT = 96;

export const getScreenshot = async (options = {} as Options) => {
  const {
    url,
    id,
    width = 500,
    height = 400,
    path = 'images',
    replace = false,
  } = options;

  const filePath = `${path}/${id}@2x.webp`;
  if (!replace) {
    // Check if the screenshot already exists
    try {
      await fs.access(filePath);
      return;
    } catch {
      // File doesn't exist, proceed with screenshot generation
    }
  }

  const browser = await puppeteer.launch();

  try {
    const page = await browser.newPage();

    await page.setViewport({
      width: width * 2,
      height: height + TIMEBAR_HEIGHT,
    });

    // Set localStorage values before navigating to the page
    await page.evaluateOnNewDocument(() => {
      // Add your localStorage values here
      localStorage.setItem(
        'WelcomePopup',
        '{"visible":false,"showAgain":false}'
      );
      localStorage.setItem('HighlightPopup', 'sentinel2');
      // Add more localStorage items as needed
    });

    await page.goto(url, { waitUntil: 'networkidle0', timeout: 90000 });

    const selector = 'canvas#map';
    await page.waitForSelector(selector);

    const element = await page.$(selector);
    const dataUrl = await element?.evaluate((map) => {
      return map.toDataURL('image/webp', 0.5);
    });

    if (dataUrl) {
      const base64Data = dataUrl.replace(/^data:image\/webp;base64,/, '');
      try {
        await fs.access(path);
      } catch {
        await fs.mkdir(path, { recursive: true });
      }
      await fs.writeFile(filePath, base64Data, 'base64');
      console.log(`Screenshot saved for ${filePath}`);
    }
  } catch (e) {
    console.log(`Error generating screenshot for ${id}:`, e);
  } finally {
    await browser.close();
  }
};
