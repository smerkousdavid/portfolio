import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';
import Radium from 'radium';
import { Stage, Layer, Rect, Circle } from 'react-konva';
import ResizeDetector from 'react-resize-detector';
import CursorPosition from 'react-cursor-position';

import SolarSystem from 'app/components/SolarSystem/SolarSystem';
import Starfield from 'app/components/SolarSystem/Starfield';

import { Desktop, Mobile, deviceSelect } from 'configs/Media';
import { SlideIn, Item, ItemBorder, Page, cStyles, FadeIn } from 'app/Common';
import { deviceRun } from 'configs/Media';
import { FaGithub, FaHSquare, FaFlask, FaLinkedin, FaFlickr } from 'react-icons/fa';

// export function HomePage() {
//   return (
//     <>
//       <Helmet>
//         <title>HomePage</title>
//         <meta name="description" content="A Boilerplate application homepage" />
//       </Helmet>
//       <span>My HomePage</span>
//     </>
//   );
// }

const links = (styles) => (
  <Item style={styles.logos}>
    <a target='_blank' href="https://dlmp.uw.edu/research-labs/najafian" style={styles.logoItem}><FaFlask /></a>
    <a target='_blank' href="https://github.com/smerkousdavid" style={styles.logoItem}><FaGithub /></a>
    <a target='_blank' href="https://www.linkedin.com/in/david-smerkous/" style={styles.logoItem}><FaLinkedin /></a>
    <a target='_blank' href="https://www.hackster.io/smerkousdavid" style={styles.logoItem}><FaHSquare /></a>
    <a target='_blank' href="https://www.flickr.com/photos/187731729@N06/" style={styles.logoItem}><FaFlickr /></a>
  </Item>
);

export class HomePage extends Page {
  constructor(props) {
    super(props);

    this.solarX = 0.5;
    this.solarY = 0.5;
    this.solarRatio = deviceSelect({
      desktop: 0.2,
      mobile: 0.85,
    });

    this.initSlides();
    this.addSlide(0, pose => (
      <div>
        <Desktop>
          <SlideIn style={styles.bigContainer} pose={pose}>
            <Item style={styles.profileItem}>
              <img
                style={styles.profile}
                src={require('imgs/profile.png')}
                alt="profile"
              />

              <div style={styles.bigTextContainer}>
                <p style={styles.bigText}>David</p>
                <p style={styles.bigText}>Smerkous</p>
              </div>
            </Item>

            <ItemBorder style={styles.border} />

            <Item style={styles.tagline}>
              AI Ph.D. Student <br></br>
              Oregon State University
            </Item>

            { links(styles) }

            <Item style={styles.buttonContainer}>
              <a
                className="link-button"
                style={cStyles.button}
                href="/posts"
                // onClick={() => this.props.api.moveTo('home', 1)}
              >
                Posts
              </a>
            </Item>
          </SlideIn>
        </Desktop>
        <Mobile>
          <FadeIn style={styles.bigContainerMobile} pose={pose}>
            <img
              style={styles.profileMobile}
              src={require('imgs/profile.png')}
              alt="profile"
            />

            <div style={styles.bigTextContainerMobile}>
              <p style={styles.bigTextMobile}>David</p>
              <p style={styles.bigTextMobile}>Smerkous</p>
            </div>

            <div style={styles.borderMobile} />

            <div style={styles.taglineMobile}>
              AI Ph.D. Student <br></br>
              Oregon State University
            </div>

            { links(styles) }

            <a
              className="link-button"
              style={cStyles.buttonMobile}
              href="/posts"
              // onClick={() => this.props.api.moveTo('home', 1)}
            >
              Posts
            </a>
          </FadeIn>
        </Mobile>
      </div>
    ));

    this.resizeSolarSystem = this._resizeSolarSystem.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.solarSystem === undefined) return;

    const { destination, direction, callback } = nextProps.state;

