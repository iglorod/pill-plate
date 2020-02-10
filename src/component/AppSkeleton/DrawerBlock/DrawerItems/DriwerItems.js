import React, { useState } from 'react';
import { Divider, List, Collapse } from '@material-ui/core';
import LinkRoundedIcon from '@material-ui/icons/LinkSharp';
import NoteRoundedIcon from '@material-ui/icons/NoteSharp';
import PhotoCameraRoundedIcon from '@material-ui/icons/PhotoCameraSharp';
import DescriptionRoundedIcon from '@material-ui/icons/DescriptionSharp';
import MenuOpenIcon from '@material-ui/icons/MenuOpenSharp';
import DeleteRoundedIcon from '@material-ui/icons/DeleteSharp';
import MenuIcon from '@material-ui/icons/MenuSharp';
import { IconButton, ListItemSecondaryAction } from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBoxSharp';

import DrawerLogo from './DrawerLogo/DrawerLogo';
import DrawerItem from './DrawerItem/DrawerItem';
import CreateTopicDialog from '../../../UI/Dialog/CreateTopic';

const DriwerItems = () => {
    const [collapseOpen, setCollapseOpen] = useState(false);

    const [addTopicDialogOpen, setTopicDialogOpen] = useState(false);

    const dialogOpen = () => {
        setTopicDialogOpen(true)
    }

    const dialogClose = () => {
        setTopicDialogOpen(false)
    }

    const addTopicButton = (
        <ListItemSecondaryAction onClick={dialogOpen}>
            <IconButton>
                <AddBoxIcon />
            </IconButton>
        </ListItemSecondaryAction>
    )

    const collapseClickHandler = () => {
        setCollapseOpen(prevState => !prevState);
    }

    const collapseCloseClickHandler = () => {
        setCollapseOpen(false);
    }

    return (
        <React.Fragment>
            <CreateTopicDialog open={addTopicDialogOpen} handleClose={dialogClose} />

            <div>
                <DrawerLogo />

                <List>
                    <DrawerItem
                        text='Topics'
                        to={'/pulp/topics'}
                        icon={collapseOpen ? <MenuOpenIcon /> : <MenuIcon />}
                        addTopicBtn={addTopicButton}
                        collapseToggle={collapseClickHandler}
                    />

                    <Collapse in={collapseOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <DrawerItem text='Links' to={'/pulp/topics/links'} icon={<LinkRoundedIcon />} isNested />
                            <DrawerItem text='Photos' to={'/pulp/topics/photos'} icon={<PhotoCameraRoundedIcon />} isNested />
                            <DrawerItem text='Files' to={'/pulp/topics/files'} icon={<DescriptionRoundedIcon />} isNested />
                            <DrawerItem text='Notes' to={'/pulp/topics/notes'} icon={<NoteRoundedIcon />} isNested />
                        </List>
                    </Collapse>
                </List>

                <Divider />

                <List>
                    <DrawerItem text='Draft' to={'/pulp/draft'} icon={<DeleteRoundedIcon />} collapseToggle={collapseCloseClickHandler} />
                </List>
            </div>
        </React.Fragment>
    )
}

export default DriwerItems;