const API_SEARCH = 
"http://www.omdbapi.com/?apikey=19c5e51c&s=";

const API_ID = 
"https://www.omdbapi.com/?apikey=19c5e51c&i=";


const form = document.querySelector("form");
let movieArr = [""]

form.addEventListener("submit", async (event) => {
  event.preventDefault();``
  let input = document.getElementById("userInput").value;
  let movie = await fetch(
    `http://www.omdbapi.com/?apikey=19c5e51c&s=${input}`
  );
  const result = await movie.json();
});




// async function posters() {
//   let poster = await fetch(`http://www.omdbapi.com/?apikey=19c5e51c&s=fire`)
//   let posterData = await poster.json()
//   featuredPosters.innerHTML = posterData.map((movie) => {
//     return `<div class="element__wrapper">
//   <div class="img__wrapper">
//     <img src="${movie.Poster}" alt="" />
//   </div>
//   <div class="discription__wrapper">
//     <div class="description">
      
//     </div>
//   </div> 
// </div>`
//   }).join('')
// }

// function posterHTML(movie) {
  
// }


