import { EEZ_AREAS_CONFIG, PORTS_CONFIG } from './config'
import { getScreenshotsInChunk } from './lib'
import { asyncPool, chunk, renderBar } from './utils'

const CHUNK_SIZE = 10
const CONCURRENCY = 5

const getScreenshots = async (data: { url: string; ids: (string | number)[]; name: string }) => {
  const { url, ids, name } = data
  const chunks = chunk(ids, CHUNK_SIZE)
  const total = ids.length
  let completed = 0

  const handleProgress = () => {
    completed++
    process.stdout.write(`\r[${name}] ${renderBar(completed, total)}`)
    if (completed === total) process.stdout.write('\n')
  }

  await asyncPool(CONCURRENCY, chunks, async (chunkIds) => {
    const optionsArray = chunkIds.map((id) => ({
      id: String(id),
      url: url.replace('{{id}}', String(id)),
      path: `images/${name}`,
    }))
    await getScreenshotsInChunk(optionsArray, 500, 400, handleProgress)
  })
}

const getAllScreenshots = async () => {
  // getScreenshots(PORTS_CONFIG);
  getScreenshots(EEZ_AREAS_CONFIG)
}

getAllScreenshots()
