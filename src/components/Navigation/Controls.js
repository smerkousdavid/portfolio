/*
 * Copyright (c) 2018 David Smerkous.
 * 
 * Controls.js is part of David's portfolio 
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

import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight
} from 'react-icons/md';

class Controls extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.visible !== this.state.visible) {
      return true;
    }
    
    return false;
  }

  setVisible(visible) {
    this.setState({ visible });
  }

  render() {
    if (!this.state.visible) return null;

    return (
      <div style={styles.container}>
        <a style={styles.control} onClick={this.props.onPrev}><MdKeyboardArrowLeft style={{ fontSize: '1.2em' }}/>Previous</a>
        <a style={styles.control} onClick={this.props.onNext}>Next<MdKeyboardArrowRight style={{ fontSize: '1.2em' }}/></a>
      </div>
    );
  }
}

Controls.propTypes = {
  onPrev: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'fixed',
    height: '5vh',
    fontSize: '1.5em',
    padding: 10,
    margin: 0,
    zIndex: 1,
    left: 0,
    right: 0,
    bottom: 0
  },
  control: {
    display: 'flex',
    flexDirection: 'row',
    placeContent: 'stretch center',
    alignItems: 'center',
    fontSize: '1em',
    paddingLeft: 5,
    paddingRight: 5
  }
};

export default Radium(Controls);
