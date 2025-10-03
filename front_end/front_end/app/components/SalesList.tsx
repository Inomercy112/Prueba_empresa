'use client';
import React, { useEffect, useState } from 'react';

interface ProductSale {
  id: number;
  quantity: number;
  product: {
    id: number;
    name: string;
    price: number;
    image?: string;
  };
}

interface Sale {
  id: number;
  totalAmount: number;
  itemCount: number;
  person: {
    id: number;
    name: string;
    email: string | null;
    documentNumber: string | null;
  };
  date: string | null;
  state: boolean;
  productSales: ProductSale[];
}

export default function SalesList() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8080/sales/get/all', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setSales(data.data || data);
      } else {
        setError('Error al cargar las ventas');
      }
    } catch (err) {
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP'
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTotalItems = (productSales: ProductSale[]) => {
    return productSales.reduce((total, item) => total + item.quantity, 0);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-green-600">Cargando ventas...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Gestión de Ventas</h2>
        <p className="text-gray-600">{sales.length} ventas registradas</p>
      </div>

      {sales.length === 0 ? (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No hay ventas</h3>
          <p className="mt-1 text-sm text-gray-500">Aún no se han registrado ventas en el sistema.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {sales.map((sale) => (
            <div key={sale.id} className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Venta #{sale.id}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Cliente: {sale.person.name}
                    </p>
                    {sale.person.email && (
                      <p className="text-sm text-gray-600">
                        Email: {sale.person.email}
                      </p>
                    )}
                    {sale.person.documentNumber && (
                      <p className="text-sm text-gray-600">
                        Documento: {sale.person.documentNumber}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-600">
                      {formatPrice(sale.totalAmount)}
                    </p>
                    {sale.date && (
                      <p className="text-sm text-gray-500">
                        {formatDate(sale.date)}
                      </p>
                    )}
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      sale.state
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {sale.state ? 'Activa' : 'Cancelada'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="px-6 py-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium text-gray-900">Productos vendidos</h4>
                  <span className="text-sm text-gray-500">
                    {getTotalItems(sale.productSales)} {getTotalItems(sale.productSales) === 1 ? 'producto' : 'productos'}
                  </span>
                </div>
                
                <div className="space-y-3">
                  {sale.productSales.map((productSale) => (
                    <div key={productSale.id} className="flex items-center space-x-4 bg-gray-50 rounded-lg p-3">
                      <div className="w-16 h-16 flex-shrink-0">
                        {productSale.product.image ? (
                          <img
                            src={`data:image/jpeg;base64,${productSale.product.image}`}
                            alt={productSale.product.name}
                            className="w-16 h-16 object-cover rounded-md"
                          />
                        ) : (
                          <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center">
                            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <h5 className="font-medium text-gray-900">{productSale.product.name}</h5>
                        <p className="text-sm text-gray-600">
                          Cantidad: {productSale.quantity} × {formatPrice(productSale.product.price)}
                        </p>
                      </div>
                      
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          {formatPrice(productSale.quantity * productSale.product.price)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}