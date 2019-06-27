/*
This file was created only for deployment on Heroku because you can not run Angular project without any server
 */

const express = require('express');
const path = require('path');
const app = express();

// setting static files
app.use(express.static(path.join(__dirname, 'dist')));

// setting default router for static files
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// starting the server
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`The frontend server is started on the port ${port}`);
});
