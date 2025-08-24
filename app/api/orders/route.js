import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';

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
    const client = await clientPromise;
    console.log('MongoDB connected successfully');
    
    const db = client.db('qr-app');
    const collection = db.collection('orders');

    const order = {
      product,
      user,
      payment: {
        cardNumber: payment.cardNumber ? payment.cardNumber.slice(-4) : '****', // Only store last 4 digits
        expiryDate: payment.expiryDate || '',
        cvv: '***' // Don't store actual CVV
      },
      total: parseFloat(total),
      orderDate: orderDate || new Date(),
      status: 'pending',
      createdAt: new Date()
    };

    console.log('Order object to insert:', order);
    
    const result = await collection.insertOne(order);
    console.log('Order inserted successfully:', result);

    return NextResponse.json({ 
      success: true, 
      orderId: result.insertedId,
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
    
    const client = await clientPromise;
    const db = client.db('qr-app');
    const collection = db.collection('orders');

    const orders = await collection.find({}).sort({ createdAt: -1 }).toArray();
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
