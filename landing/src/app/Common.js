/*
 * Copyright (c) 2018 David Smerkous.
 *
 * Common.js is part of David's portfolio
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

import posed from 'react-pose';

const SlideIn = posed.ul({
  in: {
    x: '10%',
    delayChildren: 300,
    staggerChildren: 200,
  },
  out: { x: '10%', delay: 0 },
});

const SlideInRight = posed.div({
  in: { x: '0%', opacity: 1 },
  out: { x: '50%', opacity: 0 },
});

const FadeIn = posed.div({
  in: { opacity: 1 },
  out: { opacity: 0 },
});

const FadeInTop = posed.div({
  in: { y: '0%', opacity: 1 },
  out: { y: '-100%', opacity: 0 },
});

const Item = posed.li({
  in: { x: '0%', opacity: 1 },
  out: { x: '-150%', opacity: 0 },
});

const ItemBorder = posed.li({
  in: { x: '0%', opacity: 1 },
  out: { x: '-300%', opacity: 0 },
});

class Page extends React.Component {
  initSlides() {
    this.slideComponents = {};
    this.components = {};
  }

  addSlide(key, component) {
    this.slideComponents[key || 0] = component;
  }

  slide(index, state, delay) {
    const call = () => {
      this.components[index] = this.slideComponents[index](state);
      this.setState({});
    };

    if (delay) window.setTimeout(call, delay);
    else call();
  }

  slideInDelay(index) {
    this.slide(index || 0, 'in', 100);
  }

  slideOutDelay(index) {
    this.slide(index || 0, 'out', 100);
  }

  slideIn(index) {
    this.slide(index || 0, 'in');
  }

  slideOut(index) {
    this.slide(index || 0, 'out');
  }

  renderSlide(index) {
    return this.components[index || 0];
  }
}

const cStyles = {
  button: {
    marginTop: 0,
    marginLeft: '0.1rem',
  },
  buttonMobile: {
    marginTop: 20,
    marginLeft: 0,
  },
  container: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 0,
    padding: 0,
  },
  containerMobile: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
    padding: 0,
    width: '100vw',
  },
  rightContainer: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 400,
    maxHeight: 800,
  },
  border: {
    display: 'block',
    width: '10vw',
    borderRadius: 8,
    height: '5px',
    marginTop: 50,
    minWidth: 40,
    backgroundColor: '#bd5858',
  },
  borderMobile: {
    display: 'block',
    width: '25%',
    borderRadius: 10,
    height: '5px',
    marginTop: 10,
    backgroundColor: '#bd5858',
  },
  tagline: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    fontSize: '1.8em',
    marginTop: 30,
  },
  taglineMobile: {
    fontSize: '1.1em',
    marginTop: 20,
  },
  subtagline: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    fontSize: '1.1em',
    marginTop: 20,
  },
  showcase: {
    maxHeight: 800,
    objectFit: 'cover',
    backgroundColor: 'transparent',
  },
  showcaseMobile: {
    maxHeight: '40vh',
    objectFit: 'fit',
    marginTop: 30,
    backgroundColor: 'transparent',
  },
  bigContainer: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 0,
    paddingBottom: '20vw',
    zIndex: 200,
    listStyle: 'none',
  },
  bigContainerMobile: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: '100vw',
    marginTop: '20%',
    zIndex: 200,
  },
  bigTextContainer: {
    display: 'inline-block',
    marginLeft: 0,
    width: '20vw',
    height: '10vh',
    minWidth: 400,
    minHeight: 100,
  },
  bigTextContainerMobile: {
    display: 'inline-block',
    marginLeft: 0,
    width: '80vw',
  },
  bigText: {
    margin: 5,
    padding: 0,
    height: '100%',
    width: '100%',
    fontStyle: 'bold',
    textShadow: '0 10px 30px rgba(2, 10, 4, 0.15)',
    zIndex: 200,
  },
  bigTextMobile: {
    margin: 5,
    padding: 0,
    fontSize: '3em',
    textAlign: 'center',
    fontWeight: 600,
    fontStyle: 'bold',
    textShadow: '0 10px 30px rgba(2, 10, 4, 0.15)',
  },
};

export {
  SlideIn,
  SlideInRight,
  FadeIn,
  FadeInTop,
  Item,
  ItemBorder,
  Page,
  cStyles,
};
