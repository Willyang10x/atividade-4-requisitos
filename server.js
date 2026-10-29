const express = require('express');
const rotasJogos = require('./routes/jogos');

const app = express();
const PORT = 3000;

// Requisito 2: Configura o recebimento de requisições com corpo JSON
app.use(express.json());

// Requisito 7: Middleware que registra no console o método HTTP e a URL
app.use((req, res, next) => {
    console.log(`[LOG] Método: ${req.method} | URL: ${req.originalUrl}`);
    next();
});

// Integra as rotas do catálogo de jogos usando o prefixo '/jogos'
app.use('/jogos', rotasJogos);

// Requisito 8: Tratamento para requisições direcionadas a rotas inexistentes (deve vir por último)
app.use((req, res) => {
    res.status(404).json({ 
        erro: 'Rota não encontrada. Verifique o endereço e o método HTTP.' 
    });
});

// Requisito 2: Servidor escutando na porta 3000
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});