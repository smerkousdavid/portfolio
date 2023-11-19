/*
 * Copyright (c) 2018 David Smerkous.
 *
 * Util.js is part of David's portfolio
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
export const getPlanetPosition = (orbitRadius, angle, solarX, solarY) => {
  const rad = -Math.PI * (angle / 180);
  // orbitRadius = this.scaleW(orbitRadius);

  return [
    orbitRadius * Math.cos(rad) + solarX,
    orbitRadius * Math.sin(rad) + solarY,
  ];
};

export const closeTo = (num1, num2, theta) => Math.abs(num1 - num2) < theta;

export const getPlanetConfigs = name => planetConfigs[name];

const buildImage = source => {
  const image = new window.Image();
  image.src = source.default;
  return image;
};

export const sunImage = buildImage(require('imgs/planets/sun.svg'));

export const planetConfigs = {
  mercury: {
    orbit: 0.11,
    radius: 0.005,
    space: -0.002,
    color: '#8F4700',
    imageSrc: require('imgs/planets/mercury.svg').default,
    image: buildImage(require('imgs/planets/mercury.svg')),
    angleStep: 0.241,
    angleInitial: 0,
    facts: {
      planet: 'Mercury',
      orbit: 0.2,
      diameter: 4879,
      surface: 333,
      au: 0.387,
      moons: 'none',
      site: 'https://space-facts.com/mercury/'
    }
  },
  venus: {
    orbit: 0.145,
    radius: 0.009,
    space: -0.003,
    color: '#FD6D0C',
    angleStep: 0.6152,
    imageSrc: require('imgs/planets/venus.svg').default,
    image: buildImage(require('imgs/planets/venus.svg')),
    angleInitial: 10,
    facts: {
      planet: 'Venus',
      orbit: 0.6,
      diameter: 12104,
      surface: 867,
      au: 0.722,
      moons: 'none',
      site: 'https://space-facts.com/venus/'
    }
  },
  earth: {
    orbit: 0.19,
    radius: 0.014,
    color: '#0072E1',
    imageSrc: require('imgs/planets/earth.svg').default,
    image: buildImage(require('imgs/planets/earth.svg')),
    angleStep: 1,
    angleInitial: 90,
    facts: {
      planet: 'Earth',
      orbit: 1,
      diameter: 12756,
      surface: 59,
      au: 1.0,
      moons: 'one',
      site: 'https://space-facts.com/earth/'
    }
  },
  mars: {
    orbit: 0.23,
    radius: 0.011,
    color: '#FF2D00',
    imageSrc: require('imgs/planets/mars.svg').default,
    image: buildImage(require('imgs/planets/mars.svg')),
    angleStep: 2,
    angleInitial: 270,
    facts: {
      planet: 'Mars',
      orbit: 1.9,
      diameter: 6779,
      surface: -85,
      au: 1.52,
      moons: 2,
      site: 'https://space-facts.com/mars/'
    }
  },
  jupiter: {
    orbit: 0.3,
    radius: 0.034,
    color: '#FAC081',
    imageSrc: require('imgs/planets/jupiter.svg').default,
    image: buildImage(require('imgs/planets/jupiter.svg')),
    angleStep: 11.8618,
    angleInitial: 180,
    facts: {
      planet: 'Jupiter',
      orbit: 11.9,
      diameter: 142984,
      surface: -166,
      au: 5.2,
      moons: 95,
      site: 'https://space-facts.com/jupiter/'
    }
  },
  saturn: {
    orbit: 0.39,
    radius: 0.029,
    space: 0.02,
    color: '#FFB466',
    imageSrc: require('imgs/planets/saturn.svg').default,
    image: buildImage(require('imgs/planets/saturn.svg')),
    adjustScale: 1.1,
    angleStep: 29.5,
    angleInitial: 10,
    facts: {
      planet: 'Saturn',
      orbit: 29.5,
      diameter: 120536,
      surface: -220,
      au: 9.58,
      moons: 146,
      site: 'https://space-facts.com/saturn/'
    }
  },
  uranus: {
    orbit: 0.46,
    radius: 0.018,
    space: 0.016,
    color: '#80BAF9',
    imageSrc: require('imgs/planets/uranus.svg').default,
    image: buildImage(require('imgs/planets/uranus.svg')),
    angleStep: 84,
    angleInitial: 80,
    facts: {
      planet: 'Uranus',
      orbit: 84,
      diameter: 50724,
      surface: -320,
      au: 19.2,
      moons: 27,
      site: 'https://space-facts.com/uranus/'
    }
  },
  neptune: {
    orbit: 0.5,
    radius: 0.009,
    space: 0.0045,
    color: '#3E6E9F',
    imageSrc: require('imgs/planets/neptune.svg').default,
    image: buildImage(require('imgs/planets/neptune.svg')),
    angleStep: 164.8,
    angleInitial: 165,
    facts: {
      planet: 'Neptune',
      orbit: 164.8,
      diameter: 49244,
      surface: -330,
      au: 30.1,
      moons: 14,
      site: 'https://space-facts.com/neptune/'
    }
  },
};
