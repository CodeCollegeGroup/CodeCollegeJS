import React from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import MenuStore from '../stores/MenuStore';
import MenuItem from 'material-ui/MenuItem';
import {white} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import makeMenuItem from '../utils/makeMenuItem';
import Menu from 'material-ui/svg-icons/navigation/menu';
//import getMuiTheme from 'material-ui/styles/getMuiTheme';
//import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import ActionType from '../actions/ActionType';
import AppDispatcher from '../AppDispatcher';
//import {withRouter} from 'react-router';
import LogoutComponent from '../auth/LogoutComponent';
import {Auth} from '../auth/Auth';
import {Link} from 'react-router-dom';
import LockOpen from 'material-ui/svg-icons/action/lock-open';
import AssignmentInd from 'material-ui/svg-icons/action/assignment-ind';

// TODO: Make css in a extern file
// const muiTheme = getMuiTheme({
//   appBar: {
//     color: '#225'
//   },
// });

class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = MenuStore.getState();
  }

  static propTypes = {
    auth: PropTypes.bool,
    styles: PropTypes.object,
    handleChangeRequestNavDrawer: PropTypes.func
  }

  handleOnRequestChange = (value) => {
    AppDispatcher.dispatch({
      action: ActionType.MENU.REQUESTCHANGE,
      openMenu: value,
    });
  }

  handleUpdate = () => {
    this.setState(MenuStore.getState());
  }

  componentWillMount = () => this.setState({updateId: MenuStore.addListener(this.handleUpdate) })

  componentWillUnmount = () => this.state.updateId.remove()

  render() {

    const {styles, handleChangeRequestNavDrawer, auth} = this.props;

    const style = {
      menuButton: {
        marginLeft: 30
      },
      iconsRightContainer: {
        marginLeft: 30
      },
    };

    const iconButton = <IconButton> <MoreVertIcon /> </IconButton>;

    return (
      <AppBar
        title="CodeCollege"
        className='AppBar'
        style={styles}
        iconElementLeft={
          <div>
            <IconButton style={style.menuButton} onClick={handleChangeRequestNavDrawer}>
              <Menu color={white} />
            </IconButton>
          </div>
        }
        iconElementRight={
          <IconMenu
            styles={style.iconsRightContainer}
            iconButtonElement={iconButton}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
            onRequestChange={this.handleOnRequestChange}
            open={this.state.openMenu}
          >
            <MenuItem>
              {!auth && <div><Link to='/login'>
                <MenuItem
                  leftIcon={<LockOpen />}
                  primaryText='Login'
                />
              </Link>
              <Link to='/register'>
                <MenuItem
                  leftIcon={<AssignmentInd />}
                  primaryText='Sign Up'
                />
              </Link></div>
              }
              { auth &&
                <LogoutComponent />
              }
              { auth && <Link to='/login/changepassword'>
                <MenuItem
                  primaryText='Change password'
                />
              </Link>
              }
            </MenuItem>
          </IconMenu>
        }
      />
    );
  }

}

export default Header;
