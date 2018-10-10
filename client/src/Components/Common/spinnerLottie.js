import React from 'react';
import Lottie from 'react-lottie';
import * as animationData from './spinner.json';

export default class SpinnerLottie extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isStopped: false, isPaused: false };
  }

  render() {
    // const buttonStyle = {
    //   display: 'block',
    //   margin: '10px auto'
    // };

    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };

    return (
      <div
        className="mt-5"
        // style={{ width: '200px', margin: 'auto', display: 'block' }}
      >
        <Lottie
          options={defaultOptions}
          height={100}
          width={100}
          isStopped={this.state.isStopped}
          isPaused={this.state.isPaused}
        />
        {/* <button
          style={buttonStyle}
          onClick={() => this.setState({ isStopped: true })}
        >
          stop
        </button>
        <button
          style={buttonStyle}
          onClick={() => this.setState({ isStopped: false })}
        >
          play
        </button>
        <button
          style={buttonStyle}
          onClick={() => this.setState({ isPaused: !this.state.isPaused })}
        >
          pause
        </button> */}
      </div>
    );
  }
}
