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
const ShippingsRoutes = require('./routes/ShippingsRoutes')
const DiscountsRoutes = require('./routes/DiscountsRoutes')
const ReviewsRoutes = require('./routes/ReviewsRoutes')
const InventoryRoutes = require('./routes/InventoryRoutes')
const NotificationsRoutes = require('./routes/NotificationsRoutes')
const AdminRoutes = require('./routes/AdminRoutes')
const trimRequestBody = require('./middlewares/trimRequestBody');
const CartRoutes = require('./routes/CartRoutes');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json())
app.use(helmet({
    hsts: false,
}));
app.use(trimRequestBody)
app.use(morgan('dev'));


connectDB()

app.use('/api/products', ProductsRoutes)
app.use('/api/categories', CategoriesRoutes)
app.use('/api/orders', OrdersRoutes)
app.use('/auth', AuthRoutes)
app.use('/users', UsersRoutes)
app.use('/api/shippings', ShippingsRoutes)
app.use('/api/discounts', DiscountsRoutes)
app.use('/api/reviews', ReviewsRoutes)
app.use('/api/inventory', InventoryRoutes)
app.use('/api/notifications', NotificationsRoutes)
app.use('/api/carts', CartRoutes)
app.use('/api/admin', AdminRoutes)

app.listen(port, () => {
    console.log(`Server działa na porcie: ${port}`)
})