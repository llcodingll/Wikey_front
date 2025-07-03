import React from 'react';

export default function ErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  return (
    <div
      style={{
        maxWidth: 400,
        margin: '40px auto',
        padding: 24,
        border: '1px solid #eee',
        borderRadius: 8,
        textAlign: 'center',
      }}
    >
      <h2>문제가 발생했습니다</h2>
      <pre style={{ color: '#d32f2f', margin: '16px 0' }}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>새로고침</button>{' '}
      <button onClick={() => (window.location.href = '/')}>메인으로</button>
    </div>
  );
}
