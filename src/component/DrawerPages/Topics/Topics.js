import React from 'react';
import { Route } from 'react-router-dom';

import Links from '../Links/Links';
import Photos from '../Photos/Photos';
import Files from '../Files/Files';
import Notes from '../Notes/Notes';
import TopicsList from './TopicsList/TopicsList';
import AnimatedSwitch from '../../UI/AnimatedSwitch/AnimatedSwitch';

const topics = (props) => {
    return (
        <AnimatedSwitch classProp={'pageComponentWrapper'}>
            <Route path={props.match.url + '/links'} component={Links} exact/>
            <Route path={props.match.url + '/photos'} component={Photos} exact/>
            <Route path={props.match.url + '/files'} component={Files} exact/>
            <Route path={props.match.url + '/notes'} component={Notes} exact/>
            <Route path={props.match.url} component={TopicsList} />
        </AnimatedSwitch>
    )
}

export default topics;