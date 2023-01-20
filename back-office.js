let url = "https://striveschool-api.herokuapp.com/api/movies/";
let header = new Headers({
  "Content-type": "application/json",
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M5MzQ1ZmU3MzczODAwMTUzNzQzNzgiLCJpYXQiOjE2NzQyMDQ0MDgsImV4cCI6MTY3NTQxNDAwOH0.tn_K3ogSftVUdAF0MVdx3s9X3jtmK-1_SLrtxoOJ39o",
});
let globalMovies = [];
let selectedMovie;
let loadPage = async () => {
  globalMovies = [];
  selectedMovie = null;
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

const loadSections = async (categories) => {
  let section = document.getElementById("categories");
  categories.forEach(async (item) => {
    section.innerHTML += `<h2>${item.toUpperCase()}</h2>
    <table class="table">
    <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Description</th>
      <th scope="col"></th>
      <th scope="col"></th>
    </tr>
    </thead>
    <tbody id=${item}>
   
    </tbody>
    </table>`;
    let res = await fetch(url + item, { method: "GET", headers: header });
    let movies = await res.json();
    let tableContent = document.getElementById(item);
    movies.forEach((movie) => {
      globalMovies.push(movie);
      tableContent.innerHTML += ` <tr>
      <th scope="row">${movie.name}</th>
      <td>${movie.description}</td>
      <td> <button type="button" class="btn btn-danger" onclick = "deleteEvent('${movie._id}')">Delete</button></td>
      <td> <button type="button" class="btn btn-danger" onclick = "openEdit('${movie._id}')">Edit</button></td>
    </tr>`;
    });
  });
};

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
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M5MzQ1ZmU3MzczODAwMTUzNzQzNzgiLCJpYXQiOjE2NzQyMDQ0MDgsImV4cCI6MTY3NTQxNDAwOH0.tn_K3ogSftVUdAF0MVdx3s9X3jtmK-1_SLrtxoOJ39o",
      }),
    };

    let res = await fetch(url, options);
    let resJson = await res.json();
    loadPage();
  } catch (err) {
    console.log(err);
  }
};

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
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M5MzQ1ZmU3MzczODAwMTUzNzQzNzgiLCJpYXQiOjE2NzQyMDQ0MDgsImV4cCI6MTY3NTQxNDAwOH0.tn_K3ogSftVUdAF0MVdx3s9X3jtmK-1_SLrtxoOJ39o",
      }),
    };

    let res = await fetch(url + selectedMovie, options);
    let resJson = await res.json();

    loadPage();
    document.querySelector("#eventName").value = "";
    document.querySelector("#eventCategory").value = "";
    document.querySelector("#eventImage").value = "";
    document.querySelector("#eventDescription").value = "";
  } catch (err) {
    console.log(err);
  }
};

const deleteEvent = async (id) => {
  let res = await fetch(url + id, { method: "DELETE", headers: header });
  let resJson = await res.json();
  loadPage();
};

window.onload = loadPage();
