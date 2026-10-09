import { Component, type ReactNode } from 'react';

export class ReadingBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() {
    if (this.state.failed) return <main className="reading-recovery"><span>The reading room</span><h1>Let’s open that again.</h1><p>The page could not finish loading. Reload to try again.</p><button onClick={() => window.location.reload()}>Reload the reading room</button></main>;
    return this.props.children;
  }
}

export function ReadingLoading() {
  return <main className="reading-recovery" role="status"><span>The reading room</span><h1>Opening your bookshelf…</h1><p>Preparing the books and your saved reading place.</p></main>;
}
