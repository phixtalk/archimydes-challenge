/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

class Nav extends React.Component<{}> {
  render() {
    return (
      <nav className="navbar navbar-light sticky-top bg-light flex-md-nowrap p-0 shadow" style={{
          backgroundColor:"#ffffff"
      }}>
        <a className="navbar-brand col-md-12 col-lg-12 mr-0 px-3" href="#" style={{
          backgroundColor:"#ffffff",
          fontSize: "28px",
          fontWeight: "bold"
      }}>
          Archimydes Challenge
        </a>
      </nav>
    );
  }
}

export default Nav;
