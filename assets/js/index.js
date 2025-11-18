let logout = document.querySelector(".logout");
let signout = document.querySelector(".signout");
let row = document.querySelector(".row");
let icon1 = document.querySelector("#icon1");
let icon2 = document.querySelector("#icon2");
let navbarToggler = document.querySelector(".navbar-toggler");
let buttons = document.querySelectorAll(".nav-link");
let spinner = document.querySelector("#spinner");

logout.addEventListener("click", function () {
  let currentUser = JSON.parse(localStorage.getItem("currentUser"));
  currentUser.logged = "false";
  localStorage.setItem("currentUser", JSON.stringify(currentUser));
  window.location.href = "login.html";
});

signout.addEventListener("click", function () {
  let users = JSON.parse(localStorage.getItem("users"));
  let currentUser = JSON.parse(localStorage.getItem("currentUser"));
  let newUsers = users.filter((user) => currentUser.email !== user.email);
    localStorage.setItem("users", JSON.stringify(newUsers));
    localStorage.removeItem("currentUser");
  window.location.href = "signup.html";
});

navbarToggler.addEventListener("click", function () {
  icon1.classList.toggle("d-none");
  icon2.classList.toggle("d-none");
});

async function displayMovies(category) {
  row.innerHTML = "";
  spinner.classList.remove("d-none");

  try {
    let response = await fetch(
      `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1&api_key=31bd1a152791b790f223a70054dc98f7`
    );
    response = await response.json();
    let result = response.results;
    let trs = ``;
    result.forEach((movie) => {
      trs += `<div class="col-md-6 col-lg-4 col-xl-3">
                        <div>
                            <img loading="lazy" class="w-100 rounded-top-2" style="height:400px; object-fit:cover" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="">
                            <div class="body-col bg-white p-3 rounded-bottom-2" style="height:250px;overflow:hidden; line-height:1.6;-webkit-line-clamp: 3;-webkit-box-orient: vertical;display: -webkit-box;">
                                <h4>Title: ${movie.title}</h4>
                                <p class="mb-2"><span class="fw-bold">Release Date:</span> ${movie.release_date}</p>
                                <p class="mb-2"><span class="fw-bold">Language:</span> ${movie.original_language}</p>
                                <p><span class="fw-bold">Overview:</span> ${movie.overview}</p>
                            </div>
                        </div>
                    </div>`;
    });

    row.innerHTML = trs;
  } catch (error) {
    row.innerHTML = `<p class="text-white text-center">Failed to load movies. Please try again later.</p>`;
    console.error(error);
  } finally {
    spinner.classList.add("d-none");
  }
}

displayMovies("now_playing");
buttons.forEach((btn) => {
  btn.addEventListener("click", function () {
    let category = this.dataset.category;
    displayMovies(category);
  });
});
