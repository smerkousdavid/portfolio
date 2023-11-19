/*
 * Copyright (c) 2018 David Smerkous.
 *
 * Planet.js is part of David's portfolio
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
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';

import { Circle, Image } from 'react-konva';
import { Html } from 'react-konva-utils';

import { isMobile } from 'configs/Media';
import { getPlanetPosition, closeTo } from './Util';
import styled from 'styled-components/macro';


const propTypes = {
  name: PropTypes.string.isRequired,
  setSolarCenter: PropTypes.func.isRequired,
  configs: PropTypes.any.isRequired,
  angle: PropTypes.number.isRequired,
  radius: PropTypes.number.isRequired,
  orbit: PropTypes.number.isRequired,
  solarX: PropTypes.number.isRequired,
  solarY: PropTypes.number.isRequired,
  mouse: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }),
};

// type PlanetProps = PropTypes.InferProps<typeof propTypes>;
// type PlanetState = {
//   orbitColor: string;
// };

// <PlanetProps, PlanetState>
// state: PlanetState = {
//   orbitColor: '#000000',
// };
// public static propTypes = {};
// name: string = 'planet';
// setSolarCenter: Function = () => null;

const buildFacts = (src, facts) => (
  <Description>
    <Pair>
      <img src={src} />
      <Title>{facts.planet}</Title>
    </Pair>
    <p>Facts</p>
    <Divider></Divider>
    <table>
      <colgroup>
        <col span={1} style={{width: '50%'}} />
        <col span={1} style={{width: '50%'}} />
      </colgroup>
      <tbody>
        <tr>
          <td className="key"><b>Orbit Period:</b></td>
          <td className="value"><span>{facts.orbit} years</span></td>
        </tr>
        <tr>
          <td className="key"><b>Orbit:</b></td>
          <td className="value"><span>{facts.au} AU</span></td>
        </tr>
        <tr>
          <td className="key"><b>Diameter:</b></td>
          <td className="value"><span>{facts.diameter} km</span></td>
        </tr>
        <tr>
          <td className="key"><b>Moons:</b></td>
          <td className="value"><span>{facts.moons}</span></td>
        </tr>
        <tr>
          <td className="key"><b>Avg Surface Temp:</b></td>
          <td className="value"><span>{facts.surface} F</span></td>
        </tr>
      </tbody>
    </table>
    {/* <div className="fact-stuff">
      <ul className="facts">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <ul className="fact-values">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div> */}
    {/* <a target="_blank" href={facts.site}>
      Learn More
    </a> */}
    <a>Click Planet to Learn More</a>
  </Description>
);


class Planet extends React.Component {
  constructor(props) {
    super(props);

    this.setSolarCenter = props.setSolarCenter;
    this.name = props.name;
    this.prevAngle = null;
    this.inAnimation = false;
    this.angleStep = 1;

    this.state = { orbitColor: configs.orbit.color };
  }

  renderOrbit(color) {
    return (
      <Circle
        key={`orbit_${this.name}`}
        x={this.props.solarX}
        y={this.props.solarY}
        fillEnabled={false}
        stroke={color}
        strokeWidth={1.5}
        radius={this.props.orbit}
      />
    );
  }

  /* eslint-disable */
  /* onMouseOver() {
        this.setState({ orbitColor: configs.orbit.hoverColor });
    }

    onMouseLeave() {
        this.setState({ orbitColor: configs.orbit.color });
    } */
  /* eslint-enable */

