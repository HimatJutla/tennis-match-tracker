import Link from "next/link";
import styled from 'styled-components';

const NavbarComponentStyling = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  padding: 0.5% 5%;
  background-color: #FF6C02;
  font-size: .875rem;
color: white;
  .navbar-items-container {
    width: 48%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

function Navbar() {
    return (
        <>
        <NavbarComponentStyling>
            <div className="navbar-items-container">
                <div>
                    <Link href="/">HOME</Link>
                </div>
                <div>
                    <Link href="/match/new">ADD MATCH</Link>
                </div>
                <div>
                <Link href="/player/new">CREATE PLAYER</Link>
                </div>
                <div>
                    <Link href="/head-to-head">HEAD TO HEAD</Link>
                </div>
                <div>
                    <Link href="/find-match">FIND MATCH</Link>
                </div>
                <div>
                    <Link href="/find-players">FIND PLAYERS</Link>
                </div>
            </div>
        </NavbarComponentStyling>
        </>
    );
}

export default Navbar;