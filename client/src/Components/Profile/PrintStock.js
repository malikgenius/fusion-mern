import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProfileById, deleteStock } from '../../actions/profileAction';
import Barcode from 'react-barcode';
import QRCode from 'qrcode.react';
// import jsPDF from 'jspdf';
import 'jspdf/dist/jspdf.min.js';
import ReactToPrint from 'react-to-print';
import Spinner from '../Common/spinnerLottie';

class Profile extends Component {
  state = {
    bay: '',
    box: '',
    depth: '',
    row: '',
    sample: '',
    side: '',
    status: '',
    well: '',
    column: '',
    imageurl: '',
    tinggi: 11.69,
    lebar: '08.27',
    judul: 'Lintang.pdf'
  };

  componentDidMount = () => {
    if (this.props.match.params.id) {
      this.props.getProfileById(this.props.match.params.id);
    }
  };
  componentWillReceiveProps = nextProps => {
    if (nextProps.profile.profile === null && this.props.profile.loading) {
      this.props.history.push('/notfound');
    }
    if (nextProps.profile.profile) {
      this.setState({
        well: nextProps.profile.profile.well,
        bay: nextProps.profile.profile.bay,
        box: nextProps.profile.profile.box,
        column: nextProps.profile.profile.column,
        depth: nextProps.profile.profile.depth,
        row: nextProps.profile.profile.row,
        sample: nextProps.profile.profile.sample,
        side: nextProps.profile.profile.side,
        status: nextProps.profile.profile.status,
        imageurl: nextProps.profile.profile.imageurl
      });
    }
  };

  onDeleteStock = () => {
    // this.props.match.params.id will also work but i guess props one is better
    this.props.deleteStock(this.props.profile.profile._id, this.props.history);
  };
  // react-pdf
  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };
  render() {
    const { profile, loading } = this.props.profile;
    // Full Screen Contents
    let profileContentBig;
    if (profile === null || loading) {
      profileContentBig = <Spinner />;
    } else {
      profileContentBig = (
        <div className="container">
          <div className="row ">
            {/* <div className=" d-flex justify-content-center"> */}
            <div className="col col-sm">
              {profile.imageurl ? (
                <a href={profile.imageurl} target="_blank">
                  <img
                    className="rounded mx-auto d-block"
                    src={profile.imageurl}
                    alt="Stock Image"
                    style={{ width: '200px' }}
                  />
                </a>
              ) : (
                <img
                  src="/img/placeholder.jpg"
                  alt="Stock Image"
                  className="rounded mx-auto d-block"
                  style={{ width: '200px' }}
                />
              )}
            </div>
            <div className="col col-sm">
              <div className="lead  alert alert-light">
                Well No:
                {'     '}
                {profile.well}
                <br />
                Bay: {profile.bay}
                <br />
                Column: {profile.column}
                <br />
                Row: {profile.row}
                <br />
                Side: {profile.side}
                <br />
              </div>
            </div>
            <div className="col col-sm">
              <Link
                to={`/stock/${profile._id}`}
                // target="_blank"
              >
                <QRCode
                  // below value can take a link to site, or anything.
                  // value="https://localhost:3000/"
                  // here we will share
                  value={`
                ${'        '}https://malikgen.com/stock/${profile._id}
                `}
                  // size={'128'}
                  // bgColor={'#0000FF'}
                  level={'L'}
                  renderAs={'svg'}
                />
              </Link>
            </div>
          </div>
        </div>
        // </div>
      );
    }

    return (
      <div className="m-4">
        <div>
          <div className="container">
            <div className="">
              <div
                ref={el => (this.componentRef = el)}
                className="col-md-12 m-4"
              >
                {profileContentBig}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-3">
          <ReactToPrint
            trigger={() => (
              <a className="" href="#">
                Print this out!
              </a>
            )}
            content={() => this.componentRef}
          />
          {/* </div> */}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    profile: state.profile
  };
};
export default connect(
  mapStateToProps,
  { getProfileById, deleteStock }
)(withRouter(Profile));
