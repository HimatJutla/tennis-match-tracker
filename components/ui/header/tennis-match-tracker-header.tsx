import styled from 'styled-components';

const HeaderStyling = styled.div`
    padding: 1% 5%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    background-color: #FFF9E9;
    .header-logo-and-title {
        display: flex;
        align-items: center;
    }
    .slogan {
        margin-bottom: -0.5%;
        font-size: 1.65rem;
        color: #5A8100;
    }
`;

export default function TennisMatchTrackerHeader() {
    return (
        <HeaderStyling>
            <div className="header-logo-and-title">
                <img src="/JAM_logo.png" width="150"/>
            </div>
            <div
                className="slogan">
                TRACK YOUR MATCHES AND FIND YOUR RIVALS
            </div>
        </HeaderStyling>
    )
}
