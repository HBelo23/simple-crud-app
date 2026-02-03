-- Criar tabela de pessoas
CREATE TABLE IF NOT EXISTS pessoas (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    idade INTEGER NOT NULL CHECK (idade >= 0 AND idade <= 150),
    cidade VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserir dados de exemplo
INSERT INTO pessoas (nome, idade, cidade) VALUES 
    ('João Silva', 28, 'São Paulo'),
    ('Maria Santos', 34, 'Rio de Janeiro'),
    ('Pedro Costa', 22, 'Belo Horizonte');
