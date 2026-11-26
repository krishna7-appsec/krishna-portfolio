import { Component, type ReactNode } from 'react'

interface Props { fallback: ReactNode; children: ReactNode }

/** Renders `fallback` if anything below throws, for example when WebGL fails to initialise. */
export default class ErrorBoundary extends Component<Props, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}
