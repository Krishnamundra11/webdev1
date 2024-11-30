const Club = require("../models/club");
const fs = require("fs");
const path = require("path");
// const fileUpload = require("express-fileupload");
// app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp/" }));

// Create Club
// const createClub = async (req, res) => {
//   try {
//     const { title, description, venue } = req.body;
//     const { image } = req.files;

//     if (!req.files || !req.files.image) {
//       return res.status(400).json({ success: false, message: "Image is required" });
//     }
    

//     if (!title || !description || !venue || !image) {
//       return res.status(400).json({ success: false, message: "All fields are required" });
//     }

//     const allowedExtensions = ["jpg", "jpeg", "png"];
//     const fileExtension = image.name.split(".").pop().toLowerCase();

//     if (!allowedExtensions.includes(fileExtension)) {
//       return res.status(400).json({ success: false, message: "Invalid file type" });
//     }

//     const fileName = `${Date.now()}.${fileExtension}`;
//     const imagePath = path.join(__dirname, "..", "public", "images", fileName);

//     fs.renameSync(image.tempFilePath, imagePath);

//     const newClub = await Club.create({
//       title,
//       description,
//       venue,
//       image: `http://127.0.0.1:${process.env.PORT}/images/${fileName}`,
//     });

//     res.status(201).json({ success: true, message: "Club created successfully", data: newClub });
//   } catch (error) {
//     console.error("Error creating club:", error.message);
//     res.status(500).json({ success: false, message: "Error creating club", error: error.message });
//   }
// };
// const createClub = async (req, res) => {
//   try {
//     const { title, description, venue } = req.body;
//     const { image } = req.files;

//     if (!req.files || !req.files.image) {
//       return res.status(400).json({ success: false, message: "Image is required" });
//     }

//     if (!title || !description || !venue || !image) {
//       return res.status(400).json({ success: false, message: "All fields are required" });
//     }

//     const allowedExtensions = ["jpg", "jpeg", "png"];
//     const fileExtension = image.name.split(".").pop().toLowerCase();

//     if (!allowedExtensions.includes(fileExtension)) {
//       return res.status(400).json({ success: false, message: "Invalid file type" });
//     }

//     const fileName = `${Date.now()}.${fileExtension}`;
//     const imagePath = path.join(__dirname, "..", "public", "images");
//     const fullPath = path.join(imagePath, fileName);

//     // Ensure the directory exists
//     if (!fs.existsSync(imagePath)) {
//       fs.mkdirSync(imagePath, { recursive: true });
//     }

//     // Move the file
//     fs.rename(image.tempFilePath, fullPath, async (err) => {
//       if (err) {
//         console.error("Error moving file:", err);
//         return res.status(500).json({ success: false, message: "Error saving file" });
//       }

//       // Save club to database
//       try {
//         const newClub = await Club.create({
//           title,
//           description,
//           venue,
//           image: `http://127.0.0.1:${process.env.PORT}/images/${fileName}`,
//         });

//         res.status(201).json({ success: true, message: "Club created successfully", data: newClub });
//       } catch (error) {
//         console.error("Error creating club:", error.message);
//         res.status(500).json({ success: false, message: "Error creating club", error: error.message });
//       }
//     });
//   } catch (error) {
//     console.error("Error creating club:", error.message);
//     res.status(500).json({ success: false, message: "Error creating club", error: error.message });
//   }
// };
const createClub = async (req, res) => {
  try {
    const { title, description, venue, date, time } = req.body;
    const { image } = req.files;

    // Validate required fields
    if (!req.files || !req.files.image) {
      return res.status(400).json({ success: false, message: "Image is required" });
    }

    if (!title || !description || !venue || !date || !time) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const allowedExtensions = ["jpg", "jpeg", "png"];
    const fileExtension = image.name.split(".").pop().toLowerCase();

    if (!allowedExtensions.includes(fileExtension)) {
      return res.status(400).json({ success: false, message: "Invalid file type" });
    }

    const fileName = `${Date.now()}.${fileExtension}`;
    const imagePath = path.join(__dirname, "..", "public", "images");
    const fullPath = path.join(imagePath, fileName);

    // Ensure the directory exists
    if (!fs.existsSync(imagePath)) {
      fs.mkdirSync(imagePath, { recursive: true });
    }

    // Move the file
    fs.rename(image.tempFilePath, fullPath, async (err) => {
      if (err) {
        console.error("Error moving file:", err);
        return res.status(500).json({ success: false, message: "Error saving file" });
      }

      // Save club to database
      try {
        const newClub = await Club.create({
          title,
          description,
          venue,
          date,
          time,
          image: `http://127.0.0.1:${process.env.PORT}/images/${fileName}`,
        });

        res.status(201).json({ success: true, message: "Club created successfully", data: newClub });
      } catch (error) {
        console.error("Error creating club:", error.message);
        res.status(500).json({ success: false, message: "Error creating club", error: error.message });
      }
    });
  } catch (error) {
    console.error("Error creating club:", error.message);
    res.status(500).json({ success: false, message: "Error creating club", error: error.message });
  }
};


// Fetch All Clubs
// const getAllClubs = async (req, res) => {
//   try {
//     const clubs = await Club.find();
//     res.status(200).json({ success: true, message: "Clubs fetched successfully", data: clubs });
//   } catch (error) {
//     console.error("Error fetching clubs:", error.message);
//     res.status(500).json({ success: false, message: "Error fetching clubs", error: error.message });
//   }
// };


// const getAllClubs = async (req, res) => {
//   try {
//     const clubs = await Club.find(); // Fetch all clubs from the database

//     // Format the response data to include only the necessary fields if needed
//     const formattedClubs = clubs.map(club => ({
//       _id: club._id,         // Unique ID for each club
//       image: club.image,     // Club image URL
//       title: club.title,     // Club title
//       description: club.description, // Club description
//       venue: club.venue,     // Club venue or location
//       date: club.date        // Event date
//     }));

//     res.status(200).json({
//       success: true,
//       message: "Clubs fetched successfully",
//       data: formattedClubs // Send formatted club data to the frontend
//     });
//   } catch (error) {
//     console.error("Error fetching clubs:", error.message);
//     res.status(500).json({
//       success: false,
//       message: "Error fetching clubs",
//       error: error.message
//     });
//   }
// };
const getAllClubs = async (req, res) => {
  try {
    const clubs = await Club.find(); // Fetch all clubs from the database

    // Format the response data
    const formattedClubs = clubs.map((club) => ({
      _id: club._id,         // Unique ID for each club
      image: club.image,     // Club image URL
      title: club.title,     // Club title
      description: club.description, // Club description
      venue: club.venue,     // Club venue or location
      date: club.date,       // Event date
      time: club.time,       // Event time
    }));

    res.status(200).json({
      success: true,
      message: "Clubs fetched successfully",
      data: formattedClubs, // Send formatted club data to the frontend
    });
  } catch (error) {
    console.error("Error fetching clubs:", error.message);
    res.status(500).json({
      success: false,
      message: "Error fetching clubs",
      error: error.message,
    });
  }
};

module.exports = { createClub, getAllClubs };
