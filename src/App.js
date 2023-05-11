import React, { useState, useEffect } from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

function App() {
  const [show, setShow] = useState(false);
  const [movies, setMovies] = useState([]);
  const [searchBar, setSearchBar] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const API_KEY = 'your api key';
    const URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;

    setIsLoading(true);

    async function fetchMovies() {
      const response = await fetch(URL);
      const data = await response.json();
      setMovies(data.results);
      setIsLoading(false);
    }
    fetchMovies();
  }, []);

  const searchedMovies = movies.filter(movie => movie.title.toLowerCase().includes(searchBar.toLowerCase()));

  const handleChange = event => {
    setSearchBar(event.target.value);
    setSelectedMovie(null);
  };

  const displayMovieDetails = movie => {
    setShow(true);
    setSelectedMovie(movie);
  };

  const handleClose = () => {
    setShow(false);
  }

  return(
    <div className="App">
      <h1>Movie Dashboard</h1>
      <input
        type="text"
        placeholder="Search movies..."
        value={searchBar}
        onChange={handleChange}
      />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {searchedMovies.map(movie => (
            <li key={movie.id} onClick={() => displayMovieDetails(movie)}>
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={`${movie.target} Poster`}
              />
              <div>
                <h3>{movie.title}</h3>
              </div>
            </li>
          ))}
        </ul>
      )}
      {selectedMovie && (
        <Modal
        isOpen={show}
        onRequestClose={handleClose}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div>
          <h3>{selectedMovie.title}</h3>
          <img
            src={`https://image.tmdb.org/t/p/w200${selectedMovie.poster_path}`}
            alt={`${selectedMovie.target} Poster`}
          />
          <p>
            Released on {selectedMovie.release_date} - Note : {selectedMovie.vote_average}/10
          </p>
          <p>{selectedMovie.overview}</p>
        </div>
        <form>
          <button onClick={handleClose}>close</button>
        </form>
      </Modal>
      )}
    </div>
  );
}

export default App;