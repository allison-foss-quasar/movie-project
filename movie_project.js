// console.log("Connecting to webpage")

var moviesAPI = fetch('https://colossal-apricot-titanosaurus.glitch.me/movies');


fetch('https://colossal-apricot-titanosaurus.glitch.me/movies')
    .then(function (results) {
        console.log(results);
        results.text().then((text) =>{console.log(text)});
        results.json().then((resultsObject)=>{return resultsObject})
        .then((movies)=>console.log(movies[0]))
    }).catch(function(err) {
    console.log(err);
})




//post example
// const reviewObj = {
//     restaurant_id: 1,
//     name: 'Codey',
//     rating: 5,
//     comments: "This is a really good place for coding and eating"
// };
// const url = 'https://codeup-restful-example.glitch.me/reviews';
// const options = {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(reviewObj),
// };
// fetch(url, options)
//     .then( response => console.log(response) ) /* review was created successfully */
//     .catch( error => console.error(error) ); /* handle errors */


function newMovie(movie){
    let options= {
        method: 'PUT', //modifies existing data
        headers: { //what does this do????
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(movie) //
    }
    return fetch(`${moviesAPI}`, options)
        .then(data=>data.json())
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
    id: 5
}
