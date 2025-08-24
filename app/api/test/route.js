import { NextResponse } from 'next/server';
import clientPromise from '../../lib/mongodb';

export async function GET() {
  try {
    console.log('Testing MongoDB connection...');
    
    const client = await clientPromise;
    console.log('MongoDB connected successfully');
    
    const db = client.db('qr-app');
    const collections = await db.listCollections().toArray();
    
    console.log('Available collections:', collections.map(c => c.name));
    
    return NextResponse.json({ 
      success: true, 
      message: 'MongoDB connection successful',
      collections: collections.map(c => c.name)
    });

  } catch (error) {
    console.error('MongoDB connection error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
