import { argv } from 'node:process';
import { crawlPage } from './crawl.js';
import { printReport } from './report.js';

async function main() {
  try {
    if (argv.length !== 3) throw new Error('Wrong number of arguments!');
    console.log(`crawler is starting at ${argv[2]}`);
  } catch (err) {
    console.log(`${err.message}`);
  }
  const baseURL = argv[2];

  console.log(`starting crawl of: ${baseURL}...`);

  const pages = await crawlPage(baseURL);

  printReport(pages);
}

await main();
