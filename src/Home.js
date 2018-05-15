import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import { Row, Col } from 'react-flexbox-grid';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import ThumbDown from 'material-ui/svg-icons/action/thumb-down';
import ThumbUp from 'material-ui/svg-icons/action/thumb-up';
import Person from 'material-ui/svg-icons/social/person';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import KeyboardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import KeyboardArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';



const listProjects = [
  {
    'username': 'vinicius_eng',
    'avatar': 'http://www.material-ui.com/images/jsa-128.jpg',
    'projectTitle': 'UnB Nightmare',
    'projectSubTitle': 'The endless game',
    'projectImg': 'http://unbgames.lappis.rocks/public/images/telainicial_kZ9nsN0.jpg',
    'numberLikes': 56,
    'numberDislikes': 12
  },
  {
    'username': 'vinicius_eng',
    'avatar': <Person />,
    'projectTitle': 'Travelling Will',
    'projectSubTitle': '',
    'projectImg': 'http://unbgames.lappis.rocks/public/images/travelling_will_title_6QI7psB.jpg',
    'numberLikes': 48,
    'numberDislikes': 31
  }
]

export default class Home extends Component{

  constructor(props) {
    super(props);
  }

  mapProjectsIntoCards = () => {
    const listCards = listProjects.map((project, index) => {
      return(
        <Card key={index} style={{marginBottom: '5em'}}>
          <CardHeader title={project.username} avatar={project.avatar}/>
          <CardMedia
            overlay={
              <CardTitle
                title={project.projectTitle}
                subtitle={project.projectSubTitle}
              />
            }
          >
            <img src={project.projectImg} />
          </CardMedia>
          <CardText>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
            Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
            Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
          </CardText>
          <CardActions>
            <FlatButton
              label={project.numberLikes}
              labelPosition="before"
              icon={<ThumbUp />}
              hoverColor="#93f361"
            />
            <FlatButton
              label={project.numberDislikes}
              labelPosition="before"
              icon={<ThumbDown />}
              hoverColor="#ff8e9f"
            />
          </CardActions>
        </Card>
      );
    });
    return listCards;
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
          {this.mapProjectsIntoCards()}
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
