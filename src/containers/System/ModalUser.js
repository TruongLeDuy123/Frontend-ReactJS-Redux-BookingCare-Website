import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter';

class ModalUser extends Component {

    constructor(props)
    {
        super(props)
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: ''
        }

        this.listenToEmitter()
    }

    listenToEmitter()
    {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: ''
            })
        })
    }

    componentDidMount() {

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

    handleAddNewUser = () => {
        let isValid = this.checkValidInput()
        if (isValid)
        {
            // call API create modal
            this.props.createNewuser(this.state)
        }
    }

    render() {
        // console.log('check child props', this.props);
        // console.log('check child open modal', this.props.isOpen);
        // console.log('test', this.props.test);


        return (
            <Modal 
                isOpen={this.props.isOpen} 
                toggle={() => {this.toggle()}} 
                className={'modal-user-container'}
                size='lg'    
            >
                <ModalHeader toggle={() => {this.toggle()}}>Create a new user</ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div className='input-container'>
                            <label>Email</label>
                            <input type='text' value={this.state.email} onChange={(e) => {this.handleOnChangeInput(e, 'email')}}/>
                        </div>
                        <div className='input-container'>
                            <label>Password</label>
                            <input type='password' value={this.state.password} onChange={(e) => {this.handleOnChangeInput(e, 'password')}}/>
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
                    <Button color="primary" className='px-3' onClick={() => {this.handleAddNewUser()}}>
                        Add new 
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);




