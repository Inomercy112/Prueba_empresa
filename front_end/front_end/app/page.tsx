'use client';
import React, { useState } from "react";
import { useCart } from './components/CartContext';
import Header from './components/Header';
import ProductList from './components/ProductList';
import SearchBar from './components/SearchBar';

export default function HomePage() {
  const [search, setSearch] = useState('');
  const { addItem } = useCart();

  function handleAdd(productId: number) {
    // Esta función se llamará desde ProductCard cuando se agregue al carrito
    // El ProductCard ya maneja la lógica de agregar al carrito usando useCart
    console.log('Producto agregado al carrito:', productId);
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Header />

      <section className="w-full max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mt-8">
          <SearchBar value={search} onChange={setSearch} />
        </div>

        <div className="mt-8">
          <ProductList searchQuery={search} onAdd={handleAdd} />
        </div>
      </section>
    </main>
  );
}
