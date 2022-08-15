const Hotel = require("../models/Hotel");
const Room = require("../models/Room");

module.exports = {
  createHotel: async (req, res, next) => {
    const newHotel = new Hotel(req.body);

    try {
      const savedHotel = await newHotel.save();
      res.status(200).json(savedHotel);
    } catch (err) {
      next(err);
    }
  },

  updateHotel: async (req, res) => {
    try {
      const updatedHotel = await Hotel.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedHotel);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  deleteHotel: async (req, res) => {
    try {
      await Hotel.findByIdAndDelete(req.params.id);
      res.status(200).json("Hotel has been deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getHotel: async (req, res) => {
    try {
      const hotel = await Hotel.findById(req.params.id);
      res.status(200).json(hotel);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getAllHotels: async (req, res, next) => {
    const { min, max, ...others } = req.query;

    try {
      const hotels = await Hotel.find({
        ...others,
        cheapestPrice: { $gt: min || 1, $lt: max || 999 },
      }).limit(req.query.limit);
      res.status(200).json(hotels);
    } catch (err) {
      // res.status(500).json(err);
      next(err);
    }
  },

  countByCity: async (req, res, next) => {
    const cities = req.query.cities.split(",");

    try {
      const list = await Promise.all(
        cities.map((city) => {
          // return Hotel.find({city:city}).length;
          return Hotel.countDocuments({ city: city });
        })
      );
      res.status(200).json(list);
    } catch (err) {
      // res.status(500).json(err);
      next(err);
    }
  },

  countByType: async (req, res, next) => {
    try {
      const hotelCount = await Hotel.countDocuments({ type: "hotel" });
      const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
      const resortCount = await Hotel.countDocuments({ type: "resort" });
      const villaCount = await Hotel.countDocuments({ type: "villa" });
      const cabinsCount = await Hotel.countDocuments({ type: "cabins" });

      res.status(200).json([
        { type: "hotel", count: hotelCount },
        { type: "apartment", count: apartmentCount },
        { type: "resort", count: resortCount },
        { type: "villa", count: villaCount },
        { type: "cabins", count: cabinsCount },
      ]);
    } catch (err) {
      // res.status(500).json(err);
      next(err);
    }
  },
  getHotelRooms : async (req, res, next) => {
    try {
      const hotel = await Hotel.findById(req.params.id);
      const list = await Promise.all(
        hotel.rooms.map((room) => {
          return Room.findById(room);
        })
      );
      res.status(200).json(list);
    } catch (error) {
      next(error);
    }
  }
};

