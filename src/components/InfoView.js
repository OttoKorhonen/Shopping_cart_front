import React, { useEffect, useState } from 'react'
import { Box } from '@mui/system'
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { IconButton, TextField, Tooltip } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';


export default function InfoView(props) {
    const [open, setOpen] = useState(false)
    const [amount, setAmount] = useState(0)
    const [disabled, setDisabled] = useState(false)

    useEffect(() => {
        disable()
    })

    const disable = () => {
        if (amount < 1) {
            setDisabled(true)
        }
        else {
            setDisabled(false)
        }
    }

    const handleClickOpen = () => {
        setOpen(true)
    }


    const handleClose = () => {
        props.addToCart(props, amount)
        setOpen(false)
        setAmount(0)
    }

    const handleCancel = () => {
        setAmount(0)
        setOpen(false)
    }
    const inputChanged = (event) => {
        setAmount({ ...amount, [event.target.name]: event.target.value });
    }

    const raiseAmount = () => {
        setAmount(amount + 1)
    }

    const reduceAmount = () => {
        if (amount > 0) {
            setAmount(amount - 1)
        }
    }

    return (
        <Box>
            <InfoIcon onClick={handleClickOpen} />
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle style={{ fontFamily: 'Lato' }}>
                    Add to cart
                </DialogTitle>
                <DialogContent>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardContent>
                            <CardMedia
                                className='Cardimage'
                                style={{ fontFamily: 'Lato' }}
                                component='img'
                                image={props.data.image_link}
                                alt={props.data.product_name} />
                            <Typography style={{fontFamily: 'Lato'}} gutterBottom variant="h5" component="div">
                                {props.data.product_name}
                            </Typography>
                            <Typography style={{fontFamily: 'Lato'}}>
                                {props.data.description}
                            </Typography>
                            <Typography style={{fontFamily: 'Lato'}}>
                                Price (€): {props.data.price}
                            </Typography>
                            <Typography style={{fontFamily: 'Lato'}}>
                                Total (€): {props.data.price * amount}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Tooltip title="Add">
                                <IconButton>
                                    <AddBoxIcon onClick={raiseAmount} color='primary' fontSize='large' />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Reduce">
                                <IconButton >
                                    <IndeterminateCheckBoxIcon onClick={reduceAmount} color='secondary' fontSize='large' />
                                </IconButton>
                            </Tooltip>
                            <TextField
                                autoFocus
                                margin='dense'
                                id='amount'
                                name='amount'
                                value={amount}
                                onChange={inputChanged}
                                label='Amount'
                                fullWidth
                            />
                        </CardActions>
                    </Card>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} color="primary">
                        Cancel
                    </Button>
                    <Button disabled={disabled} onClick={handleClose} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}