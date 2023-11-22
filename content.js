// content.js

// Perform headline rhyming when the content script is executed
rhymeHeadlines();

function rhymeHeadlines() {
  // Specify the selectors for the headlines on the Hindustan Times website
  const h1Selector = "h1.hdg1";
  const h2Selector = "h2.hdg3 > a";
  const h3Selector = "h3.hdg3 > a";

  // Select the headlines using the specified selectors
  const h1Headlines = document.querySelectorAll(h1Selector);
  const h2Headlines = document.querySelectorAll(h2Selector);
  const h3Headlines = document.querySelectorAll(h3Selector);

  // Process headlines for each selector
  if (h1Headlines.length > 0) {
    processHeadlines(h1Headlines);
  }

  if (h2Headlines.length > 0) {
    processHeadlines(h2Headlines);
  }

  if (h3Headlines.length > 0) {
    processHeadlines(h3Headlines);
  }
}

function processHeadlines(headlines) {
  // Loop through each headline
  headlines.forEach((headline) => {
    // Get the original headline text
    const originalText = headline.innerText;

    // Tokenize the headline
    const words = RiTa.tokenize(originalText);

    // Use RiTa.rhymes asynchronously for each word
    const rhymedWords = Promise.all(
      words.map(async (word) => {
        const rhymes = await RiTa.rhymes(word, { limit: 1 });
        return rhymes.length > 0 ? rhymes[0] : word;
      })
    );

    // Join the rhymed words back into a string
    rhymedWords.then((rhymedArray) => {
      const rhymedText = rhymedArray.join(" ");
      // Replace the original headline with the modified one
      headline.innerText = rhymedText;
    });
  });
}
