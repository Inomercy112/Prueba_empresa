'use client';
import React, { useState } from 'react';
import AlertService from './AlertService';
import Button from './Button';
import TextInput from './TextInput';

interface CreateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUserCreated: () => void;
}

interface NewUser {
  username: string;
  password: string;
  confirmPassword: string;
  roleId: number;
}

interface FormErrors {
  username?: string;
  password?: string;
  confirmPassword?: string;
  roleId?: string;
  form?: string;
}

export default function CreateUserModal({ isOpen, onClose, onUserCreated }: CreateUserModalProps) {
  const [newUser, setNewUser] = useState<NewUser>({
    username: '',
    password: '',
    confirmPassword: '',
    roleId: 1
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const roles = [
    { id: 1, name: 'Usuario' },
    { id: 2, name: 'Administrador' }
  ];

  const resetForm = () => {
    setNewUser({
      username: '',
      password: '',
      confirmPassword: '',
      roleId: 1
    });
    setErrors({});
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!newUser.username.trim()) {
      newErrors.username = 'El nombre de usuario es obligatorio';
    } else if (newUser.username.length < 3) {
      newErrors.username = 'El nombre de usuario debe tener al menos 3 caracteres';
    }

    if (!newUser.password) {
      newErrors.password = 'La contraseña es obligatoria';
    } else if (newUser.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    if (!newUser.confirmPassword) {
      newErrors.confirmPassword = 'Debes confirmar la contraseña';
    } else if (newUser.password !== newUser.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    if (!newUser.roleId) {
      newErrors.roleId = 'Debes seleccionar un rol';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8080/users/add/person', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: newUser.username,
          password: newUser.password,
          role: { id : newUser.roleId}
        }),
      });

      const data = await response.json();

      if (response.ok && data.status === 201) {
        AlertService.success('¡Usuario creado!', data.message || 'Usuario creado correctamente');
        handleClose();
        onUserCreated();
      } else {
        setErrors({ form: data?.message || 'Error al crear usuario' });
      }
    } catch (err) {
      setErrors({ form: 'Error de conexión con el servidor' });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0  backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-green-700">Crear Nuevo Usuario</h3>
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
            label="Nombre de usuario"
            name="username"
            value={newUser.username}
            onChange={(value) => setNewUser({ ...newUser, username: value })}
            error={errors.username}
            placeholder="Ingresa el nombre de usuario"
          />

          <TextInput
            label="Contraseña"
            name="password"
            type="password"
            value={newUser.password}
            onChange={(value) => setNewUser({ ...newUser, password: value })}
            error={errors.password}
            placeholder="Ingresa la contraseña"
          />

          <TextInput
            label="Confirmar contraseña"
            name="confirmPassword"
            type="password"
            value={newUser.confirmPassword}
            onChange={(value) => setNewUser({ ...newUser, confirmPassword: value })}
            error={errors.confirmPassword}
            placeholder="Confirma la contraseña"
          />

          <div className="mb-4">
            <label className="block text-sm font-medium text-green-700 mb-1">
              Rol del usuario
            </label>
            <select
              value={newUser.roleId}
              onChange={(e) => setNewUser({ ...newUser, roleId: parseInt(e.target.value) })}
              className="block w-full px-3 py-2 border border-green-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white"
            >
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
            {errors.roleId && (
              <p className="mt-1 text-sm text-green-600">{errors.roleId}</p>
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
              {loading ? 'Creando...' : 'Crear Usuario'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}