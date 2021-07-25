import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h3 style={{ color: "white", textAlign: "center", marginTop: "10px" }}>Entered city doesn't exist.<br/> Please try with another city.</h3>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
