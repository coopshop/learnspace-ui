import React from "react";
import styled from "styled-components";

import Container from "../Container";

const Navbar = styled.nav`
  position: fixed;
  z-index: 100;
  width: 100%;
  left: 0;
  top: 0;
  background-color: #3b90f9;
  box-shadow: 5px 0 20px rgba(0, 0, 0, 0.2);
`;

const NavbarContainer = styled.div`
  padding-top: 0;
  padding-bottom: 0;
  padding-left: 0;
  padding-right: 0;
  margin: 0 auto;
  max-width: 1400px;
  width: 100%;
  height: auto;
`;

const LogoTab = styled.div`
  display: inline-block;
  color: #fff;
  width: 50%;
  a {
    background-color: #3a82ea;
    display: inline-block;
    padding: 0.5em 1em;
    h1 {
      font-weight: 500;
    }
  }
  h2 {
    display: inline-block;
    font-size: 1em;
    font-weight: 300;
    margin-left: 1em;
  }
`;

const ButtonsTab = styled.div`
  display: inline-block;
  padding-right: 1em;
  text-align: right;
  width: 50%;
  ul {
    display: inline-block;
    margin: 0;
    padding: 0;
    list-style: none;
    li {
      display: inline-block;
      padding: 0.4em;
      margin: 0;
      a {
        color: #fff;
        padding: 0.3em 0.5em;
        border-radius: 5px;
        font-size: 1.1em;
        font-weight: 300;
        &:hover {
          background-color: #fff;
          color: #3b90f9;
          cursor: pointer;
        }
      }
    }
  }
`;

/**
 * @desc Use this component when user is already authenticated
 */
const AuthenticatedNav = () => <Navbar>Not Logged In</Navbar>;

/**
 * @desc Use this component when user is not authenticated
 */
const UnAuthenticatedNav = () => (
  <Navbar>
    <NavbarContainer>
      <LogoTab>
        <a>
          <h1>LEARNSPACE</h1>
        </a>
        <h2>ระบบสนับสนุนการเรียนการสอนนอกห้องเรียน</h2>
      </LogoTab>
      <ButtonsTab>
        <ul>
          <li>
            <a>หน้าแรก</a>
          </li>
          <li>
            <a>เกี่ยวกับเรา</a>
          </li>
          <li>
            <a>ระบบห้องเรียนออนใลน์</a>
          </li>
          <li>
            <a>สมัครสมาชิก</a>
          </li>
        </ul>
      </ButtonsTab>
    </NavbarContainer>
  </Navbar>
);

/**
 * @desc Navigation Bar component. it will render a different navigation bar
 *       Depends on wether user is already logged in or not
 */
class NavigationBar extends React.Component {
  state = { isLoggedIn: false };

  render() {
    return this.state.isLoggedIn ? (
      <AuthenticatedNav />
    ) : (
      <UnAuthenticatedNav />
    );
  }
}

export default NavigationBar;