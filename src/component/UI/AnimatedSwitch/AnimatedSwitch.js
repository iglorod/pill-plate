import React from 'react';
import { spring, AnimatedSwitch } from 'react-router-transition';

import classes from './AnimatedSwitch.module.css';

const animatedSwitch = (props) => {
    const mapStyles = (styles) => {
        return {
            opacity: styles.opacity,
            transform: `scale(${styles.scale})`,
        };
    }

    const bounce = (val) => {
        return spring(val, {
            stiffness: 100,
            damping: 20,
        });
    }

    const bounceTransition = {
        // start in a transparent, upscaled state
        atEnter: {
            opacity: 0,
            scale: 0.8,
        },
        // leave in a transparent, downscaled state
        atLeave: {
            opacity: bounce(0),
            scale: bounce(0.8),
        },
        // and rest at an opaque, normally-scaled state
        atActive: {
            opacity: bounce(1),
            scale: bounce(1),
        },
    };

    let switchClass = classes.pageWrapper;
    if (props.classProp) switchClass = classes[props.classProp]; 

    return (
        <AnimatedSwitch
            atEnter={bounceTransition.atEnter}
            atLeave={bounceTransition.atLeave}
            atActive={bounceTransition.atActive}
            mapStyles={mapStyles}
            className={switchClass}
        >
            {props.children}
        </AnimatedSwitch>
    )
}

export default animatedSwitch;