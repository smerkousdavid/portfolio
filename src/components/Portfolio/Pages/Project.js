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
import Radium from 'radium';

import TextFit from 'react-textfit';

import { SlideIn, SlideInRight, Item, ItemBorder, Page, cStyles } from '../Common';

class Content extends Page {
    constructor(props) {
        super(props);

        this.initSlides();
        this.addSlide(0, (pose) =>
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
        );

        this.addSlide(1, (pose) =>
            <SlideInRight pose={pose}>
                <div style={cStyles.rightContainer}>
                    <img style={cStyles.showcase} src={require('imgs/phone.png')} alt="projects" />
                </div>
            </SlideInRight>
        );
    }

    componentWillReceiveProps(nextProps) {
        const { destination, callback } = nextProps.state;
        
        switch (callback) {
        case 'onLeave':
            if (destination.index !== 1) {
                this.slideOut();
            }
            break;
        case 'afterLoad':
            if (destination.index === 1) {
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
            <div style={cStyles.container}>
                {this.renderSlide()}
                {this.renderSlide(1)}
            </div>
        );
    }
}

export default Radium(Content);
