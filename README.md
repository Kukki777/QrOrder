# QR Product App

A Next.js application with product popup, user info form, payment processing, and MongoDB integration.

## Features

- **Product Selection**: Popup showing product details and quantity selection
- **User Information**: Form to collect customer details
- **Payment Processing**: Credit card information collection
- **Database Storage**: MongoDB integration to store orders
- **Admin Dashboard**: View and manage all orders

## Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **MongoDB Setup**
   - Install MongoDB locally or use MongoDB Atlas
   - Create a database named `qr-app`
   - Set environment variable in `.env.local`:
     ```
     MONGODB_URI=mongodb://localhost:27017/qr-app
     ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Access Application**
   - Main app: http://localhost:3000
   - Admin dashboard: http://localhost:3000/admin

## Database Schema

The application uses MongoDB with the following schema:

```javascript
Order {
  product: {
    name: String,
    price: Number,
    quantity: Number
  },
  user: {
    name: String,
    email: String,
    phone: String,
    address: String
  },
  payment: {
    cardNumber: String, // Last 4 digits only
    expiryDate: String,
    cvv: String // Always "***"
  },
  total: Number,
  orderDate: Date,
  status: String, // pending, processing, completed, cancelled
  createdAt: Date,
  updatedAt: Date
}
```

## API Routes

- `POST /api/orders` - Create new order
- `GET /api/orders` - Get all orders
- `PATCH /api/orders/[id]` - Update order status

## Security Features

- Credit card CVV is never stored
- Only last 4 digits of card number are stored
- Input validation on all forms
- Secure MongoDB connection
