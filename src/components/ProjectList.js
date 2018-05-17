import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import ThumbDown from 'material-ui/svg-icons/action/thumb-down';
import ThumbUp from 'material-ui/svg-icons/action/thumb-up';
import Person from 'material-ui/svg-icons/social/person';
import {getData} from '../resources/Requests';


export default class ProjectList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      projects: []
    };
  }

  componentWillMount = () => {
    this.fetchProjects();
  }

  fetchProjects = () => {
    getData(
      'http://localhost:8000/api/projects/projects/',
      (data) => {
        this.setState({projects: data});
      },
      () => {},
      () => {},
      false
    );
  }

  mapProjectsIntoCards = () => {
    console.log(this.state);
    const listCards = this.state.projects.map((project, index) => {
      return(
        <Card key={index} style={{marginBottom: '5em'}}>
          <CardHeader title={project.owner.username} avatar={<Person />}/>
          <CardMedia
            overlay={
              <CardTitle
                title={project.title}
                subtitle={project.subtitle}
              />
            }
          >
            <img src={project.project_image[0].image} />
          </CardMedia>
          <CardText>
            {project.description}
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

  render() {
    return(
      this.mapProjectsIntoCards()
    );
  }

}
