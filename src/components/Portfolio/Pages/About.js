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

import Colors from 'configs/Colors';

class Content extends React.Component {
    /* componentWillReceiveProps(nextProps) {
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
    }*/

    render() {
        return (
            <div style={styles.container}>
                <div style={styles.center}>
                    <p style={styles.bigText}>About Me</p>
                    <p style={styles.content}>
                        I am currently a freshman student at the University of Washington perusing a degree in Computer Science. 
                        Most of my work has been private consulting and freelancing for individual projects. However, throughout 
                        high school I got the chance to work with closely with the administration of nearby schools to create 
                        software solutions for both students and teachers, including plagiarism checkers and a distributed block lunch apps. 
                        Other R&D projects include RFID student trackers and a safety card system for metal shop students. 
                        Later on I moved onto more complicated solutions such as REM sleep cycle tracking, remote text to speech 
                        engines - I developed this framework while I interned at cloudyBoss, - and anonymous distributed peer to peer 
                        networks. I love working with others on projects and when I set my mind to something I will devote all of my time 
                        to get that thing done.</p>
                </div>
            </div>
        );
    }
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
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
        height: '35vh',
        objectFit: 'cover',
        filter: 'grayscale(100%)',
        transform: 'scale(1.05)'
    },
    center: {
        position: 'absolute',
        display: 'flex',
        placeSelf: 'center',
        placeContent: 'center',
        flexDirection: 'column',
        border: `2px solid ${Colors.text}`,
        borderRadius: 25,
        padding: 25,
        maxWidth: '60vw',
        zIndex: 100
    },
    bigText: {
        fontSize: '5em',
        fontWeight: 600,
        textAlign: 'center',
        margin: 20
    },
    content: {
        fontSize: '1.05em',
        paddingLeft: 10,
        paddingRight: 10,
        textOverflow: 'clip',
        textDecoration: 'none',
        textAlign: 'justify',
        textIndent: 35
    }
};

export default Radium(Content);
