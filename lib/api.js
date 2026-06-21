// lib/api.js
// Helper centralizado para chamadas de API — usado pelo site E pelo app mobile
// O app React Native importa este arquivo diretamente

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

class ApiClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.token = null;
  }

  setToken(token) {
    this.token = token;
  }

  getHeaders(extra = {}) {
    const headers = {
      'Content-Type': 'application/json',
      ...extra,
    };
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
      // Fallback pra simulação enquanto JWT real não está ativo 100%
      headers['x-user-id'] = '1';
    } else {
      // Simulação de auth pra desenvolvimento
      headers['x-user-id'] = '1';
      headers['x-user-email'] = 'cliente@exemplo.com';
    }
    return headers;
  }

  async request(method, path, body = null) {
    const config = {
      method,
      headers: this.getHeaders(),
    };
    if (body) config.body = JSON.stringify(body);

    const res = await fetch(`${this.baseUrl}/api${path}`, config);
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.erro || `Erro ${res.status}`);
    }
    return data;
  }

  // ─── AUTH ──────────────────────────────────────────────────────
  async login(email, senha) {
    return this.request('POST', '/auth/login', { email, senha });
  }

  async cadastro(dados) {
    return this.request('POST', '/auth/cadastro', dados);
  }

  async meusDados() {
    return this.request('GET', '/conta');
  }

  async atualizarDados(dados) {
    return this.request('PUT', '/conta', dados);
  }

  // ─── PRODUTOS ─────────────────────────────────────────────────
  async listarProdutos(params = {}) {
    const qs = new URLSearchParams(params).toString();
    return this.request('GET', `/produtos${qs ? '?' + qs : ''}`);
  }

  async buscarProduto(slug) {
    return this.request('GET', `/produtos?slug=${slug}`);
  }

  // ─── CATEGORIAS ───────────────────────────────────────────────
  async listarCategorias(params = {}) {
    const qs = new URLSearchParams(params).toString();
    return this.request('GET', `/categorias${qs ? '?' + qs : ''}`);
  }

  // ─── PEDIDOS ──────────────────────────────────────────────────
  async criarPedido(dados) {
    return this.request('POST', '/pedidos', dados);
  }

  async meusPedidos() {
    return this.request('GET', '/pedidos');
  }

  async buscarPedido(id) {
    return this.request('GET', `/pedidos/${id}`);
  }

  // ─── PAGAMENTO ────────────────────────────────────────────────
  async criarPagamento(pedidoId, metodo) {
    return this.request('POST', '/pagamento', { pedido_id: pedidoId, metodo });
  }

  // ─── ENDEREÇOS ────────────────────────────────────────────────
  async listarEnderecos() {
    return this.request('GET', '/conta/enderecos');
  }

  async adicionarEndereco(dados) {
    return this.request('POST', '/conta/enderecos', dados);
  }

  async consultarCep(cep) {
    const res = await fetch(`https://viacep.com.br/ws/${cep.replace(/\D/g, '')}/json/`);
    return res.json();
  }
}

// Instância singleton — tanto o site quanto o app usam esta
export const api = new ApiClient(BASE_URL);
export default api;
