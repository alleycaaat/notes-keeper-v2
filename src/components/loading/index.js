import React from 'react';
import './loading.scss';

export default function Loading() {
    return (
        <div id='wrapper'>
            <div id='loading-text'>LOADING</div>
            <div id='loading-content'></div>
        </div>
    );
}
