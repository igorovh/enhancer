import React, { useState } from 'react';
import styled from 'styled-components';
import Main from './components/Main';
import SideMenu from './components/SideMenu';
import { TabContext } from './contexts/TabContext';

function App() {
    const [selected, setSelected] = useState('chat');

    return (
        <>
            <TabContext.Provider value={{ selected, setSelected }}>
                <Wrapper>
                    <SideMenu />
                    <Main />
                </Wrapper>
            </TabContext.Provider>
            <Backdrop />
        </>
    );
}

export default App;

const Wrapper = styled.div`
    display: flex;
    width: 800px;
    height: 500px;
    background-color: var(--bg-color-light);
    overflow: hidden;
    z-index: 200;
`;
const Backdrop = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
`;
