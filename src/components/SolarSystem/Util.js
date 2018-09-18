export const getPlanetPosition = (orbitRadius, angle, solarX, solarY) => {
    const rad = -Math.PI * (angle / 180);
    // orbitRadius = this.scaleW(orbitRadius);

    return [
        (orbitRadius * Math.cos(rad)) + solarX,
        (orbitRadius * Math.sin(rad)) + solarY
    ];
};

export const closeTo = (num1, num2, theta) => (Math.abs(num1 - num2) < theta);

export const getPlanetConfigs = (name) => planetConfigs[name];

export const planetConfigs = {
    mercury: {
        orbit: 0.11,
        radius: 0.005,
        space: -0.002,
        color: '#8F4700',
        angleStep: 0.241,
        angleInitial: 0
    },
    venus: {
        orbit: 0.145,
        radius: 0.009,
        space: -0.003,
        color: '#FD6D0C',
        angleStep: 0.6152,
        angleInitial: 10
    },
    earth: {
        orbit: 0.19,
        radius: 0.014,
        color: '#0072E1',
        angleStep: 1,
        angleInitial: 90
    },
    mars: {
        orbit: 0.23,
        radius: 0.011,
        color: '#FF2D00',
        angleStep: 2,
        angleInitial: 270
    },
    jupiter: {
        orbit: 0.3,
        radius: 0.034,
        color: '#FAC081',
        angleStep: 11.8618,
        angleInitial: 180
    },
    saturn: {
        orbit: 0.39,
        radius: 0.029,
        space: 0.02,
        color: '#FFB466',
        angleStep: 29.5,
        angleInitial: 10
    },
    uranus: {
        orbit: 0.46,
        radius: 0.018,
        space: 0.016,
        color: '#80BAF9',
        angleStep: 84,
        angleInitial: 80
    },
    neptune: {
        orbit: 0.5,
        radius: 0.009,
        space: 0.0045,
        color: '#3E6E9F',
        angleStep: 164.8,
        angleInitial: 165
    }
};
