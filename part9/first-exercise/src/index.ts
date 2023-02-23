// create express app
import express from 'express';
import bodyParser from 'body-parser';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';

const app = express();
app.use(bodyParser.json());

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

app.post('/exercises', (req, res) => {
  const { daily_exercises: dailyExercisesParam, target: targetParam } = req.body;
  if (!dailyExercisesParam || !targetParam ) {
    return res.status(400).json({ error: 'parameters missing' });
  }

  if (isNaN(Number(targetParam)) || !Array.isArray(dailyExercisesParam) || dailyExercisesParam.some((e) => isNaN(Number(e)))) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  const targetNumber = Number(targetParam);
  const dailyExercises = dailyExercisesParam.map(e => Number(e));

  return res.json(calculateExercises(dailyExercises, targetNumber));
});

app.listen(3000, () => {
  console.log('Server running on localhost:3000');
});
