import styled from 'styled-components';

const HeaderStyling = styled.div`
    padding: 2% 5%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 5vh;
    .header-logo-and-title {
        display: flex;
        align-items: center;
    }
`;

export default function TennisMatchTrackerHeader() {
    return (
        <HeaderStyling>
            <div className="header-logo-and-title">
                <span>
                    LOGO HERE AFTER
                </span>
                TENNIS MATCH TRACKER
            </div>
            <div>
                TRACK YOUR MATCHES AND FIND YOUR RIVALS
            </div>
        </HeaderStyling>
    )
}
