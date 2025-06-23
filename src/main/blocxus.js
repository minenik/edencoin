const crypto = require('crypto');

const balances = new Map();

function generateAddress() {
  // Simple pseudo address generation using random bytes
  return crypto.randomBytes(20).toString('hex');
}

function getBalance(address) {
  return balances.get(address) || 0;
}

function sendTransaction({ from, to, amount }) {
  const fromBalance = getBalance(from);
  if (fromBalance < amount) {
    throw new Error('Insufficient funds');
  }
  balances.set(from, fromBalance - amount);
  balances.set(to, getBalance(to) + amount);
  return { hash: crypto.randomBytes(32).toString('hex') };
}

module.exports = { generateAddress, getBalance, sendTransaction };
