// URL for the mock API
const API_URL = 'https://jsonplaceholder.typicode.com/posts'; // Use a mock endpoint

// Array to hold quote objects
let quotes = [];

// Function to display a random quote
function showRandomQuote() {
    let quoteDisplay = document.getElementById('quoteDisplay');
    const selectedCategory = document.getElementById('categoryFilter').value;

    // Filter quotes based on selected category
    const filteredQuotes = quotes.filter(quote => 
        selectedCategory === 'all' || quote.category === selectedCategory
    );

    if (filteredQuotes.length > 0) {
        // Get a random index
        let randomIndex = Math.floor(Math.random() * filteredQuotes.length);
        // Construct HTML for the quote
        let quoteHTML = `<p>${filteredQuotes[randomIndex].text} - ${filteredQuotes[randomIndex].category}</p>`;
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
        // Save to local storage
        saveQuotes();
        // Clear the input fields
        document.getElementById('newQuoteText').value = '';
        document.getElementById('newQuoteCategory').value = '';
        // Show the newly added quote
        showRandomQuote();
        // Update categories
        populateCategories();
    } else {
        alert('Please enter both quote text and category.');
    }
}

// Function to save quotes to local storage
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Function to load quotes from local storage
function loadQuotes() {
    const savedQuotes = localStorage.getItem('quotes');
    if (savedQuotes) {
        quotes = JSON.parse(savedQuotes);
    }
}

// Function to export quotes to a JSON file
function exportToJson() {
    const quotesJson = JSON.stringify(quotes, null, 2);
    const blob = new Blob([quotesJson], { type: 'application/json' });
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
        populateCategories(); // Update categories after import
        showNotification('Quotes imported successfully!');
        showRandomQuote();
    };
    fileReader.readAsText(event.target.files[0]);
}

// Function to populate categories in the filter dropdown
function populateCategories() {
    const categoryFilter = document.getElementById('categoryFilter');
    const categories = new Set();

    // Collect unique categories from quotes
    quotes.forEach(quote => categories.add(quote.category));
    
    // Convert the Set to an array and then use map to create options
    const categoriesArray = Array.from(categories);
    
    // Clear existing options
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';
    
    // Use map to create options for each unique category
    categoriesArray.map(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

// Function to filter quotes based on the selected category
function filterQuotes() {
    showRandomQuote(); // Refresh the displayed quote based on the selected category
}

// Function to show notifications
function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.display = 'block';
    
    // Hide the notification after 5 seconds
    setTimeout(() => {
        notification.style.display = 'none';
    }, 5000);
}

// Function to fetch quotes from the server
async function fetchQuotesFromServer() {
    try {
        const response = await fetch(API_URL);
        const serverData = await response.json();
        // Simulate server returning quotes
        return serverData.map(item => ({
            text: item.title,
            category: item.body // Simulating categories with body content
        }));
    } catch (error) {
        console.error('Error fetching data from server:', error);
        return [];
    }
}

// Function to post quotes to the server
async function postQuotesToServer(quotes) {
    try {
        await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(quotes)
        });
    } catch (error) {
        console.error('Error posting data to server:', error);
    }
}

// Function to sync local quotes with server data
async function syncWithServer() {
    const serverQuotes = await fetchQuotesFromServer();
    const localQuotes = JSON.parse(localStorage.getItem('quotes')) || [];

    // Simple conflict resolution: server data takes precedence
    if (serverQuotes.length > 0) {
        localStorage.setItem('quotes', JSON.stringify(serverQuotes));
        quotes = serverQuotes;
        showNotification('Data synced with server. Local data updated.');
        showRandomQuote(); // Update display with new data
    }
}

// Initialize
function init() {
    loadQuotes();
    populateCategories();
    showRandomQuote();
    syncWithServer(); // Ensure data is synced with the server on initialization
    setInterval(syncWithServer, 60000); // Sync every 60 seconds

    // Event listeners
    document.getElementById('newQuote').addEventListener('click', showRandomQuote);
    document.getElementById('addQuote').addEventListener('click', addQuote);
}

init();
