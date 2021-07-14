import React, { Component, PropsWithChildren } from "react";
import Nav from "./Nav";

class Wrapper extends Component<PropsWithChildren<any>> {
  render() {
    return (
      <>
        <Nav />

        <div className="container-fluid" style={{marginTop: "70px"}}>

            {this.props.children}

        </div>
      </>
    );
  }
}



export default Wrapper;
