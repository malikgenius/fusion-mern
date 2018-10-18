import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// range slider for Depth
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
//rc Slider
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import Slider from 'rc-slider';
import Tooltip from 'rc-tooltip';
// We can just import Slider or Range to reduce bundle size
// import Slider from 'rc-slider/lib/Slider';
// import Range from 'rc-slider/lib/Range';
import 'rc-slider/assets/index.css';

import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);
const Handle = Slider.Handle;
const wrapperStyle = { width: 400, margin: 50 };

const handle = props => {
  const { value, dragging, index, ...restProps } = props;
  console.log(props);
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={value}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </Tooltip>
  );
};

class RangeSlider extends React.Component {
  state = {
    bay: '',
    column: '',
    row: '',
    side: 'R',
    well: '',
    depth: [],
    value: [],
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

  onRangeChange = value => {
    this.setState({
      depth: value
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className="container">
        <div className="col-md-8 m-auto">
          <Link to="/dashboard" className="btn btn-light">
            Go Back
          </Link>
          <h1 className="display-4 text-center">Add New Product</h1>
          <p className="lead text-center">
            Please fill all the fields with correct data to successfuly submit
            the form.
          </p>
          <small className="d-block pb-3">* = required fields</small>
        </div>
        {/* Range Slider  */}
        {/* <div className="row">
          <div className="col col-8 m-auto">
            <InputRange
              formatLabel={value => `${value}in`}
              step={2}
              maxValue={10000}
              minValue={1000}
              value={this.state.value}
              onChange={value => this.setState({ value })}
            />
          </div>
        </div> */}

        <div>
          <div style={wrapperStyle}>
            <p>Slider with custom handle</p>
            <Slider min={0} max={20} defaultValue={3} handle={handle} />
          </div>
          <div style={wrapperStyle}>
            <p>Range with custom handle</p>
            <Range
              min={1000}
              max={10000}
              defaultValue={[1000, 4000]}
              tipFormatter={value => `${value}"`}
              handle={handle}
              onChange={this.onRangeChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default RangeSlider;
