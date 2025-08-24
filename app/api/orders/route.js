
import { NextResponse } from 'next/server';
import connectdb from '@/lib/mongodb';
import Order from '@/models/Order';

export async function POST(request) {
  try {
    console.log('API route called - POST /api/orders');
    
    const body = await request.json();
    console.log('Request body:', body);
    
    const { product, user, payment, total, orderDate } = body;

    // Validate required fields
    if (!product || !user || !payment || !total) {
      console.error('Missing required fields:', { product, user, payment, total });
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    console.log('Connecting to MongoDB...');
    await connectdb();
    console.log('MongoDB connected successfully');
    
    const orderData = {
      product,
      user,
      payment: {
        cardNumber: payment.cardNumber ? payment.cardNumber.slice(-4) : '****',
        expiryDate: payment.expiryDate || '',
        cvv: '***'
      },
      total: parseFloat(total),
      orderDate: orderDate || new Date(),
      status: 'pending',
      createdAt: new Date()
    };

    console.log('Order object to insert:', orderData);
    
    const order = new Order(orderData);
    const result = await order.save();
    console.log('Order inserted successfully:', result);

    return NextResponse.json({
      success: true,
      orderId: result._id,
      message: 'Order created successfully'
    });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create order' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    console.log('API route called - GET /api/orders');
    
    await connectdb();
    
    const orders = await Order.find({});
    console.log('Orders fetched successfully:', orders.length);

    return NextResponse.json({
      success: true,
      orders
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}