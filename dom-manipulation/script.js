let quotes = JSON.parse(localStorage.getItem('quotes')) || [];

// Function to save quotes to local storage
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

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
        // Save the last viewed quote in session storage
        sessionStorage.setItem('lastViewedQuote', JSON.stringify(quotes[randomIndex]));
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
        // Save quotes to local storage
        saveQuotes();
        // Clear the input fields
        document.getElementById('newQuoteText').value = '';
        document.getElementById('newQuoteCategory').value = '';
        // Show the newly added quote
        showRandomQuote();
    } else {
        alert('Please enter both quote text and category.');
    }
}

// Function to export quotes to a JSON file
function exportToJson() {
    const jsonString = JSON.stringify(quotes, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    a.click();
    URL.revokeObjectURL(url);
}

// Function to import quotes from a JSON file
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        const importedQuotes = JSON.parse(event.target.result);
        quotes = importedQuotes;
        saveQuotes();
        showRandomQuote(); // Optionally show a quote after import
        alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
}

// Event listener for the "Add Quote" button
document.getElementById('addQuote').addEventListener('click', addQuote);

// Event listener for the "Show Random Quote" button
document.getElementById('showQuote').addEventListener('click', showRandomQuote);

// Load and display the last viewed quote from session storage (optional)
document.addEventListener('DOMContentLoaded', function() {
    showRandomQuote();
    const lastQuote = sessionStorage.getItem('lastViewedQuote');
    if (lastQuote) {
        const lastQuoteObj = JSON.parse(lastQuote);
        document.getElementById('quoteDisplay').innerHTML = `<p>${lastQuoteObj.text} - ${lastQuoteObj.category}</p>`;
    }
});
