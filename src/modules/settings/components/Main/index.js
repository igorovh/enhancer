import React, { useContext } from 'react';
import styled from 'styled-components';
import { TabContext } from '../../contexts/TabContext';
import Option from './Option';
import TopBar from './TopBar';
import About from './About';
import { settings } from '../../settings';

const Main = () => {
    const { selected } = useContext(TabContext);

    return (
        <Wrapper>
            <TopBar />
            <MainContent>
                {selected === 'info' ? (
                    <About />
                ) : (
                    settings[selected].map((setting, i) => {
                        return <Option key={i} setting={setting} />;
                    })
                )}
            </MainContent>
        </Wrapper>
    );
};

export default Main;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
`;

const MainContent = styled.main`
    display: flex;
    flex-direction: column;
    padding: 1.2rem;
    gap: 1.2rem;
    overflow-y: auto;
    ::-webkit-scrollbar {
        width: 6px;
        background-color: var(--te-bg-color-light);
    }
    ::-webkit-scrollbar-thumb {
        background-color: var(--te-bg-color-dark);
        border-radius: 8px;
    }
`;
