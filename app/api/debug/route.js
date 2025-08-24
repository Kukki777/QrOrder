import { NextResponse } from 'next/server';
import clientPromise from '../../lib/mongodb';

export async function GET() {
  try {
    console.log('=== DEBUG API CALLED ===');
    
    const client = await clientPromise;
    console.log('✅ MongoDB connected successfully');
    
    // List all databases
    const adminDb = client.db('admin');
    const dbs = await adminDb.admin().listDatabases();
    console.log('📊 Available databases:', dbs.databases.map(db => db.name));
    
    // Check specific database
    const db = client.db('qr-app');
    console.log('🎯 Using database: qr-app');
    
    // List all collections
    const collections = await db.listCollections().toArray();
    console.log('📁 Collections in qr-app:', collections.map(c => c.name));
    
    // Check if orders collection exists and count documents
    if (collections.some(c => c.name === 'orders')) {
      const ordersCollection = db.collection('orders');
      const count = await ordersCollection.countDocuments();
      console.log('📦 Orders collection has', count, 'documents');
      
      // Get first few orders
      const sampleOrders = await ordersCollection.find({}).limit(3).toArray();
      console.log('🔍 Sample orders:', sampleOrders);
    } else {
      console.log('❌ Orders collection does not exist');
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Debug information collected',
      databases: dbs.databases.map(db => db.name),
      collections: collections.map(c => c.name),
      ordersCount: collections.some(c => c.name === 'orders') ? await db.collection('orders').countDocuments() : 0
    });

  } catch (error) {
    console.error('❌ Debug error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
