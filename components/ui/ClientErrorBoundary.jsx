"use client";

import React from "react";

export default class ClientErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.error("Client error:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="h-[520px] flex items-center justify-center text-sm text-gray-500">
          Bản đồ tạm thời không khả dụng.
        </div>
      );
    }

    return this.props.children;
  }
}
