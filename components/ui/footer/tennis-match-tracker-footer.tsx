import styled from 'styled-components';

const FooterStyling = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: white;
    font-size: 1.25rem;
    padding: .5% 5%;
    background-color: #FF6C02;
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