  render() {
    /* eslint-disable */
    let cPos = [0, 0];
    let radius = Math.sqrt(
      Math.pow(this.props.mouse.x - this.props.solarX, 2) +
        Math.pow(this.props.mouse.y - this.props.solarY, 2),
    );
    let inMouse = closeTo(radius, this.props.orbit, this.props.radius + 3);
    let targetAngle =
      (this.props.angle + this.props.configs.angleInitial) % 360;

    // is the mouse within orbit range?
    if (inMouse) {
      this.inAnimation = true; // we animate/move when inside mouse
      // jump to closest cursor orbit
      // project onto unit sphere and scale up by orbit
      cPos = [
        (this.props.mouse.x - this.props.solarX) / radius,
        (this.props.mouse.y - this.props.solarY) / radius,
      ];

      // cacluate angle
      targetAngle = (-(Math.atan2(cPos[1], cPos[0]) / Math.PI) * 180) % 360;
      this.state.orbitColor = configs.orbit.hoverColor;
    } else {
      this.state.orbitColor = configs.orbit.color;
    }

    if (this.inAnimation) {
      this.prevAngle = this.prevAngle % 360;

      // correct angles from arctan/prev to be all positive locations
      let angle = targetAngle;
      if (angle < 0) angle = 360 + angle;
      if (this.prevAngle < 0) this.prevAngle = 360 + this.prevAngle;

      let stepAngle = angle;
      if (Math.abs(this.prevAngle - angle) < this.angleStep) {
        stepAngle = angle;

        // we've reached target
        // if not in mouse then stop animation to target
        if (!inMouse) this.inAnimation = false; // go back to normal speed
      } else {
        if (Math.abs(this.prevAngle - angle) < 180) {
          // pick smallest path
          stepAngle =
            this.prevAngle +
            Math.max(
              Math.min(angle - this.prevAngle, this.angleStep),
              -this.angleStep,
            );
        } else {
          stepAngle =
            this.prevAngle -
            Math.max(
              Math.min(angle - this.prevAngle, this.angleStep),
              -this.angleStep,
            );
        }

        if (stepAngle < 0) stepAngle = 360 + stepAngle;
      }

      // normal rotation
      cPos = getPlanetPosition(
        this.props.orbit,
        stepAngle % 360,
        this.props.solarX,
        this.props.solarY,
      );

      this.prevAngle = stepAngle;
    } else {
      // normal rotation
      cPos = getPlanetPosition(
        this.props.orbit,
        targetAngle,
        this.props.solarX,
        this.props.solarY,
      );
      this.prevAngle = targetAngle;
    }
    /* eslint-enable */
    const adj = this.props.configs.adjustScale || 1.0;
    const isLoaded = this.props.configs.image.width > 0;

    // determine if the mouse is within the planet
    let distToPlanet = Math.sqrt(
      Math.pow(this.props.mouse.x - cPos[0], 2) +
        Math.pow(this.props.mouse.y - cPos[1], 2),
    );
    let inMousePlanet = distToPlanet < this.props.radius + 3;

    let objs = [];
    if (isLoaded) {
      objs = [
        this.renderOrbit(this.state.orbitColor),
        <Circle
          key={`planet_${this.name}`}
          x={cPos[0]}
          y={cPos[1]}
          // image={this.props.configs.image}
          fillEnabled={true}
          // fill={this.props.configs.color}
          fillPatternImage={this.props.configs.image}
          fillPatternOffsetX={this.props.configs.image.width / 2}
          fillPatternOffsetY={this.props.configs.image.height / 2}
          fillPatternScaleX={
            (adj * (2 * this.props.radius)) / this.props.configs.image.width
          }
          fillPatternScaleY={
            (adj * (2 * this.props.radius)) / this.props.configs.image.width
          }
          fillPatternRepeat="no-repeat"
          strokeWidth={Math.min(Math.max(this.props.radius * 0.1, 4), 6)}
          strokeEnabled={this.state.orbitColor !== configs.orbit.color}
          stroke={configs.planet.hoverBorderColor}
          radius={this.props.radius}
          // width={this.props.radius * 2}
          // height={this.props.radius * 2}
        />,
      ];
    } else {
      // otherwise fill color while image is loading
      objs = [
        this.renderOrbit(this.state.orbitColor),
        <Circle
          key={`planet_${this.name}`}
          x={cPos[0]}
          y={cPos[1]}
          fillEnabled={true}
          fill={this.props.configs.color}
          strokeWidth={Math.min(Math.max(this.props.radius * 0.1, 4), 6)}
          strokeEnabled={this.state.orbitColor !== configs.orbit.color}
          stroke={configs.planet.hoverBorderColor}
          radius={this.props.radius}
        />,
      ];
    }

    // add html description element
    if (inMousePlanet) {
      const item = document.getElementById('root');
      const w = item.clientWidth;
      const h = item.clientHeight;
      let xFix = Math.min(w * 0.7, cPos[0] + 10 + this.props.radius);
      let yFix = Math.min(h * 0.45, cPos[1]);

      // fix for mobile so it doesn't render off-screen
      if (isMobile()) {
        xFix = 0.05 * w;
        yFix = h / 3.5;
      }

      objs.push(
        <Html
          key={`planet_${this.name}_desc`}
          transform={true}
          transformFunc={attrs => ({
            x: xFix,
            y: yFix,
            scaleX: 1.0,
            scaleY: 1.0,
            rotation: 0.0,
            skewX: 0.0,
            skewY: 0.0,
          })}
        >
          {
            buildFacts(this.props.configs.imageSrc, this.props.configs.facts)
          }
        </Html>,
      );

      // planet was clicked on
      // let's open the stats page
      if (this.props.clicked) {
        window.open(this.props.configs.facts.site, '_blank');
      }
    }

    return objs;
  }
}

