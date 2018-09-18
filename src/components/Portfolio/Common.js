import React from 'react';

import posed from 'react-pose';
import update from 'immutability-helper';

const SlideIn = posed.ul({
    in: {
        x: '10%',
        delayChildren: 300,
        staggerChildren: 200
    },
    out: { x: '10%', delay: 0 }
});

const SlideInRight = posed.div({
    in: { x: '0%', opacity: 1},
    out: { x: '50%', opacity: 0}
});

const Item = posed.li({
    in: { x: '0%', opacity: 1},
    out: { x: '-150%', opacity: 0}
});

const ItemBorder = posed.li({
    in: { x: '0%', opacity: 1},
    out: { x: '-300%', opacity: 0}
});

class Page extends React.Component {
    initSlides() {
        this.slideComponents = {};
        this.components = {};
    }

    addSlide(key, component) {
        this.slideComponents[key || 0] = component;
    }

    slide(index, state, delay) {
        const call = () => {
            this.components[index] = this.slideComponents[index](state);
            this.forceUpdate();
        };

        if (delay) window.setTimeout(call, delay);
        else call();
    }

    slideInDelay(index) {
        this.slide(index || 0, 'in', 100);
    }

    slideOutDelay(index) {
        this.slide(index || 0, 'out', 100);
    }

    slideIn(index) {
        this.slide(index || 0, 'in');
    }

    slideOut(index) {
        this.slide(index || 0, 'out');
    }

    renderSlide(index) {
        return this.components[index || 0];
    }
}

const cStyles = {
    button: {
        marginTop: 40,
        marginLeft: 5
    },
    container: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        margin: 0,
        padding: 0,
        width: '100%',
        height: '100vh'
    },
    rightContainer: {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: 400,
        maxHeight: 800
    },
    border: {
        display: 'block',
        width: '10vw',
        borderRadius: 8,
        height: '5px',
        marginTop: 50,
        minWidth: 40,
        backgroundColor: '#bd5858'
    },
    tagline: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        fontSize: '1.8em',
        marginTop: 30
    },
    subtagline: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        fontSize: '1.1em',
        marginTop: 20
    },
    showcase: {
        maxHeight: 800,
        objectFit: 'cover',
        backgroundColor: 'transparent'
    },
    bigContainer: {
        /* display: 'inline-block',
        listStyle: 'none',
        position: 'fixed',
        marginLeft: '10%',
        marginTop: '10em',
        zIndex: 200 */
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: 0,
        paddingBottom: '20%',
        zIndex: 200,
        listStyle: 'none'
    },
    bigTextContainer: {
        display: 'inline-block',
        marginLeft: 0,
        width: '20vw',
        height: '10vh',
        minWidth: 400,
        minHeight: 100
    },
    bigText: {
        margin: 5,
        padding: 0,
        height: '100%',
        width: '100%',
        fontStyle: 'bold',
        textShadow: '0 10px 30px rgba(2, 10, 4, 0.15)',
        zIndex: 200
    }
};

export { SlideIn, SlideInRight, Item, ItemBorder, Page, cStyles };
