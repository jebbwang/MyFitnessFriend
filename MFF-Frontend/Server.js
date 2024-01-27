
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/submit-questionnaire', (req, res) => {
  console.log(req.body);
  res.json({ status: 'success', message: 'Questionnaire submitted successfully!' });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
