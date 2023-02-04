// create express app
import express from 'express';
import calculateBmi from './bmiCalculator';
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;
  if (!height || !weight) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }
  if (isNaN(Number(height)) || isNaN(Number(weight))) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }
  const bmi = calculateBmi(Number(height), Number(weight));
  return res.json({ weight, height, bmi });
});

app.listen(3000, () => {
  console.log('Server running on localhost:3000');
});
