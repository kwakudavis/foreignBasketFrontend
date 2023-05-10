import React from "react";

//The HEADER component renders the front banner on the webpage.
class Frontpageheader extends React.Component {
  render() {
    return (
      <div className="ui grid">
        <div className="sixteen wide column" id="bannerDiv">
          <h2 className="bannerCaption">
            African Groceries
            <br />
            at your
            <br />
            doorstep
          </h2>

          <img className="homeBanner" src="/assets/shopBannerOld.jpg"></img>
        </div>
      </div>
    );
  }
}

export default Frontpageheader;
