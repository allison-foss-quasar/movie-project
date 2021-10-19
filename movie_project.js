let moviesAPI = 'https://colossal-apricot-titanosaurus.glitch.me/movies'

let OMDBapi = "http://www.omdbapi.com/?i=tt3896198&apikey=a62ca0b"

fetch('https://colossal-apricot-titanosaurus.glitch.me/movies')
    .then(function(results){
        results.json().then((resultsObject)=>{return resultsObject})
        .then((movies)=>{
        	console.log(movies);
        	let html = '';
        	movies.forEach(movie=> {
        		html+= '<div class="card d-flex flex-column align-items-center">' +
        		`<h1>${movie.title}</h1>` +
        		`<h6>Genre: ${movie.genre} // Director: ${movie.director}</h6>${movie.year}` +
        		`<img src="${movie.poster}" style="width: 25em">` +
        		`<h4>Rating: ${movie.rating}</h4><h6>Description: ${movie.plot}</h6>` +
        		`<div class="inline-flex m-2"><button type="button" class="modify btn btn-info" data-id="${movie.id}">Modify</button><button type="button" class="delete btn btn-danger" data-id="${movie.id}">Delete</button></div>` +
				'</div>'
			});

			document.getElementById('movies').innerHTML = html;

			btns = document.getElementsByClassName("delete");
			for(let i = 0; i < btns.length; i++){
				btns[i].addEventListener("click", function(){
					deleteMovie(btns[i].dataset.id);
				})
			}

			document.getElementById('add').addEventListener("click", function(){
				let movieTitle = document.getElementById('movie-search').value;
				console.log(movieTitle)
				fetch(`${OMDBapi}&t=${movieTitle}&plot=full`)
					.then(data=>data.json())
					.then(function(data) {
						console.log(data);
						let newFilm = {
							title: data.Title,
							rating: data.imdbRating,
							poster: data.Poster,
							year: data.Year,
							actors: data.Actors,
							plot: data.Plot,
							genre: data.Genre,
							director: data.Director
						}
						addMovie(newFilm);
					})
			})
        }); //Where we get the array of movies
    })
    .catch(function(err){console.log(err)});

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
		document.location.reload();
		fetch(moviesAPI).then(data=>console.log(data.json()))});
}

function modifyMovie(id){
	let options = {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(obj)
	}
	let obj = {

	}
	return fetch(moviesAPI, options).then(response=>console.log("modified movie: " + movie, response));
}