import React, { useContext } from 'react';
import { TabContext } from '../../contexts/TabContext';
import styled from 'styled-components';
import LogoIcon from './Logo';
import {
    RiChat2Fill,
    RiChat2Line,
    RiUser3Fill,
    RiUser3Line,
    RiVideoFill,
    RiVideoLine,
    RiInformationFill,
    RiInformationLine,
} from 'react-icons/ri';
import Button from './Button';

const SideMenu = () => {
    const { selected, setSelected } = useContext(TabContext);

    return (
        <Wrapper>
            <LogoIcon />
            <Tabs>
                <Button onClick={() => setSelected('chat')}>
                    {selected === 'chat' ? (
                        <RiChat2Fill className="tab-icon tab-icon--active" />
                    ) : (
                        <RiChat2Line className="tab-icon" />
                    )}
                </Button>

                <Button onClick={() => setSelected('usercard')}>
                    {selected === 'usercard' ? (
                        <RiUser3Fill className="tab-icon tab-icon--active" />
                    ) : (
                        <RiUser3Line className="tab-icon" />
                    )}
                </Button>

                <Button onClick={() => setSelected('video')}>
                    {selected === 'video' ? (
                        <RiVideoFill className="tab-icon tab-icon--active" />
                    ) : (
                        <RiVideoLine className="tab-icon" />
                    )}
                </Button>
            </Tabs>

            <Button onClick={() => setSelected('info')}>
                {selected === 'info' ? (
                    <RiInformationFill className="tab-icon tab-icon--active" />
                ) : (
                    <RiInformationLine className="tab-icon" />
                )}
            </Button>
        </Wrapper>
    );
};

export default SideMenu;

const Wrapper = styled.nav`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    flex-basis: 60px;
    background-color: var(--te-bg-color-dark);
`;
const Tabs = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;
