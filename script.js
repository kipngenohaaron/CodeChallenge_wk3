document.addEventListener('DOMContentLoaded', function () {
  const filmsMenu = document.getElementById('films');
  const movieDetails = document.getElementById('movie-details');
  const posterElement = document.getElementById('movie-poster');
  const titleElement = document.getElementById('movie-title');
  const runtimeElement = document.getElementById('movie-runtime');
  const showtimeElement = document.getElementById('movie-showtime');
  const ticketsElement = document.getElementById('movie-tickets');
  const buyTicketButton = document.getElementById('buy-ticket-btn');

  const API_URL = 'http://localhost:3000/films';

  let selectedFilm = null;

  // Fetch the movie list from the server
  fetch(API_URL)
    .then((response) => response.json())
    .then((data) => {
      data.films.forEach((movie) => {
        const filmItem = document.createElement('li');
        filmItem.classList.add('film-item');
        filmItem.textContent = movie.title;
        filmsMenu.appendChild(filmItem);

        filmItem.addEventListener('click', () => {
          showMovieDetails(movie);
        });
      });

      // Show details of the first movie by default
      if (data.films.length > 0) {
        showMovieDetails(data.films[0]);
      }
    });

  function showMovieDetails(movie) {
    selectedFilm = movie;
    posterElement.style.backgroundImage = `url(${movie.poster})`;
    titleElement.textContent = movie.title;
    runtimeElement.textContent = `Runtime: ${movie.runtime} minutes`;
    showtimeElement.textContent = `Showtime: ${movie.showtime}`;
    ticketsElement.textContent = `Available Tickets: ${movie.capacity - movie.tickets_sold}`;

    buyTicketButton.disabled = movie.tickets_sold >= movie.capacity;
  }

  buyTicketButton.addEventListener('click', () => {
    if (selectedFilm) {
      // Simulate buying a ticket by incrementing the tickets_sold count
      selectedFilm.tickets_sold++;
      ticketsElement.textContent = `Available Tickets: ${selectedFilm.capacity - selectedFilm.tickets_sold}`;
      buyTicketButton.disabled = selectedFilm.tickets_sold >= selectedFilm.capacity;
    }
  });
});
