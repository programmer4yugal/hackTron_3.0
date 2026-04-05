import React from 'react';

export default function TestApp() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fff', padding: '40px' }}>
      <h1 style={{ fontSize: '48px', color: '#000', fontWeight: 'bold', marginBottom: '20px' }}>
        ✅ TEST PAGE WORKS
      </h1>
      <p style={{ fontSize: '18px', color: '#333', marginBottom: '20px' }}>
        If you can see this text, the React app is rendering correctly.
      </p>
      <div style={{ 
        padding: '20px', 
        backgroundColor: '#f0f0f0', 
        border: '2px solid #000',
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h2 style={{ color: '#000', marginBottom: '10px' }}>Debug Info:</h2>
        <pre style={{ color: '#000', overflowX: 'auto' }}>
{JSON.stringify({
  ReactVersion: React.version,
  Timestamp: new Date().toISOString(),
  UserAgent: navigator.userAgent
}, null, 2)}
        </pre>
      </div>
      
      <button 
        onClick={() => alert('Button works! JavaScript is executing.')}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#00ff88',
          color: '#000',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        Click Me to Test Interactivity
      </button>
    </div>
  );
}
