const express = require('express');
const router = express.Router();

// Array em memória para armazenar os jogos
let jogos = [];
let proximoId = 1;

// GET /jogos: Listar todos os jogos cadastrados
router.get('/', (req, res) => {
    res.status(200).json(jogos);
});

// GET /jogos/:id: Consultar um jogo pelo ID (Requisito 5)
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const jogo = jogos.find(j => j.id === id);

    if (!jogo) {
        return res.status(404).json({ erro: 'Jogo não encontrado.' });
    }
    
    res.status(200).json(jogo);
});

// POST /jogos: Cadastrar um novo jogo (Requisitos 4 e 6)
router.post('/', (req, res) => {
    const { titulo, plataforma, genero, anoLancamento } = req.body;

    // Validação de campos obrigatórios
    if (!titulo || !plataforma || !genero || !anoLancamento) {
        return res.status(400).json({ 
            erro: 'Todos os campos (titulo, plataforma, genero, anoLancamento) são obrigatórios.' 
        });
    }

    const novoJogo = { id: proximoId++, titulo, plataforma, genero, anoLancamento };
    jogos.push(novoJogo);
    
    // Status 201 para criação com sucesso
    res.status(201).json(novoJogo);
});

// PUT /jogos/:id: Atualizar todos os dados de um jogo (Requisito 5)
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = jogos.findIndex(j => j.id === id);

    // Verifica se o ID existe
    if (index === -1) {
        return res.status(404).json({ erro: 'Jogo não encontrado.' });
    }

    const { titulo, plataforma, genero, anoLancamento } = req.body;

    // Validação também na atualização para manter consistência
    if (!titulo || !plataforma || !genero || !anoLancamento) {
        return res.status(400).json({ 
            erro: 'Todos os campos são obrigatórios para a atualização.' 
        });
    }

    // Atualiza os dados
    jogos[index] = { id, titulo, plataforma, genero, anoLancamento };
    res.status(200).json(jogos[index]);
});

// DELETE /jogos/:id: Remover um jogo do catálogo (Requisito 5)
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = jogos.findIndex(j => j.id === id);

    if (index === -1) {
        return res.status(404).json({ erro: 'Jogo não encontrado.' });
    }

    // Remove o item do array
    jogos.splice(index, 1);
    
    // Status 204 para exclusão bem-sucedida (sem corpo de resposta)
    res.status(204).send();
});

module.exports = router;