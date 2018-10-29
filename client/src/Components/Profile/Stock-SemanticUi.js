import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { getProfileById, deleteStock } from '../../actions/profileAction';
import QRCode from 'qrcode.react';

// Semantic-ui Image Reveal import
import { Image, Reveal } from 'semantic-ui-react';

class Stock extends Component {
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
    judul: 'Lintang.pdf',
    expanded: false
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

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    console.log(this.props);
    const { profile, loading } = this.props.profile;
    const { classes } = this.props;
    // Full Screen Contents
    let profileContentBig;
    if (profile === null || loading) {
      profileContentBig = '';
    } else {
      profileContentBig = (
        <div>
          <Reveal animated="move right">
            <Reveal.Content visible>
              <Image
                src="https://react.semantic-ui.com/images/wireframe/square-image.png"
                size="small"
              />
            </Reveal.Content>
            <Reveal.Content hidden>
              <Image src={profile.imageurl} size="small" />
            </Reveal.Content>
          </Reveal>
        </div>
      );
    }

    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <Link to="/stocks" className="btn btn-light mb-3 float-left">
                Back to Stocks
              </Link>
            </div>
          </div>
          <div className="row ">
            <div className="col col-md-6 m-auto">
              <div ref={el => (this.componentRef = el)} className="col-md-12">
                {profileContentBig}
              </div>
            </div>
          </div>
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
)(withRouter(Stock));
