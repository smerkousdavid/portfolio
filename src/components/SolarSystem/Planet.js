import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';

import { Circle } from 'react-konva';


import { getPlanetPosition, closeTo } from './Util';
import autobind from 'autobind-decorator';

class Planet extends React.Component {
    constructor(props) {
        super(props);

        this.setSolarCenter = props.setSolarCenter;
        this.name = props.name;

        this.state = {
            orbitColor: configs.orbit.color
        }
    }

    renderOrbit(color) {
        return (
            <Circle
                key={`orbit_${this.name}`}
                x={this.props.solarX}
                y={this.props.solarY}
                fillEnabled={false}
                stroke={color}
                strokeWidth={1}
                radius={this.props.orbit} />
        );
    }

    @autobind
    onMouseOver() {
        this.setState({ orbitColor: configs.orbit.hoverColor });
    }

    @autobind
    onMouseLeave() {
        this.setState({ orbitColor: configs.orbit.color });
    }



    render() {
        if(closeTo(Math.sqrt(Math.pow(this.props.mouse.x - this.props.solarX, 2) + Math.pow(this.props.mouse.y - this.props.solarY, 2)), this.props.orbit, this.props.radius - 1)) {
            this.state.orbitColor = configs.orbit.hoverColor;
        } else {
            this.state.orbitColor = configs.orbit.color;
        }

        const cPos = getPlanetPosition(this.props.orbit, (this.props.angle + this.props.configs.angleInitial) % 360, this.props.solarX, this.props.solarY);
        
        return [
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
                radius={this.props.radius} />
        ];
    }
}

const configs = {
    orbit: {
        color: '#5b595a',
        hoverColor: '#993737' 
    },
    planet: {
        hoverMask: "#99373720",
        hoverBorderColor: '#993737'
    }
}

Planet.propTypes = {
    name: PropTypes.string.isRequired,
    setSolarCenter: PropTypes.func.isRequired,
    configs: PropTypes.any.isRequired,
    angle: PropTypes.number.isRequired,
    radius: PropTypes.number.isRequired,
    orbit: PropTypes.number.isRequired,
    solarX: PropTypes.number.isRequired,
    solarY: PropTypes.number.isRequired
};

export default Radium(Planet);
