import React, {Component} from 'react';
import {connect} from 'react-redux'
import {signIn, signOut} from '../actions'


class GoogleAuth extends Component {
  
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "767677049395-u9thg7k3o6b0hl9ejtkv8rlfcsmrl9fi.apps.googleusercontent.com",
          scope: "email"
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get())
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = isSignedIn => {
    if(isSignedIn) {
      this.props.signIn(this.auth
          .currentUser.get()
          .getId());
    } else {
      this.props.signOut()
    }
  };
  onGoogleSignInClick = () => {
    this.auth.signIn();
  };

  onGoogleSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button onClick={this.onGoogleSignOutClick} className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={this.onGoogleSignInClick} className="ui red google button">
          <i className="google icon" />
          Sign In w/Google
        </button>
      );
    }
  }
  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}
const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn }
}

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);