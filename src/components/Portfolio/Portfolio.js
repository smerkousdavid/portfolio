/*
 * Copyright (c) 2018 David Smerkous.
 * 
 * Portfolio.js is part of David's portfolio 
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
// import { connect } from 'react-redux';

import FullPage from '@fullpage/react-fullpage';
import 'fullpage.js/vendors/scrolloverflow';
import { push as Menu } from 'react-burger-menu';
import {
  FaHome
} from 'react-icons/fa';

import HeaderContent from '../Navigation/Header';
import * as Pages from './Pages';

class Portfolio extends React.Component {

  renderMenuItem(name, icon, handler) {
    return (
      <div className="menu-item" onClick={handler}>
        <div className="menu-offset">
          <FaHome className="menu-icon" />
          <span className="menu-text">{name}</span>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div id="wrapper-content">
        <Menu
          pageWrapId="main-content"
          outerContainerId="wrapper-content"
          width={300}
          right>
          {this.renderMenuItem('Home')}
        </Menu>

        <div id="main-content">
          <HeaderContent />
          <FullPage
            anchors={['home', 'second', 'third']}
            callbacks={['onLeave', 'afterLoad']}
            licenseKey="OPEN-SOURCE-GPLV3-LICENSE"
            scrollingSpeed={1000}
            css3={true}
            easingcss3="cubic-bezier(0.840, -0.100, 0.380, 1.135)"
            navigation={true}
            navigationPosition="left"
            scrollOverflow={true}
            render={({ state, fullpageApi }) =>
                <div>
                  <div className="section">
                    <Pages.Home state={state} />
                  </div>
                  <div className="section">
                    <Pages.Project state={state} />
                  </div>
                  <div className="section">
                    <Pages.Contact state={state} />
                  </div>
                </div>
            } />
            <div id="fp-nav" className="fp-left" style={{ marginTop: '-33.5px' }}>
              <ul>
                <li>
                  <a href="#home" className="active"><span></span></a>
                </li>
                <li>
                  <a href="#second" className=""><span></span></a>
                </li>
                <li>
                  <a href="#third" className=""><span></span></a>
                </li>
              </ul>
            </div>
        </div>
      </div>
    );
  }
}

/*
        <Header>
          <HeaderContent />
        </Header>
        <Footer>
          <p>David Smerkous</p>
        </Footer>
        <SectionsContainer style={styles.container} {...options}>
          <Section>
            <Content />
          </Section>
          <Section>
            <p>Page two</p>
          </Section>
        </SectionsContainer>
 */

// const mapStateToProps = (state) => state;

export default Radium(Portfolio); // connect(mapStateToProps, { tt: () => { } })(Radium(Portfolio));
