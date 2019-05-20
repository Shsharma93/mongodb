const mongoose = require('mongoose');
require('dotenv').config();

mongoose
  .connect(process.env.DB_CONNECTION, { useNewUrlParser: true })
  .then(() => console.log('connected to mongoDB'))
  .catch(err => console.log('Could not connect to mongodb', err));

//  Comparison Operator
//  gt - (greater than)
//  gte - (greater than or equal)
//  eq - (equal)
//  ne - (not equal)
//  le - (less than)
//  lte - (less than or equal)
//  in - (in)
//  nin - (not in)

const moviesSchema = mongoose.Schema({
  name: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isReleased: { type: Boolean, required: true },
  duration: Number,
  year: Number,
  director: String,
  ratings: Number
});

const Movies = mongoose.model('Movies', moviesSchema);

createMovie = async () => {
  const movie = new Movies({
    name: 'Bajirao Mastani',
    tags: ['Drama', 'Bollywood'],
    isReleased: true,
    duration: 158,
    year: 2015,
    director: 'Sanjay Leela Bhansali',
    ratings: 7.2
  });

  const result = await movie.save();
  console.log(result);
};

//  Logical Operator
//  or
//  and

getMovie = async () => {
  const movie = await Movies.find()
    //  .find({tags: { $in: 'Crime' },duration: { $gt: 120 }})
    // .find({ name: 'Dangal' })
    // .find({ price: 10 }) // only 10
    // .find({ price: { $gt: 10, $lt: 5 } }) // between 5 and 10
    // .find({ price: { $in: [10, 15, 5] } }) // only 5, 10, 15
    // .find()
    // .or([{ name: 'PK' }, { isReleased: true }])
    // .find({name: /^Shas/ }) // Starts with Shas
    // .find({name: /shank$/i }) //End with shank, i for case sensitive
    // .find({name: /.*ank.*} ) //contains ank
    //.limit(10)
    .sort({ year: 1 })
    .select({ name: 1, director: 1, tags: 1, year: 1 })
    .count();
  console.log(movie);
};

updateMovieQuery = async id => {
  const movie = await Movies.findById(id);
  if (!movie) return;

  movie.set({
    isReleased: true,
    ratings: 8.5
  });

  const result = await movie.save();
  console.log(result);
};

updateMovie = async id => {
  const movie = await Movies.findByIdAndUpdate(
    id,
    {
      $set: {
        ratings: 8.5
      }
    },
    { new: true }
  );
  console.log(movie);
};

deleteMovie = async id => {
  //const result = await Movies.deleteOne({ _id: id });
  const movie = await Movies.findByIdAndRemove(id);
  console.log(movie);
};

//createMovie();
getMovie();
//updateMovieQuery('5ce28aa14c5b2962833b9507');
//updateMovie('5ce28aa14c5b2962833b9507');
//deleteMovie('5ce29b18fdd8066b396f4b75');
