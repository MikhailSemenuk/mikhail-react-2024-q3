import { Component, ErrorInfo, ReactNode } from 'react';
import { ErrorText } from './ErrorText';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    console.log('📝 Log this error', error);
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('📦 Catch error in box:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <>
          <ErrorText></ErrorText>
        </>
      );
    }

    return this.props.children;
  }
}