    switch (callback) {
      case 'onLeave':
        if (destination.index === 1 && direction === 'down') {
          deviceRun({
            desktop: () => {
              this.setSolarSystem(
                2,
                this.solarY,
                this.solarRatio - 0.2,
                500,
                () => {
                  this.solarSystem.stopRotation();
                },
              );
            },
            mobile: () => {
              this.setSolarSystem(
                this.solarX,
                -0.1,
                this.solarRatio - 0.3,
                500,
                () => {
                  this.solarSystem.stopRotation();
                },
              );
            },
          });

          this.slideOut();
        }
        break;
      case 'afterLoad':
        if (destination.index === 0 && direction === 'up') {
          this.solarSystem.resetRotation();
          this.setSolarSystem(
            this.solarX,
            this.solarY,
            this.solarRatio,
            500,
            () => {
              this.slideIn();
            },
          );
        }
        break;
      default:
        break;
    }
  }

  componentDidMount() {
    this.slideOut();
    this.setSolarSystem(
      this.solarX,
      this.solarY,
      this.solarRatio,
      null,
      null,
      3,
      1,
    );

    setTimeout(() => {
      // Update the solarsystem ratios
      deviceRun({
        desktop: () => {
          this.solarX = 0.75;
          this.solarY = 0.65;
          this.solarRatio = 0.95;
        },
        mobile: () => {
          this.solarX = 0.5;
          this.solarY = 1.0;
          this.solarRatio = 0.9;
        },
      });

      if (this.solarSystem !== undefined && this.solarSystem !== null) {
        this.setSolarSystem(
          this.solarX,
          this.solarY,
          this.solarRatio,
          400,
          () => {
            this.solarSystem.resetRotation();
            this.slideIn();
          },
          this.solarSystem.defaultSpeed / this.solarSystem.defaultUpdate,
        );
      }
      // this.setState({ visible: true });
    }, 1000);
    // this.resizeSolarSystem();
    // this.solarSystem.transitionTo(thi)
    // const ratio = this.getScaled('a', 0.75);
    // this.solarSystem.setStage(this.getScaled('w', 0.7), this.getScaled('h', 0.6), ratio, ratio, 100, () => {
    //    console.log('done!');
    // });
  }

  _resizeSolarSystem() {
    this.setSolarSystem(this.solarX, this.solarY, this.solarRatio);
  }

  setSolarSystemUpdate(speed, period) {
    if (this.solarSystem !== undefined) {
      this.solarSystem.setUpdateRate(speed, period);
    }
  }

  setSolarSystem(solarX, solarY, scaled, millis, callback, speed, period) {
    if (this.solarSystem === undefined) return;

    if (period) this.setSolarSystemUpdate(speed, period);
    const ratio = this.getScaled('a', scaled);

    this.solarSystem.setStage(
      this.getScaled('w', solarX),
      this.getScaled('h', solarY),
      ratio,
      ratio,
      millis,
      callback,
      speed,
    );
  }

  getScaled(type, scale) {
    switch (type) {
      case 'w':
        return window.innerWidth * scale;
      case 'h':
        return window.innerHeight * scale;
      case 'a':
        return window.innerWidth < window.innerHeight
          ? this.getScaled('w', scale)
          : this.getScaled('h', scale);
      default:
        return 0;
    }
  }

  onMouseMove(event) {
    if (this.solarSystem === undefined || this.solarSystem === null) return;

    // update "state" (interval will capture this prop)
    this.solarSystem.mouse = {
      x: event.clientX,
      y: event.clientY,
    };
    return true;
  }

  onClick(event) {
    if (this.solarSystem === undefined || this.solarSystem === null) return;

    // update "state" (interval will capture this prop)
    this.solarSystem.clicked = true;
    return true;
  }

  render() {
    return (
      <>
        <Starfield 
          starCount={1000}
          starColor={[255, 255, 255]}
          speedFactor={0.01}
          backgroundColor="black"
        />
        <div style={styles.container} onMouseMove={e => this.onMouseMove(e)} onClick={(e) => this.onClick(e)}>
        {this.renderSlide()}
        <SolarSystem
          ref={ref => (this.solarSystem = ref)}
          initialWidth={this.getScaled('a', this.solarX)}
          initialHeight={this.getScaled('a', this.solarY)}
          initialSolarX={this.getScaled('a', this.solarRatio)}
          initialSolarY={this.getScaled('a', this.solarRatio)}
        />
        <ResizeDetector
          resizableElementId="root"
          handleWidth
          handleHeight
          onResize={this.resizeSolarSystem}
        />
        <div
          style={styles.attribution}
        ><a 
          style={{
            color: 'rgb(24, 24, 24)'
          }}
          target='_blank'
          href="https://www.flaticon.com/authors/monkik" title="planet icons attribution">icons by monkik</a></div>
      </div>
      </>
    );
  }
}

const styles = {
  profileItem: {
    display: 'flex',
    alignItems: 'center',
  },
  container: {
    margin: 0,
    padding: 0,
  },
  buttonContainer: {
    marginTop: '1.1rem'
  },
  attribution: {
    position: 'absolute',
    zIndex: 1,
    left: 5,
    bottom: 2,
    color: 'black'
  },
  logos: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'start',
    alignItems: 'center',
    paddingTop: '0.8rem'
  },
  logoItem: {
    display: 'inline-flex',
    marginRight: '0.5rem',
    fontSize: '1.2rem'
  },
  profile: {
    display: 'inline-block',
    borderRadius: '50%',
    width: 200,
    height: 200,
    boxShadow: 'rgb(255 255 255 / 10%) 0px 10px 30px',
  },
  profileMobile: {
    borderRadius: '50%',
    width: '45vw',
    height: '45vw',
    boxShadow: 'rgb(255 255 255 / 10%) 0px 10px 30px',
  },
  mockup: {
    right: '10%',
    bottom: '10%',
    height: '20%',
    width: '30%',
  },
  border: {
    display: 'block',
    width: '20%',
    borderRadius: 8,
    height: '5px',
    marginTop: 30,
    backgroundColor: '#bb3e03',
  },
  borderMobile: {
    display: 'block',
    width: '25%',
    borderRadius: 10,
    height: '5px',
    marginTop: 10,
    backgroundColor: '#bb3e03',
  },
  tagline: {
    fontSize: '1.8em',
    marginTop: 30,
  },
  taglineMobile: {
    fontSize: '1.1em',
    textAlign: 'center',
    marginTop: 20,
  },
  bigContainer: {
    display: 'inline-block',
    listStyle: 'none',
    position: 'fixed',
    marginLeft: '5vw',
    marginTop: '13vh',
    zIndex: 1,
  },
  bigContainerMobile: {
    display: 'flex',
    position: 'fixed',
    listStyle: 'none',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
    marginTop: '10%',
    zIndex: 1,
  },
  bigTextContainer: {
    display: 'inline-block',
    marginLeft: 40,
  },
  bigTextContainerMobile: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  bigText: {
    margin: 5,
    padding: 0,
    fontSize: '5em',
    fontWeight: 600,
    fontStyle: 'bold',
    textShadow: 'rgb(255 255 255 / 10%) 0px 10px 30px',
    zIndex: 200,
  },
  bigTextMobile: {
    margin: 0,
    marginLeft: 5,
    marginRight: 5,
    padding: 0,
    fontSize: '2.8em',
    textAlign: 'center',
    fontWeight: 600,
    fontStyle: 'bold',
    textShadow: 'rgb(255 255 255 / 10%) 0px 10px 30px',
  },
};

// HomePage.propTypes = {
//   api: PropTypes.any.isRequired,
// };

export default Radium(HomePage);
