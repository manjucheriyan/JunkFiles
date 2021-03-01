
import React from 'react';
import swal from 'sweetalert';
import FrontEndController from './FrontEndController';
//import MyCalendar from './MyCalendar';
import Calendar from 'react-calendar'
import { withRouter } from 'react-router';
import {Formik,Form,Field} from 'formik';
import *as Yup from 'yup';
import moment from 'moment'



const RegisterSchema=Yup.object().shape({
               /* firstname:Yup.string()
                                .min(2,'Tooo  short')
                                .max(10,'Too long')
                                .required('Required'),
                    lastname:Yup.string()
                                    .min(2,'Too short')
                                    .max(10,'Too long')
                                    .required('Required'),
                    email:Yup.string()
                                    .required('Required'),*/
})

class Register extends React.Component {
    
constructor() {
    super();
    this.state={
        firstname:"",
        lastname:"",
        email:"",
        password:"",
        gender:"",
        state:"",
        birthDate:"",
        date:new Date(),
        
    }

    this.handleChange = this.handleChange.bind(this);
    this.onSubmitButton = this.onSubmitButton.bind(this);
    this.onChange = this.onChange.bind(this);
    
  }
 
  onChange=(selectedDate)=>{
    this.setState({
        date:selectedDate
    })
  }
  handleChange(e) {
    let target = e.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;
    this.setState({
      [name]: value
    });
  }
 
    onSubmitButton(){
            let firstname=this.state.firstname;
            let lastname=this.state.lastname;    
            let email=this.state.email;
            let password=this.state.password;
            let gender= this.state.gender; 
            let state=this.state.state; 
           
            let birthDate=this.state.date;
           //alert(gender+state+birthDate)
            FrontEndController.registration(firstname,lastname,email,password,gender,state,birthDate)
            .then(response=>{
                swal("Registration success",response.data.message,"success")
                this.props.history.push("/home");
            })
            .catch(error=>{
                console.log(error)
                alert(error)
                swal("Registration Failed","u provided invalid message","error");
            })}
        



    render() {
        return (
            <div className="container">

                <div className="row">

                    <div className="col-4"> </div>
                    <div className="col-4">
                       
                    </div>
                    <div className="col-4"></div>
                </div>
                <div className="row">
                    <div className="col-4"></div>
                    <div className="col-4">


                       <Formik
                        initialValues={{
                            firstname:"",
                            lastname:"",
                            email:"",
                            password:"",
                            gender:"",
                            state:"",
                            date:""
                       }}
                       validationSchema={RegisterSchema}
                       onSubmit={this.onSubmitButton}
                        >

                       {({errors,touched})=>(
                       <Form>
                            <div className="jumbotron" >
                            <h2>Register Here!!</h2><br/><br/>
                                <div className="form-group">
                                    <label for="firstname"><b class="badge badge-secondary">Firstname</b></label>
                                    <Field type="text" name="firstname" value={this.state.firstname} onChange={this.handleChange}/>
                                    {errors.firstname?<div>{errors.firstname}</div>:null}
                                </div>


                                <div className="form-group">
                                    <label for="">
                                    <b class="badge badge-secondary">Lastname</b></label>
                                    <Field type="text" name="lastname" type="text" value={this.state.lastname} onChange={this.handleChange}/>
                                    {errors.lastname?<div>{errors.lastname}</div>:null}
                                </div>


                                <div className="form-group">
                                    <label for="">
                                    <b class="badge badge-secondary">Email ID</b> </label>
                                    <Field type="text" name="email" value={this.state.email} onChange={this.handleChange}/>
                                    {errors.email?<div>{errors.email}</div>:null}
                                </div>


                                <div className="form-group">
                                    <label for="">
                                    <b class="badge badge-secondary">Password</b><br/></label>
                                    <Field name="password" type="password" value={this.state.password} onChange={this.handleChange}/>
                                    {errors.password?<div>{errors.password}</div>:null}
                                </div>

                                

                                <div onChange={this.handleChange}>
                                        <label for="state">
                                        <b class="badge badge-secondary">Choose your gender:</b> </label>
                                        <input type="radio" value="Male" name="gender" /> Male
                                        <input type="radio" value="Female" name="gender" /> Female 
                               </div>

                               <div onChange={this.handleChange}>
                                <label for="state">
                                <b class="badge badge-secondary">Choose a state:</b></label>
                                <select id="state" name="state">
                                <option value="Kerala">Kerala</option>
                                <option value="MadhyaPradesh">Madhya Pradesh</option>
                                <option value="Karnataka">Karnataka</option>
                                <option value="Tamilnadu">Tamilnadu</option>
                                </select>
                                </div>


<div> <b class="badge badge-secondary">Select your date of birth:</b> <Calendar
        onChange={this.onChange}
        value={this.state.date}
      />
      <p>Current selected date is :-<br/><b> {moment(this.state.date).format('MMMM Do YYYY')}</b></p>
      </div>

     
     
                                <div className="form-group">
                                    <button type="submit" className="btn btn-success">Register</button>
                                </div>
                            </div>
                     </Form>
                     )}
                    </Formik>
                        
                        <div className="col-4"></div>
                </div></div>
                </div>
            
        );
    }
}export default withRouter(Register) ;