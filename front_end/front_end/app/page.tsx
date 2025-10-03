'use client';
import React, { useMemo, useState } from "react";
import Header from './components/Header';
import ProductList from './components/ProductList';
import SearchBar from './components/SearchBar';

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
};

const PRODUCTS: Product[] = [
  { id: '1', name: 'Manzanas orgánicas', price: 2.5, image: '/file.svg' },
  { id: '2', name: 'Pan integral', price: 1.75, image: '/next.svg' },
  { id: '3', name: 'Leche vegetal', price: 3.0, image: '/vercel.svg' },
  { id: '4', name: 'Granola casera', price: 4.25, image: '/window.svg' },
  { id: '5', name: 'Yogur natural', price: 2.0, image: '/globe.svg' },
];

export default function HomePage() {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return PRODUCTS;
    return PRODUCTS.filter((p) => p.name.toLowerCase().includes(q));
  }, [search]);

  function handleAdd(productId: string) {
    // placeholder: en un app real aquí añadirías al carrito
    console.log('Agregar al carrito:', productId);
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Header />

      <section className="w-full max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mt-8">
          <SearchBar value={search} onChange={setSearch} />
        </div>

        <div className="mt-8">
          <ProductList products={filtered} onAdd={handleAdd} />
        </div>
      </section>
    </main>
  );
}
