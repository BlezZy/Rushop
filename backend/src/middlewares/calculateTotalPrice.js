const totalPrice = (schema) => {
    schema.pre('save', function (next) {
        this.totalPrice = this.items.reduce((total, item) => total + (item.quantity * item.price), 0);
        next()
    })
}

module.exports = totalPrice