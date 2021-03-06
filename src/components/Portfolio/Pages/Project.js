/*
 * Copyright (c) 2018 David Smerkous.
 * 
 * Project.js is part of David's portfolio 
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

import TextFit from 'react-textfit';

import { Desktop, Mobile, deviceSelect } from 'media';
import { SlideIn, SlideInRight, Item, ItemBorder, Page, cStyles, FadeIn } from '../Common';
import { deviceRun } from 'configs/Media';

class Content extends Page {
    constructor(props) {
        super(props);

        this.initSlides();
        this.addSlide(0, (pose) =>
          <div>
            <Desktop>
              <SlideIn style={cStyles.bigContainer} pose={pose}>
                <Item>
                  <div style={cStyles.bigTextContainer}>
                    <TextFit
                      mode="single"
                      forceSingleModeWidth={false}
                      style={cStyles.bigText}>
                      Projects
                    </TextFit>
                  </div>
                </Item>

                <ItemBorder style={cStyles.border} />

                <Item style={cStyles.tagline}>
                  Stuff that I am working on
                </Item>

                <Item>
                  <button style={cStyles.button} onClick={() => this.props.api.moveTo('project', 1)}>Explore</button>
                </Item>
              </SlideIn>
            </Desktop>
            <Mobile>
              <FadeIn style={cStyles.bigContainerMobile} pose={pose}>
                <div style={cStyles.bigTextContainerMobile}>
                  <TextFit
                    mode="single"
                    forceSingleModeWidth={true}
                    style={cStyles.bigTextMobile}>
                    Projects
                  </TextFit>
                </div>
                <div style={cStyles.borderMobile} />
                <div style={cStyles.taglineMobile}>
                  Stuff that I am working on
                </div>
                <button style={cStyles.button} onClick={() => this.props.api.moveTo('project', 1)}>Explore</button>
              </FadeIn>
            </Mobile>
          </div>
        );

        this.addSlide(1, (pose) =>
          <div>
            <Desktop>
              <SlideInRight pose={pose}>
                <div style={cStyles.rightContainer}>
                  <img style={cStyles.showcase} src={require('imgs/phone.png')} alt="projects" />
                </div>
              </SlideInRight>
            </Desktop>
            <Mobile>
              <FadeIn pose={pose}>
                <img style={cStyles.showcaseMobile} src={require('imgs/phone.png')} alt="projects" />
              </FadeIn>
            </Mobile>
          </div>
        );
    }

    componentWillReceiveProps(nextProps) {
      const { origin, destination, callback } = nextProps.state;

      switch (callback) {
      case 'onLeave':
        if (destination.index !== 1) {
          this.slideOut();
        }
        break;
      case 'afterLoad':
        if (destination.index === 1) {
          // @TODO fix this horrible viewport shift hack (avoidance by reloading the project's section without shifting the view :/)
          deviceRun({
            mobile: () => {
              if ((origin || {}).index === 2) {
                setTimeout(() => {
                  location.reload(true);
                }, 100);
              }
            }
          });

          this.slideIn();
          this.slideIn(1);
        }
        break;
      default:
        break;
      }
    }

    componentDidMount() {
        this.slideOut();
        this.slideOut(1);
    }

    render() {
      return (
          <div>
            <div style={deviceSelect({ desktop: cStyles.container, mobile: cStyles.containerMobile })}>
              {this.renderSlide()}
              {this.renderSlide(1)}
            </div>
          </div>
      );
    }
}

Content.propTypes = {
  api: PropTypes.any
};

export default Radium(Content);
