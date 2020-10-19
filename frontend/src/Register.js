import React, { Component } from 'react';
import {  Link } from 'react-router-dom';
import {Form, Button} from 'react-bootstrap';
import axios from 'axios';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            mobile:'',
            otp:'',
            isValid:true,
            message:"",
            otpScreen:true,
            otpSend:false,
            otpVerified:false,
            showRegisterForm:false,
            isRegister:false,
            alreadyRegister:false
        }
        this.handleMobile = this.handleMobile.bind(this);
        this.handleOTP = this.handleOTP.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
    }

    handleSendOTP(e){
        let _self = this
        let {mobile} = _self.state
        if((mobile+"").length !== 10){
            _self.setState({isValid:false,message:"Mobile no should be 10 digit"})
        }else{
            axios.post(`${process.env.REACT_APP_URL}/user/send-otp`,{mobile:mobile})
            .then(response=>{
                if(response.status === 200 && response.data.status){
                    _self.setState({message:response.data.message,otpSend:true,otpScreen:false})
                }
                console.log(response)
            })
            .catch(err=>{
                console.log(err)
            })
        }
    }
    handleVerifyOTP(e){
        let _self = this
        let {otp,mobile} = _self.state
        if((otp+"").length !== 4){
            _self.setState({isValid:false,message:"OTP no should be 4 digit"})
        }else{
            axios.post(`${process.env.REACT_APP_URL}/user/verify-otp`,{mobile:mobile,otp:otp})
            .then(response=>{
                if(response.status === 200 && response.data.status){
                    _self.setState({message:response.data.message,showRegisterForm:true,otpSend:false})
                }else{
                    _self.setState({message:response.data.message})
                }
                console.log(response)
            })
            .catch(err=>{
                console.log(err)
            })
        }
    }

    handleRegister(e){
        let _self = this
        let {mobile,email,name} = _self.state
            axios.post(`${process.env.REACT_APP_URL}/user/register`,{mobile:mobile,name:name,email:email})
            .then(response=>{
                if(response.status === 201 && response.data.status){
                    _self.setState({message:response.data.message,isRegister:true,showRegisterForm:false})
                }else{
                    _self.setState({message:response.data.message,showRegisterForm:false,alreadyRegister:true})
                }
                console.log(response)
            })
            .catch(err=>{
                console.log(err)
            })
    }

    handleMobile(e){
        this.setState({mobile:e.target.value})
    }
    handleOTP(e){
        this.setState({otp:e.target.value})
    }
    handleName(e){
        this.setState({name:e.target.value})
    }
    handleEmail(e){
        this.setState({email:e.target.value})
    }

    render() {
        return ( 
            <div className="mt-3">
                <div className="header">
                    <nav className="nav-wrapper grey darken-3">
                        <Form.Label>Already register please click 
                            <Link to="/login" className="ml-1">here </Link>
                            for login </Form.Label>
                    </nav>
                </div>
            {this.state.otpScreen && (<Form>
                <Form.Group >
                    <Form.Label>Email mobile no</Form.Label>
                    <Form.Control type="number" value={this.state.mobile} name="mobile" placeholder="Enter mobile" onChange={this.handleMobile}/>
                    {!this.state.isValid && (
                         <Form.Text className="text-danger">{this.state.message}</Form.Text>
                    )}
                    </Form.Group>
            
                <Button onClick={e=>{this.handleSendOTP(this.state.mobile)}}>
                    Send OTP
                </Button>
            </Form>)}
            {this.state.otpSend &&(<Form>
                <Form.Group >
                    <Form.Label>Enter OTP</Form.Label>
                    <Form.Control type="number" value={this.state.otp} name="otp" placeholder="Enter OTP" onChange={this.handleOTP}/>
                    <Form.Text>{this.state.message}</Form.Text>
                    </Form.Group>
                <Button onClick={e=>{this.handleVerifyOTP(this.state.otp)}}>
                    Verify OTP
                </Button>
            </Form>)}
            {this.state.showRegisterForm && (<Form>
                <Form.Group >
                    <Form.Label>Enter mobile number</Form.Label>
                    <Form.Control type="number" value={this.state.mobile} name="mobile" disabled/>
                    <Form.Label>Enter name</Form.Label>
                    <Form.Control type="text" value={this.state.name} onChange={this.handleName} name="name" />
                    <Form.Label>Enter email</Form.Label>
                    <Form.Control type="email" value={this.state.email} onChange={this.handleEmail} name="email" />
                    </Form.Group>
                <Button onClick={e=>{this.handleRegister()}}>
                    Register
                </Button>
            </Form>)}
            {this.state.isRegister && (
                <div>
                    <Form.Label>User has been register please click 
                    <Link to="/login" className="ml-1">here </Link>
                    for login </Form.Label>
                </div>
            )}
             {this.state.alreadyRegister && (
                <div>
                    <Form.Label>User has already register please click 
                    <Link to="/login" className="ml-1">here </Link>
                    for login </Form.Label>
                </div>
            )}
        </div>
        );
    }
}
export default Register;