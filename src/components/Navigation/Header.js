/*
 * Copyright (c) 2018 David Smerkous.
 * 
 * Header.js is part of David's portfolio 
 * (see https://smerkous.com).
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';

import { Desktop } from 'media';

class Header extends React.Component {
  render() {
    return (
      <div style={styles.container}>
        <Desktop>
          <a style={styles.nameTitle} onClick={this.props.onHome}>David Smerkous</a>
        </Desktop>
      </div>
    );
  }
}

Header.propTypes = {
  onHome: PropTypes.func.isRequired
};

const styles = {
  container: {
    position: 'fixed',
    height: '5vh',
    width: '100vw',
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
