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
  FiHome,
  FiDatabase,
  FiMessageSquare,
  FiAlignLeft
} from 'react-icons/fi';

import Header from 'header';
import Controls from 'controls';
import projects from 'configs/Projects';
import * as Pages from './Pages';
import { deviceSelect, deviceRun } from 'configs/Media';

class Portfolio extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      menuOpen: false
    };

    // Do not use the desktop and mobile media queries in the project loops as the query keys break the MediaQuery library and it's just one big annoying mess
    this.projects = [];
    projects.forEach((val, ind) => {
      this.projects.push(
        <div key={ind} className="slide">
          <div style={deviceSelect({ desktop: styles.projectContainer, mobile: styles.projectContainerMobile })}>
            <img style={styles.projectImage} src={val.image} alt={val.name} />
            <p style={styles.projectTitle}>{val.name}</p>
            <p style={styles.projectRole}>{val.role}</p>
            <p style={deviceSelect({ desktop: styles.projectDescription, mobile: styles.projectDescriptionMobile })}>{val.desc}</p>
            <button style={styles.projectExplore} onClick={() => window.open(val.explore, '_blank').focus()}>Visit Site</button>
          </div>
        </div>
      );
    });

    this.handleStateChange = this._handleStateChange.bind(this);
  }

  renderMenuItem(name, icon, handler) {
    return (
      <div className="menu-item" onClick={() => {
          this.closeMenu();
          setTimeout(handler, 600);
        }}>
        <div className="menu-offset">
          {icon}
          <span className="menu-text">{name}</span>
        </div>
      </div>
    );
  }

  _handleStateChange(state) {
    this.setState({ menuOpen: state.isOpen });
  }

  closeMenu() {
    this.setState({ menuOpen: false });
  }

  render() {
    const { menuOpen } = this.state;

    return (
      <div id="wrapper-content">
        <Menu
          isOpen={menuOpen}
          onStateChange={this.handleStateChange}
          pageWrapId="main-content"
          outerContainerId="wrapper-content"
          width={300}
          right>
          {this.renderMenuItem('Home', <FiHome className="menu-icon" />, () => this.fullpage.moveTo('home', 0))}
          {this.renderMenuItem('About', <FiAlignLeft className="menu-icon" />, () => this.fullpage.moveTo('home', 1))}
          {this.renderMenuItem('Projects', <FiDatabase className="menu-icon" />, () => this.fullpage.moveTo('project', 0))}
          {this.renderMenuItem('Contact', <FiMessageSquare className="menu-icon" />, () => this.fullpage.moveTo('contactme', 0))}
        </Menu>

        <div id="main-content">
          <Header onHome={() => this.fullpage.moveTo('home', 0)}/>
          <Controls ref={ref => this.controls = ref} onPrev={() => this.fullpage.moveSlideLeft()} onNext={() => this.fullpage.moveSlideRight()} />
          <FullPage
            anchors={['home', 'project', 'contactme']}
            callbacks={['onLeave', 'afterLoad', 'afterSlideLoad']}
            licenseKey="OPEN-SOURCE-GPLV3-LICENSE"
            scrollingSpeed={1000}
            css3={true}
            easingcss3="cubic-bezier(0.840, -0.100, 0.380, 1.135)"
            navigation={true}
            navigationPosition="left"
            navigationTooltips={['Home', 'Projects', 'Contact']}
            scrollOverflow={true}
            controlArrows={false}
            autoScrolling={true}
            render={({ state, fullpageApi }) => {
                this.fullpage = fullpageApi || {};

                if (state.callback === 'afterSlideLoad' || state.callback === 'afterLoad') {
                  setTimeout(() => {
                    const activeSlide = (fullpageApi.getActiveSlide() || { index: 0 }).index;
                    const activeSection = fullpageApi.getActiveSection().anchor;

                    deviceRun({
                      desktop: () => {
                        this.controls.setVisible(activeSlide !== 0);
                      },
                      mobile: () => {
                        this.controls.setVisible(activeSlide !== 0 && !(activeSlide === 1 && activeSection === 'home'));
                      }
                    });
                  }, 10);
                }

                return (
                  <div>
                    <div className="section">
                      <div className="slide">
                        <Pages.Home state={state} api={this.fullpage} />
                      </div>
                      <div className="slide">
                        <Pages.About state={state} api={this.fullpage} />
                      </div>
                    </div>
                    <div className="section">
                      <div className="slide">
                        <Pages.Project state={state} api={this.fullpage} />
                      </div>
                      {this.projects}
                    </div>
                    <div className="section">
                      <Pages.Contact state={state} />
                    </div>
                  </div>
                );
              }} />
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

const styles = {
  projectContainer: {
    display: 'flex',
    width: '100vw',
    height: '100%',
    placeContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  projectContainerMobile: {
    display: 'flex',
    width: '100vw',
    height: '90vh',
    placeContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  projectImage: {
    width: '30%',
    height: '30%',
    objectFit: 'contain'
  },
  projectTitle: {
    fontSize: '1.7em',
    fontWeight: 600,
    marginTop: 20,
    marginBottom: 5
  },
  projectRole: {
    fontSize: '0.8em',
    fontWeight: 500,
    color: '#aaaaaa',
    marginBottom: 10
  },
  projectDescription: {
    fontSize: '1.05em',
    marginTop: 13,
    marginBottom: 10
  },
  projectDescriptionMobile: {
    fontSize: '1.05em',
    marginTop: 13,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    textAlign: 'center'
  },
  projectExplore: {
    marginTop: 15
  }
};

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
