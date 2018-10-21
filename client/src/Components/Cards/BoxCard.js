/* eslint react/prop-types: 0 */
import React, { Component } from 'react';
import {
  Badge,
  Button,
  Card,
  CardHeader,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle
} from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getBoxStocks } from '../../actions/profileAction';
// import { Icon } from 'semantic-ui-react';
// import ToggleButton from './ToggleButton';
// import ModalEmployee from './ModalEmployee';
// import { CopyToClipboard } from 'react-copy-to-clipboard';

class BoxCard extends Component {
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
        <Card className="mb-4">
          <CardHeader tag="h3" className="text-muted text-center">
            Box {this.props.box._id}
            {}
          </CardHeader>
          {/* <CardImg top width="100%" src={`${props.employee.image}`} alt="Card image cap" /> */}
          <CardBody>
            <CardSubtitle style={{ fontWeight: 300 }}>
              Records found{' '}
              <Badge color="secondary" className="">
                {this.props.box.records}
              </Badge>
            </CardSubtitle>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default connect(
  null,
  { getBoxStocks }
)(withRouter(BoxCard));
