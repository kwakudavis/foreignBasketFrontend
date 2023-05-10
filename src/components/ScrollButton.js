import React, { Component } from 'react';

class ScrollButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isVisible: false,
    };

    this.handleScroll = this.handleScroll.bind(this);
    this.scrollToTop = this.scrollToTop.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    if (window.pageYOffset > 300) {
      this.setState({ isVisible: true });
    } else {
      this.setState({ isVisible: false });
    }
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  render() {
    const { isVisible } = this.state;

    const buttonStyle = {
        position: 'fixed',
        bottom: '40px',
        right: '20px',
        zIndex: '9999',
        backgroundColor: '#2c8a51',
        borderRadius: '50%',
        width: '50px',
        height: '50px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
        border: 'none',
        outline: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.2s ease-in-out',
      };

      

    return (
      <>
        {isVisible && (
          <button className="scroll-button" onClick={this.scrollToTop} style={buttonStyle}>
            &#9650;
          </button>
        )}
      </>
    );
  }
}

export default ScrollButton;
