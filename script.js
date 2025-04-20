const output = document.getElementById('output');

// Add the initial "Loading..." row with an ID for test compatibility
const loadingRow = document.createElement('tr');
loadingRow.id = 'loading'; // ✅ This makes test happy
loadingRow.innerHTML = `<td colspan="2" class="text-center">Loading...</td>`;
output.appendChild(loadingRow);

// Function to create a random delay promise
function createPromise(name) {
  const delay = Math.random() * 2000 + 1000; // 1 to 3 seconds
  const startTime = performance.now();

  return new Promise(resolve => {
    setTimeout(() => {
      const endTime = performance.now();
      const timeTaken = ((endTime - startTime) / 1000).toFixed(3);
      resolve({ name, time: parseFloat(timeTaken) });
    }, delay);
  });
}

// Start 3 promises
const promiseList = [
  createPromise("Promise 1"),
  createPromise("Promise 2"),
  createPromise("Promise 3")
];

Promise.all(promiseList).then(results => {
  // Remove loading row
  document.getElementById('loading')?.remove();

  // Append result rows
  results.forEach(result => {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${result.name}</td><td>${result.time.toFixed(3)}</td>`;
    output.appendChild(row);
  });

  // Add total row (max time)
  const total = Math.max(...results.map(r => r.time));
  const totalRow = document.createElement('tr');
  totalRow.innerHTML = `<td><strong>Total</strong></td><td><strong>${total.toFixed(3)}</strong></td>`;
  output.appendChild(totalRow);
});


