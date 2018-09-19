/*
 * Copyright (c) 2018 David Smerkous.
 * 
 * SolarSystem.js is part of David's portfolio 
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

import { Stage, FastLayer, Circle } from 'react-konva';
import { slideInRight } from 'react-animations';

import Planet from './Planet';
import { getPlanetConfigs, planetConfigs, closeTo } from './Util';

class SolarSystem extends React.Component {
    constructor(props) {
        super(props);

        this.defaultSpeed = 0.11;
        this.defaultUpdate = 180;

        this.state = {
            width: props.initialHeight,
            height: props.initialWidth,
            solarX: props.initialSolarX,
            solarY: props.initialSolarY,
            speed: this.defaultSpeed,
            updatePeriod: this.defaultUpdate,
            step: 0
        };

        this.animation = 0;
    }

    componentDidMount() {
        this.setRotation();
    }

    componentWillUnmount() {
        window.clearInterval(this.rotation);
    }

    UNSAFE_componentWillUpdate(nextProps, nextState) {
        if (this.state.updatePeriod !== nextState.updatePeriod) {
            window.clearInterval(this.rotation);
            this.setRotation(nextState.updatePeriod);
        }
    }

    setRotation(overrideUpdate) {
        if (overrideUpdate === 0) return;
        this.rotation = window.setInterval(() => {
            this.setState((previous) => ({
                step: previous.step + previous.speed
            }));
        }, overrideUpdate || this.state.updatePeriod);
    }

    resetRotation() {
        this.setUpdateRate(this.defaultSpeed, this.defaultUpdate);
    }

    stopRotation() {
        this.setUpdateRate(0, 0);
    }

    getScaled(type, scale) {
        switch (type) {
        case 'w':
            return Math.ceil(this.state.width * scale);
        case 'h':
            return Math.ceil(this.state.height * scale);
        case 'a':
            return (this.state.width < this.state.height) ? this.getScaled('w', scale) : this.getScaled('h', scale);
        default:
            return 0;
        }
    }

    setStage(solarX, solarY, width, height, millis, done, speed) {
        const ms = this.state;

        if (solarX === ms.solarX &&
            solarY === ms.solarY &&
            width === ms.width &&
            height === ms.height &&
            ((speed) ? speed === ms.speed : true)) {
                return;
        }

        if (millis) {
            this.transitionTo(solarX, solarY, width, height, millis, done, speed || this.state.speed);
        } else {
            this.setState({
                width,
                height,
                solarX,
                solarY,
                speed: speed || this.state.speed
            });
        }
    }

    setUpdateRate(speed, updatePeriod) {
        this.setState({
            speed,
            updatePeriod
        });
    }

    transitionTo(solarX, solarY, width, height, millis, done, speed) {
        const interval = millis / 5;
        const diffX = solarX - this.state.solarX;
        const diffY = solarY - this.state.solarY;
        const diffW = width - this.state.width;
        const diffH = height - this.state.height;
        const diffS = speed - this.state.speed;
        const stepX = diffX / interval;
        const stepY = diffY / interval;
        const stepW = diffW / interval;
        const stepH = diffH / interval;
        const stepS = diffS / interval;

        if (this.animation !== null) {
            window.clearInterval(this.animation);
        }

        this.animation = window.setInterval(() => {
            let newX = 0, newY = 0, newW = 0, newH = 0, newS = 0;

            if (!closeTo(solarX, this.state.solarX, 1)) {
                newX = stepX;
            }

            if (!closeTo(solarY, this.state.solarY, 1)) {
                newY = stepY;
            }

            if (!closeTo(width, this.state.width, 1)) {
                newW = stepW;
            }

            if (!closeTo(height, this.state.height, 1)) {
                newH = stepH;
            }

            if (!closeTo(speed, this.state.speed, 0.001)) {
                newS = stepS;
            }

            if (newX === 0 && newY === 0 && newW === 0 && newH === 0 && newS === 0) {
                window.clearInterval(this.animation);
                this.animation = null;
                done();
            } else {
                this.setState((previous) => ({
                    solarX: previous.solarX + newX,
                    solarY: previous.solarY + newY,
                    width: previous.width + newW,
                    height: previous.height + newH,
                    speed: previous.speed + newS
                }));
            }
        }, 5);
    }

    /*                 <Circle x={this.centerX + 1} y={this.centerY - 1} radius={this.scaleW(radius)} fill="#FC0502" /> */

    renderSun(offsetX, offsetY) {
        return (
            <Circle x={this.state.solarX + offsetX} y={this.state.solarY + offsetY} radius={this.getScaled('a', configs.sun.radius)} fill={configs.sun.color} />
        );
    }

    renderPlanets(offsetX, offsetY) {
        const planets = [];
        let orbit = configs.sun.radius;

        Object.keys(planetConfigs).forEach((name) => {
            const pl = getPlanetConfigs(name);

            orbit += configs.planets.space + pl.radius + (pl.space || 0);
            planets.push(<Planet
                    key={`planet_wrap_${name}`}
                    name={name}
                    setSolarCenter={this.setStage}
                    radius={this.getScaled('a', pl.radius)}
                    configs={pl}
                    mouse={this.props.position}
                    speed={this.state.speed}
                    angle={this.state.step * (1 / pl.angleStep)}
                    orbit={this.getScaled('a', orbit)}
                    solarX={this.state.solarX + offsetX}
                    solarY={this.state.solarY + offsetY}
                     />);
        });

        return planets;
    }

    render() {
        // @TODO implement smoooth mouse transitions with the solar system
        const offsetX = 0; // this.getScaled('w', ((window.innerWidth / 2) - this.props.position.x) / (window.innerWidth * 60));
        const offsetY = 0; // this.getScaled('h', ((window.innerHeight / 2) - this.props.position.y) / (window.innerHeight * 60));

        return (
            <Stage width={window.innerWidth} height={window.innerHeight}>
                <FastLayer style={{
                    animation: Radium.keyframes(slideInRight, 'slideright')
                }}>
                    {this.renderSun(offsetX, offsetY)}
                    {this.renderPlanets(offsetX, offsetY)}
                </FastLayer>
            </Stage>
        );
    }
}

const configs = {
    solarsystem: {
        solarX: 0.5,
        solarY: 0.5
    },
    sun: {
        radius: 0.09,
        color: '#F0D167'
    },
    planets: {
        space: 0.03
    }
};

SolarSystem.propTypes = {
    initialWidth: PropTypes.number.isRequired,
    initialHeight: PropTypes.number.isRequired,
    initialSolarX: PropTypes.number.isRequired,
    initialSolarY: PropTypes.number.isRequired,
    position: PropTypes.any.isRequired
};

export default Radium(SolarSystem);
