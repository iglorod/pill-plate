import React from 'react';
import { Grid, Zoom, ButtonBase } from '@material-ui/core';
import { ReactLink as Link } from '../../../../UI/Link/Link';
import { withRouter } from 'react-router-dom';

import useStyles from '../../styles';
import TopicMenu from './TopicMenu/TopicMenu';

const Topic = (props) => {
    const classes = useStyles();

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
                        </div>
                    </ButtonBase>
                </Link>
            </Grid>
        </Zoom>
    )
}

export default withRouter(Topic);