import React, { useState, useEffect } from 'react';
import {
    Grid,
    Zoom,
    ButtonBase,
    Badge
} from '@material-ui/core';
import { ReactLink as Link } from '../../../../UI/Link/Link';
import { withRouter } from 'react-router-dom';
import axios from '../../../../../utility/axios-instance';

import useStyles from '../../styles';
import TopicMenu from './TopicMenu/TopicMenu';

const Topic = (props) => {
    const classes = useStyles();

    const [unreadedCount, setUnreadedCount] = useState(0);

    useEffect(() => {
        axios.post('/topic/messages/single/readers/' + props.data._id, { userId: props.userId })
            .then(count => {
                setUnreadedCount(count.data);
            })
    }, [])

    useEffect(() => {
        if (!props.newUnreadMessage) return;

        const unreadMessageTopicId = props.newUnreadMessage.topicId;
        if (unreadMessageTopicId === props.data._id) setUnreadedCount(prevState => prevState + 1);
        console.log(unreadMessageTopicId);
    }, [props.newUnreadMessage])

    return (
        <Zoom in={true} style={{ transitionDelay: 200 * props.delay + 'ms', position: 'relative' }}>
            <Grid item xs={12} sm={6} md={4} lg={3} >
                <TopicMenu
                    edtiDialogOpen={props.edtiDialogOpen}
                    shareDialogOpen={props.shareDialogOpen}
                    topic={props.data} />

                <Link className={classes.topicLink} to={props.match.url + '/' + props.data._id}>
                    <ButtonBase className={classes.topic}>
                        <div className={classes.topicHat}></div>
                        <div className={classes.topicInfo}>
                            <p className={classes.topicName}>{props.data.name}</p>

                            {props.data.note
                                ? <p className={classes.topicNote}>{props.data.note}</p>
                                : null}

                            <p className={classes.topicCreated}>{props.data.date}</p>
                            {
                                unreadedCount > 0
                                    ? <Badge
                                        className={classes.unreadedCount}
                                        badgeContent={unreadedCount}
                                        max={99}
                                        color={'primary'} />
                                    : null
                            }
                        </div>
                    </ButtonBase>
                </Link>
            </Grid>
        </Zoom>
    )
}

export default withRouter(Topic);
