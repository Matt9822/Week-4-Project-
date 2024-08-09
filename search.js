const API_SEARCH = "http://www.omdbapi.com/?apikey=19c5e51c&s=";

const API_ID = "https://www.omdbapi.com/?apikey=19c5e51c&i=";

function getSearchParam(param) {

    //The new operator lets developers create an instance of a user-defined object 
    //type or of one of the built-in object types that has a constructor function...

    //The URLSearchParams interface defines utility methods to work with the 
    //query string of a URL.
    const urlParams = new URLSearchParams(window.location.search);

    //The get syntax binds an object property to a function that will be called 
    //when that property is looked up. It can also be used in classes.
    return urlParams.get(param);
}

//Fetch the search query from the URL
const query = getSearchParam('search');


//This is here to check if there is a search query in the URL if there is one 
//it calls fetchMovies with the parameter of search
if (query) {
    fetchMovies(query);
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

        const firstSixMovies = data.search.slice(0, 6);
        displayMovies(firstSixMovies);

    } catch {

        console.error('error fetching search data', error);

    }
}

function displayMovies(movies) {

   const movieList = document.getElementById("movie-list");
   movieList.innerHTML = '';

   movies.forEach(movie => {

    const movieContainer = document.createElement('div')
    movieContainer.classList.add('movie')

    const title = document.createElement('h2')
    title.classList.add('movie-title')
    title.textContent = movie.Title

    const year = document.createElement('p')
    year.classList.add('movie-year')
    year.textContent = `Year ${movie.Year}`

    const poster = document.createElement('img')
    poster.src = movie.Poster
    poster.alt = `${movie.Title} Img`
    poster.classList.add('movie-img')

    movieContainer.appendChild(title)
    movieContainer.appendChild(year)
    movieContainer.appendChild(poster)

    movieList.appendChild(movieContainer)
   })

}