const API_SEARCH = "http://www.omdbapi.com/?apikey=19c5e51c&s=";

const API_ID = "https://www.omdbapi.com/?apikey=19c5e51c&i=";

let isModalOpen = false;

fetchMovies("fire");

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
    
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      addAnimation();
    }
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

    movieContainer.dataset.imdbid = movie.imdbID;
    
    //The poster.src is where the image will go the poster.alt is used when no image is displayed
    const poster = document.createElement("img");
    poster.src = movie.Poster;
    poster.alt = `${movie.Title} Img`;
    poster.classList.add("movie-img");
    
    //The appendChild or aChild is to append(add to as something extra) to the given
    //parent node most commonly an element
    movieContainer.appendChild(poster);
    
    movieList.appendChild(movieContainer);

    movieContainer.onclick = async function() {
      try {
        const apiID = `https://www.omdbapi.com/?apikey=19c5e51c&i=${movie.imdbID}`
        const response = await fetch(apiID);
        const data = await response.json()
    
        if (data !== "") {
          moviedetails(data)
        }
      } catch {
        console.log("error")
      }
      toggleModal()
    }
  });

  // if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  //   addAnimation();
  // }
  
}
// SIDE SCROLLER
const scrollers = document.querySelectorAll(".scroller")

function addAnimation() {
  scrollers.forEach((scroller) => {
    scroller.setAttribute("data-animated", true)

    const scrollerInner = document.getElementById("movie-list")
    const scrollerContent = Array.from(scrollerInner.children)
    console.log(scrollerContent)

    scrollerContent.forEach((item) => {

      const duplicatedItem = item.cloneNode(true);
      scrollerInner.appendChild(duplicatedItem)
      console.log(duplicatedItem)

      duplicatedItem.onclick = async function() {
        try {
          const apiID = `https://www.omdbapi.com/?apikey=19c5e51c&i=${duplicatedItem.dataset.imdbid}`
          const response = await fetch(apiID);
          const data = await response.json()
      
          if (data !== "") {
            moviedetails(data)
          }
        } catch {
          console.log("error")
        }
        toggleModal()
      }
      
    })
  })
}

//MODAL
function toggleModal() {
  if (isModalOpen) {
  
    isModalOpen = false;
    return document.body.classList.remove("modal-open")
  }
  isModalOpen = true
  document.body.classList += " modal-open"
}

function moviedetails(data) {

  //in the ( ) of a if function the code will always read "if (statement) is == to true then{}"
  //unless stated by you otherwise e.g. if (statment !== true) is not equal to true then{}

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
