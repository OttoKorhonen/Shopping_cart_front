import React from 'react'
import { Box } from '@mui/system'
import LeftDrawer from './Drawer'
import { Typography } from '@mui/material'
import { AppBar, Toolbar } from '@mui/material'
import { useEffect, useState } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge'
import { styled } from '@mui/material/styles'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

/**
 Session evästeiden kanssa ongelmia tästä syystä shoppingcart ominaisuus jää tekemättä.
 */

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));

export default function Topbar(props) {
    const [open, setOpen] = useState(false)
   // const [data, setData] = useState([])


    useEffect(() => {
        getData()
    }, [])

    const getData = () => {
        fetch('http://127.0.0.1:5000/api/shoppingcart')
            .then(response => response.json())
            .then(responseData => {
             //   setData(responseData)
            })
            .catch(err => console.error(err))
    }

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <Box>
            <AppBar position="static">
                <Toolbar>
                    <LeftDrawer />
                    <Typography style={{ fontFamily: 'Lato' }} variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Hardware store
                    </Typography>
                    <StyledBadge badgeContent={1} color="secondary">
                        <ShoppingCartIcon onClick={handleClickOpen}
                        />
                    </StyledBadge>
                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle style={{ fontFamily: 'Lato' }}>
                            Shopping cart
                        </DialogTitle>
                        <DialogContent>
                            <Typography style={{ fontFamily: 'Lato' }}>
                                Total: { } €
                            </Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Close
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Toolbar>
            </AppBar>
        </Box>
    )
}