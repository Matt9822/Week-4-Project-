const API_SEARCH = "http://www.omdbapi.com/?apikey=19c5e51c&s=";

const API_ID = "https://www.omdbapi.com/?apikey=19c5e51c&i=";

//The "async function" is used when you need to make a call to a API
async function fetchMovies() {
  try {
    //fetching the API
    const response = await fetch(API_SEARCH + "fire");

    //This "if" statement is only used if the above code throws a error
    if (!response.ok) {

      //This "if" statement is here to help myself and other develepers find where code went wrong.
      throw new Error("Network response is not ok " + response.statusText);
    }
    const data = await response.json();

    //Slice is used when you need to only use a certain part of an array
    const firstSixMovies = data.Search.slice(0, 6);

    //This is here to difine it's parameter
    displaymovies(firstSixMovies);
    
    //catch any errors that occur with this function to again make debugging easier but try
    //not to overuse these as they are better for trying out your code because if a error is caught
    //the code will STOP here so even if it is
    //just a small error it will bring the whole website down
  } catch (error) {
    console.error("There was a problem with fetchMovies operation");

  }
}
//The displaymovies function is used in displaying the sliced array from my API
function displaymovies(movies) {

  //movieList is used to select where in the HTML i will be adding new data from my API
  const movieList = document.getElementById("movie-list");

  //The below code is used to wrap thru the entire array that is provided. The "movie" is provided
  //as a new parameter.
  movies.forEach((movie) => {

    //movieContainer is being used to creat a div and add a class to the div
    const movieContainer = document.createElement('div');
    movieContainer.classList.add('movie');

    //title is makeing a h2.  'textContent' is making the following text in the h2
    //it is getting that title from the API using 'movie.title' 
    const title = document.createElement('h2');
    title.textContent = movie.Title;

    //The "Year" in the text will display as "Year: 2020" or whatever the year is for that movie
    const year = document.createElement('p')
    year.textContent = `Year: ${movie.Year}`

    //The poster.src is where the image will go the poster.alt is used when no image is displayed
    const poster = document.createElement('img');
    poster.src = movie.Poster;
    poster.alt = `${movie.Title} poster`;

    movieContainer.appendChild(title);
    movieContainer.appendChild(year);
    movieContainer.appendChild(poster);

    movieList.appendChild(movieContainer);
  });
}

fetchMovies();
