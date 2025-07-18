import { PORTS_CONFIG } from './config';
import { getScreenshot } from './lib';

const chunk = <T>(array: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

const getPortsScreenshots = async () => {
  const { url, ids } = PORTS_CONFIG;
  const chunks = chunk(ids, 10);

  for (const chunk of chunks) {
    await Promise.all(
      chunk.map((id) =>
        getScreenshot({
          id,
          url: url.replace('{{port}}', id),
          path: 'images/ports',
        })
      )
    );
  }
};

const getAllScreenshots = async () => {
  await getPortsScreenshots();
};

getAllScreenshots();
