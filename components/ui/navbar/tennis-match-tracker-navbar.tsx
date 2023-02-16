import Link from "next/link";
import styled from 'styled-components';

const NavbarComponentStyling = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  padding: 0 5% 0 5%;
  margin-bottom: 3%;
  .navbar-items-container {
    width: 40%;
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
                    <Link href="/match/new">ADD A NEW MATCH</Link>
                </div>
                <div>
                <   Link href="/player/new">CREATE PLAYER</Link>
                </div>
                <div>
                    <Link href="/">HEAD TO HEAD</Link>
                </div>
                <div>
                    <Link href="/find-match">FIND MATCH</Link>
                </div>
            </div>
        </NavbarComponentStyling>
        </>
    );
}

export default Navbar;