const API_SEARCH = "http://www.omdbapi.com/?apikey=19c5e51c&s=";

const API_ID = "https://www.omdbapi.com/?apikey=19c5e51c&i=";

document.getElementById("searchForm").addEventListener('submit', async function(event) {

    //Prevents the form from simply refreshing the page
    event.preventDefault();

    const userInput = document.getElementById("userInput").value;

    if (userInput.trim() !== ''){
        await fetchMovies(userInput);
        document.getElementById('userInput').value = "";
    }
});

const query = localStorage.getItem('searchQuery')

//if there is a stored element in query then it will pass it to fetchMovies
if (query) {

    fetchMovies(query)

}

async function fetchMovies(query) {   
    
    //The encodeURICmponent ensures that when the user searchs useing spaces
    //and/or any special characters such as "&" that would mess up accessing the
    //URL as they are used in URL's and therefore would mess up the search
    //for example if the searched used was "Harry Potter & The Goblet of Fire" 
    //the URL would look like this
    //"http://www.omdbapi.com/?apikey=19c5e51c&s=Harry Potter & The Goblet of Fire"
    //the url would treat it as "Harry Potter" and "The Goblet of Fire"
    //this will also help against any malice intentions the user might have  
    const apiURL = `http://www.omdbapi.com/?apikey=19c5e51c&s=${encodeURIComponent(query)}`;

    //This try and catch statement are only here if there is some sort of failure in fetching the API
    //and if there is a failure it will stop all code after it..
    //this is best used in testing not in the final result unless the website will
    //fall apart when this code fails then there might be a case to make for keeping it
    //But if they were not here it would still run as intended 
    try {

        const response = await fetch(apiURL);
        const data = await response.json();

        const firstEightMovies = data.Search.slice(0, 8);
        displayMovies(firstEightMovies);

    } catch {

        console.error('error fetching search data', error);

    }
}

function displayMovies(movies) {

   const movieList = document.getElementById("movie-list");
   movieList.classList.add('movie-search--list')
   movieList.innerHTML = '';

   movies.forEach(movie => {

    const movieContainer = document.createElement('div')
    movieContainer.classList.add('movie', 'movie-search')

    const title = document.createElement('h2')
    title.classList.add('movie-title', 'movie-search--title')
    title.textContent = movie.Title

    const year = document.createElement('p')
    year.classList.add('movie-year','movie-search--year')
    year.textContent = `Year ${movie.Year}`

    const poster = document.createElement('img')
    poster.src = movie.Poster
    poster.alt = `${movie.Title} Img`
    poster.classList.add('movie-img','movie-search--img')

    movieContainer.appendChild(title)
    movieContainer.appendChild(year)
    movieContainer.appendChild(poster)

    movieList.appendChild(movieContainer)
   })

}

localStorage.removeItem('searchQuery')