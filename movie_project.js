// console.log("Connecting to webpage")

var moviesAPI = 'https://colossal-apricot-titanosaurus.glitch.me/movies'


fetch('https://colossal-apricot-titanosaurus.glitch.me/movies')
    .then(function (results) {
        // console.log(results);
        // results.text().then((text) =>{console.log(text)});
        results.json().then((resultsObject)=>{return resultsObject})
        .then((movies)=>{
            console.log(movies)
        }) //Where we get the array of movies
    }).catch(function(err){console.log(err)})




function addMovie(movie){
	let options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(movie)
	}
	return fetch(moviesAPI, options).then(response=>console.log("added movie: " + movie, response));
}

let newFilm = {
    title: 'Movie',
    rating: "good",
    poster: 5,
    year: 500,
    genre: "comedy",
    director: "idk",
    plot: "nothing",
    actors: "bob",
    id: 100
}

// addMovie(newFilm);

//DELETE MOVIE FUNCTION
function deleteMovie(id){
	let options = {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json'
		}
	}
	console.log(`${moviesAPI}/${id}`);
	fetch(`${moviesAPI}/${id}`, options).then(response=>{
		console.log("deleted movie with id " + id, response);
		fetch(moviesAPI).then(data=>console.log(data))});
}

// deleteMovie(16)

// OMBDb Stuff

// fetch(`http://www.omdbapi.com/?apikey=${OMBDbAPIkey}&`)