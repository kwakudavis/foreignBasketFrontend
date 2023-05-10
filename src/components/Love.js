import React from "react";
import { Link } from "react-router-dom";
import "../index.css";
class Love extends React.Component {
  render() {
    return (
      <div className="loveDiv">
        <div>
          <span style={{ color: "#343538" }}>
            {" "}
            Made with <nbsp />
            <i className="large heart icon Odo"></i>, inspired by{" "}
            <a href="https://www.nonsao.com">NONSAO </a>
          </span>

          <div className="termsAndConditionsLink">
            <Link style={{ color: "#343538", fontSize: "12px" }} to="/terms">
              Terms and conditions
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Love;
