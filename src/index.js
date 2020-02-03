import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import deepOrange from '@material-ui/core/colors/deepOrange';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import authReducer from './store/reducers/authorization';

const reducers = combineReducers({
    auth: authReducer,
})

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#FFE66D'
        },
        secondary: {
            main: deepOrange[400]
        },
    }
});

const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <Provider store={store}>
            <App />
        </Provider>
    </MuiThemeProvider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
