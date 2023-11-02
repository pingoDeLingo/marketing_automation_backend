const express = require('express');
const { sessionMiddleware, sessionHandler } = require('./middleware/session');
const authRoutes = require('./auth');  // Adjust the path based on your file tree

const app = express();

app.use(sessionMiddleware);
app.use(sessionHandler);

app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
