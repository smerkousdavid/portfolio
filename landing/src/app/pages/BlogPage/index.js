import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';
import Radium from 'radium';
import { Stage, Layer, Rect, Circle } from 'react-konva';
import ResizeDetector from 'react-resize-detector';
import CursorPosition from 'react-cursor-position';

import SolarSystem from 'app/components/SolarSystem/SolarSystem';

import { Desktop, Mobile, deviceSelect } from 'configs/Media';
import { SlideIn, Item, ItemBorder, Page, cStyles, FadeIn } from 'app/Common';
import { deviceRun } from 'configs/Media';
import { FaGithub, FaHSquare, FaFlask } from 'react-icons/fa';

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

export class BlogPage extends Page {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={styles.container}>
        <Helmet>
          <title>Blog</title>
          <meta name="description" content="David's blog" />
        </Helmet>
        <iframe style={styles.iframe} src="./static/blog" />
      </div>
    );
  }
}

const styles = {
  iframe: {
    width: '100%',
    height: '100vh',
  },
  profileItem: {
    display: 'flex',
    alignItems: 'center',
  },
  container: {
    margin: 0,
    padding: 0,
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
    marginTop: '10em',
    zIndex: 200,
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
    zIndex: 200,
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
    margin: 5,
    padding: 0,
    fontSize: '3em',
    textAlign: 'center',
    fontWeight: 600,
    fontStyle: 'bold',
    textShadow: 'rgb(255 255 255 / 10%) 0px 10px 30px',
  },
};

// HomePage.propTypes = {
//   api: PropTypes.any.isRequired,
// };

export default Radium(BlogPage);
