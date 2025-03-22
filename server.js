// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const perfumeRoutes = require('./routes/perfumeRoutes');
const Perfume = require('./models/Perfume'); // 👈 Required for fetching data directly

dotenv.config();

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from your frontend
    credentials: true, // Allow cookies and credentials
}));
app.use(express.json());

// Routes
app.use('/api/perfumes', perfumeRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(async () => {
    console.log('✅ Connected to MongoDB');

    // ✅ Fetch data and log to console after connection
    try {
        const perfumes = await Perfume.find();
        console.log('📦 Perfumes in MongoDB:');
        console.log(perfumes);
    } catch (err) {
        console.error('❌ Error fetching perfumes:', err);
    }
})
.catch(err => console.error('❌ Could not connect to MongoDB:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
