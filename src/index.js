import React from 'react';
import ReactDOM from 'react-dom';
import ContextApp from './Application';
import { UserContextProvider} from './contexts/UserContext';

ReactDOM.render(
<UserContextProvider>
        <ContextApp />
</UserContextProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

