import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'react-moment';
// Semantic UI Imports
import { List } from 'semantic-ui-react';
//Material UI
// import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import TextField from '@material-ui/core/TextField';
import {
  getDeletedStockById,
  deleteStock,
  ClearAllErrors
} from '../../actions/profileAction';
import { Facebook } from 'react-content-loader';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 200
  },
  card: {
    maxWidth: 345
  },
  media: {
    height: 300
  }
});

class DeletedStock extends Component {
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
      this.props.getDeletedStockById(this.props.match.params.id);
      this.props.ClearAllErrors();
    }
  };
  componentWillReceiveProps = nextProps => {
    if (nextProps.errors.error) {
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
    // if (nextProps.profile.profile === null && this.props.profile.loading) {
    //   this.props.history.push('/notfound');
    // }
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
      profileContentBig = <Facebook />;
    } else {
      profileContentBig = (
        <div>
          {/* Material-ui Card here ..  */}
          <div className="row">
            <div className="col col-sm-12 mb-4">
              <List divided relaxed className="float-left">
                <List.Item>
                  <List.Content>
                    <List.Header as="a">Semantic-Org/Semantic-UI</List.Header>
                    <List.Description as="a" className="mr-2 mb-1">
                      Deleted on{' '}
                      <Moment format="DD/MM/YYYY">
                        {profile.deleted_date}
                      </Moment>
                    </List.Description>
                  </List.Content>
                </List.Item>
              </List>
            </div>
          </div>
          <div class="row">
            <div class="col col-sm-8">
              <TextField
                id="outlined-read-only-input"
                label="BOX"
                defaultValue={profile.box}
                className={classes.textField}
                margin="normal"
                InputProps={{
                  readOnly: true
                }}
                variant="outlined"
              />
              <TextField
                id="outlined-read-only-input"
                label="ROW"
                defaultValue={profile.row}
                className={classes.textField}
                margin="normal"
                InputProps={{
                  readOnly: true
                }}
                variant="outlined"
              />
              <TextField
                id="outlined-read-only-input"
                label="COLUMN"
                defaultValue={profile.column}
                className={classes.textField}
                margin="normal"
                InputProps={{
                  readOnly: true
                }}
                variant="outlined"
              />
              <TextField
                id="outlined-read-only-input"
                label="BAY"
                defaultValue={profile.bay}
                className={classes.textField}
                margin="normal"
                InputProps={{
                  readOnly: true
                }}
                variant="outlined"
              />
              <TextField
                id="outlined-read-only-input"
                label="SIDE"
                defaultValue={profile.side.toUpperCase()}
                className={classes.textField}
                margin="normal"
                InputProps={{
                  readOnly: true
                }}
                variant="outlined"
              />
              <TextField
                id="outlined-read-only-input"
                label="WELL"
                defaultValue={profile.well}
                className={classes.textField}
                margin="normal"
                InputProps={{
                  readOnly: true
                }}
                variant="outlined"
              />
              <TextField
                id="outlined-read-only-input"
                label="SAMPLE"
                defaultValue={profile.sample}
                className={classes.textField}
                margin="normal"
                InputProps={{
                  readOnly: true
                }}
                variant="outlined"
              />
              <TextField
                id="outlined-read-only-input"
                label="STATUS"
                defaultValue={profile.status}
                className={classes.textField}
                margin="normal"
                InputProps={{
                  readOnly: true
                }}
                variant="outlined"
              />
              <div>
                <TextField
                  id="outlined-read-only-input"
                  label="MIN-DEPTH"
                  defaultValue={profile.depth.min}
                  className={classes.textField}
                  margin="normal"
                  InputProps={{
                    readOnly: true
                  }}
                  variant="outlined"
                />
                <TextField
                  id="outlined-read-only-input"
                  label="MAX-DEPTH"
                  defaultValue={profile.depth.max}
                  className={classes.textField}
                  margin="normal"
                  InputProps={{
                    readOnly: true
                  }}
                  variant="outlined"
                />
              </div>
            </div>
            <div class="col col-sm-4">
              <Card className={classes.card}>
                {/* <CardActionArea> */}
                <CardMedia
                  className={classes.media}
                  // image="https://res.cloudinary.com/malikgen/image/upload/v1539516894/v2k2jqrdzci2waxzldoo.jpg"
                  image="http://localhost:5000/1.jpg"
                  title="Contemplative Reptile"
                />
              </Card>
            </div>
          </div>
        </div>

        // </div>
      );
    }

    return (
      <div>
        <div className="container">
          <div className="row ">
            <div className="col-md-6">
              <Link to="/stocks" className="btn btn-light mb-3 float-left">
                Back to Stocks
              </Link>
            </div>
          </div>
          {/* <div className="row"> */}
          {/* <div className="col col-sm-12 m-auto"> */}
          <div>{profileContentBig}</div>
          {/* </div> */}
          {/* </div> */}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    profile: state.profile,
    errors: state.errors
  };
};
export default connect(
  mapStateToProps,
  { getDeletedStockById, deleteStock, ClearAllErrors }
)(withRouter(withStyles(styles)(DeletedStock)));
