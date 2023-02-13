import styled from 'styled-components';

const HeaderStyling = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 2%;
    height: 10vh;
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
