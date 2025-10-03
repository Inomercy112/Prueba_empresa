import { NextResponse } from 'next/server';
import { USERS } from '../../users';

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ ok: false, message: 'Faltan campos' }, { status: 400 });
    }

    if (typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json({ ok: false, message: 'El nombre es obligatorio' }, { status: 400 });
    }

    if (typeof email !== 'string' || typeof password !== 'string') {
      return NextResponse.json({ ok: false, message: 'Datos inválidos' }, { status: 400 });
    }

    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return NextResponse.json({ ok: false, message: 'Email inválido' }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ ok: false, message: 'La contraseña debe tener al menos 6 caracteres' }, { status: 400 });
    }

    const exists = USERS.find((u) => u.email === email);
    if (exists) {
      return NextResponse.json({ ok: false, message: 'El email ya está registrado' }, { status: 409 });
    }

    USERS.push({ name, email, password });
    return NextResponse.json({ ok: true, message: 'Usuario registrado correctamente' });
  } catch (err) {
    return NextResponse.json({ ok: false, message: 'Error en el servidor' }, { status: 500 });
  }
}
