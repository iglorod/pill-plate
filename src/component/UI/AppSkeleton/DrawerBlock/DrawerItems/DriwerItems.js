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
                <DrawerItem text='Topics' to={'/us/topics'} icon={<SubjectRoundedIcon />} />
            </List>

            <Divider />

            <List>
                <DrawerItem text='Links' to={'/us/links'} icon={<LinkRoundedIcon />} />
                <DrawerItem text='Photos' to={'/us/photos'} icon={<PhotoCameraRoundedIcon />} />
                <DrawerItem text='Files' to={'/us/files'} icon={<DescriptionRoundedIcon />} />
                <DrawerItem text='Notes' to={'/us/notes'} icon={<NoteRoundedIcon />} />
            </List>

            <Divider />

            <List>
                <DrawerItem text='Draft' to={'/us/draft'} icon={<DeleteRoundedIcon />} />
            </List>
        </div>
    )
}

export default DriwerItems;