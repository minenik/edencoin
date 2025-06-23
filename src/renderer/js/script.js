document.addEventListener('DOMContentLoaded', () => {
  const balanceEl = document.getElementById('balance');
  const historyEl = document.getElementById('history');
  const form = document.getElementById('send-form');

  let balance = 10000;
  balanceEl.textContent = balance + ' EDN';

  const transactions = [
    { date: '2022-01-01', amount: 1000, description: 'Received from Alice' },
    { date: '2022-01-05', amount: -500, description: 'Sent to Bob' },
  ];

  function renderHistory() {
    historyEl.innerHTML = '';
    transactions.forEach(tx => {
      const row = document.createElement('div');
      row.className = 'tx-row';
      row.innerHTML = `<span class="tx-date">${tx.date}</span>
        <span class="tx-amount ${tx.amount >= 0 ? 'positive' : 'negative'}">${tx.amount >= 0 ? '+' : ''}${tx.amount} EDN</span>
        <span class="tx-desc">${tx.description}</span>`;
      historyEl.appendChild(row);
    });
  }

  renderHistory();

  form.addEventListener('submit', e => {
    e.preventDefault();
    const address = form.elements['address'].value.trim();
    const amount = parseFloat(form.elements['amount'].value);
    if (!address || isNaN(amount)) return;
    transactions.unshift({
      date: new Date().toLocaleDateString(),
      amount: -amount,
      description: `Sent to ${address}`
    });
    balance -= amount;
    balanceEl.textContent = balance + ' EDN';
    renderHistory();
    form.reset();
  });
});
