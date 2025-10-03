'use client';

import React, { useEffect, useState } from "react";
import ProductCard from './ProductCard';

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
  onAdd?: (id: number) => void;
};

export default function ProductList({ onAdd }: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:8080/products/get/all', {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        // Filtrar solo productos activos para mostrar al público
        const activeProducts = (data.data || data).filter((product: Product) => product.state === true);
        setProducts(activeProducts);
      } else {
        setError('Error al cargar productos');
      }
    } catch (err) {
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-12 text-center">
        <div className="text-green-600">Cargando productos...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12 text-center">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="py-12 text-center text-gray-500">
        No hay productos disponibles.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          onAdd={onAdd ? () => onAdd(product.id) : undefined} 
        />
      ))}
    </div>
  );
}
