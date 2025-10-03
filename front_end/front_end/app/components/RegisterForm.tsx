"use client";
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Button from './Button';
import TextInput from './TextInput';

export default function RegisterForm() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{ username?: string; password?: string; confirmPassword?: string; form?: string }>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  function validate() {
    const e: typeof errors = {};
    if (!username.trim()) e.username = 'El nombre de usuario es obligatorio';
    if (!password || password.length < 6) e.password = 'La contraseña debe tener al menos 6 caracteres';
    if (!confirmPassword) e.confirmPassword = 'Debes confirmar la contraseña';
    if (password && confirmPassword && password !== confirmPassword) e.confirmPassword = 'Las contraseñas no coinciden';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSuccess(null);
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8080/users/add/person', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      
      // Verificar si la respuesta es exitosa (status 201)
      if (res.ok && data.status === 201) {
        setSuccess(data.message || 'Usuario registrado correctamente. Redirigiendo a login...');
        setTimeout(() => router.push('/shop/login'), 1200);
      } else {
        setErrors((prev) => ({ ...prev, form: data?.message || 'Error al registrar usuario' }));
      }
    } catch (err) {
      setErrors((prev) => ({ ...prev, form: 'Error de conexión con el servidor' }));
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md w-full bg-white p-6 rounded-lg shadow-md border border-green-300">
      <h2 className="text-2xl font-semibold mb-4 text-green-700">Registro</h2>
      {errors.form && <p className="text-sm text-green-800 mb-3 bg-green-50 p-2 rounded border border-green-200">{errors.form}</p>}
      {success && <p className="text-sm text-green-600 mb-3 bg-green-50 p-2 rounded border border-green-200">{success}</p>}
      <TextInput label="Nombre de usuario" name="username" value={username} onChange={setUsername} error={errors.username} />
      <TextInput label="Contraseña" name="password" type="password" value={password} onChange={setPassword} error={errors.password} />
      <TextInput label="Confirmar contraseña" name="confirmPassword" type="password" value={confirmPassword} onChange={setConfirmPassword} error={errors.confirmPassword} />
      <div className="mt-4">
        <Button type="submit" disabled={loading}>{loading ? 'Registrando...' : 'Registrarse'}</Button>
      </div>
    </form>
  );
}
