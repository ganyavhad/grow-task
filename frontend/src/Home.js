import React, { Component } from 'react';
import {Form,Button} from 'react-bootstrap';
import {  Link} from 'react-router-dom';

import axios from 'axios';


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mobile: '',
            email: '',
            name:''
        }
    }
    componentDidMount(){
        const { match: { params } } = this.props;
        this.getUser(params.id);
    }
    getUser(id){
        let _self = this
        axios.get(`${process.env.REACT_APP_URL}/user/${id}`)
        .then(response=>{
            if(response.status === 200 && response.data.status){
                let userData = response.data.data
                _self.setState({message:response.data.message,name:userData.name,email:userData.email,mobile:userData.mobile})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }

    render() {    
        let {name,email,mobile} = this.state
        return ( 
            <div className="mt-3">
                <div className="header">
                            <Link to="/login" className="ml-1"> <Button>Logout</Button> </Link>
                </div>
                <Form.Label>Name:</Form.Label> {name} <br/>
                <Form.Label>Email:</Form.Label> {email}<br/>
                <Form.Label>Mobile:</Form.Label> {mobile}<br/>
            </div>
        );
    }
}
export default Home;