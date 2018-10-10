import React, { Component } from 'react';

class FontAwesomeBootStrapTest extends Component {
  render() {
    return (
      <div className="container mt-5" style={{ marginTop: '5%' }}>
        <div>
          <i className="fa fa-battery-4" aria-hidden="true" />
          <button
            type="button"
            className="fa fa-google-plus btn btn-warning btn-lg btn-block mb-1 sticky-top"
          />

          <button className="fa fa-google-plus btn btn-outline-danger btn-lg mr-5 pl-5 float-left" />
          <a href="#!" className="btn btn-outline-success">
            <span className="fa fa-twitter mr-2" />
            Tweet
          </a>

          <button className="fa fa-facebook btn btn-outline-primary bt-sm pr-5 ml-5 float-right stick" />
          <i className="fa fa-google-plus fa-spin" />
          {/* <a className="btn-floating btn-large waves-effect waves-light red" /> */}
          <div />
        </div>

        <h1 className="display-4 sticky-top">React Sticky-Top</h1>

        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <button className="fa fa-google-plus btn btn-outline-danger btn-lg mr-5 pl-5 fixed-bottom mb-5" />
        <h1 className="fixed-bottom ml-5 float-right pb-1">Welcome to React</h1>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  }
}

export default FontAwesomeBootStrapTest;
