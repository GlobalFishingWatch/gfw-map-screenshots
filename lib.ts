import fs from 'fs/promises'

import type { Page } from 'puppeteer'
import puppeteer from 'puppeteer'

type ScreenshotOptions = {
  url: string
  id: string
  path?: string
  replace?: boolean
}

const TIMEBAR_HEIGHT = 96
const DEBOUNCED_URL_TIME = 1000
const DEFAULT_WIDTH = 500
const DEFAULT_HEIGHT = 400 + TIMEBAR_HEIGHT

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const getScreenshot = async (options = {} as ScreenshotOptions, page: Page) => {
  const { url, id, path = 'images', replace = false } = options

  const filePath = `${path}/${id}@2x.webp`
  if (!replace) {
    // Check if the screenshot already exists
    try {
      await fs.access(filePath)
      return
    } catch {
      // File doesn't exist, proceed with screenshot generation
    }
  }

  try {
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 90000 })
    await sleep(DEBOUNCED_URL_TIME * 2)

    const selector = 'canvas#map'
    await page.waitForSelector(selector)

    const element = await page.$(selector)
    const dataUrl = await element?.evaluate((map: HTMLCanvasElement) => {
      return map.toDataURL('image/webp', 0.5)
    })

    if (dataUrl) {
      const base64Data = dataUrl.replace(/^data:image\/webp;base64,/, '')
      try {
        await fs.access(path)
      } catch {
        await fs.mkdir(path, { recursive: true })
      }
      await fs.writeFile(filePath, base64Data, 'base64')
    }
  } catch (e) {
    console.log(`Error generating screenshot for ${id}:`, e)
  }
}

export const getScreenshotsInChunk = async (
  optionsArray: ScreenshotOptions[],
  onProgress?: () => void
) => {
  const browser = await puppeteer.launch({
    // headless: false,
    defaultViewport: {
      width: DEFAULT_WIDTH * 2, // The map takes half of the screen
      height: DEFAULT_HEIGHT,
    },
  })
  const page = await browser.newPage()
  // Set localStorage values before navigating to the page
  await page.evaluateOnNewDocument(() => {
    localStorage.setItem('WelcomePopup', '{"visible":false,"showAgain":false}')
    localStorage.setItem('HighlightPopup', 'sentinel2')
  })

  try {
    for (const option of optionsArray) {
      await getScreenshot(option, page)
      if (onProgress) {
        onProgress()
      }
    }
  } finally {
    await page.close()
    await browser.close()
  }
}
