const API_SEARCH = "http://www.omdbapi.com/?apikey=19c5e51c&s=";

const API_ID = "https://www.omdbapi.com/?apikey=19c5e51c&i=";

function getSearchParam(param) {

    //The new operator lets developers create an instance of a user-defined object 
    //type or of one of the built-in object types that has a constructor function...

    //The URLSearchParams interface defines utility methods to work with the 
    //query string of a URL.
    const urlParam = new URLSearchParams(window.location.search)

    //The get syntax binds an object property to a function that will be called 
    //when that property is looked up. It can also be used in classes.
    return urlParam.get(param)
}

//Fetch the search query from the URL
const search = getSearchParam('search')


//This is here to check if there is a search query in the URL if there is one 
//it calls fetchMovies with the parameter of search
if (search) {
    fetchMovies(search)
}

