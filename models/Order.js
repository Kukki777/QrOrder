import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  product: {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true }
  },
  user: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true }
  },
  payment: {
    cardNumber: { type: String, required: true }, // Last 4 digits only
    expiryDate: { type: String, required: true },
    cvv: { type: String, default: '***' } // Never store actual CVV
  },
  total: { type: Number, required: true },
  orderDate: { type: Date, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'processing', 'completed', 'cancelled'], 
    default: 'pending' 
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
