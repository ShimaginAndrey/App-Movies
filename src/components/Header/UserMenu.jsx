import React, { useState } from "react";
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import { RequestApi } from "../../api/api";
import { LocalStorage } from "../../utils/LocalStorage";

import { useDispatch } from "react-redux";
import { toLogOutAction } from '../../redux/auth/auth.actions';

const UserMenu = (props) => {
    const {user} = props;
    const [dropdownOpen, setDropdown] = useState(false);
    const dispatch = useDispatch();

    const toggleDropdown = () => {
        setDropdown(prevState => !prevState)
    };

    const onLogOut = () => {
        RequestApi.delete('/authentication/session', {
            body: { 'session_id': LocalStorage.getItem('session_id')}
        })
        .then(() => dispatch(toLogOutAction()))
        .catch(error => console.error(error))
    }
    
    return (
        <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
        <DropdownToggle
            tag="div"
            onClick={toggleDropdown}
            data-toggle="dropdown"
            aria-expanded={dropdownOpen}
        >
        <img width="40"
            className="rounded-circle cursor-pointer"
            src={`https://secure.gravatar.com/avatar/${user?.avatar.gravatar.hash}.jpg?s=64"`}
            alt=""
            onClick={toggleDropdown}/>
        </DropdownToggle>
        <DropdownMenu end onClick={onLogOut}>Выйти</DropdownMenu>
      </Dropdown>
    )
};

export default UserMenu;