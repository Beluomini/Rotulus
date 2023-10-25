require('dotenv').config();

import "reflect-metadata";
import express from 'express';

const app = express();

app.listen(process.env.BACKEND_PORT, () => {
    console.log(`Server running on port ${process.env.BACKEND_PORT}`);
});