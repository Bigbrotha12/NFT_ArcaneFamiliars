import React from 'react';

export default function TabPanel(props) {
    const { children, value, index } = props;
    return (
        <div
        hidden={value !== index}
        >
            {children}
        </div>
    )
}