import React, { useState } from 'react';
import { logError } from './debug';

const ErrorBoundary = ({ children }) => {
  const [errorState, setErrorState] = useState({ hasError: false, error: null });

  const handleError = (error, errorInfo) => {
    setErrorState({ hasError: true, error });
    logError({ error, errorInfo });
  };

  if (errorState.hasError) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1>Something went wrong.</h1>
        {process.env.NODE_ENV === 'development' && (
          <pre style={{ textAlign: 'left', padding: '20px', background: '#f5f5f5' }}>
            {errorState.error?.toString()}
          </pre>
        )}
      </div>
    );
  }

  // React 16+ error boundaries require usage of `ErrorBoundary` as a class or wrapping a component with `ErrorBoundary`.
  // To replicate the same, we need an additional component like below:
  return <ErrorBoundaryWrapper handleError={handleError}>{children}</ErrorBoundaryWrapper>;
};

// Helper component to capture errors and propagate them to the functional error boundary
class ErrorBoundaryWrapper extends React.Component {
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.props.handleError(error, errorInfo);
  }

  render() {
    return this.props.children;
  }
}

export default ErrorBoundary;
