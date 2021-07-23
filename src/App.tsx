import './App.css';
import React, {useEffect, useState} from 'react';
import * as ROUTES from './constants/routes';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom'
import {ThemeProvider} from '@material-ui/styles';
import { createTheme } from '@material-ui/core/styles'
import {lightGreen, cyan} from '@material-ui/core/colors';
import HomePage from './components/pages/HomePage';
import ChartsPage from './components/pages/ChartsPage';
import RouteHeader from './components/RouteHeader';

const theme = createTheme({
    palette: {
        type: 'dark',
        primary: lightGreen,
        secondary: cyan
    }
});


function App() {
    const [jsonData, setJsonData] = useState([]);

    useEffect(() => {
        fetch('data/MOCK_DATA.json').then((response) => {
            if (response.status === 200) {
                return response.json();
            } else {
                console.log("FAILED TO FETCH DATA");
            }
        }).then((data) => {
            console.log("Data loaded");
            setJsonData(data);
        }).catch((error) => {
            console.log('Error occurred');
            console.log(error.toString());
        });
    }, []);

    const pageWrapper = (content: any) => {
        return <>
            <RouteHeader/>
            {content}
        </>;
    }

    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <Router>
                    <Switch>
                        <Route path={ROUTES.CHARTS}>
                            {pageWrapper(<ChartsPage data={jsonData} />)}
                        </Route>
                        <Route path={ROUTES.HOME}>
                            {pageWrapper(<HomePage data={jsonData} />)}
                        </Route>
                    </Switch>
                </Router>
            </ThemeProvider>
        </div>
    );
}

export default App;
