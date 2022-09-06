import React, { useState } from 'react';
import styled from 'styled-components';
import Main from './components/Main';
import SideMenu from './components/SideMenu';
import { TabContext } from './contexts/TabContext';
import { hide } from '../../common/settings';

function App() {
    const [selected, setSelected] = useState('chat');

    return (
        <>
            <Backdrop onClick={hide} />
            <TabContext.Provider value={{ selected, setSelected }}>
                <Wrapper>
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
    background-color: var(--bg-color-light);
    overflow: hidden;
    position: absolute;
    inset: 0;
    margin: auto;
`;
const Backdrop = styled.div`
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(3px);
`;
