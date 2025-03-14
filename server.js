require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error(err));

const Profile = require("./models/Profile");

// GET semua profil
app.get("/profiles", async (req, res) => {
    try {
        const profiles = await Profile.find();
        res.json(profiles);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET profil berdasarkan ID
app.get("/profiles/:id", async (req, res) => {
    try {
        const profile = await Profile.findById(req.params.id);
        if (!profile) return res.status(404).json({ message: "Profile not found" });
        res.json(profile);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST profil baru
app.post("/profiles", async (req, res) => {
    const { name, bio, email, phone, website } = req.body;
    const newProfile = new Profile({ name, bio, email, phone, website });

    try {
        const savedProfile = await newProfile.save();
        res.status(201).json(savedProfile);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT update profil
app.put("/profiles/:id", async (req, res) => {
    try {
        const updatedProfile = await Profile.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProfile) return res.status(404).json({ message: "Profile not found" });
        res.json(updatedProfile);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// DELETE profil
app.delete("/profiles/:id", async (req, res) => {
    try {
        const deletedProfile = await Profile.findByIdAndDelete(req.params.id);
        if (!deletedProfile) return res.status(404).json({ message: "Profile not found" });
        res.json({ message: "Profile deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get('/', (req, res) => {
    res.send("Server is running!");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
