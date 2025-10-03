'use client';
import React, { useState } from 'react';
import { useCart } from './CartContext';
import CartModal from './CartModal';

export default function CartIcon() {
  const { getTotalItems } = useCart();
  const [showCart, setShowCart] = useState(false);
  const totalItems = getTotalItems();

  return (
    <>
      <div className="relative">
        <button
          onClick={() => setShowCart(true)}
          className="relative p-2 text-gray-600 hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 rounded-md"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h8" />
          </svg>
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {totalItems > 99 ? '99+' : totalItems}
            </span>
          )}
        </button>
      </div>
      
      <CartModal 
        isOpen={showCart} 
        onClose={() => setShowCart(false)} 
      />
    </>
  );
}