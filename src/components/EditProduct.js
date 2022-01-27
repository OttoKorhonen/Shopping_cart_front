import React, { useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import EditIcon from '@mui/icons-material/Edit';

export default function EditProduct(props) {
    const [open, setOpen] = useState(false);
    const [product, setProduct] = useState({
        product_name: '', price: 0, availability: '',
        description: '', condition: '', brand: '', image_link: ''
    })

    const handleClickOpen = () => {
        setProduct({
            product_name: props.data.product_name, price: props.data.price, availability: props.data.availability,
            description: props.data.description, condition: props.data.condition, brand: props.data.brand, image_link: props.data.image_link
        })
        setOpen(true);
    }

    const handleClose = () => {
        props.editProduct(product)
        setOpen(false);
    }

    const handleCancel = () => {
        setOpen(false);
    }

    const inputChanged = (event) => {
        setProduct({ ...product, [event.target.name]: event.target.value });
    }

    return (
        <div>
            <EditIcon size="small" color="primary" onClick={handleClickOpen} />
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle style={{fontFamily: 'Lato'}} id="form-dialog-title">Edit product</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="product_name"
                        name="product_name"
                        value={product.product_name}
                        onChange={inputChanged}
                        label="Name"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="price"
                        name="price"
                        value={product.price}
                        onChange={inputChanged}
                        label="Price (€)"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="availability"
                        name="availability"
                        value={product.availability}
                        onChange={inputChanged}
                        label="Availability"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="condition"
                        name="condition"
                        value={product.condition}
                        onChange={inputChanged}
                        label="Condition"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="brand"
                        name="brand"
                        value={product.brand}
                        onChange={inputChanged}
                        label="Brand"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="description"
                        name="description"
                        value={product.description}
                        onChange={inputChanged}
                        label="Description"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="image_link"
                        name="image_link"
                        value={product.image_link}
                        onChange={inputChanged}
                        label="Image link"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Edit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}