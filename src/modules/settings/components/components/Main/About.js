import React from 'react';
import styled from 'styled-components';
import { getVersion } from '$Utils/extension';
import { LOCAL_HONORS } from '$Utils/constants';

const About = () => {
    const contibutors = LOCAL_HONORS.filter((honor) => honor.type === 'contibutor').map((user) => user.username);
    const testers = LOCAL_HONORS.filter((honor) => honor.type === 'tester').map((user) => user.username);
    const others = LOCAL_HONORS.filter((honor) => honor.type === 'other').map((user) => user.username);

    return (
        <Wrapper>
            <TitleWrapper>
                <h3>Twitch Enhancer</h3>
                <span>Extension that adds what is missing on Twitch.</span>
            </TitleWrapper>
            <Version>Version: {getVersion()}</Version>
            <div>
                <Title>Thanks to all, who helped creating this extension:</Title>
                <ul>
                    <li>
                        Contibutors: <Users>{contibutors.join(', ')}</Users>.
                    </li>
                    <li>
                        Testers: <Users>{testers.join(', ')}</Users>.
                    </li>
                    <li>
                        People, who helped in other way: <Users>{others.join(', ')}</Users>.
                    </li>
                </ul>
            </div>
            <Socials>
                <a href="https://chrome.google.com/webstore/detail/twitch-enhancer/knaodoefkjbgmmilogebghadhmnphjih">
                    Chrome
                </a>
                ·<a href="https://addons.mozilla.org/en-US/firefox/addon/twitch-enhancer/">Firefox</a>·
                <a href="https://twitter.com/animekkk_">Twitter</a>·
                <a href="https://coffee.vopp.top/">Buy me a coffee</a>
            </Socials>
        </Wrapper>
    );
};

export default About;

const Wrapper = styled.div`
    height: 100% !important;
    display: flex;
    flex-direction: column;
    justify-content: center;

    ul {
        list-style-type: disc;
    }
`;

const TitleWrapper = styled.div`
    display: flex;
    flex-direction: column;

    span {
        color: var(--te-gray-color-dark);
    }
`;

const Title = styled.span`
    font-size: var(--font-size-4);
    font-weight: 600;
`;

const Version = styled.div`
    margin: 10px 0;
`;

const Users = styled.span`
    color: var(--color-text-link);
`;

const Socials = styled.div`
    margin: 10px 0;
    display: flex;
    gap: 5px;
`;
