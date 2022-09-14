import React, { useContext } from 'react';
import styled from 'styled-components';
import { TabContext } from '../../contexts/TabContext';
import Option from './Option';
import TopBar from './TopBar';
import { settings } from '../../settings';

const Main = () => {
    const { selected } = useContext(TabContext);

    return (
        <Wrapper>
            <TopBar />
            <MainContent>
                {selected === 'info'
                    ? 'In development'
                    : settings[selected].map(({ id, name, title, description, type, options }) => {
                          console.log(id, name, title, description, type, options);
                          return (
                              <Option
                                  title={title}
                                  description={description}
                                  name={name}
                                  id={id}
                                  type={type}
                                  options={options}
                                  key={id}
                              />
                          );
                      })}
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
    color: white;
`;

const MainContent = styled.main`
    display: flex;
    flex-direction: column;
    padding: 1.2rem;
    gap: 1.2rem;
    overflow-y: auto;
    ::-webkit-scrollbar {
        width: 10px;
        background-color: var(--te-bg-color-light);
    }
    ::-webkit-scrollbar-thumb {
        background-color: var(--te-bg-color-dark);
    }
`;
