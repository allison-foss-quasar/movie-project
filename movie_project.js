let moviesAPI = 'https://colossal-apricot-titanosaurus.glitch.me/movies'

let OMDBapi = "http://www.omdbapi.com/?i=tt3896198&apikey=a62ca0b"

fetch('https://colossal-apricot-titanosaurus.glitch.me/movies')
    .then(function(results){
        results.json().then((resultsObject)=>{return resultsObject})
        .then((movies)=>{
        	console.log(movies);
        	let html = '';
        	movies.forEach(movie=> {
        		html+= '<div class="card d-flex flex-column align-items-center m-2">' +
        		`<img id="${movie.id}" src="${movie.poster}" type="button">` +
        		// `<h4>${movie.title}</h4>` +
        		`<h6 class="text-center">${movie.genre}<br>` +
        		`Director: ${movie.director}</h6> Year: ${movie.year} // Rating: ${movie.rating}
				<div class="m-3 d-none" id="plot${movie.id}">${movie.plot}</div>` +
        		`<div class="inline-flex m-2">
					<a class="btn btn-info" data-bs-toggle="modal" data-id="${movie.id}" href="#edit${movie.id}" role="button">Modify</a>` +
					//<button type="button" class="modify btn btn-info" data-id="${movie.id}" data-bs-toggle="modal">Modify</button>
					`<button type="button" class="delete btn btn-danger" data-id="${movie.id}">Delete</button></div>` +
				'</div>' +
					//MODALS FOR EACH MOVIE CARD??????
					`<div class="modal fade" id="edit${movie.id}" aria-hidden="true" aria-labelledby="edit${movie.id}"
						 tabIndex="-1"> <!--What's happening here?-->
						<div class="modal-dialog modal-dialog-centered"> <!--What's happening here?-->
							<div class="modal-content"> <!--What's happening here?-->
								<div class="modal-header"> <!--What's happening here?-->
									<h5 class="modal-title" id="editFeatureLabel">Edit features:</h5>
									<button type="button" class="btn-close" data-bs-dismiss="modal"
											aria-label="Close"></button>
								</div>
								<div class="modal-body d-flex justify-content-around">
									<div class="card card-body">
										<label class="form-label">New Title:</label>
										<input type="text" id="newTitle${movie.id}" class="form-control" value="${movie.title}">

										<label class="form-label">New Plot Description:</label>
										<textarea id="newPlot${movie.id}" class="form-control" aria-label="textarea">${movie.plot}</textarea>

										<label class="form-label">New Rating:</label>
										<input type="text" id="newRating${movie.id}" class="form-control" value="${movie.rating}">
									</div>
								</div>
								<div class="modal-footer">
									<button class="btn btn-primary submit" data-bs-dismiss="modal" id="${movie.id}">Submit</button>
								</div>
							</div>
						</div>
					</div>`
					//END MODALS FOR EACH MOVIE CARD





			});

			document.getElementById('movies').innerHTML = html;

			btns = document.getElementsByClassName("delete");
			for(let i = 0; i < btns.length; i++){
				btns[i].addEventListener("click", function(){
					deleteMovie(btns[i].dataset.id);
				})
			}

			newInfoBtns = document.getElementsByClassName("submit");
			for(let i = 0; i < newInfoBtns.length; i++){
				newInfoBtns[i].addEventListener("click", function(){
					console.log(newInfoBtns[i]);
					let testTitle = document.querySelector('#newTitle'+ newInfoBtns[i].id).value
					let testPlot = document.querySelector('#newPlot'+ newInfoBtns[i].id).value
					let testRating = document.querySelector('#newRating'+ newInfoBtns[i].id).value
					console.log(testTitle);
					modifyMovie(newInfoBtns[i].id, testTitle, testRating, testPlot);
				})
			}

			imgBtns = document.getElementsByTagName("img");
			for(let i = 0; i < newInfoBtns.length; i++){
				imgBtns[i].addEventListener("click", function(){
					$(`#plot${imgBtns[i].id}`).removeClass('d-none');
				});
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
	return fetch(moviesAPI, options).then(response=>{
		console.log("added movie: " + movie, response);
		document.location.reload();
		});
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

function modifyMovie(id, title, rating, plot){
	let options = {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			title: title,
			rating: rating,
			plot: plot
		})
	}

	return fetch(`${moviesAPI}/${id}`, options).then(response=>{
		console.log("modified movie: " + id, response);
		document.location.reload();
		});
}