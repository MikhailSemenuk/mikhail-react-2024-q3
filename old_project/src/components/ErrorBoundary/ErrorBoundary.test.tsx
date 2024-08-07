import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';

vi.mock('./ErrorText', () => ({
  ErrorText: () => <div>Error occurred</div>,
}));

describe('ErrorBoundary', () => {
  const originalConsoleError = console.error;
  const originalConsoleLog = console.log;

  // Hide redundant console.log() console.error()
  beforeEach(() => {
    console.error = vi.fn();
    console.log = vi.fn();
  });

  afterEach(() => {
    console.error = originalConsoleError;
    console.log = originalConsoleLog;
  });

  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Test Child</div>
      </ErrorBoundary>,
    );

    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });

  it('renders ErrorText component when there is an error', () => {
    const ProblematicComponent = () => {
      throw new Error('Test error');
    };

    render(
      <ErrorBoundary>
        <ProblematicComponent />
      </ErrorBoundary>,
    );

    expect(screen.getByText('Error occurred')).toBeInTheDocument();
  });
});
