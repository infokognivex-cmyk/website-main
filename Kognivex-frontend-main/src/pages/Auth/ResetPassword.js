import React, { useState } from 'react';

function ResetPassword() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setStatus('If this email exists, a reset link will be sent shortly.');
  };

  return (
    <div style={{ maxWidth: '480px', margin: '2rem auto', padding: '2rem', background: '#fff', borderRadius: '12px' }}>
      <h1>Reset Password</h1>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
        <label>
          Email
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <button type="submit">Send reset instructions</button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
}

export default ResetPassword;