const configs = {
  orbit: {
    color: '#5b595a',
    hoverColor: '#993737',
  },
  planet: {
    hoverMask: '#99373720',
    hoverBorderColor: '#993737',
  },
};


const Description = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex-wrap: wrap;
  min-height: 320px;
  background-color: #001219;
  max-width: max-content;
  max-height: max-content;
  padding-bottom: 0.5rem;
  border-color: #0a2733;
  border-radius: 1.5rem;
  border-width: 0.3rem;
  border-style: solid;
  /* color: white; */

  > p {
    font-size: 2em;
    margin: 0;
    margin-top: 0.3rem;
    color: #e9d8a6;
  }

   ul {
    list-style-type: none;
    list-style-position: unset;
  }

  table {
    margin: 1rem;
    table-layout: fixed;
    /* min-width: 20rem; */

    .key {
      text-align: end;
      padding-right: 0.5rem;
    }

    .value {
      text-align: start;
      padding-left: 0.5rem;
    }
  }

  /* li {
    justify-content: space-evenly;
  } */

  b {
    font-size: 1.2rem;
    font-weight: 700;
    color: #ffae87;
  }

  /* > a {
    padding: 6px 13px;
    color: #e9d8a6;
    font-size: 0.9em;
    font-weight: 500;
    background-color: transparent;
    border: 2px solid #e9d8a6;
    border-radius: 50px;
    transition: color .2s ease-in-out, background-color .2s ease-in-out;
    cursor: pointer;
  }

  > a:hover {
    color: #001219;
    background-color: #e9d8a6;
    opacity: 1.0;
  }

  > a:focus {
    outline: 0;
  } */
`;

const Pair = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  align-content: center;
  flex-wrap: wrap;
  background-color: #002331;
  width: 100%;
  height: 100%;
  padding: 1rem;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;

  > img {
    margin-right: min(2rem, 8vw);
    height: min(6rem, 10vh);
  }
`

const Divider = styled.div`
  width: 20%;
  height: 0.3rem;
  background-color: #bb3e03;
  border-radius: 0.5rem;
`

const Title = styled.h2`
  font-weight: bold;
  font-size: 3rem;
  text-align: center;
  color: white;
  border-bottom-color: #bb3e03;
  border-bottom-style: solid;
  border-bottom-width: 3px;
`;



Planet.propTypes = propTypes;

export default Radium(Planet);
