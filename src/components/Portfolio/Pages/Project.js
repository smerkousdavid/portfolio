import React from 'react';
import Radium from 'radium';

import TextFit from 'react-textfit';
import autobind from 'autobind-decorator';

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
                    <button style={cStyles.button} onClick={this.onExplore}>Explore</button>
                </Item>
            </SlideIn>
        );

        this.addSlide(1, (pose) =>
            <SlideInRight pose={pose}>
                <div style={cStyles.rightContainer}>
                    <img style={cStyles.showcase} src={require('imgs/phone.png')} />
                </div>
            </SlideInRight>
        );
    }

    componentWillReceiveProps(nextProps) {
        const { destination, direction, callback } = nextProps.state;
        switch (callback) {
        case "onLeave":
            if(destination.index !== 1) {
                this.slideOut();
            }
            break;
        case "afterLoad":
            if(destination.index === 1) {
                this.slideIn();
                this.slideIn(1);
            }
            break;
        };
    }

    componentDidMount() {
        this.slideOut();
        this.slideOut(1);
    }

    @autobind
    onExplore() {
        /*
         *                  <div className="slide">
              <h3>Slide 2.1</h3>
            </div>
            <div className="slide">
              <h3>Slide 2.2</h3>
            </div>
            <div className="slide">
              <h3>Slide 2.3</h3>
            </div>
         */
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
