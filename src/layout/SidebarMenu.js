import React from 'react';
import PropTypes from 'prop-types';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import makeMenuItem from '../utils/makeMenuItem';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import Person from 'material-ui/svg-icons/social/person';
import PersonOutline from 'material-ui/svg-icons/social/person-outline';
import {white} from 'material-ui/styles/colors';
import {AuthorizedLink} from '../routes/Router';
import {Link} from 'react-router-dom';
import {List, ListItem} from 'material-ui/List';
import Dashboard from 'material-ui/svg-icons/action/dashboard';
import Home from 'material-ui/svg-icons/action/home';

export default class SidebarMenu extends React.Component {

  static propTypes = {
    navDrawerOpen: PropTypes.bool.isRequired,
    auth: PropTypes.bool.isRequired,
  }
  state = {
    open: false,
  };

  handleToggle = () => {
    this.setState({
      open: !this.state.open,
    });
  };

  render() {
    return (
      <Drawer open={this.props.navDrawerOpen}>
        <List>
            <Link to='/'>
              <MenuItem
                leftIcon={<Home color={white} />}
                primaryText="Home"
              />
            </Link>
          {this.props.auth && <Link to=''>
              <MenuItem
                leftIcon={<Dashboard color={white} />}
                primaryText="Dados Cadastrais"
              />
            </Link>}
        </List>
      </Drawer>
    );
  }
}

