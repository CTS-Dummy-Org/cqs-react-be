import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import LogOut from '../../../assets/images/logout_black_24dp.svg';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { logout } from '../../../utils/IdentityUtils';
import styled from 'styled-components';

const StyledProfile = styled.div`
    position: relative;
    align-items: flex-end;
    height: 24px;
    width: 23%;
    margin-bottom: 9px;
`;

const StyledName = styled.span`
    color: white;
    text-transform: none;
`;

const StyledLabel = styled.span`
    height: 24px;
    width: 90%;
    color: rgba(0,0,0,0.87);
    font-family: "Cognizant Sans";
    font-size: 16px;
    letter-spacing: 0.15px;
    line-height: 24px;
`;

interface MenusProps {
    userName: string;
}

export const Menus = ({ userName }: MenusProps) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        logout();
    };

    return (
        <StyledProfile>
            <Button 
                aria-controls="simple-menu"
                sx={{float:'right'}}
                aria-haspopup="true" onClick={handleClick}>
                <StyledName>{userName}</StyledName>
                <ArrowDropDownIcon sx={{color: 'white'}} />
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleLogout}>
                    <StyledLabel>Logout</StyledLabel>
                    <img src={LogOut} alt=""  height='24px' width='24px' />
                </MenuItem>
            </Menu>
        </StyledProfile>
    );
};
