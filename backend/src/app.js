const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/db')
const ProductsRoutes = require('./routes/ProductsRoutes')
const CategoriesRoutes = require('./routes/CategoriesRoutes')
const OrdersRoutes = require('./routes/OrdersRoutes')
const AuthRoutes = require('./routes/AuthRoutes')
const UsersRoutes = require('./routes/UsersRoutes')
const app = express();
const port = 5000;

app.use(cors());
app.use(helmet({
    hsts: false,
}));
app.use(morgan('dev'));
app.use(express.json())

connectDB()

app.use('/api/products', ProductsRoutes)
app.use('/api/categories', CategoriesRoutes)
app.use('/api/orders', OrdersRoutes)
app.use('/auth', AuthRoutes)
app.use('/users', UsersRoutes)


app.listen(port, () => {
    console.log(`Server działa na porcie: ${port}`)
})