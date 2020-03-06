import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Links from '../FilterType/Links/Links';
import Photos from '../FilterType/Photos/Photos';
import Videos from '../FilterType/Videos/Videos';
import Files from '../FilterType/Files/Files';
import Notes from '../FilterType/Notes/Notes';
import TopicContent from '../TopicContent/TopicContent';
import TopicsList from './TopicsList/TopicsList';

const topics = (props) => {
    return (
        <Switch>
            <Route path={props.match.url + '/links'} component={Links} exact />
            <Route path={props.match.url + '/photos'} component={Photos} exact />
            <Route path={props.match.url + '/videos'} component={Videos} exact />
            <Route path={props.match.url + '/files'} component={Files} exact />
            <Route path={props.match.url + '/notes'} component={Notes} exact />
            <Route path={props.match.url + '/:id'} component={TopicContent} exact />
            <Route path={props.match.url} component={TopicsList} />
        </Switch>
    )
}

export default topics;
