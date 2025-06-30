const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express');
const yaml = require('yamljs');
const swaggerDocs = yaml.load('swagger.yaml');

const app = express();

// ✅ CORS en premier, et bien configuré
app.use(cors({
  origin: 'https://astalek1.github.io'
}));
console.log('✅ CORS autorisé pour GitHub Pages');

// ✅ Ensuite : les middlewares globaux
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet({
  crossOriginResourcePolicy: false,
}));

// ✅ Puis les fichiers statiques
app.use('/images', express.static(path.join(__dirname, 'images')));

// ✅ Puis la DB et les routes
const db = require("./models");
db.sequelize.sync().then(() => console.log('db is ready'));

const userRoutes = require('./routes/user.routes');
const categoriesRoutes = require('./routes/categories.routes');
const worksRoutes = require('./routes/works.routes');

app.use('/api/users', userRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/works', worksRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// ✅ Export de l’app
module.exports = app;