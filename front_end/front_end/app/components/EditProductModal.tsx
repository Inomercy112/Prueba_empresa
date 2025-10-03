'use client';
import React, { useEffect, useState } from 'react';
import AlertService from './AlertService';
import Button from './Button';
import TextInput from './TextInput';

interface EditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProductUpdated: () => void;
  product: Product | null;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  state: boolean;
  image?: string; // Base64 de la imagen
}

interface ProductForm {
  name: string;
  description: string;
  price: string;
  stock: string;
  image: string; // Base64 de la imagen
}

interface FormErrors {
  name?: string;
  description?: string;
  price?: string;
  stock?: string;
  image?: string;
  form?: string;
}

export default function EditProductModal({ isOpen, onClose, onProductUpdated, product }: EditProductModalProps) {
  const [formData, setFormData] = useState<ProductForm>({
    name: '',
    description: '',
    price: '',
    stock: '',
    image: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  // Cargar datos del producto cuando se abre el modal
  useEffect(() => {
    if (product && isOpen) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        stock: product.stock.toString(),
        image: ''
      });
      setErrors({});
    }
  }, [product, isOpen]);

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      stock: '',
      image: ''
    });
    setErrors({});
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre del producto es obligatorio';
    } else if (formData.name.length < 2) {
      newErrors.name = 'El nombre debe tener al menos 2 caracteres';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'La descripción es obligatoria';
    } else if (formData.description.length < 10) {
      newErrors.description = 'La descripción debe tener al menos 10 caracteres';
    }

    const price = parseFloat(formData.price);
    if (!formData.price || isNaN(price) || price <= 0) {
      newErrors.price = 'El precio debe ser un número válido mayor a 0';
    }

    const stock = parseInt(formData.stock);
    if (!formData.stock || isNaN(stock) || stock < 0) {
      newErrors.stock = 'El stock debe ser un número válido mayor o igual a 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate() || !product) return;

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      
      const requestBody: any = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock)
      };

      // Solo incluir la imagen si se seleccionó una
      if (formData.image) {
        requestBody.image = formData.image;
      }

      const response = await fetch(`http://localhost:8080/products/edit/${product.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (response.ok) {
        AlertService.success('¡Producto actualizado!', data.message || 'El producto se actualizó correctamente');
        handleClose();
        onProductUpdated();
      } else {
        setErrors({ form: data?.message || 'Error al actualizar el producto' });
      }
    } catch (err) {
      setErrors({ form: 'Error de conexión con el servidor' });
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (value: string) => {
    // Remover caracteres no numéricos excepto punto
    const cleanValue = value.replace(/[^\d.]/g, '');
    return cleanValue;
  };

  const formatStock = (value: string) => {
    // Solo números enteros
    const cleanValue = value.replace(/[^\d]/g, '');
    return cleanValue;
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar tipo de archivo
    if (!file.type.startsWith('image/')) {
      setErrors({ ...errors, image: 'Solo se permiten archivos de imagen' });
      return;
    }

    // Validar tamaño (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrors({ ...errors, image: 'La imagen debe ser menor a 5MB' });
      return;
    }

    try {
      const base64 = await convertToBase64(file);
      setFormData({ ...formData, image: base64 });
      setErrors({ ...errors, image: undefined });
    } catch (error) {
      setErrors({ ...errors, image: 'Error al procesar la imagen' });
    }
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        // Remover el prefijo "data:image/...;base64," para obtener solo el base64
        const base64 = result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = error => reject(error);
    });
  };

  const removeImage = () => {
    setFormData({ ...formData, image: '' });
    setErrors({ ...errors, image: undefined });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0  bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full mx-4">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-green-700">
              Editar Producto
            </h3>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {errors.form && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
              {errors.form}
            </div>
          )}

          <TextInput
            label="Nombre del producto"
            name="name"
            value={formData.name}
            onChange={(value) => setFormData({ ...formData, name: value })}
            error={errors.name}
            placeholder="Ingresa el nombre del producto"
          />

          <div className="mb-4">
            <label className="block text-sm font-medium text-green-700 mb-1">
              Descripción
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Ingresa la descripción del producto"
              rows={3}
              className="block w-full px-3 py-2 border border-green-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-green-600">{errors.description}</p>
            )}
          </div>

          <TextInput
            label="Precio (COP)"
            name="price"
            type="number"
            value={formData.price}
            onChange={(value) => setFormData({ ...formData, price: formatPrice(value) })}
            error={errors.price}
            placeholder="0.00"
          />

          <TextInput
            label="Stock (unidades)"
            name="stock"
            type="number"
            value={formData.stock}
            onChange={(value) => setFormData({ ...formData, stock: formatStock(value) })}
            error={errors.stock}
            placeholder="0"
          />

          {/* Campo de imagen */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-green-700 mb-1">
              Imagen del producto
            </label>
            <div className="border-2 border-dashed border-green-300 rounded-md p-4">
              {formData.image || product?.image ? (
                <div className="space-y-3">
                  <div className="relative">
                    <img
                      src={`data:image/jpeg;base64,${formData.image || product?.image}`}
                      alt="Vista previa"
                      className="w-full h-32 object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 focus:outline-none"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => document.getElementById('image-input')?.click()}
                    className="w-full px-3 py-2 text-sm text-green-700 bg-green-50 border border-green-300 rounded-md hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    Cambiar imagen
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="mt-2">
                    <button
                      type="button"
                      onClick={() => document.getElementById('image-input')?.click()}
                      className="px-3 py-2 text-sm text-green-700 bg-green-50 border border-green-300 rounded-md hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      Seleccionar imagen
                    </button>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    PNG, JPG, GIF hasta 5MB
                  </p>
                </div>
              )}
              <input
                id="image-input"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
            {errors.image && (
              <p className="mt-1 text-sm text-green-600">{errors.image}</p>
            )}
          </div>

          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Cancelar
            </button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Actualizando...' : 'Actualizar Producto'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}