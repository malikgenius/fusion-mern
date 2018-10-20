/* eslint react/prop-types: 0 */
import React from 'react';
import _ from 'lodash';
import { Container, Row, Col } from 'reactstrap';
import BoxCard from './BoxCard';

const CardList = ({ boxes }) => {
  // console.log(employees);
  //   const SortedEmployees = _.sortBy(boxes, ["type", "_id"]);
  var SortedEmployees = _.orderBy(boxes, ['type', '_id'], ['desc', 'asc']);
  // eslint-disable-next-line
  const Boxes = SortedEmployees.map(box => {
    if (box) {
      return (
        <Col sm="3" key={box._id}>
          {' '}
          <BoxCard box={box} />
        </Col>
      );
    }
  });
  return (
    <div>
      <Container>
        <Row style={{ border: 1 }}>{Boxes}</Row>
      </Container>
    </div>
  );
};

export default CardList;
