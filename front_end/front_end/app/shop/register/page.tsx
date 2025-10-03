import Link from 'next/link';
import React from "react";
import RegisterForm from '../../components/RegisterForm';

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <RegisterForm />
      <div className="mt-4 text-center">
        <span className="text-gray-600">¿Ya tienes cuenta?</span>{' '}
        <Link href="/shop/login" className="text-green-700 hover:underline">Inicia sesión</Link>
      </div>
    </div>
  );
}
