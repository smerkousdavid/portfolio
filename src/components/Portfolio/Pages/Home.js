/*
 * Copyright (c) 2018 David Smerkous.
 * 
 * Home.js is part of David's portfolio 
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
 /* global require */
import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';

import ResizeDetector from 'react-resize-detector';
import CursorPosition from 'react-cursor-position';
import autobind from 'autobind-decorator';

import SolarSystem from 'components/SolarSystem/SolarSystem';

import { SlideIn, Item, ItemBorder, Page, cStyles } from '../Common';

class Content extends Page {
    constructor(props) {
        super(props);

        this.solarX = 0.5;
        this.solarY = 0.5;
        this.solarRatio = 0.2;
    
        this.initSlides();
        this.addSlide(0, (pose) => 
            <SlideIn style={styles.bigContainer} pose={pose}>
                <Item>
                    <img style={styles.profile} src={require('imgs/profile.jpg')} alt="profile" />

                    <div style={styles.bigTextContainer}>
                        <p style={styles.bigText}>David</p>
                        <p style={styles.bigText}>Smerkous</p>
                    </div>
                </Item>

                <ItemBorder style={styles.border} />

                <Item style={styles.tagline}>
                    Full stack web / <br></br>
                    mobile developer.
                </Item>

                <Item>
                    <button style={cStyles.button} onClick={this.onAbout}>About Me</button>
                </Item>
            </SlideIn>
        );
    }

    componentWillReceiveProps(nextProps) {
        const { destination, direction, callback } = nextProps.state;
        
        switch (callback) {
        case 'onLeave':
            if (destination.index === 1 && direction === "down") {
                this.setSolarSystem(2, this.solarY, this.solarRatio - 0.2, 500, () => {
                    this.solarSystem.stopRotation();
                });
                this.slideOut();
            }
            break;
        case 'afterLoad': 
            if (destination.index === 0 && direction === "up") {
                this.solarSystem.resetRotation();
                this.setSolarSystem(this.solarX, this.solarY, this.solarRatio, 500, () => {
                    this.slideIn();
                });
            }
            break;
        default:
            break;
        }
    }

    componentDidMount() {
        this.slideOut();
        this.setSolarSystem(this.solarX, this.solarY, this.solarRatio, null, null, 3, 1);
        
        setTimeout(() => {
            //Update the solarsystem ratios
            this.solarX = 0.7;
            this.solarY = 0.6;
            this.solarRatio = 0.75;
            this.setSolarSystem(this.solarX, this.solarY, this.solarRatio, 400, () => {
                console.log('finished update!');
                this.solarSystem.resetRotation();
                this.slideIn();
            }, this.solarSystem.defaultSpeed / this.solarSystem.defaultUpdate);
            //this.setState({ visible: true });
        }, 1000);
        //this.resizeSolarSystem();
        //this.solarSystem.transitionTo(thi)
        //const ratio = this.getScaled('a', 0.75);
        //this.solarSystem.setStage(this.getScaled('w', 0.7), this.getScaled('h', 0.6), ratio, ratio, 100, () => {
        //    console.log('done!');
        //});
    }

    /* eslint-disable */
    @autobind
    onAbout() {
        this.props.api.moveTo('home', 1);
    }

    @autobind
    resizeSolarSystem() {
        this.setSolarSystem(this.solarX, this.solarY, this.solarRatio);
    }
    /* eslint-enable */

    setSolarSystemUpdate(speed, period) {
        this.solarSystem.setUpdateRate(speed, period);
    }

    setSolarSystem(solarX, solarY, scaled, millis, callback, speed, period) {
        if(period) this.setSolarSystemUpdate(speed, period);
        const ratio = this.getScaled('a', scaled);
        this.solarSystem.setStage(this.getScaled('w', solarX), this.getScaled('h', solarY), ratio, ratio, millis, callback, speed);
    }

    getScaled(type, scale) {
        switch (type) {
        case 'w':
            return window.innerWidth * scale;
        case 'h':
            return window.innerHeight * scale;
        case 'a':
            return (window.innerWidth < window.innerHeight) ? this.getScaled('w', scale) : this.getScaled('h', scale);
        default:
            return 0;
        }
    }

    render() {
        return (
            <div style={styles.container}>
                {this.renderSlide()}
                <CursorPosition>
                        <SolarSystem
                            ref={ref => this.solarSystem = ref}
                            initialWidth={this.getScaled('a', this.solarX)}
                            initialHeight={this.getScaled('a', this.solarY)}
                            initialSolarX={this.getScaled('a', this.solarRatio)}
                            initialSolarY={this.getScaled('a', this.solarRatio)} />
                        <ResizeDetector resizableElementId="root" handleWidth handleHeight onResize={this.resizeSolarSystem} />
                </CursorPosition>
            </div>
        );
    }
}

/*
                <img style={styles.mockup} src={require('imgs/phone_mockup.png')} />
                <CursorPosition>
                    <SolarSystem
                        ref={ref => this.solarSystem = ref}
                        initialWidth={this.getScaled('a', 0.5)}
                        initialHeight={this.getScaled('a', 0.5)}
                        initialSolarX={this.getScaled('w', 0.5)}
                        initialSolarY={this.getScaled('h', 0.5)} />
                    <ResizeDetector resizableElementId="root" handleWidth handleHeight onResize={this.resizeSolarSystem} />
                </CursorPosition>
    */

const styles = {
    container: {
        margin: 0,
        padding: 0,
        width: '100vw',
        height: '100vh',
    },
    profile: {
        display: 'inline-block',
        borderRadius: '50%',
        width: 200,
        height: 200,
        boxShadow: '0 10px 30px rgba(2, 10, 4, 0.15)'
    },
    mockup: {
        right: '10%',
        bottom: '10%',
        height: '20%',
        width: '30%'
    },
    border: {
        display: 'block',
        width: '20%',
        borderRadius: 8,
        height: '5px',
        marginTop: 30,
        backgroundColor: '#bd5858'
    },
    tagline: {
        fontSize: '1.8em',
        marginTop: 30
    },
    bigContainer: {
        display: 'inline-block',
        listStyle: 'none',
        position: 'fixed',
        marginLeft: '10vw',
        marginTop: '10em',
        zIndex: 200
    },
    bigTextContainer: {
        display: 'inline-block',
        marginLeft: 40
    },
    bigText: {
        margin: 5,
        padding: 0,
        fontSize: '5em',
        fontWeight: 600,
        fontStyle: 'bold',
        textShadow: '0 10px 30px rgba(2, 10, 4, 0.15)',
        zIndex: 200
    }
};

Content.propTypes = {
    api: PropTypes.any.isRequired
};

export default Radium(Content);
