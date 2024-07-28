// Initialize the quotes array
let quotes = [];

// Function to display a random quote
function showRandomQuote() {
    const quoteDisplay = document.getElementById('quoteDisplay');
    if (quotes.length > 0) {
        // Get a random index
        const randomIndex = Math.floor(Math.random() * quotes.length);
        // Construct HTML for the quote
        const quoteHTML = `<p>${quotes[randomIndex].text} - ${quotes[randomIndex].category}</p>`;
        // Update the quote display
        quoteDisplay.innerHTML = quoteHTML;
    } else {
        quoteDisplay.innerHTML = '<p>No quotes available.</p>';
    }
}

// Function to create the quote addition form
function createAddQuoteForm() {
    const formContainer = document.createElement('div');
    formContainer.className = 'quote-form';

    const quoteTextInput = document.createElement('input');
    quoteTextInput.id = 'newQuoteText';
    quoteTextInput.type = 'text';
    quoteTextInput.placeholder = 'Enter a new quote';

    const quoteCategoryInput = document.createElement('input');
    quoteCategoryInput.id = 'newQuoteCategory';
    quoteCategoryInput.type = 'text';
    quoteCategoryInput.placeholder = 'Enter quote category';

    const addButton = document.createElement('button');
    addButton.textContent = 'Add Quote';
    addButton.onclick = addQuote;

    formContainer.appendChild(quoteTextInput);
    formContainer.appendChild(quoteCategoryInput);
    formContainer.appendChild(addButton);

    document.body.appendChild(formContainer);
}

// Function to add a new quote
function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;

    if (newQuoteText && newQuoteCategory) {
        // Create a new quote object
        const newQuote = {
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

// Set up event listeners and initial content
document.getElementById('newQuote').addEventListener('click', showRandomQuote);
createAddQuoteForm(); // Create and display the form when the page loads

// Optionally, you can show a random quote when the page loads
showRandomQuote();
