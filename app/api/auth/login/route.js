// app/api/auth/login/route.js
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-mude-em-producao-123';

// Usuário de demonstração para desenvolvimento local
const USUARIO_DEMO = {
  id: 1,
  nome: 'Diego Demo',
  email: 'demo@sitediego.com.br',
  senha_hash: bcrypt.hashSync('123456', 10),
  telefone: '(71) 99999-9999',
};

export async function POST(request) {
  try {
    const { email, senha } = await request.json();

    if (!email || !senha) {
      return NextResponse.json({ erro: 'E-mail e senha são obrigatórios' }, { status: 400 });
    }

    // Em produção: buscar no banco de dados
    // const { rows } = await query('SELECT * FROM usuarios WHERE email = $1 AND ativo = true', [email]);
    // const usuario = rows[0];

    // Por enquanto: usuário demo
    let usuario = null;
    if (email === USUARIO_DEMO.email) {
      usuario = USUARIO_DEMO;
    }

    if (!usuario) {
      return NextResponse.json({ erro: 'E-mail ou senha incorretos' }, { status: 401 });
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha_hash);
    if (!senhaCorreta) {
      return NextResponse.json({ erro: 'E-mail ou senha incorretos' }, { status: 401 });
    }

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    const { senha_hash, ...usuarioPublico } = usuario;

    return NextResponse.json({
      token,
      usuario: usuarioPublico,
      mensagem: 'Login realizado com sucesso!',
    });

  } catch (err) {
    console.error('Erro no login:', err);
    return NextResponse.json({ erro: 'Erro interno do servidor' }, { status: 500 });
  }
}
