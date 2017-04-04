import React from 'react';
import { connect } from 'react-redux';
import { axios } from 'axios';
import { loginUser} from '../redux/users'
import { browserHistory } from 'react-router';

/* -----------------    COMPONENT     ------------------ */

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'kalo@sokum.com',
      password: 'rojgaf'
    };
    this.onLoginSubmit = this.onLoginSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    const { message } = this.props;
    return (
      <div className="signin-container">
        <div className="buffer local">
          <form onSubmit={this.onLoginSubmit}>
            <div className="form-group">
              <label>email</label>
              <input
                name="email"
                type="email"
                value={this.state.email}
                onChange={(event) => this.handleChange('email', event.target.value)}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
                <label>password</label>
                <input
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={(event) => this.handleChange('password', event.target.value)}
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

  handleChange(field, value){
    this.setState({[field]:value})
  }

  onLoginSubmit(event) {
    event.preventDefault();
    this.props.login(this.state.email, this.state.password)
      .catch((err) => {
        console.log(err)
      });
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = () => ({ message: 'Log in' });
const mapDispatch = function (dispatch) {
  return {
    login: function (email, password) {
      return dispatch(loginUser(email, password));
    }
  }
};

export default connect(mapState, mapDispatch)(Login);
