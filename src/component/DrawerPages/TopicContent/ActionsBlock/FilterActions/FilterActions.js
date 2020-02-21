import React, { useState } from 'react';
import { Chip } from '@material-ui/core';
import {
    InsertDriveFileRounded,
    PhotoSizeSelectActualRounded,
    MovieRounded,
    LinkRounded,
    Done
} from '@material-ui/icons';

import useStyles from '../../styles';

const FilterActions = (props) => {
    const classes = useStyles();

    const handleFile = (startFilter) => {
        const currentFilter = { ...props.filter };
        currentFilter.files = startFilter;
        props.setFilter({ ...currentFilter });
    }

    const handlePhoto = (startFilter) => {
        const currentFilter = { ...props.filter };
        currentFilter.photos = startFilter;
        props.setFilter({ ...currentFilter });
    }

    const handleVideo = (startFilter) => {
        const currentFilter = { ...props.filter };
        currentFilter.videos = startFilter;
        props.setFilter({ ...currentFilter });
    }

    const handleLink = (startFilter) => {
        const currentFilter = { ...props.filter };
        currentFilter.links = startFilter;
        props.setFilter({ ...currentFilter });
    }

    return (
        <div className={classes.filterActionsBlock}>
            <Chip
                icon={<InsertDriveFileRounded />}
                label="By Files"
                clickable
                className={classes.filterChip}
                color="primary"
                onClick={handleFile.bind(this, true)}
                onDelete={handleFile.bind(this, false)}
                deleteIcon={props.filter.files ? null : <Done /> }
                variant={props.filter.files ? 'default' : 'default'}
            />
            <Chip
                icon={<PhotoSizeSelectActualRounded />}
                label="By Photos"
                clickable
                className={classes.filterChip}
                color="primary"
                onClick={handlePhoto.bind(this, true)}
                onDelete={handlePhoto.bind(this, false)}
                deleteIcon={props.filter.photos ? null : <Done /> }
                variant={props.filter.photos ? 'default' : 'default'}
            />
            <Chip
                icon={<MovieRounded />}
                label="By Videos"
                clickable
                className={classes.filterChip}
                color="primary"
                onClick={handleVideo.bind(this, true)}
                onDelete={handleVideo.bind(this, false)}
                deleteIcon={props.filter.videos ? null : <Done /> }
                variant={props.filter.videos ? 'default' : 'default'}
            />
            <Chip
                icon={<LinkRounded />}
                label="By Links"
                clickable
                className={classes.filterChip}
                color="primary"
                onClick={handleLink.bind(this, true)}
                onDelete={handleLink.bind(this, false)}
                deleteIcon={props.filter.links ? null : <Done /> }
                variant={props.filter.links ? 'default' : 'default'}
            />
        </div>
    )
}

export default FilterActions;
