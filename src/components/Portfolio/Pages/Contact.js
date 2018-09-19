/*
 * Copyright (c) 2018 David Smerkous.
 * 
 * Contact.js is part of David's portfolio 
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
import React from 'react';
import Radium from 'radium';

import TextFit from 'react-textfit';
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
                    <FaGithub /> <a style={styles.tagText} target="_blank" rel="noopener noreferrer" href="https://github.com/smerkousdavid">Github</a>
                </Item>

                <Item style={cStyles.subtagline}>
                    <FaLinkedinIn /> <a style={styles.tagText} target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/david-smerkous">Linkedin</a>
                </Item>
            </SlideIn>);

        this.addSlide(1, (pose) =>
            <SlideInRight pose={pose}>
                <div style={styles.rightContainer}>
                    <form id="contact" method="POST" action="https://formspree.io/david@smerkous.com">
                        <p style={styles.formTitle}>Contact Form</p>
                        <input type="text" name="name" placeholder="Your name" required />
                        <input type="email" name="email" placeholder="Your email" required />
                        <select name="reason" defaultValue="" required>
                            <option value="" disabled hidden>Reason</option>
                            <option value="freelance">Freelancing</option>
                            <option value="bugs">Bug Reporting</option>
                            <option value="recruiter">Recruiting</option>
                            <option value="other">Other</option>
                        </select>
                        <textarea name="message" placeholder="Your message" required></textarea>
                        <button type="submit">Send</button>
                    </form>
                </div>
            </SlideInRight>);
    }
    
    componentWillReceiveProps(nextProps) {
        const { destination, callback } = nextProps.state;
        
        switch (callback) {
        case 'onLeave':
            if (destination.index !== 2) {
                this.slideOut();
            }
            break;
        case 'afterLoad':
            if (destination.index === 2) {
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

const styles = {
    rightContainer: {
        display: 'flex',
        flexDirection: 'column',
        margin: 0
    },
    tagText: {
        margin: 0,
        marginLeft: 10
    },
    formTitle: {
        fontSize: '1.5em',
        textAlign: 'center',
        margin: '0 0 20px'
    }
};

export default Radium(Content);
