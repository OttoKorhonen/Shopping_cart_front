import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';
import AddProduct from './AddProduct';
import Snackbar from '@mui/material/Snackbar';

export default function LeftDrawer() {
    const [state, setState] = React.useState({ left: false });
    const [msg, setMsg] = useState('')
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false)
    }

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, [anchor]: open });
    };

    const newProduct = (product) => {
        fetch('http://127.0.0.1:5000/api/add',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            }
        )
            .then(_ => {
                setMsg('New product added to store')
                setOpen(true);
            })
            .catch(err => console.error(err))
    }

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, true)}
            onKeyDown={toggleDrawer(anchor, true)}
        >
            <List>
                <ListItem>
                    <ListItemIcon>
                        <AddProduct newProduct={newProduct} />
                    </ListItemIcon>
                    <ListItemText primary={'Add product'} />
                </ListItem>
            </List>
            <Divider />
        </Box>
    );

    return (
        <Box>
            {['left'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <IconButton>
                        <MenuIcon style={{ color: 'white' }} onClick={toggleDrawer(anchor, true)} />
                    </IconButton>
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                    >
                        {list(anchor)}
                    </Drawer>
                </React.Fragment>
            ))}
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                message={msg}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'
                }}
            />
        </Box>
    );
}