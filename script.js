const searchForm=document.querySelector('form');
const movieContainer=document.querySelector('.movie-container');
const inputBox=document.querySelector('.inputBox');

const getMovieInfo = async (movie) => {
    try{
    const myApiKey ="e55d5747";
    const url=`http://www.omdbapi.com/?apikey=${myApiKey}&t=${movie}`;
    const response = await fetch(url);

    if(!response.ok){
        throw new Error("Unable to fetch movie data.");
    }
    const data = await response.json();

    showMovieData(data);

    }
    catch(error){
        showErrorMessage("No Movie Found!!!");
    }
   

}
const showMovieData = (data) => {
    movieContainer.innerHTML = "";
    movieContainer.classList.remove('noBackground');



    const { Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster} = data;

    const movieElement = document.createElement('div');
    movieElement.classList.add('movie-info');
    movieElement.innerHTML = `<h2>${Title}</h2>
                              <p><strong>Rating: &#11088;</strong>${imdbRating}</p>`;
   
    const movieGenreElement = document.createElement('div');
    movieGenreElement.classList.add('movie-genre');

    Genre.split(",").forEach(element =>  {
        const p=document.createElement('p');
        p.innerText = element.trim();
        movieGenreElement.appendChild(p);

    });
    movieElement.appendChild(movieGenreElement);
    movieElement.innerHTML += `<p><strong>Released Date: </strong>${Released}</p>
                              <p><strong>Duration: </strong>${Runtime}</p>
                              <p><strong>Cast: </strong>${Actors}</p> 
                              <p><strong>Plot: </strong>${Plot}</p> `;

     const moviePosterElement= document.createElement('div');
     moviePosterElement.classList.add('movie-poster');
     moviePosterElement.innerHTML = `<img src="${Poster}"/>` ; 
     
     movieContainer.appendChild(moviePosterElement);


    movieContainer.appendChild(movieElement);


                             


}

const showErrorMessage =(message) => {
    movieContainer.innerHTML = `<h2>${message}</h2>`;
    movieContainer.classList.add('noBackground');
}

const handleFormSubmission = async (e) => {
    e.preventDefault();
    const movieName=inputBox.value.trim();
    if(movieName !== ''){
        showErrorMessage("Fetching Movie Information...");
      await getMovieInfo(movieName);
    }
    else{
        showErrorMessage("Enter movie name to get information");
    }

}

searchForm.addEventListener('submit',handleFormSubmission);  
   










