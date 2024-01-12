const fs = require('fs');
const xml2js = require('xml2js');

// Parse XML
function parseXml(xml) {
    return new Promise((resolve, reject) => {
        xml2js.parseString(xml, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

// Create directory
function createDir(path) {
    fs.mkdir(path, { recursive: true }, (err) => {
        if (err) throw err;
    });
}

// Read sitemap file
fs.readFile('link-to-sitemap-file.xml', 'utf8', (err, data) => {
    if (err) throw err;

    // Parse XML data
    parseXml(data).then((result) => {
        // Get array of URLs
        const urls = result.urlset.url;

        // Create directories for each URL
        urls.forEach((url) => {
            const loc = url.loc[0];
            const path = 'folder-to-create-in' + new URL(loc).pathname;
            createDir(path);
        });
    });
});
