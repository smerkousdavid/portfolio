import React from 'react';
import Radium from 'radium';

import TextFit from 'react-textfit';
import autobind from 'autobind-decorator';
import {
    MdMail,
    MdPhoneAndroid
} from 'react-icons/md';

import {
    FaGithub,
    FaLinkedinIn
} from 'react-icons/fa';

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
                            Get In Touch
                        </TextFit>
                    </div>
                </Item>

                <ItemBorder style={cStyles.border} />

                <Item style={cStyles.tagline}>
                    <MdMail /> <a style={styles.tagText} href="mailto:david@smerkous.com?subject=I have some freelance work&body=Hi David,">david@smerkous.com</a>
                </Item>

                <Item style={cStyles.subtagline}>
                    <MdPhoneAndroid /> <a style={styles.tagText} href="tel:8014251681">(801)-425-1681</a>
                </Item>

                <Item style={cStyles.subtagline}>
                    <FaGithub /> <a style={styles.tagText} target="_blank" href="https://github.com/smerkousdavid">Github</a>
                </Item>

                <Item style={cStyles.subtagline}>
                    <FaLinkedinIn /> <a style={styles.tagText} target="_blank" href="https://www.linkedin.com/in/david-smerkous">Linkedin</a>
                </Item>
            </SlideIn>
        );

        this.addSlide(1, (pose) =>
            <SlideInRight pose={pose}>
                <div style={styles.rightContainer}>
                    <form id="contact" method="POST" action="https://formspree.io/david@smerkous.com">
                        <p style={{fontSize: '1.5em', textAlign: 'center', margin: '0 0 20px'}}>Contact Form</p>
                        <input type="text" name="name" placeholder="Your name" required />
                        <input type="email" name="email" placeholder="Your email" required />
                        <select name="reason" required>
                            <option value="" disabled selected hidden>Reason</option>
                            <option value="freelance">Freelance</option>
                            <option value="bugs">Bug Reporting</option>
                            <option value="recruiter">Recruiter</option>
                            <option value="other">Other</option>
                        </select>
                        <textarea name="message" placeholder="Your message" required></textarea>
                        <button type="submit">Send</button>
                    </form>
                </div>
            </SlideInRight>
        );
    }
    
    componentWillReceiveProps(nextProps) {
        const { destination, direction, callback } = nextProps.state;
        switch (callback) {
        case "onLeave":
            if(destination.index !== 2) {
                this.slideOut();
            }
            break;
        case "afterLoad":
            if(destination.index === 2) {
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
    onContact() {
        window.open('', '_blank').focus();
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

const styles = {
    rightContainer: {
        display: 'flex',
        flexDirection: 'column',
        margin: 0
    },
    tagText: {
        margin: 0,
        marginLeft: 10
    }
};

export default Radium(Content);
    