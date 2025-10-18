const API_URL = 'https://web-crawler-api-9pwq.onrender.com';
const NEWS_URL = 'https://news.ycombinator.com/';

let collectedData = [];
let displayedData = [];

function displayNews(newsItems) {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '';

    newsItems.forEach(item => {
        const newsItemDiv = document.createElement('div');
        newsItemDiv.className = 'news-item';
        newsItemDiv.innerHTML = `
            <div class="news-item">
            <h3>${item.rank}. ${item.title}</h3>
            <p>Points: ${item.points} | Comments: ${item.comments} </p>
            </div>
        `;
        newsContainer.appendChild(newsItemDiv);
    });
}

function scrapeNews() {
    //Reset data
    collectedData = [];
    displayedData = [];

    //Reset UI
    document.getElementById('sort-select').style.display = 'none';
    document.getElementById('sort-label').innerText = '';
    initialButtonColors('more-than');
    initialButtonColors('less-than');

    console.log('Fetching news ...')

    //Fetch API
    fetch(`${API_URL}/crawl`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: NEWS_URL })
    })
    .then(response => response.json())
    .then(data => {
        collectedData.push(...data);
        displayNews(data);
        document.getElementById('current-state').innerText = 'Showing all scraped titles';
    })
    .catch(error => console.error('Error:', error));
}

function filterByWordsLessThan(numWords) {
    if (!checkState()) return;
    initialButtonColors('more-than');
    showSortingOptions(`less than or equal to`, 'Points', 'less-than', numWords);

    //Fetch API
    fetch(`${API_URL}/filter/less-than`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ news: collectedData, numWords: numWords })
    })
    .then(response => response.json())
    .then(data => {
        displayedData = data;
        displayNews(data);
        sortBy('points'); // Default sorting ASC
    })
    .catch(error => console.error('Error:', error));
}

function filterByWordsMoreThan(numWords) {
    if (!checkState()) return;
    initialButtonColors('less-than');
    showSortingOptions(`more than`, 'Comments', 'more-than', numWords);

    //Fetch API
    fetch(`${API_URL}/filter/more-than`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ news: collectedData, numWords: numWords })
    })
    .then(response => response.json())
    .then(data => {
        displayedData = data;
        displayNews(data);
        sortBy('comments'); // Default sorting ASC
    })
    .catch(error => console.error('Error:', error));
}

function sortBy(field) {
    //Ordering ASC by default
    displayedData.sort((a, b) => Number(a[field]) - Number(b[field]));
}

function sortByOrder(order) {
    if (order == 'asc') {
        displayNews(displayedData);
    }else if (order == 'desc') {
        displayNews(displayedData.reverse());
        displayedData.reverse(); // Back to initial order - ASC
    }
}

function initialButtonColors(button) {
    document.getElementById(button).style.backgroundColor = '#e49114';
}

function showSortingOptions(text, sortField, button, numWords) {
    document.getElementById('current-state').innerText = `Showing titles with ${text} ${numWords} words`;
    document.getElementById('sort-select').style.display = 'block';
    document.getElementById('sort-label').innerText = `Sort by ${sortField}`;
    document.getElementById(button).style.backgroundColor = '#43ae01';
}

function checkState() {
    if(collectedData.length === 0){
        document.getElementById('current-state').innerText = 'No data scraped yet. Please scrape news first.';
        return false;
    }
    return true;
}