"use client";
import Link from 'next/link';
import React from "react";
import LoginForm from '../../components/LoginForm';
export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <LoginForm />
      <div className="mt-4 text-center">
        <span className="text-gray-600">¿No tienes cuenta?</span>{' '}
        <Link href="/shop/register" className="text-green-600 hover:underline">Regístrate</Link>
      </div>
    </div>
  );
}
