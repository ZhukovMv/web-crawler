function sortPages(pages) {
  const sortable = [];
  const sortedPages = {};
  for (const page in pages) {
    sortable.push([page, pages[page]]);
  }

  sortable.sort((a, b) => b[1] - a[1]);

  for (const page of sortable) {
    sortedPages[page[0]] = page[1];
  }
  return sortedPages;
}

function printReport(pages) {
  console.log('Report...');
  const sortedPages = sortPages(pages);

  for (const [url, count] of Object.entries(sortedPages))
    console.log(`Found ${count} internal links to ${url}`);
}

export { printReport, sortPages };
