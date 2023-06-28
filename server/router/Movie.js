const express = require("express");
const movieModel = require("../Models/movieModel");
const { eventEmitter } = require("./notification");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const movieList = await movieModel
      .find({})
      .populate("genre")
      .sort({ createdAt: "desc" });
    res.json(movieList);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/", async (req, res, next) => {
  try {
    if (!("imageName" in req.body)) {
      const error = {
        status: 400,
        body: req.body,
        required: "imageName",
      };
      return next(error);
    }
    const movie = {
      imageName: req.body.image,
      movieName: req.body.movieName,
      rating: req.body.rating,
      genre: req.body.genre,
    };

    let updatedMovie;
    if (req.body.id != 0) {
      updatedMovie = await movieModel.findByIdAndUpdate(req.body.id, movie);
      res.json(updatedMovie);
    } else {
      updatedMovie = await movieModel.create(movie);
    }
    res.json(updatedMovie);

    const eventType = req.body.id !== 0 ? 2 : 1;
    eventEmitter.emit("newMovie", {
      id: movieList._id,
      img: movieList.imageName,
      name: movieList.movieName,
      type: eventType,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/movieById", async (req, res) => {
  try {
    const { id } = req.body;
    const movie = await movieModel.findById(id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.json(movie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/", async (req, res) => {
  try {
    const data = await movieModel.findByIdAndDelete(req.body.id);
    res.json(data);
    eventEmitter.emit("newMovie", {
      id: data._id,
      img: data.imageName,
      name: data.movieName,
      type: 3,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/filter", async (req, res) => {
  try {
    const { page, pageSize } = req.query;
    const { selectedGenres, filterStar } = req.body;

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(pageSize);
    const skipCount = (pageNumber - 1) * limitNumber;
    let filter = {};
    if (selectedGenres.length > 0) {
      const genreObjectId = selectedGenres.map((genre) => genre.value);
      filter.genre = { $all: genreObjectId };
    }
    if (filterStar > 0) {
      filter.rating = (filterStar - 1) * 25;
    }
    let filterList = await movieModel
      .find(filter)
      .populate("genre")
      .sort({ createdAt: "desc" })
      .skip(skipCount)
      .limit(limitNumber);
    const totalCount = await movieModel.countDocuments(filter);
    const totalPage = Math.ceil(totalCount / limitNumber);
    res.json({
      movieList: filterList,
      pageNumber,
      totalPage,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// router.get("/pagination", async (req, res) => {
//   const { page, pageSize } = req.query;
//   try {
//     const pageNumber = parseInt(page);
//     const limitNumber = parseInt(pageSize);
//     const skipCount = (pageNumber - 1) * limitNumber;
//     const data = await movieModel
//       .find({})
//       .populate("genre")
//       .sort({ createdAt: "desc" })
//       .skip(skipCount)
//       .limit(limitNumber);
//     const totalCount = await movieModel.countDocuments();
//     const totalPage = Math.ceil(totalCount / limitNumber);
//     res.json({
//       data,
//       pageNumber,
//       totalPage,
//     });
//   } catch (error) {
//     res.status(400).json(error);
//   }
// });

module.exports = router;
