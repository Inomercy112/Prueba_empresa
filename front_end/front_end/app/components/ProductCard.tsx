'use client';
import React from "react";
import { useCart } from './CartContext';

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  state: boolean;
  image?: string;
};

type Props = {
  product: Product;
  onAdd?: (id: number) => void;
};

export default function ProductCard({ product, onAdd }: Props) {
  const { addItem } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP'
    }).format(price);
  };

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
  };

  return (
    <article className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 flex flex-col">
      <div className="flex-1 flex items-center justify-center">
        {product.image ? (
          <img 
            src={`data:image/jpeg;base64,${product.image}`} 
            alt={product.name} 
            className="h-24 w-24 object-cover rounded-md" 
          />
        ) : (
          <div className="h-24 w-24 bg-gray-100 rounded-md flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>
      <h3 className="mt-4 text-sm font-medium text-gray-900">{product.name}</h3>
      <p className="mt-1 text-xs text-gray-500 line-clamp-2">{product.description}</p>
      <div className="mt-2 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-lg font-semibold text-green-600">{formatPrice(product.price)}</span>
          <span className="text-xs text-gray-500">Stock: {product.stock}</span>
        </div>
        {product.stock > 0 && (
          <button
            onClick={handleAddToCart}
            className="ml-4 inline-flex items-center gap-2 rounded-md bg-green-600 text-white px-3 py-1.5 text-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Agregar
          </button>
        )}
        {product.stock === 0 && (
          <span className="ml-4 text-xs text-red-600 font-medium">Sin stock</span>
        )}
      </div>
    </article>
  );
}
