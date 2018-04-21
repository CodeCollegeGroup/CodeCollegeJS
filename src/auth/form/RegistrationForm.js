import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Formsy from 'formsy-react';
import {FormsyText, FormsyDate} from 'formsy-material-ui/lib';
import AppDispatcher from '../../AppDispatcher';
import LoginStore from '../../stores/LoginStore';
import ActionType from '../../actions/ActionType';


export default class RegistrationForm extends Component{

  constructor(props){
    super(props);
  }

  handleSubmit = (data) => {
    console.log(data);
  }

  render(){
    return(
      <Formsy.Form ref={ (form) => {this.form = form;} }
        onValidSubmit={this.handleSubmit}
      >
        <FormsyText type="text"
          name="username"
          required
          hintText="Nome de usuário"
          floatingLabelText="Usuário"
        />
        <FormsyText type="text"
          name="email"
          required
          hintText="Informe seu e-mail"
          floatingLabelText="Email"
          validations = "isEmail"
          validationError={'Informe um e-mail válido'}
        />
        <FormsyText type="text"
          name="name"
          required
          hintText="Informe seu nome"
          floatingLabelText="Nome"
        />
        <FormsyDate
          name="birthday"
          required
          floatingLabelText="Data de nascimento"
        />
        <FormsyText type="text"
          name="registration"
          required
          hintText="Informe sua matrícula"
          floatingLabelText="Matrícula"
        />
        <FormsyText type="text"
          name="university"
          required
          hintText="Informe sua universidade"
          floatingLabelText="Universidade"
        />
        <FormsyText type="password"
          name="password"
          required
          hintText="Informe uma senha"
          floatingLabelText="Senha"
        />
        <FormsyText type="password"
          name="confirmation_password"
          required
          hintText="Confirme sua senha"
          floatingLabelText="Confirmação da Senha"
        />
        <RaisedButton backgroundColor='#324356' labelColor='#FFFFFF' label="ENTRAR" type="submit" style={{marginBottom: '30px', marginTop: '30px'}}/>
      </Formsy.Form>
    );
  }

}
