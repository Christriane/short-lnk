import React from 'react';
import {history} from '../../client/main';

export default class Link extends React.Component {

    onLogout() {
        history.push('/');
    }

    render(){
        return(
            <div>
                <h1>Link Component</h1>
                <button onClick={this.onLogout.bind(this)}>Logout</button>
            </div>
        );
    }
}