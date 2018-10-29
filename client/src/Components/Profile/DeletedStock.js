import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import {
  getDeletedStockById,
  deleteStock,
  ClearAllErrors
} from '../../actions/profileAction';
import QRCode from 'qrcode.react';
//Material UI
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import PrintIcon from '@material-ui/icons/Print';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
// import jsPDF from 'jspdf';

import 'jspdf/dist/jspdf.min.js';
import Spinner from '../Common/spinnerLottie';
import { Facebook } from 'react-content-loader';

const styles = theme => ({
  card: {
    maxWidth: 400
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  actions: {
    display: 'flex'
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8
    }
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  avatar: {
    backgroundColor: red[500]
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
          <Card className={classes.card}>
            <CardHeader
              avatar={
                <Avatar aria-label="Recipe" className={classes.avatar}>
                  {profile.box}
                </Avatar>
              }
              action={
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              }
              title="Shrimp and Chorizo Paella"
              subheader={<Moment format="DD/MM/YYYY">{profile.date}</Moment>}
            />
            <CardMedia
              className={classes.media}
              image={profile.imageurl}
              title="Product Image"
            />

            <CardContent>
              <Typography component="p">
                This impressive paella is a perfect party dish and a fun meal to
                cook together with your guests. Add 1 cup of frozen peas along
                with the mussels, if you like.
              </Typography>
            </CardContent>

            <Link
              to={`/qrcode/${profile._id}`}
              // target="_blank"
            >
              <QRCode
                // below value can take a link to site, or anything.
                // value="https://localhost:3000/"
                // here we will share
                // value={`
                // https://sheltered-anchorage-84432.herokuapp.com/stock/${
                //   profile._id
                // },
                // Box: ${' '}${profile.box}
                // `}
                value={`Box: ${' '}${profile.box}, ${' '} Bay: ${
                  profile.bay
                }, ${' '} Column: ${profile.column}
                `}
                // size={'128'}
                // bgColor={'#0000FF'}
                level={'L'}
                renderAs={'canvas'}
              />
            </Link>

            <CardActions className={classes.actions} disableActionSpacing>
              <Link
                to={`/edit-profile/${profile._id}`}
                // style={{ textDecoration: 'none'}}
              >
                <IconButton aria-label="Edit Stock" style={{ outline: 'none' }}>
                  <EditIcon />
                </IconButton>
              </Link>

              <Link to={`/print-stock/${profile._id}`}>
                <IconButton aria-label="Print" style={{ outline: 'none' }}>
                  <PrintIcon />
                </IconButton>
              </Link>
              <IconButton
                aria-label="Delete Stock"
                style={{ outline: 'none' }}
                onClick={this.onDeleteStock}
              >
                <DeleteIcon />
              </IconButton>
              <IconButton
                className={classnames(classes.expand, {
                  [classes.expandOpen]: this.state.expanded
                })}
                onClick={this.handleExpandClick}
                aria-expanded={this.state.expanded}
                aria-label="Show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </CardActions>
            <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph>Method:</Typography>
                <Typography paragraph>
                  Heat 1/2 cup of the broth in a pot until simmering, add
                  saffron and set aside for 10 minutes.
                </Typography>
                <Typography paragraph>
                  Heat oil in a (14- to 16-inch) paella pan or a large, deep
                  skillet over medium-high heat. Add chicken, shrimp and
                  chorizo, and cook, stirring occasionally until lightly
                  browned, 6 to 8 minutes. Transfer shrimp to a large plate and
                  set aside, leaving chicken and chorizo in the pan. Add
                  pimentón, bay leaves, garlic, tomatoes, onion, salt and
                  pepper, and cook, stirring often until thickened and fragrant,
                  about 10 minutes. Add saffron broth and remaining 4 1/2 cups
                  chicken broth; bring to a boil.
                </Typography>
                <Typography paragraph>
                  Add rice and stir very gently to distribute. Top with
                  artichokes and peppers, and cook without stirring, until most
                  of the liquid is absorbed, 15 to 18 minutes. Reduce heat to
                  medium-low, add reserved shrimp and mussels, tucking them down
                  into the rice, and cook again without stirring, until mussels
                  have opened and rice is just tender, 5 to 7 minutes more.
                  (Discard any mussels that don’t open.)
                </Typography>
                <Typography>
                  Set aside off of the heat to let rest for 10 minutes, and then
                  serve.
                </Typography>
              </CardContent>
            </Collapse>
          </Card>
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
    profile: state.profile,
    errors: state.errors
  };
};
export default connect(
  mapStateToProps,
  { getDeletedStockById, deleteStock, ClearAllErrors }
)(withRouter(withStyles(styles)(DeletedStock)));
