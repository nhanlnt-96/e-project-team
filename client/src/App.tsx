import {ConfigProvider} from 'antd';
import LandingPage from 'pages/landingPage';
import React from 'react';

function App() {
    const theme = {
        token: {
            fontFamily: '\'Jost\', sans-serif',
            fontSize: 16
        }
    };

    return (
        <ConfigProvider theme={theme}>
            <LandingPage/>
        </ConfigProvider>
    );
}

export default App;
