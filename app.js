const express = require('express');

const app = express();


app.get('/mean', (req, res) => {
  const nums = req.query.nums;

  if (!nums) {
    return res.status(400).json({ error: 'nums are required' });
  }

  const numbers = nums.split(',').map(Number);

  if (numbers.some(isNaN)) {
    return res.status(400).json({ error: `${nums} contains invalid numbers` });
  }

  const mean = calculateMean(numbers);

  res.json({ operation: 'mean', value: mean });
});


app.get('/median', (req, res) => {
  const nums = req.query.nums;

  if (!nums) {
    return res.status(400).json({ error: 'nums are required' });
  }

  const numbers = nums.split(',').map(Number);

  if (numbers.some(isNaN)) {
    return res.status(400).json({ error: `${nums} contains invalid numbers` });
  }

  const median = calculateMedian(numbers);

  res.json({ operation: 'median', value: median });
});


app.get('/mode', (req, res) => {
  const nums = req.query.nums;

  if (!nums) {
    return res.status(400).json({ error: 'nums are required' });
  }

  const numbers = nums.split(',').map(Number);

  if (numbers.some(isNaN)) {
    return res.status(400).json({ error: `${nums} contains invalid numbers` });
  }

  const mode = calculateMode(numbers);

  res.json({ operation: 'mode', value: mode });
});


function calculateMean(numbers) {
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  return sum / numbers.length;
}


function calculateMedian(numbers) {
  const sorted = numbers.sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 0) {
    return (sorted[middle - 1] + sorted[middle]) / 2;
  }

  return sorted[middle];
}


function calculateMode(numbers) {
  const frequency = {};
  let maxCount = 0;
  let modes = [];

  for (const num of numbers) {
    frequency[num] = (frequency[num] || 0) + 1;

    if (frequency[num] > maxCount) {
      maxCount = frequency[num];
      modes = [num];
    } else if (frequency[num] === maxCount) {
      modes.push(num);
    }
  }

  return modes;
}


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});