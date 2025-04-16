// pages/trade.js
import { useState } from 'react';

export default function Trade() {
  const [crypto, setCrypto] = useState('bitcoin');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');

  const handleTrade = (e) => {
    e.preventDefault();
    // For the MVP, we simulate a trade. In a real application, this would involve backend integration or smart contract calls.
    setMessage(`Trade executed: Bought ${amount} of ${crypto}`);
    setAmount('');
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Trade</h1>
      <form onSubmit={handleTrade}>
        <label>
          Select Cryptocurrency:
          <select value={crypto} onChange={(e) => setCrypto(e.target.value)}>
            <option value="bitcoin">Bitcoin</option>
            <option value="ethereum">Ethereum</option>
          </select>
        </label>
        <br /><br />
        <label>
          Amount:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </label>
        <br /><br />
        <button type="submit">Execute Trade</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

