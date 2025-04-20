const output = document.getElementById('output');

// Add the initial "Loading..." row
const loadingRow = document.createElement('tr');
loadingRow.innerHTML = `<td colspan="2" class="text-center">Loading...</td>`;
output.appendChild(loadingRow);

// Function to create a random promise that resolves between 1-3 seconds
function createPromise(name) {
  const delay = Math.random() * 2000 + 1000; // 1000ms to 3000ms
  const startTime = performance.now();

  return new Promise(resolve => {
    setTimeout(() => {
      const endTime = performance.now();
      const timeTaken = ((endTime - startTime) / 1000).toFixed(3);
      resolve({ name, time: parseFloat(timeTaken) });
    }, delay);
  });
}

// Create an array of 3 promises
const promiseList = [
  createPromise("Promise 1"),
  createPromise("Promise 2"),
  createPromise("Promise 3")
];

// Use Promise.all to wait for all of them
Promise.all(promiseList).then(results => {
  // Remove "Loading..." row
  output.innerHTML = '';

  // Add rows for each promise result
  results.forEach(result => {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${result.name}</td><td>${result.time.toFixed(3)}</td>`;
    output.appendChild(row);
  });

  // Add total row
  const totalTime = Math.max(...results.map(r => r.time));
  const totalRow = document.createElement('tr');
  totalRow.innerHTML = `<td><strong>Total</strong></td><td><strong>${totalTime.toFixed(3)}</strong></td>`;
  output.appendChild(totalRow);
});

