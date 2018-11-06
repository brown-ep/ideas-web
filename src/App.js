import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Login from './pages/loginPage';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route exact={true} path='/' render={() => (
                        <div className="App">
                            <Login />
                        </div>
                    )} />
                </div>
            </BrowserRouter>
        );
    }
}

export default App;