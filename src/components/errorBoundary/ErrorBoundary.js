import { Component } from "react";

import ErrorMessage from "../errorMessage/ErrorMessage";

class ErrorBoundary extends Component {
    state = {
        error: false
    }

    // static getDerivedStateFromError(error) { // он только обновляет состояние
    //     return {error: true}
    // }

    componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo)

        this.setState({
            error: true
        })
    }


    render() {
        if (this.state.error) {
            return <ErrorMessage/>
        }

        return this.props.children; // компонент переданный вовнутрь этого компонента
    }
}

export default ErrorBoundary