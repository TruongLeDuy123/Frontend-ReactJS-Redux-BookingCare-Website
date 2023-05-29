import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss'
import { getAllUsers, createNewuserService, deleteUserService, editUserService } from '../../services/userService';
import { Fragment } from 'react';
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';

import { emitter } from '../../utils/emitter';

class UserManage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            userEdit: {}
        }
    }

    /** life cycle
     *  Run component:
     * 1. Run construct -> init state
     * 2. Did mount(set state)
     * 3. Render
     * 
     *  */
    async componentDidMount() {
        await this.getAllUsersFromReact()
    }

    getAllUsersFromReact = async() => {
        let response = await getAllUsers('ALL')
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            }, () => {
                // console.log("check state user", this.state.arrUsers);
            })
        }
        // console.log("get user from nodejs: ", response);
    }

    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser
        })
    }

    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser
        })
    }

    createNewuser = async(data) => {
        try
        {
            let response = await createNewuserService(data)
            // console.log('response: ', response);
            if (response && response.errCode != 0)
            {
                alert(response.errMessage)
            }
            else
            {
                await this.getAllUsersFromReact()
                this.setState({
                    isOpenModalUser: false
                })

                emitter.emit('EVENT_CLEAR_MODAL_DATA', {'id': 'your id'})
            }
        }
        catch(e)
        {
            console.log(e);
        }
        // console.log('check data from child: ', data);
    }

    handleDeleteUser = async(user) => {
        console.log('delete ', user)
        try
        {
            let res = await deleteUserService(user.id)
            // console.log(res);
            if (res && res.errCode === 0)
            {
                await this.getAllUsersFromReact()
            }   
            else
            {
                alert(res.errMessage)
            }
        }
        catch(e)
        {
            console.log(e);
        }
    }

    handleEditUser = (user) => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser,
            userEdit: user
        })
    }

    toggleUserEditModal = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser
        })
    }

    doEditUser = async(user) => {
        try
        {
            let res = await editUserService(user)
            // console.log('click save ', res);
            if (res && res.errCode === 0)
            {
                this.setState({
                    isOpenModalEditUser: false
                })
                await this.getAllUsersFromReact()
            }
            else
            {
                alert(res.errMessage)
            }
        }
        catch(e)
        {
            console.log(e);
        }
    }

    render() {
        // console.log('check render ', this.state);
        let arrUsers = this.state.arrUsers
        return (
            <div className="users-container">

                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggleFromParent={() => this.toggleUserModal()}
                    createNewuser = {(data) => this.createNewuser(data)}
                />
                {
                    this.state.isOpenModalEditUser && 
                    <ModalEditUser
                        isOpen = {this.state.isOpenModalEditUser}
                        toggleFromParent={() => this.toggleUserEditModal()}
                        currentUser = {this.state.userEdit}
                        editUser = {this.doEditUser}
                    />
                }
                <div className="title text-center">Manage users with truong</div>
                <div className='mx-1'>
                    <button className='btn btn-primary px-3' onClick={() => this.handleAddNewUser()}><i className='fas fa-plus'></i> Add new users</button>
                </div>
                <div className='users-table mt-3 mx-1'>
                    <table id="customers">
                        {/* <tbody> */}
                            <tr>
                                <th>Email</th>
                                <th>First name</th>
                                <th>Last name</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>
                            {
                                arrUsers && arrUsers.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.email}</td>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.address}</td>
                                            <td>
                                                <button className='btn-edit' onClick={() => this.handleEditUser(item)}><i className='fas fa-pencil-alt'></i></button>
                                                <button className='btn-delete' onClick={() => this.handleDeleteUser(item)}><i className='fas fa-trash'></i></button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        {/* </tbody> */}
                    </table>
                </div>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
