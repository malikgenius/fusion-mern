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

  //jspdf generator
  // unduhPdf = e => {
  //   e.preventDefault();
  //   var doc = new jsPDF();

  //   // var doc = new jsPDF({
  //   //   // orientation: 'landscape',
  //   //   unit: 'in',
  //   //   // format: [4, 2]  // tinggi, lebar
  //   //   format: [this.state.tinggi, this.state.lebar]
  //   // });
  //   doc.text(
  //     `PDF size: ${this.state.tinggi} x ${this.state.lebar} in`,
  //     0.5,
  //     0.5
  //   );
  //   doc.text(`PDF filename: ${this.state.column}`, 0.5, 0.8);
  //   doc.text(`Recipient: ${this.state.well}`, 0.5, 1.1);
  //   doc.text(`Message: ${this.state.pesan}`, 0.5, 1.4);
  //   doc.addImage(this.state.imageurl, 'JPEG', 15, 40, 180, 180);
  //   // doc.addImage(this.state.gambar, 'JPEG', 0.5, 2, 2.5, 2.5);
  //   // format: (image_file, 'image_type', X_init, Y_init, X_fin, Y_fin)

  //   doc.save(`${this.state.judul}`);
  // };

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
    console.log(this.props.profile.profile);
    const { profile, loading } = this.props.profile;
    let profileContent;

    if (profile === null || loading) {
      profileContent = <Spinner />;
    } else {
      profileContent = (
        <div>
          <div className="row">
            {/* <div className="col-md-6">
              <Barcode
                value={`${profile._id} ${' '} `}
                // width="2"
                // height={'100'}
                format="CODE128B"
                displayValue={true}
                fontOptions=""
                font="monospace"
                textAlign="center"
                textPosition="bottom"
                // textMargin="2"
                // fontSize="20"
                background="#ffffff"
                lineColor="#000000"
                // margin="10"
                // marginTop="10"
                // marginBottom="undefined"
                // marginLeft="undefined"
                // marginRight="undefined"
              />
            </div> */}
          </div>

          <div className=" d-flex justify-content-center">
            <div className="mr-3 flex-fill">
              <Link
                to={`/qrcode/${profile._id}`}
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
            <div className="lead flex-fill alert alert-light">
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
            <div className="lead flex-fill ">
              {profile.imageurl ? (
                <a href={profile.imageurl} target="_blank">
                  <img
                    className="rounded mx-auto d-block"
                    src={profile.imageurl}
                    alt="Stock Image"
                    style={{ width: '300px' }}
                  />
                </a>
              ) : (
                <img
                  src="/img/placeholder.jpg"
                  alt="Stock Image"
                  className="rounded mx-auto d-block"
                  style={{ width: '300px' }}
                />
              )}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div>
        <div className="container">
          <div className="row">
            <div />
            <br />
            <br />
            <div className="col-md-6">
              <Link to="/stocks" className="btn btn-light mb-3 float-left">
                Back to Stocks
              </Link>
            </div>
            <div ref={el => (this.componentRef = el)} className="col-md-12">
              {profileContent}
            </div>
            <ReactToPrint
              trigger={() => <a href="#">Print this out!</a>}
              content={() => this.componentRef}
            />
          </div>
          {/* below content is out of print Area and logic is if profile show buttons as they have profile._id which will through error if no profile */}
          {!profile ? (
            ''
          ) : (
            <div>
              <div className="row">
                <div className="col col-4 m-auto">
                  <div style={{ marginTop: '60px' }}>
                    {/* show only on middle and big screens  */}
                    <div className="btn-group  d-md-block m-auto" role="group">
                      <button
                        // onClick={this.onDeleteProfile}
                        className="btn btn-danger mr-1 text-white"
                      >
                        <Link
                          to={`/edit-profile/${profile._id}`}
                          style={{ textDecoration: 'none', color: 'white' }}
                        >
                          <i className="fas fa-clipboard-list  mr-1 text-white" />
                          Edit Stock
                        </Link>
                      </button>
                      <button
                        onClick={this.onDeleteStock}
                        className="btn btn-danger"
                      >
                        <i className="fas fa-user-circle text-white mr-1" />
                        Delete Stock
                      </button>
                      {/* generate pdf from jspdf module. */}
                      {/* <button onClick={this.unduhPdf} className="btn btn-danger">
                         <i className="fas fa-user-circle text-white mr-1" />
                         Generate PDF
                       </button> */}
                    </div>
                  </div>
                </div>
              </div>
              {/* show only on Small screens --- Mobiles only  */}
            </div>
          )}
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
