const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const { engine } = require('express-handlebars');

const app = express();
app.use(express.json());

// Satattisen tiedoston lisäys
app.use(express.static('public'));

//Handlebars käyttöön
app.engine('handlebars', engine({
  defaultLayout: 'main',
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true
  }
}));
app.set('view engine', 'handlebars');

//MongoDB Atlas -yhteys
const dbURI = 'mongodb+srv://' + process.env.DBUSERNAME + ':' + process.env.DBPASSWORD + '@' + process.env.CLUSTER + '.mongodb.net/' + process.env.DB + '?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(dbURI)
  .then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log("Server running on port " + PORT));
    console.log('Connected to DB');
  })
  .catch((err) => {
    console.error("Connection error:", err);
  });

//Malli
const Movie = require('./models/Movie');

//Handlebars-sivu selaimelle
app.get('/', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.render('products', {
      title: 'Movie List',
      companyName: 'MovieRental',
      movies: movies
    });
  } catch (error) {
    res.status(500).send('Error fetching movies.');
  }
});

//REST API
//Add movie
app.post('/movies', async (req, res) => {
  try {
    const newMovie = await Movie.create(req.body);
    res.status(201).json(newMovie);
  } catch (error) {
    console.error("POST error:", error);
    res.status(500).json({ error: "Could not add movie." });
  }
});
//GET ALL
app.get('/movies', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    console.error("GET all error:", error);
    res.status(500).json({ error: "Could not fetch movies." });
  }
});

//het ONE movie by iD
app.get('/movies/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ error: "Movie not found." });
    res.json(movie);
  } catch (error) {
    console.error("GET one error:", error);
    res.status(500).json({ error: "Could not fetch movie." });
  }
});
//Update movie(add all info)
app.put('/movies/:id', async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedMovie) return res.status(404).json({ error: "Movie not found." });
    res.json(updatedMovie);
  } catch (error) {
    console.error("PUT error:", error);
    res.status(500).json({ error: "Could not update movie." });
  }
});
// update on or manuy info 
app.patch('/movies/:id', async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedMovie) return res.status(404).json({ error: "Movie not found." });
    res.json(updatedMovie);
  } catch (error) {
    console.error("PATCH error:", error);
    res.status(500).json({ error: "Could not update movie." });
  }
});
// DElete movie
app.delete('/movies/:id', async (req, res) => {
  try {
    const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
    if (!deletedMovie) return res.status(404).json({ error: "Movie not found." });
    res.json({ message: "Movie deleted." });
  } catch (error) {
    console.error("DELETE error:", error);
    res.status(500).json({ error: "Could not delete movie." });
  }
});

//Bulkki lisäys databaseen
const addMovies = async () => {
  try {
    await Movie.insertMany([
      { name: "The Matrix", genre: "Sci-Fi", year: 1999, price: 6, available: true },
      { name: "The Shawshank Redemption", genre: "Drama", year: 1994, price: 7, available: false },
      { name: "Gladiator", genre: "Action", year: 2000, price: 5, available: true },
      { name: "Forrest Gump", genre: "Drama", year: 1994, price: 6, available: true },
      { name: "The Dark Knight", genre: "Action", year: 2008, price: 8, available: false },
      { name: "La La Land", genre: "Musical", year: 2016, price: 4, available: true },
      { name: "Parasite", genre: "Thriller", year: 2019, price: 6, available: true },
      { name: "Up", genre: "Animation", year: 2009, price: 3, available: false },
      { name: "Dune", genre: "Sci-Fi", year: 2021, price: 9, available: true },
      { name: "Whiplash", genre: "Drama", year: 2014, price: 5, available: false }
    ]);
    console.log("New movies added!");
  } catch (error) {
    console.error("Error adding movies:", error);
  }
};
// addMovies(); // ota käyttöön tarvittaessa
