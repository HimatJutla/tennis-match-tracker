import styled from 'styled-components';

const FooterStyling = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 2%;
    height: 5vh;
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
