import React from "react";
import "./index.css";

const ReportTemplate = ({ info }) => {

  return (
    <>
      <div  style={{width: '1100px'}}>
        <table cellSpacing="0">
          <tbody>
            <tr>
              <td>
                <div className="c4">Explore the Limits</div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="c1">This certificate is presented to</div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="centered">{info?.name?.toUpperCase()}</div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="c2">
                  for completing the <b>{info?.message}</b>
                </div>
                <div className="c3">{`in ${info?.certificateYear}.`}</div>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="c5">
          <hr />
          Managing Director
        </div>
        <table border="0" cellSpacing="0" cellPadding="0">
          <tbody>
            <img
              alt="certificate"
              height="500"
              width="790"
              src="/images/Certificates/MaangCerti.png"
            ></img>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ReportTemplate;
