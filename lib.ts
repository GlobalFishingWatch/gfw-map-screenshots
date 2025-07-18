import puppeteer from 'puppeteer';
import fs from 'fs/promises';

type Options = {
  url: string;
  id: string;
  width?: number;
  height?: number;
  path?: string;
};

const TIMEBAR_HEIGHT = 96;

export const getScreenshot = async (options = {} as Options) => {
  const { url, id, width = 500, height = 400, path = 'images' } = options;

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
      await fs.writeFile(`${path}/${id}@2x.webp`, base64Data, 'base64');
    }
  } catch (e) {
    console.log(e);
  } finally {
    await browser.close();
  }
};
