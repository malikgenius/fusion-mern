import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
// range slider for Depth
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';

import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
// axios dropzone cropper cloudinary all below..
import axios from 'axios';
import FormData from 'form-data';
import Dropzone from 'react-dropzone';
import Cropper from 'react-cropper';
// cloudinary react SDK
import { Image, CloudinaryContext, Transformation } from 'cloudinary-react';
import 'cropperjs/dist/cropper.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '../Common/spinnerLottie';
import { editStock, getProfileById } from '../../actions/profileAction';
import { getBoxesCount } from '../../actions/countAction';

// //RC-Slider config here ..
// const createSliderWithTooltip = Slider.createSliderWithTooltip;
// const Range = createSliderWithTooltip(Slider.Range);
// const Handle = Slider.Handle;
const wrapperStyle = { width: 400, margin: 20 };

// const handle = props => {
//   const { value, dragging, index, ...restProps } = props;
//   console.log(props);
//   return (
//     <Tooltip
//       prefixCls="rc-slider-tooltip"
//       overlay={value}
//       visible={dragging}
//       placement="top"
//       key={index}
//     >
//       <Handle value={value} {...restProps} />
//     </Tooltip>
//   );
// };

// react-input-range goes here ..
const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  }
});

const Box = [
  {
    value: '1',
    label: 'Box 1'
  },
  {
    value: '2',
    label: 'Box 2'
  },
  {
    value: '3',
    label: 'Box 3'
  },
  {
    value: '4',
    label: 'Box 4'
  },
  {
    value: '5',
    label: 'Box 5'
  }
];

const sides = [
  {
    value: 'r',
    label: 'R'
  },
  {
    value: 'l',
    label: 'L'
  }
];

// Range Slider Wrapper Style
// const wrapperStyle = { width: 300 };

class EditMaterialUiForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bay: '',
      column: '',
      row: '',
      side: '',
      well: '',
      depth: {
        min: 1000,
        max: 4999
      },
      box: '',
      sample: '',
      status: '',
      files: '',
      imageurl: '',
      imagepublicid: '',
      cropResult: null,
      image: {},
      errors: '',
      success: '',
      disabled: false,
      progress: false
    };
  }

  componentDidMount = () => {
    if (this.props.match.params.id) {
      this.props.getProfileById(this.props.match.params.id);
      this.props.getBoxesCount();
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile === null && this.props.profile.loading) {
      this.props.history.push('/notfound');
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors.error });
    }
    if (nextProps.success) {
      this.setState({ success: nextProps.success.success });
    }
    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      this.setState({
        bay: profile.bay,
        column: profile.column,
        row: profile.row,
        side: profile.side,
        well: profile.well,
        box: profile.box,
        sample: profile.sample,
        status: profile.status,
        depth: profile.depth,
        imageurl: profile.imageurl,
        imagepublicid: profile.imagepublicid
      });
    }
  }
  //clear any errors on Focus
  onFocus = () => {
    this.setState({ errors: '' });
  };

  // Toast Notifications
  toastNotify = () => {
    // toast('Default Notification !');
    if (this.state.success) {
      toast.success(this.state.success, {
        position: toast.POSITION.TOP_CENTER
      });
    }
    toast.error(this.state.errors, {
      position: toast.POSITION.TOP_LEFT
    });
  };
  // IMAGE FUNCTIONS ALL HERE ..
  // Dropzone
  onDrop = files => {
    this.setState({
      files,
      filename: files[0].name,
      disabled: true
    });
  };
  // Cropper
  cropImage = () => {
    if (typeof this.refs.cropper.getCroppedCanvas() === 'undefined') {
      return;
    }
    this.refs.cropper.getCroppedCanvas().toBlob(blob => {
      let imageUrl = URL.createObjectURL(blob);

      this.setState({
        cropResult: imageUrl,
        image: blob
      });
    }, 'image/jpeg');
  };

  // upload Image from DropZONE and Cropper .. when click on check in dropzone preview
  uploadImage = async () => {
    //disable submit button, user shouldnt be able to submit before image upload
    this.setState({ disabled: true });
    const file = this.state.image;
    const formData = new FormData();
    // Spinner activated
    this.setState({ progress: true });
    // this.setState({ files: e.target.files });
    formData.append('file', file);
    await axios
      .post('/api/upload', formData, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        // headers: { 'Content-Type': 'multipart/form-data' }
      })
      .then(res => {
        this.setState({
          imageurl: res.data.secure_url,
          imagepublicid: res.data.public_id,
          disabled: false,
          progress: false
        });
      });
    this.cancelCrop();
  };
  // when clicked on cancel
  cancelCrop = () => {
    this.setState({
      files: [],
      image: {},
      disabled: false
    });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  // how to change / update nested object properties ... prevState
  onMinRangeChange = e => {
    // e.persist();
    // change value to int from string with parseInt 10 at the end is from mathmatic.
    const value = parseInt(e.target.value, 10);
    console.log(value);
    this.setState(prevState => ({
      depth: {
        ...prevState.depth,
        min: value
      }
    }));
  };

  onMaxRangeChange = e => {
    // e.persist();
    const value = parseInt(e.target.value, 10);
    console.log(value);
    this.setState(prevState => ({
      depth: {
        ...prevState.depth,
        max: value
      }
    }));
  };

  onSubmit = e => {
    e.preventDefault();

    const profileData = {
      id: this.props.profile.profile._id,
      bay: this.state.bay,
      column: this.state.column,
      row: this.state.row,
      side: this.state.side,
      well: this.state.well,
      box: this.state.box,
      sample: this.state.sample,
      status: this.state.status,
      depth: this.state.depth,
      imageurl: this.state.imageurl,
      imagepublicid: this.state.imagepublicid
    };
    this.props.editStock(profileData, this.props.history);
  };

  render() {
    const { classes } = this.props;
    const { errors } = this.state;
    const { records } = this.props.count;

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link to="/dashboard" className="btn btn-light">
              Go Back
            </Link>
            <h1 className="display-4 text-center">Edit Stock Item</h1>
            <p className="lead text-center">
              Please fill all the fields with correct data to successfuly submit
              the form.
            </p>
            <small className="d-block pb-3">* = required fields</small>
            <form autoComplete="on" onSubmit={this.onSubmit}>
              <TextField
                required
                id="standard-name"
                name="bay"
                label="Bay"
                className={classes.textField}
                value={this.state.bay}
                onChange={this.handleChange}
                margin="normal"
              />
              <TextField
                required
                name="row"
                label="Row"
                className={classes.textField}
                value={this.state.row}
                onChange={this.handleChange}
                margin="normal"
              />
              <TextField
                required
                name="column"
                label="Column"
                className={classes.textField}
                value={this.state.column}
                onChange={this.handleChange}
                margin="normal"
              />
              <TextField
                id="standard-select-Side"
                name="side"
                select
                label="Side"
                className={classes.textField}
                value={this.state.side}
                onChange={this.handleChange}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu
                  }
                }}
                helperText="Please select a side Right or Left"
                margin="normal"
              >
                {sides.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                required
                name="well"
                label="Well"
                className={classes.textField}
                value={this.state.well}
                onChange={this.handleChange}
                margin="normal"
              />
              <TextField
                required
                name="sample"
                label="Sample"
                className={classes.textField}
                value={this.state.sample}
                onChange={this.handleChange}
                margin="normal"
              />

              {/* <TextField
                name="box"
                select
                label="Box No"
                className={classes.textField}
                value={this.state.box}
                onChange={this.handleChange}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu
                  }
                }}
                helperText="Please select the Box Number"
                margin="normal"
              > */}
              {/* Box options are coming from count redux store, if its not loaded yet will use local box if loaded will use records */}
              {/* {this.props.count.records
                  ? records.map(option => (
                      <MenuItem key={option._id} value={option._id}>
                        Box {option._id}
                      </MenuItem>
                    ))
                  : Box.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
              </TextField> */}
              <TextField
                required
                name="box"
                label="Box No"
                className={classes.textField}
                value={this.state.box}
                onChange={this.handleChange}
                margin="normal"
                helperText="Please add or edit a box number "
              />
              <TextField
                id="standard-multiline-flexible"
                fullWidth
                name="status"
                label="Status"
                multiline
                rowsMax="4"
                value={this.state.status}
                onChange={this.handleChange}
                className={classes.textField}
                margin="normal"
              />

              <div className="pt-4 d-flex justify-content-between align-items-center">
                <div style={wrapperStyle}>
                  <p
                    className="mb-4"
                    style={{
                      fontSize: '0.75rem',
                      color: 'rgba(0, 0, 0, 0.54)'
                    }}
                  >
                    Depth Range Selector
                  </p>
                  <InputRange
                    minValue={0}
                    maxValue={10000}
                    // defaultValue={[4000, 4999]}
                    tipFormatter={value => `${value}in`}
                    value={this.state.depth}
                    onChange={value => this.setState({ depth: value })}
                  />
                </div>

                <TextField
                  required
                  // disabled
                  type="number"
                  name="min"
                  label="Min Depth"
                  className={classes.textField}
                  value={this.state.depth.min}
                  onChange={this.onMinRangeChange}
                  margin="normal"
                  variant="filled"
                />
                <TextField
                  required
                  type="number"
                  // disabled
                  name="max"
                  label="Max Depth"
                  className={classes.textField}
                  value={this.state.depth.max}
                  onChange={this.onMaxRangeChange}
                  margin="normal"
                  variant="filled"
                />
              </div>

              {/* DropZONE & CropperJS dropping and cropping at same time ..  */}
              <div className="row container mt-3">
                <div className=" col-sm-4">
                  <Dropzone
                    onDrop={this.onDrop}
                    // multiple={false}
                    // style={{ maxHeight: '100px', maxWidth: '100px' }}
                  >
                    <div className="text-center mt-4">
                      <i className="fas fa-upload fa-4x text-center mb-3" />
                      <p className="lead text-center mb-5">Drop Image here</p>
                    </div>
                  </Dropzone>
                </div>
                <div className=" col-sm-4">
                  {this.state.files[0] ? (
                    <Cropper
                      style={{
                        maxHeight: '200px',
                        maxWidth: '200px',
                        marginTop: 0
                      }}
                      ref="cropper"
                      src={this.state.files[0].preview}
                      //Rectangle image settings
                      // aspectRatio={16 / 9}
                      // square image settings
                      aspectRatio={1}
                      viewMode={0}
                      dragMode="move"
                      guides={true}
                      // scalable will let user freely crop
                      scalable={false}
                      cropBoxMovable={true}
                      cropBoxResizable={true}
                      crop={this.cropImage}
                    />
                  ) : (
                    <CloudinaryContext cloudName="malikgen">
                      <Image publicId={this.state.imagepublicid}>
                        <Transformation width="200" crop="scale" angle="10" />
                      </Image>
                    </CloudinaryContext>
                  )}
                </div>
                {this.state.files[0] && (
                  <div className="m-auto col-sm-4">
                    <img
                      // className="col col-md-12"
                      style={{ maxHeight: '200px', maxWidth: '200px' }}
                      src={this.state.cropResult}
                    />
                    <div className="col col-md-12 mt-1">
                      <button
                        className="btn btn-outline-success float-left btn-sm"
                        type="button"
                        onClick={this.uploadImage}
                      >
                        <i className="fas fa-check m-1" />
                        confirm
                      </button>
                      <button
                        className="btn btn-outline-danger float-right btn-sm"
                        type="button"
                        onClick={this.cancelCrop}
                      >
                        <i className="far fa-times-circle m-1" />
                        cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
              {this.state.progress ? (
                <Spinner />
              ) : (
                <div>
                  {' '}
                  <div className="row container">
                    <div className="mb-3 col-md-4" />
                    <div className=" col-md-4" />
                  </div>
                  <input
                    type="submit"
                    value="Submit"
                    className="btn btn-info btn-block mt-4 mb-4"
                    disabled={this.state.disabled}
                  />
                </div>
              )}
            </form>
          </div>
        </div>
        <ToastContainer />
        {/* if Errors in state .. below  will run to show notificaitons on screen .. react-toastify */}
        {errors && this.toastNotify()}
      </div>
    );
  }
}

// TextFields.propTypes = {
//   classes: PropTypes.object.isRequired
// };
const mapStateToProps = state => ({
  profile: state.profile,
  count: state.count,
  errors: state.errors,
  success: state.success
});

export default connect(
  mapStateToProps,
  { editStock, getProfileById, getBoxesCount }
)(withRouter(withStyles(styles)(EditMaterialUiForm)));

// export default withStyles(styles)(TextFields);
