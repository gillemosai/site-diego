// app/api/auth/cadastro/route.js
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-mude-em-producao-123';

export async function POST(request) {
  try {
    const { nome, email, telefone, senha } = await request.json();

    if (!nome || !email || !senha) {
      return NextResponse.json({ erro: 'Nome, e-mail e senha são obrigatórios' }, { status: 400 });
    }

    if (senha.length < 6) {
      return NextResponse.json({ erro: 'A senha deve ter pelo menos 6 caracteres' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ erro: 'E-mail inválido' }, { status: 400 });
    }

    // Em produção: verificar se e-mail já existe no banco
    // const { rows: existe } = await query('SELECT id FROM usuarios WHERE email = $1', [email]);
    // if (existe.length > 0) return NextResponse.json({ erro: 'E-mail já cadastrado' }, { status: 409 });

    const senhaHash = await bcrypt.hash(senha, 12);

    // Em produção: inserir no banco
    // const { rows } = await query(
    //   'INSERT INTO usuarios (nome, email, telefone, senha_hash) VALUES ($1,$2,$3,$4) RETURNING id, nome, email, telefone',
    //   [nome, email, telefone, senhaHash]
    // );
    // const usuario = rows[0];

    // Simulação para desenvolvimento local
    const usuario = {
      id: Date.now(),
      nome,
      email,
      telefone: telefone || '',
    };

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return NextResponse.json({
      token,
      usuario,
      mensagem: 'Cadastro realizado com sucesso!',
    }, { status: 201 });

  } catch (err) {
    console.error('Erro no cadastro:', err);
    return NextResponse.json({ erro: 'Erro interno do servidor' }, { status: 500 });
  }
}
