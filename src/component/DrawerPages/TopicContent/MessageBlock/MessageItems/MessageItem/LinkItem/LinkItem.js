import React from 'react';
import MicrolinkCard from '@microlink/react';

import MessageSceleton from '../MessageSceleton/MessageSceleton';

const insertTextAtIndices = (text, obj) => {
    return text.replace(/./g, function (character, index) {
        return obj[index] ? obj[index] + character : character;
    });
};


const LinkItem = (props) => {
    const urlMatches = props.message.text.match(/\b(http|https)?:\/\/\S+/gi) || [];

    const LinkPreview = <MicrolinkCard url={urlMatches[0]} />;

    let { text } = props.message;
    urlMatches.forEach(link => {
        const startIndex = text.indexOf(link);
        const endIndex = startIndex + link.length;
        text = insertTextAtIndices(text, {
            [startIndex]: `<a href="${link}" target="_blank" rel="noopener noreferrer" style="color: cornflowerblue; word-break: break-word;" >`,
            [endIndex]: "</a>"
        });
    });

    return (
        <MessageSceleton
            showName={props.showName}
            author={props.message.creatorId.email}
            content={
                <div style={{
                    color: 'black',
                    margin: '0',
                    marginTop: '5px',
                }}
                >
                    <p dangerouslySetInnerHTML={{
                        __html: text
                    }}
                    />
                    {LinkPreview}
                </div>
            }
        />
    )
}

export default LinkItem;
