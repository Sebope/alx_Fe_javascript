// Array to hold quote objects
let quotes = [];

// Function to display a random quote
function showRandomQuote() {
  let quoteDisplay = document.getElementById('quoteDisplay');
  if (quotes.length > 0) {
    // Get a random index
    let randomIndex = Math.floor(Math.random() * quotes.length);
    // Construct HTML for the quote
    let quoteHTML = `<p>${quotes[randomIndex].text} - ${quotes[randomIndex].category}</p>`;
    // Update the quote display
    quoteDisplay.innerHTML = quoteHTML;
  } else {
    quoteDisplay.innerHTML = '<p>No quotes available.</p>';
  }
}

// Function to add a new quote
function addQuote() {
  let newQuoteText = document.getElementById('newQuoteText').value;
  let newQuoteCategory = document.getElementById('newQuoteCategory').value;
  
  if (newQuoteText && newQuoteCategory) {
    // Create a new quote object
    let newQuote = {
      text: newQuoteText,
      category: newQuoteCategory
    };
    // Add the new quote to the array
    quotes.push(newQuote);
    // Clear the input fields
    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';
    // Show the newly added quote
    showRandomQuote();
  } else {
    alert('Please enter both quote text and category.');
  }
}

// Event listener for the "Show New Quote" button
document.getElementById('newQuote').addEventListener('click', showRandomQuote);

// Initial call to display a random quote when the page loads
showRandomQuote();
