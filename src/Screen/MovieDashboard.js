import React, { useState, useEffect } from "react";
import { makeStyles, alpha } from '@material-ui/core/styles';
import { Grid, List, ListItem, ListItemText, Dialog, DialogTitle, DialogContent, DialogContentText, AppBar, Toolbar, Typography, InputBase, } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto',
    paddingTop: theme.spacing(2),
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  list: {
    margin: theme.spacing(2),
  },
  poster: {
    marginRight: theme.spacing(2),
  },
}));

function MovieDashboard() {
  const classes = useStyles();

  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchBar, setSearchBar] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const apiKey = 'd074cc6175548135eed2403642657dd3';
    const URL = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;

    setIsLoading(true);

    const fetchData = async() => {
      const result = await axios.get(URL);
      setMovies(result.data.results);
      setFilteredMovies(result.data.results);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchBar(value);
    const filtered = movies.filter((movie) => {
      return movie.title.toLowerCase().includes(value.toLowerCase());
    });
    setFilteredMovies(filtered);
  };

  const displayMovieDetails = movie => {
    setSelectedMovie(movie);
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  }
  
  return(
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            My Movie Dashboard
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              value={searchBar}
              onChange={handleSearch}
            />
          </div>
        </Toolbar>
      </AppBar>
      {isLoading ? (<p>Loading...</p>) : (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <List className={classes.list}>
              {filteredMovies.map((movie) => (
                <ListItem key={movie.id} button onClick={() => displayMovieDetails(movie)}>
                  <img src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`} alt={movie.title} className={classes.poster} />
                  <ListItemText primary={movie.title} secondary={movie.release_date} />
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      )}
      <Dialog 
        open={dialogOpen}
        onClose={handleClose} 
        style={{ maxWidth: "100%", maxHeight: "100%" }}
      >
        {selectedMovie && 
          <img 
            style={{ width: '100%', height: '100%',}}
            src={`https://image.tmdb.org/t/p/w200${selectedMovie.poster_path}`} 
            alt={selectedMovie.title}
          />}
        <DialogTitle>{selectedMovie && selectedMovie.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {selectedMovie && selectedMovie.overview}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default MovieDashboard;