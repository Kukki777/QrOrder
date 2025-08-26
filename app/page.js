"use client";
import { useState } from "react";

export default function Home() {
  const [step, setStep] = useState(1);
  const [productData, setProductData] = useState({
    name: "Premium Product",
    price: 100,
    quantity: 1
  });
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: ""
  });

  const handleQuantityChange = (e) => {
    setProductData({...productData, quantity: parseInt(e.target.value)});
  };

  const handleUserInfoChange = (e) => {
    setUserInfo({...userInfo, [e.target.name]: e.target.value});
  };

  const handlePaymentChange = (e) => {
    setPaymentData({...paymentData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async () => {
    // Validate required fields
    if (!userInfo.name || !userInfo.email || !userInfo.phone || !userInfo.address) {
      alert('Please fill in all required fields');
      return;
    }

    if (!paymentData.cardNumber || !paymentData.expiryDate || !paymentData.cvv) {
      alert('Please fill in all payment details');
      return;
    }

    try {
      const orderData = {
        product: productData,
        user: userInfo,
        payment: paymentData,
        total: productData.price * productData.quantity,
        orderDate: new Date()
      };

      console.log('Submitting order:', orderData);

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();
      console.log('Order submission result:', result);

      if (response.ok && result.success) {
        alert('Order placed successfully! Order ID: ' + result.orderId);
        setStep(1);
        setProductData({...productData, quantity: 1});
        setUserInfo({name: "", email: "", phone: "", address: ""});
        setPaymentData({cardNumber: "", expiryDate: "", cvv: ""});
      } else {
        alert('Error placing order: ' + (result.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('Error placing order: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full border border-gray-100">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className={`text-sm font-medium ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>Product</span>
            <span className={`text-sm font-medium ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>Details</span>
            <span className={`text-sm font-medium ${step >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>Payment</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{width: `${(step/3)*100}%`}}></div>
          </div>
        </div>

        {step === 1 && (
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Product Selection</h2>
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-xl mb-6 text-white">
              <h3 className="text-xl font-semibold mb-2">{productData.name}</h3>
              <p className="text-4xl font-bold">Rs{productData.price}</p>
              <p className="text-blue-100 text-sm mt-1">Premium Quality</p>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3 text-left">
                Select Quantity
              </label>
              <select 
                value={productData.quantity} 
                onChange={handleQuantityChange}
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors text-gray-900"
              >
                {[1,2,3,4,5,6,7,8,9,10].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <p className="text-sm text-gray-600 mb-1">Total Amount</p>
              <p className="text-2xl font-bold text-gray-900">Rs{(productData.price * productData.quantity).toFixed(2)}</p>
            </div>
            <button 
              onClick={() => setStep(2)}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Continue to Details →
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">Personal Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={userInfo.name}
                  onChange={handleUserInfoChange}
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors text-gray-900"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={userInfo.email}
                  onChange={handleUserInfoChange}
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors text-gray-900"
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={userInfo.phone}
                  onChange={handleUserInfoChange}
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors text-gray-900"
                  placeholder="+1 (555) 123-4567"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Delivery Address</label>
                <textarea
                  name="address"
                  value={userInfo.address}
                  onChange={handleUserInfoChange}
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors text-gray-900"
                  rows="3"
                  placeholder="Enter your complete address"
                  required
                />
              </div>
            </div>
            <div className="flex gap-3 mt-8">
              <button 
                onClick={() => setStep(1)}
                className="flex-1 bg-gray-500 text-white py-3 px-4 rounded-lg hover:bg-gray-600 transition-colors font-semibold"
              >
                ← Back
              </button>
              <button 
                onClick={() => setStep(3)}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold"
              >
                Continue to Payment →
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">Payment Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Card Number</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={paymentData.cardNumber}
                  onChange={handlePaymentChange}
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors text-gray-900"
                  placeholder="1234 5678 9012 3456"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Expiry Date</label>
                  <input
                    type="text"
                    name="expiryDate"
                    value={paymentData.expiryDate}
                    onChange={handlePaymentChange}
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors text-gray-900"
                    placeholder="MM/YY"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">CVV</label>
                  <input
                    type="text"
                    name="cvv"
                    value={paymentData.cvv}
                    onChange={handlePaymentChange}
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors text-gray-900"
                    placeholder="123"
                    required
                  />
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg mt-6 border border-green-200">
              <p className="text-sm text-gray-600 mb-2">Order Summary:</p>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-gray-900">{productData.name} x {productData.quantity}</span>
                <span className="text-gray-600">Rs{(productData.price * productData.quantity).toFixed(2)}</span>
              </div>
              <div className="border-t border-green-200 pt-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-900">Total Amount</span>
                  <span className="text-2xl font-bold text-green-600">Rs{(productData.price * productData.quantity).toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 mt-8">
              <button 
                onClick={() => setStep(2)}
                className="flex-1 bg-gray-500 text-white py-3 px-4 rounded-lg hover:bg-gray-600 transition-colors font-semibold"
              >
                ← Back
              </button>
              <button 
                onClick={handleSubmit}
                className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 text-white py-4 px-6 rounded-lg hover:from-green-700 hover:to-blue-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Complete Order ✓
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
