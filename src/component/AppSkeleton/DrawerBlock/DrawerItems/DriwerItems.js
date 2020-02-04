import React from 'react';
import { Divider, List } from '@material-ui/core';
import LinkRoundedIcon from '@material-ui/icons/LinkRounded';
import NoteRoundedIcon from '@material-ui/icons/NoteRounded';
import PhotoCameraRoundedIcon from '@material-ui/icons/PhotoCameraRounded';
import DescriptionRoundedIcon from '@material-ui/icons/DescriptionRounded';
import SubjectRoundedIcon from '@material-ui/icons/SubjectRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';

import DrawerLogo from './DrawerLogo/DrawerLogo';
import DrawerItem from './DrawerItem/DrawerItem';

const DriwerItems = () => {
    return (
        <div>
            <DrawerLogo />

            <List>
                <DrawerItem text='Topics' to={'/pulp/topics'} icon={<SubjectRoundedIcon />} />
            </List>

            <Divider />

            <List>
                <DrawerItem text='Links' to={'/pulp/links'} icon={<LinkRoundedIcon />} />
                <DrawerItem text='Photos' to={'/pulp/photos'} icon={<PhotoCameraRoundedIcon />} />
                <DrawerItem text='Files' to={'/pulp/files'} icon={<DescriptionRoundedIcon />} />
                <DrawerItem text='Notes' to={'/pulp/notes'} icon={<NoteRoundedIcon />} />
            </List>

            <Divider />

            <List>
                <DrawerItem text='Draft' to={'/pulp/draft'} icon={<DeleteRoundedIcon />} />
            </List>
        </div>
    )
}

export default DriwerItems;