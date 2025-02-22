const axios = require('axios');
const cheerio = require('cheerio');

// Function to scrape paragraphs from the website
async function scrapeWebsite(url) {
    try {
        // Send a GET request to the URL
        const { data } = await axios.get(url);

        // Load the HTML into Cheerio
        const $ = cheerio.load(data);

        // Scrape the title of the page
        const pageTitle = $('title').text();

        // Scrape all paragraph text
        const paragraphs = [];
        $('p').each((index, element) => {
            const paragraph = $(element).text().trim();
            if (paragraph) {
                paragraphs.push(paragraph);
            }
        });

        // Output the results
        console.log('Page Title:', pageTitle);
        console.log('Extracted Paragraphs:', paragraphs.join("\n\n")); // Print paragraphs with spacing
    } catch (error) {
        console.error('Error scraping the website:', error);
    }
}

// Example URL to scrape
const url = 'https://www.wired.com/story/gutting-usaid-will-have-a-monumental-effect-on-combating-climate-change/'; // Replace with the URL you want to scrape
scrapeWebsite(url);
