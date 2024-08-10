const API_SEARCH = "http://www.omdbapi.com/?apikey=19c5e51c&s=";

const API_ID = "https://www.omdbapi.com/?apikey=19c5e51c&i=";


//collecting userInput and calling featured movies

document
  .getElementById("searchForm")
  .addEventListener("submit", async function (event) {
    //Prevents the form from simply refreshing the page
    event.preventDefault();

    //.trim is used to take off any access from the userInput E.g. "  hello I'm cool!  " = "hello I'm cool!"
    const userInput = document.getElementById("userInput").value.trim();

    if (userInput !== "") {
      localStorage.setItem('searchQuery', userInput);
      window.location.href = 'search.html';
    }
  });

//The "async function" is used when you need to make a call to a API
async function fetchMovies() {
  try {

    //fetching the API useing the corresponding "await" infront of the fetch. the await is used
    //with the forementioned "async" to gain access to a promise (not the only way to do so)
    //(A Promise is given when trying to feach a api)
    const response = await fetch(API_SEARCH + `fire`);

    //The below "if" statement is only used if the above code throws a error
    if (!response.ok) {

      //This "if" statement is here to help myself and other develepers find where code went wrong.
      throw new Error("Network response is not ok " + response.statusText);
    }

    //"await response.json" is used when turning the Backend
    //data into a readable format for the frontend
    const data = await response.json();

    //Slice is used when you need to only use a certain part of an array
    const firstTenMovies = data.Search.slice(0, 10);

    //This is here to difine it's parameter if it was outside of this function it would not
    //be sliced when we use it in a function on line 41
    displayMovies(firstTenMovies);

    //catch any errors that occur with this function to again make debugging easier but try
    //not to overuse these as they are better for trying out your code because if a error is caught
    //the code will STOP here so even if it is
    //just a small error it will bring the whole website down
  } catch (error) {
    console.error("There was a problem with fetchMovies operation");
  }
}
//The displaymovies function is used in displaying the sliced array from my API
async function displayMovies(movies) {

  //movieList is used to select where in my HTML i will be adding new data from my API
  const movieList = document.getElementById("movie-list");

  //The below code is used to wrap thru the entire array that is provided. The "movie" is provided
  //as a new parameter.
  movies.forEach((movie) => {

    //movieContainer is being used to creat a div and add a class to the div
    const movieContainer = document.createElement("div");
    movieContainer.classList.add("movie");

    //title is makeing a h2.  'textContent' is making the following text in the h2,
    //which it is getting from the API using 'movie.title'
    const title = document.createElement("h2");
    title.textContent = movie.Title;
    title.classList.add("movie-title");

    //The "Year" in the text will display as "Year: 2020" or whatever the year is for that movie
    const year = document.createElement("p");
    year.textContent = `Year: ${movie.Year}`;
    year.classList.add("movie-year");

    //The poster.src is where the image will go the poster.alt is used when no image is displayed
    const poster = document.createElement("img");
    poster.src = movie.Poster;
    poster.alt = `${movie.Title} Img`;
    poster.classList.add("movie-img");

    //The appendChild or aChild is to append(add to as something extra) to the given
    //parent node most commonly an element
    movieContainer.appendChild(title);
    movieContainer.appendChild(year);
    movieContainer.appendChild(poster);

    movieList.appendChild(movieContainer);
  });
}

fetchMovies("fire");


//FEATURED MOVIES ANIMATION

const scrollers = document.querySelectorAll(".scroller")

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  addAnimation();
}

function addAnimation() {
  scrollers.forEach(scroller => {
    scroller.setAttribute("data-animation", true)
  })
}

