const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const bookRoutes = require('./routes/bookRoutes');
const app = express();
app.use(cors());
app.use(express.json());
app.use('/books', bookRoutes);
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ success:false, error:'Internal Server Error' });
});
const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGODB_URI)
.then(()=>{ console.log('MongoDB connected'); app.listen(PORT, ()=>console.log(`Server running on port ${PORT}`)); })
.catch(err=>console.error('Mongo connection error', err));
