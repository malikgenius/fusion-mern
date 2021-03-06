import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getDeletedStockById } from '../../actions/profileAction';

class StockItem extends Component {
  // onStockClick = id => {
  //   this.props.getProfileById(id);
  // };
  render() {
    const { stocks } = this.props;
    console.log(stocks);

    // Small Screen Row cols
    const stockSmall = stocks.map(profile => (
      <div className=" pb-1  bg-light mb-2 " key={profile._id}>
        <div className="row container mb-1 ">
          <div className="col-1-mb-4 mr-1 ">
            <i className="fa fa-black-tie  fa-2x text-info  border  p-2 bg-light" />
          </div>
          <div className="col-8  align-content-end m-auto">
            <div className="h6 lead font-weight-light">{profile.bay}</div>
            <div className="h6 text-muted mb-0 font-weight-light">
              {profile.box}
            </div>
          </div>
          <div className="div col-1 ml-auto">
            <Link to={`/deleted-stock/${profile._id}`}>
              <i
                // onClick={() => this.onStockClick(profile._id)}
                className="far fa-edit text-primary"
                style={{ cursor: 'pointer' }}
              />
            </Link>
          </div>
        </div>
      </div>
    ));
    // Big & Middle screen only -- TABLE
    const stockBig = stocks.map(profile => (
      // <tbody key={profile._id} style={{ backgroundColor: 'none' }}>
      <tr key={profile._id}>
        {/* <th /> */}
        {/* <td>{profile._id}</td> */}
        <td className="text-center">{profile.bay}</td>
        <td className="text-center">{profile.box}</td>
        <td className="text-center">{profile.row}</td>
        <td className="text-center">{profile.column}</td>
        <td className="border-0 text-center">
          {profile.depth.min} - {profile.depth.max}
        </td>
        {/* <td className="border-0">{profile.depth.max}</td> */}
        <td className="text-capitalize text-center">{profile.side}</td>
        <td className="text-center">{profile.well}</td>
        {/* <td>{profile.box}</td> */}
        <td className="text-center">{profile.sample}</td>
        <td className="text-center">{profile.status}</td>

        <td className="mr-auto">
          <Link to={`/deleted-stock/${profile._id}`}>
            <i
              // onClick={() => this.onStockClick(profile._id)}
              className="far fa-edit text-primary"
              style={{ cursor: 'pointer' }}
            />
          </Link>
        </td>
      </tr>
      // </tbody>
    ));

    return (
      <div>
        {/* <h4 className="mb-4">Experience Credentials</h4> */}
        <div className=" d-md-none">{stockSmall}</div>
        <table className="table d-none d-md-table table-striped table-bordered ">
          <thead className="text-center align-top">
            <tr>
              {/* <th scope="col">Id</th> */}
              <th scope="col">BAY</th>
              <th scope="col">BOX</th>
              <th scope="col">ROW</th>
              <th scope="col">COLUMN</th>
              <th scope="col" className="text-center ">
                DEPTH
                {/* <th className="border-0 text-muted">Min</th>
                <th className="border-0 text-muted">Max</th> */}
              </th>
              <th scope="col">SIDE</th>
              <th scope="col">WELL NUMBER</th>
              {/* <th scope="col">BOX NUMBER</th> */}
              <th scope="col">TYPE OF SAMPLE</th>
              <th scope="col">Status</th>
              <th />
            </tr>
          </thead>
          <tbody>{stockBig}</tbody>
        </table>
        {/* <div className=" d-md-none">{stockSmall}</div> */}
        {/* <div>{stockSmall}</div> */}
      </div>
    );
  }
}

export default connect(
  null,
  { getDeletedStockById }
)(StockItem);
