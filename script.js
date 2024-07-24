// search by name http://www.omdbapi.com/?apikey=19c5e51c&s=
// search by id https://www.omdbapi.com/?apikey=19c5e51c&i=
// async function renderPoster(id) {
//
// }
const featuredPosters = document.querySelector('.row')
const form = document.querySelector("form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  let input = document.getElementById("userInput").value;
  const response = await fetch(
    `http://www.omdbapi.com/?apikey=19c5e51c&s=${input}`
  );
  console.log(await response.json());
});


async function posters(id) {
  const poster = await fetch(`http://www.omdbapi.com/?apikey=19c5e51c&s=fire`)
  const posterData = await poster.json()
  featuredPosters.innerHTML = posterData.map((element__wrapper) => posterHTML(element__wrapper)).join('')
}

function posterHTML(element__wrapper) {
  return `<div class="element__wrapper">
  <div class="img__wrapper">
    <img src="${element__wrapper.Poster}" alt="" />
  </div>
  <div class="discription__wrapper">
    <div class="description">
      
    </div>
  </div>
</div>`
}


