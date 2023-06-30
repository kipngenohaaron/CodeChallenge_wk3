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

  // Fetch films data
  fetch("/films")
    .then(response => response.json())
    .then(films => {
      // Populate films list
      films.forEach(film => {
        const li = document.createElement("li");
        li.className = "film-item";
        li.textContent = film.title;
        li.addEventListener("click", () => showMovieDetails(film)); // Add click event listener to show movie details
        filmsList.appendChild(li);
      });

      // Show details of the first film
      showMovieDetails(films[0]);
    })
    .catch(error => console.error(error));

  // Function to show movie details
  function showMovieDetails(film) {
    moviePoster.style.backgroundImage = `url(${film.poster})`; // Set movie poster background image
    movieTitle.textContent = film.title; // Set movie title
    movieRuntime.textContent = `Runtime: ${film.runtime} min`; // Set movie runtime
    movieShowtime.textContent = `Showtime: ${film.showtime}`; // Set movie showtime
    movieTickets.textContent = `Tickets available: ${film.capacity - film.tickets_sold}`; // Calculate and set available tickets

    buyTicketBtn.disabled = film.tickets_sold >= film.capacity; // Disable buy ticket button if sold out
    buyTicketBtn.textContent = film.tickets_sold >= film.capacity ? "Sold Out" : "Buy Ticket"; // Set button text based on availability
  }
});
