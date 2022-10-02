import React, { useState } from 'react';
import styled from 'styled-components';
import Main from './components/Main';
import SideMenu from './components/SideMenu';
import { TabContext } from './contexts/TabContext';
import { hide } from '$Settings';

function App() {
    const [selected, setSelected] = useState('chat');

    return (
        <>
            <Backdrop className="te-settings-backdrop" onClick={hide} />
            <TabContext.Provider value={{ selected, setSelected }}>
                <Wrapper className="te-settings-wrapper">
                    <SideMenu />
                    <Main />
                </Wrapper>
            </TabContext.Provider>
        </>
    );
}

export default App;

const Wrapper = styled.div`
    display: flex;
    width: 800px;
    height: 500px;
    background-color: var(--te-bg-color-light);
`;
const Backdrop = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
`;
