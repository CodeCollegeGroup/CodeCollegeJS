import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import MenuItem from 'material-ui/MenuItem';
import Formsy from 'formsy-react';
import { Row, Col } from 'react-flexbox-grid';
import {FormsyText, FormsyDate, FormsySelect} from 'formsy-material-ui/lib';
import AppDispatcher from '../../AppDispatcher';
import UserRegistrationStore from '../../stores/UserRegistrationStore';
import ActionType from '../../actions/ActionType';
import {getData} from '../../resources/Requests';
import Title from '../../components/Title';
import Subtitle from '../../components/Subtitle';


Date.prototype.getDateFormat = function() {
  var mm = this.getMonth() + 1; // getMonth() is zero-based
  var dd = this.getDate();

  return [this.getFullYear(),
          (mm>9 ? '' : '0') + mm,
          (dd>9 ? '' : '0') + dd
         ].join('-');
};

export default class RegistrationForm extends Component{

  constructor(props){
    super(props);

    this.state = {...UserRegistrationStore.getInitialState(), ...{universities: []}};
  }

  componentWillMount = () => {
    this.setState({
      listener: UserRegistrationStore.addListener(this.handleChange)
    });
    this.fetchUniversities();
  }

  componentWillUnmount = () => this.state.listener.remove()

  handleChange = () => {
    const {userCreated} = UserRegistrationStore.getState();
    this.setState({userCreated});
  }

  handleSubmit = (data) => {
    data.birthday = data.birthday.getDateFormat();
    AppDispatcher.dispatch({
      action: ActionType.REGISTER.POST,
      data: data,
    });
  }

  fetchUniversities = () => {
    getData(
      'http://localhost:8000/api/universities/university/',
      (data) => {
        this.setState({universities: data});
      },
      () => {},
      () => {},
      false
    );
  }

  convertUniversitiesToOptions = () => {
    const universities = this.state.universities;
    const listMenuItems = universities.map((university, index) => {
      const text = `${university.name}`;
      return(
        <MenuItem key={index} value={university.id} primaryText={text} />
      );
    });
    return listMenuItems;
  }

  render(){
    return(
      <Row>
        <Col xs={12}>
          <Row center="xs">
            <Col xs={6}>
              <Title  label = "Cadastre-se" />
              <Subtitle style={{marginTop: '50px', marginBottom: '50px', marginLeft: '0px'}} label="Preencha o formulário" />
      <Formsy.Form ref={ (form) => {this.form = form;} }
        onValidSubmit={this.handleSubmit}
      >
        <FormsyText type="text"
          name="username"
          required
          hintText="Nome de usuário"
          floatingLabelText="Usuário"
        />
        <br/>
        <FormsyText type="text"
          name="email"
          required
          hintText="Informe seu e-mail"
          floatingLabelText="Email"
          validations = "isEmail"
          validationError={'Informe um e-mail válido'}
        />
        <br/>
        <FormsyText type="text"
          name="first_name"
          required
          hintText="Informe seu nome"
          floatingLabelText="Nome"
          validations = "isWords"
          validationError={'O nome não deve conter números'}
        />
        <br/>
        <FormsyDate
          name="birthday"
          required
          floatingLabelText="Data de nascimento"
          openToYearSelection={true}
        />
        <br/>
        <FormsyText type="text"
          name="college_registry"
          required
          hintText="Informe sua matrícula"
          floatingLabelText="Matrícula"
          validations = "isNumeric"
          validationError={'A matrícula deve conter apenas números'}
        />
        <br/>
        <FormsySelect
          name="college"
          required
          floatingLabelText="Universidade"
        >
          {this.convertUniversitiesToOptions()}
        </FormsySelect>
        <br/>
        <FormsyText type="password"
          name="password"
          required
          hintText="Informe uma senha"
          floatingLabelText="Senha"
        />
        <br/>
        <FormsyText type="password"
          name="confirmation_password"
          required
          hintText="Confirme sua senha"
          floatingLabelText="Confirmação da Senha"
        />
        <br/>
        <RaisedButton backgroundColor='#324356' labelColor='#FFFFFF' label="ENTRAR" type="submit" style={{marginBottom: '30px', marginTop: '30px'}}/>
        <Dialog
          title="Bem vindo ao CodeCollege"
          modal={false}
          open={this.state.userCreated}
          actions={
            <RaisedButton
              label="Entendi"
              href="http://localhost:3000/login"
            />
          }
        />
      </Formsy.Form>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }

}
