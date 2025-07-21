import puppeteer, { Browser, Page } from "puppeteer";
import fs from "fs/promises";

type Options = {
  url: string;
  id: string;
  width?: number;
  height?: number;
  path?: string;
  replace?: boolean;
};

const TIMEBAR_HEIGHT = 96;
const DEBOUNCED_URL_TIME = 1000;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getScreenshot = async (
  options = {} as Options,
  browser?: Browser,
  page?: Page
) => {
  const {
    url,
    id,
    width = 500,
    height = 400,
    path = "images",
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

  let shouldCloseBrowser = false;
  if (!browser) {
    browser = await puppeteer.launch({
      defaultViewport: {
        width: width * 2,
        height: height + TIMEBAR_HEIGHT,
      },
    });
    shouldCloseBrowser = true;
  }

  let localPage = page;
  if (!localPage) {
    localPage = await browser.newPage();
  }

  try {
    // Set localStorage values before navigating to the page
    await localPage.evaluateOnNewDocument(() => {
      localStorage.setItem(
        "WelcomePopup",
        '{"visible":false,"showAgain":false}'
      );
      localStorage.setItem("HighlightPopup", "sentinel2");
    });

    await localPage.goto(url, { waitUntil: "networkidle0", timeout: 90000 });
    await sleep(DEBOUNCED_URL_TIME + 100);

    const selector = "canvas#map";
    await localPage.waitForSelector(selector);

    const element = await localPage.$(selector);
    const dataUrl = await element?.evaluate((map: HTMLCanvasElement) => {
      return map.toDataURL("image/webp", 0.5);
    });

    if (dataUrl) {
      const base64Data = dataUrl.replace(/^data:image\/webp;base64,/, "");
      try {
        await fs.access(path);
      } catch {
        await fs.mkdir(path, { recursive: true });
      }
      await fs.writeFile(filePath, base64Data, "base64");
    }
  } catch (e) {
    console.log(`Error generating screenshot for ${id}:`, e);
  } finally {
    if (!page && localPage) {
      await localPage.close();
    }
    if (shouldCloseBrowser && browser) {
      await browser.close();
    }
  }
};

export const getScreenshotsInChunk = async (
  optionsArray: Options[],
  width = 500,
  height = 400,
  onProgress?: () => void
) => {
  const browser = await puppeteer.launch({
    defaultViewport: {
      width: width * 2,
      height: height + TIMEBAR_HEIGHT,
    },
  });
  const page = await browser.newPage();
  try {
    for (const options of optionsArray) {
      await getScreenshot(options, browser, page);
      if (onProgress) onProgress();
    }
  } finally {
    await page.close();
    await browser.close();
  }
};
