const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Replace with your OpenAI API Key
const OPENAI_API_KEY = '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';

app.post('/api/chat', async (req, res) => {
    const { query } = req.body;

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: query }]
        }, {
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching response');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
