import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';

import autobind from 'autobind-decorator';

class Header extends React.Component {
  render() {
    return (
      <div style={styles.container}>
        <a style={styles.nameTitle} href="./">David Smerkous</a>
      </div>
    );
  }
}

const styles = {
  container: {
    position: 'fixed',
    height: '5vh',
    width: '100%',
    padding: 10,
    zIndex: 1
  },
  nameTitle: {
    position: 'fixed',
    top: 25,
    left: 20,
    fontSize: 30
  }
};

export default Radium(Header);
