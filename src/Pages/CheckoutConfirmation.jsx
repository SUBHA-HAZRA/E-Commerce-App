import React, { useState, useEffect } from 'react';
import { Check, Package, Truck, CreditCard } from 'lucide-react';

const CheckoutConfirmation = ({ 
  orderData: propOrderData, 
  onContinueShopping, 
  onViewCart 
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  // Use passed order data or fallback to sample data
  const orderData = {
    orderNumber: 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
    total: propOrderData?.total || 129.97,
    subtotal: propOrderData?.subtotal || 119.98,
    shipping: propOrderData?.shipping || 9.99,
    items: propOrderData?.itemCount || 3,
    estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  };

  const steps = [
    { icon: CreditCard, text: 'Processing Payment', color: 'text-blue-500' },
    { icon: Package, text: 'Preparing Order', color: 'text-orange-500' },
    { icon: Truck, text: 'Order Confirmed', color: 'text-green-500' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < steps.length - 1) {
          return prev + 1;
        } else {
          setIsComplete(true);
          clearInterval(timer);
          return prev;
        }
      });
    }, 1500);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4 sm:p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
        {/* Header with animated checkmark */}
        <div className="text-center mb-8">
          <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 transition-all duration-1000 ${
            isComplete ? 'bg-green-500 scale-110' : 'bg-gray-300 scale-100'
          }`}>
            <Check className={`w-10 h-10 text-white transition-all duration-500 ${
              isComplete ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
            }`} />
          </div>
          <h1 className={`text-4xl font-bold transition-all duration-1000 ${
            isComplete ? 'text-green-600' : 'text-gray-600'
          }`}>
            {isComplete ? 'Order Confirmed!' : 'Processing Your Order...'}
          </h1>
        </div>

        {/* Progress Steps */}
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-8 mb-8">
          <div className="relative flex justify-between items-center mb-8">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = index <= currentStep;
              const isCompleted = index < currentStep || isComplete;
              
              return (
                <div key={index} className="flex flex-col items-center flex-1 relative z-10">
                  <div className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                    isActive ? (
                      index === 0 ? 'bg-blue-100 text-blue-500' :
                      index === 1 ? 'bg-orange-100 text-orange-500' :
                      'bg-green-100 text-green-500'
                    ) : 'bg-gray-100 text-gray-400'
                  }`}>
                    <StepIcon className={`w-6 h-6 transition-all duration-500 ${
                      isActive ? 'scale-110' : 'scale-100'
                    }`} />
                    {isCompleted && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                  <p className={`mt-2 text-xs sm:text-sm font-medium text-center transition-all duration-500 ${
                    isActive ? 'text-gray-800' : 'text-gray-500'
                  }`}>
                    {step.text}
                  </p>
                </div>
              );
            })}
            
            {/* Connection lines between steps */}
            <div className="absolute top-6 left-0 right-0 h-0.5 bg-gray-300 -z-10">
              <div 
                className="h-full bg-green-500 transition-all duration-1000 ease-out"
                style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
              />
            </div>
          </div>

          {/* Animated progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
            <div 
              className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Order Details with slide-in animation */}
        <div className={`bg-white rounded-lg shadow-lg p-8 transform transition-all duration-1000 ${
          isComplete ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-70'
        }`}>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Details</h2>
          
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Order Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Order Number:</span>
                  <span className="font-medium text-gray-800 text-sm">{orderData.orderNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Items:</span>
                  <span className="font-medium text-gray-800">{orderData.items} items</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium text-gray-800">${orderData.subtotal.toFixed(2)}</span>
                </div>
                <hr className="border-gray-200" />
                <div className="flex justify-between">
                  <span className="text-gray-600 text-lg font-semibold">Total Amount:</span>
                  <span className="font-bold text-green-600 text-xl">${orderData.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Delivery Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Estimated Delivery:</span>
                  <span className="font-medium text-gray-800">{orderData.estimatedDelivery}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping Method:</span>
                  <span className="font-medium text-gray-800">Standard Shipping</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className="font-medium text-green-600">Confirmed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Animated success message */}
          <div className={`mt-8 p-4 bg-green-50 border border-green-200 rounded-lg transition-all duration-1000 ${
            isComplete ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}>
            <div className="flex items-center">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3">
                <Check className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-green-800 font-medium">Thank you for your order!</p>
                <p className="text-green-600 text-sm">We'll send you a confirmation email shortly with tracking details.</p>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button 
              onClick={onContinueShopping || (() => window.location.href = '/')}
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition duration-200 font-medium"
            >
              Continue Shopping
            </button>
            <button 
              onClick={onViewCart || (() => window.location.href = '/Cart')}
              className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-md hover:bg-gray-50 transition duration-200 font-medium"
            >
              View Cart
            </button>
          </div>
        </div>

        {/* Floating particles animation */}
        {isComplete && (
          <div className="fixed inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-green-400 rounded-full animate-ping"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutConfirmation;