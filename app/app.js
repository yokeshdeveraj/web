const express = require('express');
const authRoutes = require('./routes/authRoutes');
const postsRoutes = require('./routes/postsRoutes');
const commentsRoutes = require('./routes/commentsRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', authRoutes);
app.use('/api', postsRoutes);
app.use('/api', commentsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
