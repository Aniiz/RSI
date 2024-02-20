const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/submit', (req, res) => {
    const email = req.body.email;

    const jsonFilePath = 'emails.json';
    let emails = [];

    if (fs.existsSync(jsonFilePath)) {
        try {
            const data = fs.readFileSync(jsonFilePath, 'utf-8');
            emails = JSON.parse(data);
        } catch (error) {
            console.error('Erro ao ler o arquivo JSON:', error);
        }
    } else {
        try {
            fs.writeFileSync(jsonFilePath, '[]', 'utf-8');
            console.log('Arquivo JSON criado com sucesso.');
        } catch (error) {
            console.error('Erro ao criar o arquivo JSON:', error);
        }
    }

    const newEmail = {
        id: emails.length + 1,
        email: email
    };
    emails.push(newEmail);

    try {
        fs.writeFileSync(jsonFilePath, JSON.stringify(emails, null, 2), 'utf-8');
        console.log(`${email} salvo com sucesso.`);
    } catch (error) {
        console.error('Erro ao salvar o e-mail:', error);
    }

    res.json(newEmail);
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
