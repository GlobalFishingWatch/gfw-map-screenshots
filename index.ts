import { EEZ_AREAS_CONFIG, PORTS_CONFIG } from './config.js'
import type { ScreenshotConfig } from './config.ts'
import { getScreenshotsInChunk } from './lib.js'
import { asyncPool, chunk, renderBar } from './utils.js'

const CONCURRENCY = 5

const getScreenshots = async (data: ScreenshotConfig) => {
  const { url, ids, name } = data
  const chunks = chunk(ids, Math.ceil(ids.length / CONCURRENCY))
  const total = ids.length
  let completed = 0
  process.stdout.write(`[${name}] Starting... \n`)

  const handleProgress = () => {
    completed++
    process.stdout.write(`\r[${name}] ${renderBar(completed, total)}`)
    if (completed === total) {
      process.stdout.write('\n')
    }
  }

  await asyncPool(CONCURRENCY, chunks, async (chunkIds) => {
    const optionsArray = chunkIds.map((id) => ({
      id: String(id),
      url: url.replace('{{id}}', String(id)),
      path: `images/${name}`,
      // replace: true
    }))
    await getScreenshotsInChunk(optionsArray, handleProgress)
  })
}

const getAllScreenshots = async () => {
  // getScreenshots(PORTS_CONFIG);
  getScreenshots(EEZ_AREAS_CONFIG)
}

getAllScreenshots()
