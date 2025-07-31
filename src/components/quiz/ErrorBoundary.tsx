import React, { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
	children: ReactNode
}

interface State {
	hasError: boolean
}

class ErrorBoundary extends Component<Props, State> {
	public state: State = {
		hasError: false
	}

	public static getDerivedStateFromError (_: Error): State {
		// Update state so the next render will show the fallback UI.
		return { hasError: true }
	}

	public componentDidCatch (error: Error, errorInfo: ErrorInfo): void {
		// You can also log the error to an error reporting service
		console.error('Uncaught error:', error, errorInfo)
		// Here you would typically send the error to a service like Sentry, Datadog, etc.
		// logErrorToMyService(error, errorInfo);
	}

	public render (): ReactNode {
		if (this.state.hasError) {
			// You can render any custom fallback UI
			return (
				<div className="flex items-center justify-center h-screen bg-gray-100">
					<div className="text-center p-8 bg-white rounded shadow-md">
						<h2 className="text-xl font-semibold text-red-600 mb-4">Oops! Something went wrong.</h2>
						<p className="text-gray-700">We're sorry, but there was an unexpected error. Please try refreshing the page.</p>
						{/* Optionally add a button to reload */}
						<button
							className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
							onClick={() => { window.location.reload() }}
						>
              Refresh Page
						</button>
					</div>
				</div>
			)
		}

		return this.props.children
	}
}

export default ErrorBoundary
