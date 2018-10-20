/* eslint react/prop-types: 0 */
import React, { Component } from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle
} from 'reactstrap';
// import { Icon } from 'semantic-ui-react';
// import ToggleButton from './ToggleButton';
// import ModalEmployee from './ModalEmployee';
// import { CopyToClipboard } from 'react-copy-to-clipboard';

class BoxCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      copied: false
    };
  }

  ToggleModalEmployee = () => {
    return this.setState({ showModal: !this.state.showModal });
  };

  render() {
    let cardImage = null;
    // if (this.props.employee.imageURL) {
    //   cardImage = (
    //     <CardImg
    //       top
    //       width="100%"
    //       src={`${this.props.employee.imageURL}`}
    //       alt="Card image cap"
    //     />
    //   );
    // } else {
    //   if (this.props.employee.gender === 'female') {
    //     cardImage = (
    //       <CardImg
    //         top
    //         width="100%"
    //         src="/assets/female.jpg"
    //         alt="Card image cap"
    //       />
    //     );
    //   } else {
    //     cardImage = (
    //       <CardImg
    //         top
    //         width="80%"
    //         height="80%"
    //         src="/assets/male.jpg"
    //         alt="Card image cap"
    //       />
    //     );
    //   }
    // }

    return (
      <div>
        <Card>
          <div onClick={this.ToggleModalEmployee}>{cardImage}</div>
          {/* <CardImg top width="100%" src={`${props.employee.image}`} alt="Card image cap" /> */}
          <CardBody>
            <CardTitle style={{ fontWeight: 500 }}>
              Box no: {this.props.box._id}
            </CardTitle>
            <CardSubtitle style={{ fontWeight: 300 }}>
              Total Records Included {this.props.box.records}
            </CardSubtitle>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default BoxCard;
