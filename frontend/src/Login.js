import React, { Component } from 'react';
import {  Link,Redirect } from 'react-router-dom';
import {Form, Button} from 'react-bootstrap';
import axios from 'axios';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mobile: '',
            email: '',
            name:'',
            otp:'',
            message:'',
            redirect:false,
            otpScreen:true,
            otpSend:false,
            otpVerified:false,
            isRegister:true
        }
        this.handleMobile = this.handleMobile.bind(this);
        this.handleOTP = this.handleOTP.bind(this);
    }
    handleMobile(e){
        this.setState({mobile:e.target.value})
    }
    handleOTP(e){
        this.setState({otp:e.target.value})
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
            axios.post(`${process.env.REACT_APP_URL}/user/login`,{mobile:mobile,otp:otp})
            .then(response=>{
                if(response.status === 200 && response.data.status){
                    _self.setState({redirect:true,path:`/home/${response.data.data._id}`})
                }else{
                    if(response.data.message === "User not found"){
                        _self.setState({message:response.data.message,otpScreen:false,isRegister:false})
                    }else{
                        _self.setState({message:response.data.message})
                    }
                }
                console.log(response)
            })
            .catch(err=>{
                console.log(err)
            })
        }
    }
    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.path} />
        }        
        return ( 
            <div className="mt-3">
                 <div className="header">
                    <nav className="nav-wrapper grey darken-3">
                        <Form.Label>Don't have an account please click 
                            <Link to="/register" className="ml-1">here </Link>
                            for register </Form.Label>
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
            {!this.state.isRegister && (
                <div>
                    <Form.Label>Dont have an account please click 
                    <Link to="/register" className="ml-1">here </Link>
                    for register</Form.Label>
                </div>
            )}
        </div>
        );
    }
}
export default Login;