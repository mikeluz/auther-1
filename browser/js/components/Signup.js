import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { addUser } from '../redux/users.js';

/* -----------------    COMPONENT     ------------------ */

class Signup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.onSignupSubmit = this.onSignupSubmit.bind(this);
  }

  render() {
    const { message } = this.props;
    return (
      <div className="signin-container">
        <div className="buffer local">
          <form onSubmit={this.onSignupSubmit}>
            <div className="form-group">
              <label>email</label>
              <input
                name="email"
                type="email"
                onChange={(event) => this.handleChange("email", event.target.value)}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>password</label>
              <input
                name="password"
                type="password"
                onChange={(event) => this.handleChange("password", event.target.value)}
                className="form-control"
                required
              />
            </div>
            <button type="submit" className="btn btn-block btn-primary">{message}</button>
          </form>
        </div>
        <div className="or buffer">
          <div className="back-line">
            <span>OR</span>
          </div>
        </div>
        <div className="buffer oauth">
          <p>
            <a
              target="_self"
              href="/auth/google"
              className="btn btn-social btn-google">
              <i className="fa fa-google" />
              <span>{message} with Google</span>
            </a>
          </p>
        </div>
      </div>
    );
  }

  handleChange(field, value) {
    this.setState({[field]: value})
    console.log(this.state);
  }

  onSignupSubmit(event) {
    const { message } = this.props;
    event.preventDefault();
    this.props.createUser(this.state.email, this.state.password);
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = () => ({ message: 'Sign up' });
const mapDispatch = function (dispatch) {
  return {
    createUser: function(email, password) {
        return dispatch(addUser({email, password}))
    }
  }
};

export default connect(mapState, mapDispatch)(Signup);
