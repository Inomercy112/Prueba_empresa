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
  searchQuery?: string;
};

export default function ProductList({ onAdd, searchQuery = '' }: Props) {
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

  // Filtrar productos basado en la búsqueda
  const filteredProducts = React.useMemo(() => {
    if (!searchQuery.trim()) {
      return products;
    }
    
    const query = searchQuery.trim().toLowerCase();
    return products.filter(product => 
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)
    );
  }, [products, searchQuery]);

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

  if (filteredProducts.length === 0 && searchQuery.trim()) {
    return (
      <div className="py-12 text-center text-gray-500">
        <div className="text-lg mb-2">No se encontraron productos</div>
        <div className="text-sm">
          No hay productos que coincidan con "{searchQuery}"
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {filteredProducts.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          onAdd={onAdd ? () => onAdd(product.id) : undefined} 
        />
      ))}
    </div>
  );
}
