import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config(); // Load .env file

const app = express();
app.use(express.json())
app.use(cors({
    origin: "*",
}));

const API_KEY = process.env.API_KEY; // Load API key securely

app.get("/api/weather", async (req, res) => {
    const city = req.query.city;
    if (!city) {
        return res.status(400).json({ error: "City is required" });
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch weather data" });
    }
});

// Start server on port 5000
app.listen(5000, () => console.log("Server running on http://localhost:5000"));
