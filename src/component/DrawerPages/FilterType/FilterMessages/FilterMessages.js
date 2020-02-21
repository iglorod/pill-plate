import React, { useEffect, useState } from 'react';
import axios from 'axios';

import useStyles from '../styles';
import MessageItems from './MessageItems/MessageItems';
import EmptyMessage from './EmptyMessage/EmptyMessage';

const FilterMessages = (props) => {
    const classes = useStyles();

    const [filterMessages, setFilterMessages] = useState([]);
    const [fetching, setFetching] = useState(false);
    const [allIsFetched, setAllIsFetched] = useState(false);

    useEffect(() => {
        fetchFilterMessages(15);
    }, [])

    const getLastFilterMessages = () => {
        let messages = [];
        setFilterMessages(prevState => messages = prevState);
        return messages;
    }

    const getLastAllIsFetched = () => {
        let allIsFetched = false;
        setAllIsFetched(prevState => allIsFetched = prevState);
        return allIsFetched;
    }

    const fetchFilterMessages = (limit) => {
        if (getLastAllIsFetched()) return;
        setFetching(true);

        const queryChunks =
            '?type=' + props.fetchType
            + '&skip=' + getLastFilterMessages().length
            + '&limit=' + limit;

        axios.defaults.headers.common['Authorization'] = 'Bearer ' + props.token;
        axios.get('http://localhost:4000/topic/messages/filter/' + props.idUser + queryChunks)
            .then(messages => {
                updateFilterMessages(messages.data);
            })
            .catch(err => {
                setFetching(false);
                console.log(err);
            })
    }

    const updateFilterMessages = (newMessages) => {
        if (newMessages.length < 15) {
            setAllIsFetched(true);
        }

        let currentMessages = [...filterMessages];
        currentMessages = currentMessages.concat(newMessages);

        setFetching(false);
        setFilterMessages([...currentMessages]);
    }

    let messages = <EmptyMessage />
    if (filterMessages.length > 0) {
        messages = <MessageItems
            filterMessages={filterMessages}
            fetchFilterMessages={fetchFilterMessages}
            fetching={fetching} />
    }

    return (
        <div className={classes.messagesBlock}>
            {messages}
        </div>
    )
}

export default FilterMessages;
