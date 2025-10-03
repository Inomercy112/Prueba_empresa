import { NextResponse } from 'next/server';
import { USERS } from '../../users';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ ok: false, message: 'Faltan campos' }, { status: 400 });
    }

    const user = USERS.find((u) => u.email === email);
    if (!user || user.password !== password) {
      return NextResponse.json({ ok: false, message: 'Credenciales inválidas' }, { status: 401 });
    }

    const token = Buffer.from(email).toString('base64');
    const res = NextResponse.json({ ok: true, message: 'Inicio de sesión correcto' });
    res.cookies.set('token', token, { httpOnly: true, path: '/', maxAge: 60 * 60 * 24 * 7 });
    return res;
  } catch (err) {
    return NextResponse.json({ ok: false, message: 'Error en el servidor' }, { status: 500 });
  }
}
