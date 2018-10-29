/* eslint react/prop-types: 0 */
import React, { Component } from 'react';
import { Button, Icon, Label } from 'semantic-ui-react';
// import {
//   Badge,
//   Button,
//   Card,
//   CardHeader,
//   CardImg,
//   CardText,
//   CardBody,
//   CardTitle,
//   CardSubtitle
// } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getBoxStocks } from '../../actions/profileAction';
// import { Icon } from 'semantic-ui-react';
// import ToggleButton from './ToggleButton';
// import ModalEmployee from './ModalEmployee';
// import { CopyToClipboard } from 'react-copy-to-clipboard';

class BoxCardSemanticUi extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      copied: false,
      page: '1'
    };
  }

  ToggleModalEmployee = () => {
    return this.setState({ showModal: !this.state.showModal });
  };
  OnCardClick = () => {
    this.props.getBoxStocks(
      this.state.page,
      this.props.box._id,
      this.props.history
    );
  };

  render() {
    let cardImage = null;

    return (
      <div onClick={this.OnCardClick} style={{ cursor: 'pointer' }}>
        <Button as="div" labelPosition="right" className="mb-4" size="large">
          <Button basic size="large">
            <Icon name="fork" size="medium" color="blue" />
            Box {this.props.box._id}
          </Button>
          <Label as="a" basic color="blue" pointing="left">
            {this.props.box.records}
          </Label>
        </Button>

        {/* <Card className="mb-4">
          <CardHeader tag="h3" className="text-muted text-center">
            Box {this.props.box._id}
            {}
          </CardHeader>
        
          <CardBody>
            <CardSubtitle style={{ fontWeight: 300 }}>
              Records found{' '}
              <Badge color="secondary" className="">
                {this.props.box.records}
              </Badge>
            </CardSubtitle>
          </CardBody>
        </Card> */}
      </div>
    );
  }
}

export default connect(
  null,
  { getBoxStocks }
)(withRouter(BoxCardSemanticUi));
