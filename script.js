// search by name http://www.omdbapi.com/?apikey=19c5e51c&s=
// search by id https://www.omdbapi.com/?apikey=19c5e51c&i=
// async function renderPoster(id) {
//   
// }


const form = document.querySelector("form")
form.addEventListener ("submit", async event => { 
    event.preventDefault()
    let input = document.getElementById("userInput").value;
    const response = await fetch(`http://www.omdbapi.com/?apikey=19c5e51c&s=${input}`)
    console.log(await response.json())
})

