import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter';
import _ from "lodash"

class ModalEditUser extends Component {

    constructor(props)
    {
        super(props)
        this.state = {
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: ''
        }

    }

    componentDidMount() {
        let user = this.props.currentUser
        // let {currentUser} = this.props
        if (user && !_.isEmpty(user))
        {
            this.setState({
                id: user.id,
                email: user.email,
                password: 'harcode',
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address,
            })
        }
        console.log('didmount ', this.props.currentUser);
    }

    toggle = () => {
        this.props.toggleFromParent()
    }

    checkValidInput = () => {
        let isValid = true
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address']
        for (let i = 0 ; i < arrInput.length ; i++)
        {
            console.log('check inside loop', this.state[arrInput[i]], arrInput[i]);
            if (!this.state[arrInput[i]])            
            {
                isValid = false
                alert('Miss parameters: '+ arrInput[i])
                break
            }
        }        
        return isValid
    }

    handleOnChangeInput = (e, id) => {
        // console.log(e.target.value);

        let copyState = {...this.state}
        copyState[id] = e.target.value
        this.setState({
            ...copyState
        })
    }

    handleSaveUser = () => {
        let isValid = this.checkValidInput()
        if (isValid)
        {
            // call API create modal
            this.props.editUser(this.state)
        }
    }

    

    render() {
        console.log('check child props', this.props);
        // console.log('check child open modal', this.props.isOpen);
        // console.log('test', this.props.test);


        return (
            <Modal 
                isOpen={this.props.isOpen} 
                toggle={() => {this.toggle()}} 
                className={'modal-user-container'}
                size='lg'    
            >
                <ModalHeader toggle={() => {this.toggle()}}>Edit a new user</ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div className='input-container'>
                            <label>Email</label>
                            <input type='text' value={this.state.email} disabled onChange={(e) => {this.handleOnChangeInput(e, 'email')}}/>
                        </div>
                        <div className='input-container'>
                            <label>Password</label>
                            <input type='password' value={this.state.password} disabled onChange={(e) => {this.handleOnChangeInput(e, 'password')}}/>
                        </div>
                        <div className='input-container'>
                            <label>First name</label>
                            <input type='text' value={this.state.firstName} onChange={(e) => {this.handleOnChangeInput(e, 'firstName')}}/>
                        </div>
                        <div className='input-container'>
                            <label>Last name</label>
                            <input type='text' value={this.state.lastName} onChange={(e) => {this.handleOnChangeInput(e, 'lastName')}}/>
                        </div>
                        <div className='input-container max-width-input'>
                            <label>Address</label>
                            <input type='text' value={this.state.address} onChange={(e) => {this.handleOnChangeInput(e, 'address')}}/>
                        </div>
                    </div>
                </ModalBody>

                <ModalFooter>
                    <Button color="primary" className='px-3' onClick={() => {this.handleSaveUser()}}>
                        Save changes 
                    </Button>{' '}
                    <Button color="secondary" className='px-3' onClick={() => {this.toggle()}}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);




