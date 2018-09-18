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
import React from 'react';
import Radium from 'radium';

import TextFit from 'react-textfit';
import autobind from 'autobind-decorator';

import { SlideIn, SlideInRight, Item, ItemBorder, Page, cStyles } from '../Common';

class Content extends Page {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
        const { destination, direction, callback } = nextProps.state;
        switch (callback) {
        case "onLeave":
            if(destination.index !== 1) {
            }
            break;
        case "afterLoad":
            if(destination.index === 1) {
            }
            break;
        };
    }

    render() {
        return (
            <div style={styles.container}>
                <img style={styles.background} src={require('imgs/background.jpg')} />
                <div style={styles.header}>
                    <p style={styles.headerText}>About Me</p>
                </div>
            </div>
        );
        // 
    }
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        alignContent: 'stretch',
        width: '100vw',
        height: '100vh'
    },
    header: {
        display: 'flex',
        paddingTop: '10vh',
        backgroundColor: '#222222',
        color: '#fff',
        fontSize: '2em',
        alignContent: 'stretch'
    },
    headerText: {
        textAlign: 'center',
        width: '100vw',
        backgroundColor: '#111111',
        margin: 0,
        padding: 20
    },
    background: {
        width: '100vw',
        height: '100vh',
        objectFit: 'cover',
        filter: 'blur(3px) grayscale(100%)',
        transform: 'scale(1.05)'
    }
};

export default Radium(Content);
