//Import FirebaseAuth and firebase.
/** 
import React from "react";
//import * as firebaseAuth from "firebase/auth";
import * as firebaseApp from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

// Configure Firebase.
const config = {
  apiKey: "AIzaSyCqbvXjdXn6FntTK_HeJmH_jHGCVmPp47c",
  authDomain: "foreignbasket-df2e5.firebaseapp.com",
  databaseURL:
    "https://foreignbasket-df2e5-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "foreignbasket-df2e5",
  storageBucket: "foreignbasket-df2e5.appspot.com",
  messagingSenderId: "213245806986",
  appId: "1:213245806986:web:46c4b6929b1ec86b99a073",
  measurementId: "G-7RYZM315HC"
};

/////Initialize firebase App
const app = firebaseApp.initializeApp(config);

////// Get auth
const auth = getAuth();

/////// Set up providers to be used
var googleprovider = new GoogleAuthProvider();

////// Set scopes for google auth provider
googleprovider.addScope("profile");
googleprovider.addScope("email");

class Auth extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isLoggedIn: null };
  }

  triggeredOnChange = (user) => {
    ///////Update is Logged in State with true if user is logged in
    if (user) {
      this.setState({ isLoggedIn: true });
      console.log("User is logged in");
      this.props.signIn(user);
      console.log(user);
      console.log(this.props.loginState);
      //////Update is Logged in State with false if user is not logged in
    } else {
      this.setState({ isLoggedIn: false });
      console.log("User is logged Out");
      this.props.signOut();
    }
  };

  componentDidMount() {
    //console.log(firebaseAuth);

    ///////Check if the user is logged in.
 //   firebaseAuth.onAuthStateChanged(auth, this.triggeredOnChange);

    /** 
    this.firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        console.log("user is signed in");
      } else {
        {
          
        }
      }
    });
  }

  render() {
    return (
      <div>
        <div id="recaptcha-container"></div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loginState: state.loginState
  };
};

export default connect(mapStateToProps, { signIn, signOut })(Auth);
*/
