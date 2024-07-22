// Function to fetch book data from Open Library API
async function fetchBookData(title) {
    const url = `https://openlibrary.org/search.json?title=${title}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        displayBookData(data);
    } catch (error) {
        console.error('Error fetching book data:', error);
        document.getElementById('book-results').innerHTML = '<p>Failed to fetch book data. Please try again later.</p>';
    }
}

// Function to display book data on the webpage
function displayBookData(data) {
    const bookContainer = document.getElementById('book-results');
    bookContainer.innerHTML = '';

    if (data.docs.length === 0) {
        bookContainer.innerHTML = '<p>No books found. Please try a different title.</p>';
        return;
    }

    data.docs.forEach(book => {
        const { title, author_name, first_publish_year } = book;
        const bookInfo = document.createElement('div');
        bookInfo.className = 'book-info';
        bookInfo.innerHTML = `
            <p><strong>Title:</strong> ${title}</p>
            <p><strong>Author:</strong> ${author_name ? author_name.join(', ') : 'N/A'}</p>
            <p><strong>First Published:</strong> ${first_publish_year || 'N/A'}</p>
        `;
        bookContainer.appendChild(bookInfo);
    });
}

// Function to handle search button click
function handleSearch() {
    const searchInput = document.getElementById('search-input').value;
    if (searchInput.trim()) {
        fetchBookData(searchInput.trim());
    } else {
        alert('Please enter a book title.');
    }
}

// Attach event listener to the search button
document.getElementById('search-button').addEventListener('click', handleSearch);
