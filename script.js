// Execute the code when the DOM content is loaded
document.addEventListener("DOMContentLoaded", function() {
  // Get DOM elements
  const filmsList = document.getElementById("films");
  const moviePoster = document.getElementById("movie-poster");
  const movieTitle = document.getElementById("movie-title");
  const movieRuntime = document.getElementById("movie-runtime");
  const movieShowtime = document.getElementById("movie-showtime");
  const movieTickets = document.getElementById("movie-tickets");
  const buyTicketBtn = document.getElementById("buy-ticket-btn");
  const MovieDetails = document.getElementById("movie-details");

  // Fetch films data

  fetch("/films")
    .then(response => response.json())
    .then(data => {
      const films = data.films;
      films.forEach(film => {
        const li = document.createElement("li");
        li.className = "film-item";
        li.textContent = film.title;
        li.addEventListener("click", () => showMovieDetails(film));
        filmsList.appendChild(li);
      });

      showMovieDetails(films[0]);
    })
    .catch(error => console.error(error));

  function showMovieDetails(film) {
    moviePoster.style.backgroundImage = `url(${film.poster})`;
    movieTitle.textContent = film.title;
    movieRuntime.textContent = `Runtime: ${film.runtime} min`;
    movieShowtime.textContent = `Showtime: ${film.showtime}`;
    movieTickets.textContent = `Tickets available: ${film.capacity - film.tickets_sold}`;

    buyTicketBtn.disabled = film.tickets_sold >= film.capacity;
    buyTicketBtn.textContent = film.tickets_sold >= film.capacity ? "Sold Out" : "Buy Ticket";
  }
});
