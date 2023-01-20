let url = "https://striveschool-api.herokuapp.com/api/movies/";
let options = {
  method: "GET",
  headers: new Headers({
    "Content-type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M5MzQ1ZmU3MzczODAwMTUzNzQzNzgiLCJpYXQiOjE2NzQyMDQ0MDgsImV4cCI6MTY3NTQxNDAwOH0.tn_K3ogSftVUdAF0MVdx3s9X3jtmK-1_SLrtxoOJ39o",
  }),
};
function deferVideo() {
  $("video source").each(function () {
    var sourceFile = $(this).attr("data-src");
    $(this).attr("src", sourceFile);
    var video = this.parentElement;
    video.load();
  });
}
const renderSections = async (sections) => {
  let container = document.querySelector(".container-fluid");
  sections.forEach(async (section) => {
    container.innerHTML += `<h4 class = "text-white mb-4 mt-4">${section}</h4>
    <div id="${section}" class="row row-cols-2 row-cols-sm-2 row-cols-md-5 row-cols-lg-5"></div>`;
    let res = await fetch(url + section, options);
    let movies = await res.json();
    let row = document.getElementById(section);
    movies.forEach((movie) => {
      row.innerHTML += `<div class="px-1 mb-3">
        <div class="movie-card">
            <img class="img-fluid" src="${movie.imageUrl}" alt="">
            <div class="info-container d-none d-md-block d-lg-block">
                <div class="play-btn"><i class="bi bi-play-circle mr-2"></i>
                    <i class="bi bi-hand-thumbs-up mr-2"></i>
                    <i class="bi bi-plus-circle mr-2"></i>
                </div>
                <h6 class="text-success mb-2">95% Match</h6>
                <h5>${movie.name}</h5>
                <p>${movie.description}</p>
            </div>
        </div>
    </div>`;
    });
  });
};

const getMovies = async () => {
  let res = await fetch(url, options);
  let resJson = await res.json();
  console.log(resJson);
  renderSections(resJson);
};

const loadContents = () => {
  getMovies();
  deferVideo();
};

window.onload = loadContents();
