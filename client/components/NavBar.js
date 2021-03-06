import React from 'react';
import Login from './Login';
import Signup from './Signup';
import Logout from './Logout';

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    $('.dropdown').foundation();
  }

  handleChange(value) {
    this.props.changeChannel(value);
  }

  handleMixtape() {
    this.props.onMixtapeSelected();
  }

  render() {
    return (
      <div className="container">
        <div className="row">
        <div className="medium-6 columns">

          <ul className="dropdown menu align-left" data-dropdown-menu>
            <li value="'default'" onClick={(e) => this.handleChange(e.currentTarget.value)}>
              <h2 id="site_title"><a>CAT TANK</a></h2>
            </li>
            <li className="is-dropdown-submenu-parent">
              <a>Channels</a>
              <ul className="menu">
              {
                this.props.channelInfo.map((channel)=>{
                  return (
                    <li
                      value={channel.id}
                      onClick={(e) => this.handleChange(e.currentTarget.value)}>
                    <a>{channel.name}</a>
                    </li>
                  )
                })
              }
              </ul>
            </li>
            { this.props.signedin
              ? <li><a href="#" onClick={ (e) => { e.preventDefault(); this.handleMixtape() } }>Mixtape</a></li>
              : null }
          </ul>

        </div>
        <div className="medium-6 columns" id="logsign-buttons">

          { this.props.signedin
            ? <Logout
                user={this.props.user}
                declareSignedOut={() => this.props.declareSignedOut()}
              />
            : <span>
                <Login declareSignedIn={(username) => this.props.declareSignedIn(username)}/>
                <Signup declareSignedIn={(username) => this.props.declareSignedIn(username)} />
              </span>
          }
         </div>
        </div>
      </div>
    );
  }
}

NavBar.propTypes = {
  changeChannel: React.PropTypes.func,
  onMixtapeSelected: React.PropTypes.func
};
