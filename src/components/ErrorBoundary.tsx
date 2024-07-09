import { Component, ErrorInfo, ReactNode } from 'react';

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
          <div className="m-3">
            <h1>Dimensional glitch detected: Please reboot your reality</h1>
            <p>
              <strong>Rick:</strong> Morty, listen up! We’ve got a glitch in the matrix, Morty! The app’s gone all
              wibbly-wobbly, like a Plumbus on a Tuesday. You know what that means, Morty?
            </p>
            <p>
              <strong>Morty:</strong> Uh, what does it mean, Rick?
            </p>
            <p>
              <strong>Rick:</strong> It means we’re in a broken reality, Morty! But don’t worry, I’ve got a solution.{' '}
              <span className="text-danger font-weight-bold">Tell the user to press F5, Morty!</span> Yeah, just like
              that! Refresh the page, Morty! It’s like hitting the reset button on your existence, Morty!
            </p>
          </div>
        </>
      );
    }

    return this.props.children;
  }
}
