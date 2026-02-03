const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Conexão com PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Testar conexão
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Erro ao conectar no PostgreSQL:', err);
  } else {
    console.log('✅ Conectado ao PostgreSQL:', res.rows[0].now);
  }
});

// ========== ROTAS ==========

// GET - Listar todas as pessoas
app.get('/api/pessoas', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM pessoas ORDER BY id DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao listar pessoas:', error);
    res.status(500).json({ error: 'Erro ao buscar pessoas' });
  }
});

// GET - Buscar pessoa por ID
app.get('/api/pessoas/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM pessoas WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Pessoa não encontrada' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao buscar pessoa:', error);
    res.status(500).json({ error: 'Erro ao buscar pessoa' });
  }
});

// POST - Criar nova pessoa
app.post('/api/pessoas', async (req, res) => {
  try {
    const { nome, idade, cidade } = req.body;
    
    if (!nome || !idade || !cidade) {
      return res.status(400).json({ error: 'Nome, idade e cidade são obrigatórios' });
    }
    
    const result = await pool.query(
      'INSERT INTO pessoas (nome, idade, cidade) VALUES ($1, $2, $3) RETURNING *',
      [nome, idade, cidade]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao criar pessoa:', error);
    res.status(500).json({ error: 'Erro ao cadastrar pessoa' });
  }
});

// PUT - Atualizar pessoa
app.put('/api/pessoas/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, idade, cidade } = req.body;
    
    const result = await pool.query(
      'UPDATE pessoas SET nome = $1, idade = $2, cidade = $3 WHERE id = $4 RETURNING *',
      [nome, idade, cidade, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Pessoa não encontrada' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao atualizar pessoa:', error);
    res.status(500).json({ error: 'Erro ao atualizar pessoa' });
  }
});

// DELETE - Remover pessoa
app.delete('/api/pessoas/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM pessoas WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Pessoa não encontrada' });
    }
    
    res.json({ message: 'Pessoa removida com sucesso' });
  } catch (error) {
    console.error('Erro ao remover pessoa:', error);
    res.status(500).json({ error: 'Erro ao remover pessoa' });
  }
});

// Rota de health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Iniciar servidor
app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Backend rodando na porta ${port}`);
});
