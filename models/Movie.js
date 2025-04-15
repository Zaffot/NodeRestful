const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  name: String,
  genre: String,
  year: Number,
  price: Number,
  available: Boolean  // true = saatavilla, false = vuokrattu
});

module.exports = mongoose.model('Movie', movieSchema);