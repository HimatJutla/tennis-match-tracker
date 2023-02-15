import styled from 'styled-components';

const FooterStyling = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 2% 0;
    height: 2vh;
`;

export default function TennisMatchTrackerFooter() {
    return (
        <FooterStyling>
            <div>
                HimmyJ Productions
            </div>
            <div>
                TRACK YOUR MATCHES AND FIND YOUR RIVALS
            </div>
            <div>
                Copyright @HimmyJ Productions 2023
            </div>
        </FooterStyling>
    )
}
