import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Button from './Button';
import TextInput from './TextInput';

export default function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ username?: string; password?: string; form?: string }>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  function validate() {
    const e: typeof errors = {};
    if (!username.trim()) e.username = 'El nombre de usuario es obligatorio';
    if (!password || password.length < 6) e.password = 'La contraseña debe tener al menos 6 caracteres';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSuccess(null);
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      
      // Verificar si la respuesta es exitosa (status 201)
      if (res.ok && data.status === 201) {
        // Guardar el token y datos del usuario en localStorage
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('user', JSON.stringify(data.data.user));
        
        setSuccess(data.message || 'Inicio de sesión correcto. Redirigiendo...');
        
        // Redirigir según el rol del usuario
        const userRole = data.data.user.role.name;
        if (userRole === 'admin') {
          setTimeout(() => router.push('/admin'), 700);
        } else {
          setTimeout(() => router.push('/'), 700);
        }
      } else {
        setErrors((prev) => ({ ...prev, form: data?.message || 'Credenciales inválidas' }));
      }
    } catch (err) {
      setErrors((prev) => ({ ...prev, form: 'Error de conexión con el servidor' }));
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md w-full bg-white p-6 rounded-lg shadow-md border border-green-300">
      <h2 className="text-2xl font-semibold mb-4 text-green-700">Iniciar sesión</h2>
      {errors.form && <p className="text-sm text-green-800 mb-3 bg-green-50 p-2 rounded border border-green-200">{errors.form}</p>}
      {success && <p className="text-sm text-green-600 mb-3 bg-green-50 p-2 rounded border border-green-200">{success}</p>}
      <TextInput label="Nombre de usuario" name="username" value={username} onChange={setUsername} error={errors.username} />
      <TextInput label="Contraseña" name="password" type="password" value={password} onChange={setPassword} error={errors.password} />
      <div className="mt-4">
        <Button type="submit" disabled={loading}>{loading ? 'Ingresando...' : 'Ingresar'}</Button>
      </div>
    </form>
  );
}
