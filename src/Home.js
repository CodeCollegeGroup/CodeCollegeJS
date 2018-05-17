import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import { Row, Col } from 'react-flexbox-grid';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import KeyboardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import KeyboardArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import ProjectList from './components/ProjectList';


export default class Home extends Component{

  constructor(props) {
    super(props);
  }

  getMenu = () => {
    return(
      <Paper>
      <Menu>
        <MenuItem primaryText="Ordenar por" insetChildren={true} disabled={true} />
        <Divider />
        <MenuItem primaryText="Mais curtidos" checked={true} />
        <MenuItem primaryText="Menos curtidos" />
        <MenuItem primaryText="Mais recentes" />
        <MenuItem primaryText="Menos recentes" />
      </Menu>
      </Paper>
    );
  }

  getPaginator = () => {
    return(
      <Paper style={{marginBottom: '2em'}}>
        <FlatButton icon={<KeyboardArrowLeft  />}/>
        <FlatButton label="1" />
        <FlatButton label="2" />
        <FlatButton label="3" />
        <FlatButton icon={<KeyboardArrowRight  />}/>
      </Paper>
    );
  }

  render(){
    return (
      <div>
      <h1>Home</h1>
      <Row>
        <Col xs={3}>
          {this.getMenu()}
        </Col>
        <Col xs>
          <ProjectList/>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <Row center="xs">
            <Col xs={8}>
            {this.getPaginator()}
            </Col>
          </Row>
        </Col>
      </Row>
      </div>
    );
  }
}
