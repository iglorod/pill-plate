import React from 'react';
import { Avatar, List, ListItem, ListItemText, ListItemAvatar } from '@material-ui/core';
import { GetApp } from '@material-ui/icons';

import useStyles from '../../../../styles';
import MessageSceleton from '../MessageSceleton/MessageSceleton';

const getFileName = (path) => {
    const pathContains = path.split('\\');
    return pathContains[pathContains.length - 1].slice(13);
}

const TextItem = (props) => {
    const classes = useStyles();
    const FILE_PATH = 'http://localhost:4000/' + props.message.path;

    return (
        <MessageSceleton
            showName={props.showName}
            author={props.message.creatorId.email}
            content={
                <List style={{ paddingTop: '0' }}>
                    <ListItem alignItems="flex-start" style={{ padding: '0' }}>
                        <ListItemAvatar>
                            <a href={FILE_PATH}>
                                <Avatar className={classes.downloadIcon}>
                                    <GetApp />
                                </Avatar>
                            </a>
                        </ListItemAvatar>
                        <ListItemText
                            primary={
                                <p style={{
                                    fontFamily: 'Nunito, sans-serif',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    margin: '0',
                                    cursor: 'default',
                                }}
                                >{getFileName(FILE_PATH)}</p>
                            }
                            disableTypography
                            secondary={
                                <div style={{
                                    paddingTop: '5px',
                                }}>
                                    <a
                                        href={FILE_PATH}
                                        className={classes.downloadLink}
                                    >Download</a>
                                </div>
                            }
                        />
                    </ListItem>
                </List>
            } />
    )
}

export default TextItem;
