import React from "react";

//The HEADER component renders the front banner on the webpage.
class Shoppageheader extends React.Component {
  render() {
    return (
      <div className="ui grid" id="bannerDivMain">
        <div className="sixteen wide column" id="bannerDivShop">
          <img
            className="storePageImage"
            src="/assets/africanprincesscardImage.png"
          ></img>
        </div>
        <span className="storeName">
          <b>
            {this.props.store_name}, {this.props.store_address}
          </b>
        </span>
      </div>
    );
  }
}

export default Shoppageheader;
