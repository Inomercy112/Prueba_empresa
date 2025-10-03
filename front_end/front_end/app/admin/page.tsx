'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import ProductListAdmin from '../components/ProductListAdmin';
import SalesList from '../components/SalesList';
import UserList from '../components/UserList';

interface User {
  id: number;
  username: string;
  role: {
    name: string;
  };
  person: {
    name: string;
  };
}

export default function AdminPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'products' | 'sales'>('overview');

  useEffect(() => {
    // Verificar si hay usuario logueado y si es admin
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/shop/login');
      return;
    }

    const parsedUser = JSON.parse(userData);
    if (parsedUser.role.name !== 'admin') {
      router.push('/');
      return;
    }

    setUser(parsedUser);
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-green-600">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-green-700 mb-6">Panel de Administrador</h1>
          
          {/* Navegación por pestañas */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'overview'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Resumen
              </button>
              <button
                onClick={() => setActiveTab('users')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'users'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Usuarios
              </button>
              <button
                onClick={() => setActiveTab('products')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'products'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Productos
              </button>
              <button
                onClick={() => setActiveTab('sales')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'sales'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Ventas
              </button>
            </nav>
          </div>

          {/* Contenido según la pestaña activa */}
          {activeTab === 'overview' && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div 
                  className="bg-green-50 border border-green-200 rounded-lg p-4 cursor-pointer hover:bg-green-100 transition-colors"
                  onClick={() => setActiveTab('users')}
                >
                  <h3 className="text-lg font-semibold text-green-700 mb-2">Usuarios</h3>
                  <p className="text-green-600">Gestionar usuarios del sistema</p>
                </div>
                <div 
                  className="bg-green-50 border border-green-200 rounded-lg p-4 cursor-pointer hover:bg-green-100 transition-colors"
                  onClick={() => setActiveTab('products')}
                >
                  <h3 className="text-lg font-semibold text-green-700 mb-2">Productos</h3>
                  <p className="text-green-600">Administrar inventario de productos</p>
                </div>
                <div 
                  className="bg-green-50 border border-green-200 rounded-lg p-4 cursor-pointer hover:bg-green-100 transition-colors"
                  onClick={() => setActiveTab('sales')}
                >
                  <h3 className="text-lg font-semibold text-green-700 mb-2">Ventas</h3>
                  <p className="text-green-600">Ver todas las ventas realizadas</p>
                </div>
              </div>

              <div className="border-t pt-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Bienvenido, {user?.person?.name || user?.username}
                </h2>
                <p className="text-gray-600">
                  Has iniciado sesión como administrador. Desde aquí puedes gestionar todos los aspectos de la tienda.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'users' && <UserList />}
          {activeTab === 'products' && <ProductListAdmin />}
          {activeTab === 'sales' && <SalesList />}
        </div>
      </main>
    </div>
  );
}