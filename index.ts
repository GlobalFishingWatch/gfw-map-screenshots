import { EEZ_AREAS_CONFIG, PORTS_CONFIG } from './config';
import { getScreenshot } from './lib';

const CHUNK_SIZE = 10;

const chunk = <T>(array: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

const getPortsScreenshots = async () => {
  const { url, ids } = PORTS_CONFIG;
  const chunks = chunk(ids, CHUNK_SIZE);
  const total = ids.length;
  let completed = 0;

  for (const chunk of chunks) {
    await Promise.all(
      chunk.map(async (id) => {
        await getScreenshot({
          id,
          url: url.replace('{{port}}', id),
          path: 'images/ports',
        });
        completed++;
        const percent = ((completed / total) * 100).toFixed(2);
        console.log(`[Ports] ${completed}/${total} (${percent}%) complete`);
      })
    );
  }
};

const getEEZScreenshots = async () => {
  const { url, ids } = EEZ_AREAS_CONFIG;
  const chunks = chunk(ids, CHUNK_SIZE);
  const total = ids.length;
  let completed = 0;

  for (const chunk of chunks) {
    await Promise.all(
      chunk.map(async (id) => {
        await getScreenshot({
          id: id.toString(),
          url: url.replace('{{id}}', id.toString()),
          path: 'images/eezs',
        });
        completed++;
        const percent = ((completed / total) * 100).toFixed(2);
        console.log(`[EEZs] ${completed}/${total} (${percent}%) complete`);
      })
    );
  }
};

const getAllScreenshots = async () => {
  // getPortsScreenshots();
  getEEZScreenshots();
};

getAllScreenshots();
