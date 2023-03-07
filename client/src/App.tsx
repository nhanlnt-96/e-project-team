import {ConfigProvider} from 'antd';
import MainLayout from 'components/mainLayout';
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
            <MainLayout/>
        </ConfigProvider>
    );
}

export default App;
