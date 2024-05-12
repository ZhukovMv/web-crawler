import { JSDOM } from 'jsdom';

function normalizeURL(url) {
  const urlObj = new URL(url);
  let path = urlObj.pathname
    .split('/')
    .filter((s) => s.length !== 0)
    .join('/');
  if (path.length > 0) path = '/'.concat(path);
  return urlObj.hostname.concat(path);
}

function getURLsFromHTML(htmlBody, baseURL) {
  const dom = new JSDOM(htmlBody);
  const urls = dom.window.document.querySelectorAll('a');
  const listURLs = [];
  for (const a of urls) {
    if (a.hasAttribute('href')) {
      let href = a.getAttribute('href');
      try {
        href = new URL(href, baseURL).href;
        listURLs.push(href);
      } catch (err) {
        console.log(`${err.message}: ${href}`);
      }
    }
  }
  return listURLs;
}

async function fetchHTML(url) {
  let res;
  try {
    res = await fetch(url);
  } catch (err) {
    throw new Error(`Gor Network error: ${err.message}`);
  }

  if (res.status >= 400) {
    console.log(`Web site returns ${res.status} error ${res.statusText}`);
    return;
  }

  const contentType = res.headers.get('Content-Type');
  if (!contentType || !contentType.includes('text/html')) {
    console.log(
      `Web site returns incorrect content ${res.headers['content-type']}`,
    );
    return;
  }

  return res.text();
}

async function crawlPage(baseURL, currentURL = baseURL, pages = {}) {
  if (new URL(currentURL).hostname !== new URL(baseURL).hostname) return pages;

  const normalizedURL = normalizeURL(currentURL);

  if (normalizedURL in pages) {
    pages[normalizedURL]++;
    return pages;
  }

  pages[normalizedURL] = 1;

  console.log(`crawling ${currentURL}`);

  let html = '';
  try {
    html = await fetchHTML(currentURL);
  } catch (err) {
    console.log(`${err.message}`);
    return pages;
  }

  const nextURLs = getURLsFromHTML(html, baseURL);

  for (const URL of nextURLs) {
    await crawlPage(baseURL, URL, pages);
  }
  return pages;
}

export { normalizeURL, getURLsFromHTML, crawlPage };
