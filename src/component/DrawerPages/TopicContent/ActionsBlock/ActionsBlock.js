import React, { useState, useEffect } from 'react';
import {
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    Typography
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { connect } from 'react-redux';

import useStyles from '../styles';
import MessageActions from './MessageActions/MessageActions';
import FilterActions from './FilterActions/FilterActions';

const getCurrentTopic = (topics, idTopic) => {
    for (let topic of topics) {
        if (topic._id === idTopic) return topic;
    }
}

const ActionsBlock = (props) => {
    const classes = useStyles(useStyles);

    const [expanded, setExpanded] = useState(false);

    const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? true : false);
    };

    const [topicName, setTopicName] = useState('');
    const [topicNote, setTopicNote] = useState('');
    const [membersCount, setMembersCount] = useState('');

    useEffect(() => {
        if (!props.openedTopicId) return;
        const topic = getCurrentTopic(props.topics, props.openedTopicId);

        setTopicName(topic.name);
        setTopicNote(topic.note);
        setMembersCount(topic.membersId.length);
    }, [props.openedTopicId])

    const handleBlur = () => {
        setExpanded(false);
    }

    return (
        <div className={classes.actionsBlock}>
            <ExpansionPanel expanded={expanded} onChange={handleChange(expanded)} onBlur={handleBlur} className={classes.expansionMenu}>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                    className={classes.topicData}
                >
                    <Typography className={classes.topicName}>{topicName}</Typography>
                    <Typography className={classes.membersCount}>
                        {membersCount +
                            ((membersCount > 1)
                                ? ' members'
                                : ' member')}
                    </Typography>
                    <MessageActions
                        selectedMessagesId={props.selectedMessagesId}
                        editingMessageStart={props.editingMessageStart}
                        clearSelectedMessages={props.clearSelectedMessages} />
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.secondaryActions}>
                    <Typography className={classes.topicNote}>{topicNote}</Typography>
                    <FilterActions
                        filter={props.filter}
                        setFilter={props.setFilter} />
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        topics: state.tpc.topics,
        openedTopicId: state.tpc.openedTopicId,
    }
}

export default connect(mapStateToProps)(ActionsBlock);
