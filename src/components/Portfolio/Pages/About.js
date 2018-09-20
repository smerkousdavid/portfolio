/*
 * Copyright (c) 2018 David Smerkous.
 * 
 * About.js is part of David's portfolio 
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
import Radium from 'radium';

import { Desktop, Mobile } from 'media';
import Colors from 'configs/Colors';

class Content extends React.Component {
  constructor(props) {
    super(props);

    this.aboutText = `
        I am currently a freshman student at the University of Washington perusing a degree in Computer Science. 
        Most of my work is done through private consulting and freelancing. However, while I was in 
        high school I got the chance to work directly with the administration of nearby schools to create 
        software solutions for both students and teachers. Examples include plagiarism checkers and distributed block-lunch apps.
        Some R&D projects include RFID student trackers and a safety card system for the school's metal shop. 
        After gaining some developer experience, I moved onto more complicated solutions such as REM sleep cycle tracking, 
        remote text to speech engines - I developed this framework while I interned at cloudyBoss, - and anonymous distributed 
        peer to peer networks. My projecs usually involve a few other developers in the mix and when I set my mind to something I 
        will devote all of my time to get that thing done with the right people.
    `;
  }

  render() {
    return (
      <div>
        <Desktop>
          <div style={styles.container}>
            <div style={styles.center}>
              <p style={styles.bigText}>About Me</p>
              <p style={styles.content}>{this.aboutText}</p>
            </div>
          </div>
        </Desktop>
        <Mobile>
          <div style={styles.containerMobile}>
            <div style={styles.centerMobile}>
              <p style={styles.bigTextMobile}>About Me</p>
              <p style={styles.contentMobile}>{this.aboutText}</p>
            </div>
          </div>
        </Mobile>
      </div>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    alignContent: 'stretch'
  },
  containerMobile: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    alignContent: 'stretch',
    height: '150vh'
  },
  center: {
    position: 'absolute',
    display: 'flex',
    placeSelf: 'center',
    placeContent: 'center',
    flexDirection: 'column',
    border: `2px solid ${Colors.text}`,
    borderRadius: 25,
    padding: 25,
    maxWidth: '60vw',
    zIndex: 100
  },
  centerMobile: {
    position: 'absolute',
    display: 'flex',
    placeSelf: 'center',
    placeContent: 'center',
    flexDirection: 'column',
    zIndex: 100
  },
  bigText: {
    fontSize: '5em',
    fontWeight: 600,
    textAlign: 'center',
    margin: 20
  },
  bigTextMobile: {
    fontSize: '3em',
    fontWeight: 600,
    textAlign: 'center',
    margin: 0
  },
  content: {
    fontSize: '1.05em',
    paddingLeft: 10,
    paddingRight: 10,
    textOverflow: 'clip',
    textDecoration: 'none',
    textAlign: 'justify',
    textIndent: 35
  },
  contentMobile: {
    fontSize: '1.2em',
    padding: 20,
    textOverflow: 'clip',
    textDecoration: 'none',
    textAlign: 'center',
    textIndent: 35
  }
};

export default Radium(Content);
