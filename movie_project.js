// console.log("Connecting to webpage")

var moviesAPI = 'https://colossal-apricot-titanosaurus.glitch.me/movies'


fetch('https://colossal-apricot-titanosaurus.glitch.me/movies')
    .then(function (results) {
        // console.log(results);
        // results.text().then((text) =>{console.log(text)});
        results.json().then((resultsObject)=>{return resultsObject})
        .then((movies)=>{
        	console.log(movies);
        	let html = '';
        	movies.forEach(movie=> {
        		html+= '<div class="card d-flex flex-column align-items-center">' +
        		`<h1>${movie.title}</h1>` +
        		`<h4>Genre: ${movie.genre} || Director: ${movie.director}</h4>${movie.year}` +
        		`<img src="${movie.poster}" style="width: 25em">` +
        		`<h4>Rating: ${movie.rating}</h4><h6>Description: ${movie.plot}</h6>` +
        		'<div class="inline-flex m-2"><button type="button" class="modify">Modify</button><button type="button" class="delete" data-id="${movie.id}">Delete</button></div>' +
				'</div>'
			});
			document.getElementById('movies').innerHTML = html;
			//add click listener
			
        }) //Where we get the array of movies
    }).catch(function(err){console.log(err)});



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

// let newFilm = {
//     title: 'Movie',
//     rating: "good",
//     poster: 5,
//     year: 500,
//     genre: "comedy",
//     director: "idk",
//     plot: "nothing",
//     actors: "bob",
//     id: 100
// }

// addMovie(newFilm);

//DELETE MOVIE FUNCTION
function deleteMovie(id){
	let options = {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json'
		}
	}
	fetch(`${moviesAPI}/${id}`, options).then(response=>{
		console.log("deleted movie with id " + id, response);
		fetch(moviesAPI).then(data=>console.log(data.json()))});
}

// deleteMovie(7)

// OMBDb Stuff

// fetch(`http://www.omdbapi.com/?apikey=${OMBDbAPIkey}&`)