import express from 'express';
import axios from 'axios';

const app = express();
const PORT = 5000;

app.get('/api/stock', async (req, res) => {
    const { symbol, startDate, endDate } = req.query;

    const apiUrl = `https://cors-anywhere.herokuapp.com/https://query1.finance.yahoo.com/v7/finance/download/${symbol}?period1=${new Date(
        startDate
    ).getTime() / 1000}&period2=${new Date(endDate).getTime() / 1000}&interval=1d&events=history`;


    try {
        const response = await axios.get(apiUrl);
        res.status(200).send(response.data);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
