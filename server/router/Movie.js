const express = require("express");
const movieModel = require("../Models/movieModel");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const movieList = await movieModel
      .find({})
      .populate("genre")
      .sort({ createdAt: "desc" });
    console.log("🚀 ~ file: Movie.js:9 ~ router.get ~ movieList:", movieList);
    res.json(movieList);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const movie = {
      imageName: req.body.image,
      movieName: req.body.movieName,
      rating: req.body.rating,
      genre: req.body.genre,
    };

    if (req.body.id != 0) {
      const resmovie = await movieModel.findByIdAndUpdate(req.body.id, {
        ...movie,
      });
      res.json(resmovie);
    } else {
      const movieList = await movieModel.create(movie);
      res.json(movieList);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/movieById", async (req, res) => {
  try {
    const movie = await movieModel.findById(req.body.id);
    res.json(movie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/", async (req, res) => {
  try {
    const data = await movieModel.findByIdAndDelete(req.body.id);
    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/pagination", async (req, res) => {
  const { page, pageSize } = req.query;
  try {
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(pageSize);
    const skipCount = (pageNumber - 1) * limitNumber;
    const data = await movieModel
      .find({})
      .populate("genre")
      .sort({ createdAt: "desc" })
      .skip(skipCount)
      .limit(limitNumber);
    const totalCount = await movieModel.countDocuments();
    const totalPage = Math.ceil(totalCount / limitNumber);
    res.json({
      data,
      pageNumber,
      totalPage,
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/filter", async (req, res) => {
  try {
    const { selectedGenres, filterStar } = req.body;
    console.log(
      "🚀 ~ file: Movie.js:87 ~ router.post ~ selectedGenres:",
      selectedGenres.length
    );
    const genreObjectId = selectedGenres.map((genre) => genre.value);
    let filterList = [];
    if (selectedGenres.length != 0 && filterStar !== 0) {
      console.log("-----1");
      filterList = await movieModel
        .find({ genre: { $all: genreObjectId }, rating: (filterStar - 1) * 25 })
        .populate("genre")
        .sort({ createdAt: "desc" });
    }
    if (selectedGenres.length == 0 && filterStar > 0) {
      console.log("-----2");
      filterList = await movieModel
        .find({ rating: (filterStar - 1) * 25 })
        .populate("genre")
        .sort({ createdAt: "desc" });
    }
    if (selectedGenres.length != 0 && filterStar == 0) {
      console.log("-----3");
      filterList = await movieModel
        .find({ genre: { $all: genreObjectId } })
        .populate("genre")
        .sort({ createdAt: "desc" });
    }
    console.log(
      "🚀 ~ file: Movie.js:107 ~ router.post ~ filterList:",
      filterList
    );
    res.json(filterList);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
