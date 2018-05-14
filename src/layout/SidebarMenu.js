import React from 'react';
import PropTypes from 'prop-types';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import makeMenuItem from '../utils/makeMenuItem';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import Person from 'material-ui/svg-icons/social/person';
import PersonOutline from 'material-ui/svg-icons/social/person-outline';
import {white} from 'material-ui/styles/colors';
import {AuthorizedLink} from '../routes/Router';
import {Link} from 'react-router-dom';
import {List, ListItem} from 'material-ui/List';
import Dashboard from 'material-ui/svg-icons/action/dashboard';
import Work from 'material-ui/svg-icons/action/work';
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
    let menuItem = (<ListItem>
      <Paper>
        <img src="https://camo.githubusercontent.com/e4cfb857b6a8d2286fdd63a5c540429db44566f8/68747470733a2f2f63616c656e6461726d656469612e626c6f622e636f72652e77696e646f77732e6e65742f6173736574732f33383637333334612d386263632d346634342d393638342d3366653633303230656332342e706e67" style={{maxHeight: '5em', paddingLeft: '3.8em'}} />
      </Paper>
    </ListItem>);
    if(this.props.auth){
      menuItem = (
        <ListItem
          disabled={true}
          style={{marginTop: '1em', marginBottom: '1em'}}
          leftAvatar={
            <Avatar
              src="http://www.material-ui.com/images/jsa-128.jpg"
              size={50}
            />
          }
        >
          vinicius_eng
        </ListItem>
      );
    } else {
    }
  return (
    <Drawer open={this.props.navDrawerOpen}>
      <List>
        {menuItem}
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
        {this.props.auth && <Link to=''>
          <MenuItem
            leftIcon={<Work color={white} />}
            primaryText="Meus Projetos"
          />
        </Link>}
      </List>
    </Drawer>
    );
  }
}

