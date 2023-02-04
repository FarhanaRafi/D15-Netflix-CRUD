let url = "https://striveschool-api.herokuapp.com/api/movies/";
let header = new Headers({
  "Content-type": "application/json",
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M5MzQ1ZmU3MzczODAwMTUzNzQzNzgiLCJpYXQiOjE2NzU0MTgwODIsImV4cCI6MTY3NjYyNzY4Mn0.gvYKFS4opPiL7u02X11EUOV4QvX7GSTkSEbvOttIi5I",
});
let globalMovies = [];
let selectedMovie;

//to load section in back office
const loadSections = async (categories) => {
  let section = document.getElementById("categories");
  categories.forEach(async (category) => {
    section.innerHTML += `<h2 class="text-danger mb-3">${category.toUpperCase()}</h2>
    <table class="table">
    <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col"></th>
      <th scope="col">Description</th>
      <th scope="col"></th>
      <th scope="col"></th>
    </tr>
    </thead>
    <tbody id=${category}>
   
    </tbody>
    </table>`;
    let res = await fetch(url + category, { method: "GET", headers: header });
    let movies = await res.json();
    let tableContent = document.getElementById(category);
    movies.forEach((movie) => {
      globalMovies.push(movie);
      tableContent.innerHTML += ` <tr>
      <th scope="row">${movie.name}</th>
      <th scope="row"><img height="40" width ="40" src="${movie.imageUrl}" alt=""></th>
      <td>${movie.description}</td>
      <td> <button type="button" class="btn btn-danger" onclick = "deleteEvent('${movie._id}')">Delete</button></td>
      <td> <button type="button" class="btn btn-secondary" onclick = "openEdit('${movie._id}')">Edit</button></td>
    </tr>`;
    });
  });
};

//load section
const loadPage = async () => {
  globalMovies = [];
  selectedMovie = null;
  document.querySelector("#eventName").value = "";
  document.querySelector("#eventCategory").value = "";
  document.querySelector("#eventImage").value = "";
  document.querySelector("#eventDescription").value = "";
  document.getElementById("categories").innerHTML = "";
  try {
    let res = await fetch(url, {
      method: "GET",
      headers: header,
    });
    let resJson = await res.json();
    loadSections(resJson);
  } catch (err) {
    console.log(err);
  }
};

//to open modal when clicked on edit btn
const openEdit = async (id) => {
  let { name, category, imageUrl, description } = globalMovies.find(
    (item) => item._id === id
  );
  document.querySelector("#eventName").value = name;
  document.querySelector("#eventCategory").value = category;
  document.querySelector("#eventImage").value = imageUrl;
  document.querySelector("#eventDescription").value = description;

  selectedMovie = id;
  $("#exampleModal").modal("show");
};

//to post the movies
let handleNewEvent = async (submitEvent) => {
  try {
    submitEvent.preventDefault();
    const name = document.querySelector("#eventName").value;
    const category = document.querySelector("#eventCategory").value;
    const imageUrl = document.querySelector("#eventImage").value;
    const description = document.querySelector("#eventDescription").value;
    let newEvent = { name, category, imageUrl, description };

    let options = {
      method: "POST",
      body: JSON.stringify(newEvent),
      headers: new Headers({
        "Content-type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M5MzQ1ZmU3MzczODAwMTUzNzQzNzgiLCJpYXQiOjE2NzU0MTgwODIsImV4cCI6MTY3NjYyNzY4Mn0.gvYKFS4opPiL7u02X11EUOV4QvX7GSTkSEbvOttIi5I",
      }),
    };

    let res = await fetch(url, options);
    let resJson = await res.json();
    loadPage();
    document.getElementById("success-alert").classList.add("d-block");
  } catch (err) {
    console.log(err);
    document.getElementById("danger-alert").classList.add("d-block");
  }
};

//to update the movies
let handleEditEvent = async (submitEvent) => {
  try {
    submitEvent.preventDefault();
    const name = document.querySelector("#eventName").value;
    const category = document.querySelector("#eventCategory").value;
    const imageUrl = document.querySelector("#eventImage").value;
    const description = document.querySelector("#eventDescription").value;
    let newEvent = { name, category, imageUrl, description };

    console.log(selectedMovie);
    let options = {
      method: "PUT",
      body: JSON.stringify(newEvent),
      headers: new Headers({
        "Content-type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M5MzQ1ZmU3MzczODAwMTUzNzQzNzgiLCJpYXQiOjE2NzU0MTgwODIsImV4cCI6MTY3NjYyNzY4Mn0.gvYKFS4opPiL7u02X11EUOV4QvX7GSTkSEbvOttIi5I",
      }),
    };

    let res = await fetch(url + selectedMovie, options);
    let resJson = await res.json();

    loadPage();
    document.getElementById("success-alert").classList.add("d-block");
  } catch (err) {
    console.log(err);
    // document.getElementById("danger-alert").classList.add("d-block");
  }
};

//to delete the movies
const deleteEvent = async (id) => {
  let res = await fetch(url + id, { method: "DELETE", headers: header });
  let resJson = await res.json();
  loadPage();
};

window.onload = loadPage();
