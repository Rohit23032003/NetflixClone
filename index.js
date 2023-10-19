const apikey = "7543524441a260664a97044b8e2dc621"
const apiEndpoint = "https://api.themoviedb.org/3"
const imgPath = "https://image.tmdb.org/t/p/original";





const apiPath = {
    fetchAllCategories: `${apiEndpoint}/genre/movie/list?api_key=${apikey}`,
    fetchMoviesList: (id) => `${apiEndpoint}/discover/movie?api_key=${apikey}&with_genres=${id}`,
    fetchTrending:`${apiEndpoint}/trending/all/day?api_key=${apikey}&language=en-US`,
    searchOnYoutube: (query) => `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=AIzaSyC0SZJkHFX-fQ7NrsxdI4l4mGwYuY4l7P8`
}


    window.addEventListener('scroll', () => {
        if (window.scrollY > 5) {
            NavBar.style.backgroundColor = 'rgb(20, 20, 20)'; 
        } else {
            NavBar.style.backgroundColor = 'transparent';
        }
    });


function init()
{
    fetchAllMoviesCategories();
}
function fetchAllMoviesCategories()
{
    fetch(apiPath.fetchAllCategories)
    .then((res)=> res.json())
    .then((res)=>{
        const movies = res.genres;
       if(Array.isArray(movies) && movies.length){
            movies.forEach(element => {
                fetchAndBuildSection(apiPath.fetchMoviesList(element.id),element);
            });
       }
    })
    .catch((err)=>console.log(err));
    fetch(apiPath.fetchTrending).then((res)=>res.json())
    .then((res)=>{
        const BannerList = res.results;
        if(Array.isArray(BannerList) && BannerList.length)
        {
            fetchAndBuildBanner(BannerList)
        }
    }).catch((err)=>console.log(err));

    
    
}

function fetchAndBuildBanner(BannerList)
{
    const Length = BannerList.length;
    const ranNum = Math.floor(Math.random() * Length);
    const BannerTItle = BannerList[ranNum].original_title;
    const BannerName = BannerList[ranNum].original_name
    const NameTitle = BannerTItle==null?BannerName:BannerTItle;
    const div = document.createElement('div')
    div.innerHTML=`<div class="banner__title">${NameTitle} </div>
    <p class="banner__info">Trending in movies | Released - ${BannerList[ranNum].release_date} </p>
    <p class="banner__overview">${BannerList[ranNum].overview}</p>
    <div class="action-buttons-cont">
        <button class="action-button"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="Hawkins-Icon Hawkins-Icon-Standard"><path d="M4 2.69127C4 1.93067 4.81547 1.44851 5.48192 1.81506L22.4069 11.1238C23.0977 11.5037 23.0977 12.4963 22.4069 12.8762L5.48192 22.1849C4.81546 22.5515 4 22.0693 4 21.3087V2.69127Z" fill="currentColor"></path></svg> &nbsp;&nbsp; Play</button>
        <button class="action-button"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="Hawkins-Icon Hawkins-Icon-Standard"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3ZM1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM13 10V18H11V10H13ZM12 8.5C12.8284 8.5 13.5 7.82843 13.5 7C13.5 6.17157 12.8284 5.5 12 5.5C11.1716 5.5 10.5 6.17157 10.5 7C10.5 7.82843 11.1716 8.5 12 8.5Z" fill="currentColor"></path></svg> &nbsp;&nbsp; More Info</button>
    </div>`
    const Banner = document.getElementById('Main_Banner');
    Banner.append(div);
    const Poster = document.getElementById('Back_Poster');
    Poster.style.backgroundImage = `url(${imgPath}${BannerList[ranNum].poster_path})`
    Poster.style.backgroundSize = "cover"
    Poster.style.backgroundRepeat = "no-repeat";
}


function fetchAndBuildSection(MovieUrl,movie)
{
    fetch(MovieUrl)
    .then((res)=>res.json())
    .then((res)=>{
        const MoviesList = res.results;
        if(Array.isArray(MoviesList) && MoviesList.length)
        {
            buildMoviesSection(MoviesList , movie.name);
        } 
    })
    .catch((err)=>console.log(err));
    
}


function buildMoviesSection(MoviesList , category)
{
    const Movie_Container = document.getElementById('Movies_div')
    const Movie_List_HTML = MoviesList.map((movie)=>{
            return `
            <img class="Movie-Item" src=${imgPath}${movie.poster_path} alt=${movie.original_title}>
            `
    }).join("");

    const Movie_Section_HTML = `
            <h2 class="Movie-Category"">${category}<span class="Explore-Part">Explore All</span> <span class="greater_Sign"> > </span></h2>
            <div class="Movies-List">
                ${Movie_List_HTML}
            </div>
    ` 
    const div = document.createElement('div');
    div.className="Movie-Section";
    div.innerHTML = Movie_Section_HTML;

    Movie_Container.append(div);
}


const NavBar = document.querySelector('.Container-nav'); 
window.addEventListener('load', init());
