import "./styles.css";
import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Frontpage from "./Frontpage";
import CheckOutPage from "./CheckOutPage";
import Shoppage from "./Shoppage";
import Menu from "./components/Menu";
import Love from "./components/Love";
import Accountpage from "./Accountpage";
import TermsPage from "./TermsPage";
import { CartModal } from "./Cartmodal";

import "./index.css";
import Shopperpage from "./Shopperpage";
import { NeedHelp } from "./NeedHelp";
import { Helmet } from "react-helmet";
import Supportpage from "./Supportpage";

class App extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <meta
            name="viewport"
            content="width=device-width, 
              initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
          />
        </Helmet>

        <BrowserRouter>
          <Menu />
          <div className="bodySection">

          <Route path="/" exact component={Frontpage} />

          <Route path="/shop" exact component={Shoppage} />

          <Route path="/Account" exact component={Accountpage} />

          <Route path="/Shopper" exact component={Shopperpage} />

          <Route path="/Needhelp" exact component={NeedHelp} />

          <Route path="/Checkout" exact component={CheckOutPage} />
          <Route path="/support" exact component={Supportpage} />

          <Route path="/terms" exact component={TermsPage} />
          </div>
          <Love />
        </BrowserRouter>
      </div>
    );
  }
}
document.body.append(document.createElement("section"));
export default App;
