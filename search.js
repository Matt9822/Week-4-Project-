

let isModalOpen = false;

document.getElementById("searchForm").addEventListener('submit', async function(event) {

    //Prevents the form from simply refreshing the page
    event.preventDefault();

    const userInput = document.getElementById("userInput").value;

    if (userInput.trim() !== ''){
        await fetchSearch(userInput);
        document.getElementById('userInput').value = "";
    }
});

const query = localStorage.getItem('searchQuery')

//if there is a stored element in query then it will pass it to fetchSearch
if (query) {

    fetchSearch(query)

}

async function fetchSearch(query) {   
    
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
        displaySearch(firstEightMovies);

    } catch {

        console.error('error fetching search data', error);

    }
}

function displaySearch(movies) {

   const movieList = document.getElementById("movie-list");
   movieList.classList.add('movie-search--list')
   movieList.innerHTML = '';

   movies.forEach(movie => {

    const movieContainer = document.createElement('div')
    movieContainer.classList.add('movie', 'movie-search')

    const poster = document.createElement('img')
    poster.src = movie.Poster
    poster.alt = `${movie.Title} Img`
    poster.classList.add('movie-img','movie-search--img')

    movieContainer.appendChild(poster)

    movieList.appendChild(movieContainer)

    movieContainer.onclick = async function() {
      
        try {
          const apiID = `https://www.omdbapi.com/?apikey=19c5e51c&i=${movie.imdbID}`
          const Response = await fetch(apiID);
          const data = await Response.json()
          
          if (data !== "") {
            movieDetails(data)
          }
        } catch {
          console.log("error2")
        }
        toggleModal()
      
    }
  })
  
}


function toggleModal() {
    if (isModalOpen) {
    
      isModalOpen = false;
      return document.body.classList.remove("modal-open")
    }
    isModalOpen = true
    document.body.classList += " modal-open"
  }

  function movieDetails(data) {
  
  const movieImg = document.getElementById("movie-modal--img")
  movieImg.src = data.Poster
  
  const movieTitle = document.querySelector(".modal-title")
  movieTitle.innerHTML = `${data.Title}`
  
  const movieYear = document.querySelector(".modal-year")
  movieYear.innerHTML = `<span class="movie-info--span">Year:</span>  ${data.Year}`
  
  const movieRated = document.querySelector(".modal-rated")
  movieRated.innerHTML = `<span class="movie-info--span">Rated:</span>  ${data.Rated}`
  
  const movieReleased = document.querySelector(".modal-released")
  movieReleased.innerHTML = `<span class="movie-info--span">Released:</span>  ${data.Released}`
  
  const movieRuntime = document.querySelector(".modal-runtime")
  movieRuntime.innerHTML = `<span class="movie-info--span">Runtime:</span>  ${data.Runtime}`
  
  const movieGenre = document.querySelector(".modal-genre")
  movieGenre.innerHTML = `<span class="movie-info--span">Genre:</span>  ${data.Genre}`
  
  const moviePlot = document.querySelector(".modal-plot")
  moviePlot.innerHTML = `<span class="movie-info--span">Plot:</span>  ${data.Plot}`
  
  const movieRating = document.querySelector(".modal-rating")
  movieRating.innerHTML = `<span class="movie-info--span">IMDB Rating:</span> ${data.imdbRating}`
  }

localStorage.removeItem('searchQuery')