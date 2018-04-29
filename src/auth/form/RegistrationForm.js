import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import Formsy from 'formsy-react';
import {FormsyText, FormsyDate} from 'formsy-material-ui/lib';
import AppDispatcher from '../../AppDispatcher';
import UserRegistrationStore from '../../stores/UserRegistrationStore';
import ActionType from '../../actions/ActionType';


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

    this.state = UserRegistrationStore.getInitialState();
  }

  componentWillMount = () => this.setState({
    listener: UserRegistrationStore.addListener(this.handleChange)
  })

  componentWillUnmount = () => this.state.listener.remove()

  handleChange = () => {
    const {userCreated} = UserRegistrationStore.getState();
    this.setState({userCreated});
    console.log('estado mudou', this.state);
  }

  handleSubmit = (data) => {
    data.birthday = data.birthday.getDateFormat();
    AppDispatcher.dispatch({
      action: ActionType.REGISTER.POST,
      data: data,
    });
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
          name="first_name"
          required
          hintText="Informe seu nome"
          floatingLabelText="Nome"
          validations = "isWords"
          validationError={'O nome não deve conter números'}
        />
        <FormsyDate
          name="birthday"
          required
          floatingLabelText="Data de nascimento"
          openToYearSelection={true}
        />
        <FormsyText type="text"
          name="college_registry"
          required
          hintText="Informe sua matrícula"
          floatingLabelText="Matrícula"
          validations = "isNumeric"
          validationError={'A matrícula deve conter apenas números'}
        />
        <FormsyText type="text"
          name="college"
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
    );
  }

}
