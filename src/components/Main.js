import React, { useState, useEffect } from 'react'
import { Box } from '@mui/system'
import Topbar from './TopBar'
import Snackbar from '@mui/material/Snackbar';
import ClockLoader from "react-spinners/ClockLoader";
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Tooltip } from '@mui/material';
import EditProduct from './EditProduct';
import InfoView from './InfoView';
import { DataGrid } from '@mui/x-data-grid';


export default function Main() {
    const [open, setOpen] = useState(false)
    const [msg, setMsg] = useState('')
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [id, setId] = useState(0)
    const [cart, setCart] = useState([])

    useEffect(() => {
        getData()
    }, [])


    const getData = () => {
        fetch('http://127.0.0.1:5000/api/allproducts')
            .then(response => response.json())
            .then(responseData => {
                setData(responseData)
                setLoading(false)
            })
            .catch(err => console.error(err))
    }

    const deleteProduct = (product) => {
        if (window.confirm(`Are you sure you want to delete product ${product.product_name} ?`)) {
            fetch(`http://127.0.0.1:5000/api/deleteproduct/${product.id}`,
                {
                    method: 'DELETE', headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(product)
                })
                .then(_ => getData())
                .then(_ => {
                    setOpen(true);
                    setMsg('Product deleted');
                })
                .catch(err => console.error(err))
        }
    }

    const editProduct = (product) => {
        fetch(`http://127.0.0.1:5000/api/edit/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        }
        )
            .then(_ => getData())
            .then(_ => {
                setMsg('Product edited');
                setOpen(true);
            })
            .catch(err => console.error(err))
    }

    const handleClose = () => {
        setOpen(false);
    }

    const addToCart = (id, amount) => {
        const prodId = id.data.id
        const prod = {product: id.data, amount:amount}
        setCart(prod)
        fetch(`http://127.0.0.1:5000/api/shoppingcart`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 'count': amount, 'id': prodId })
            },
        )
            .then(_ => {
                setMsg('Product added to cart');
                setOpen(true);
            })
            .catch(err => console.error(err))
    }

    const columns = [
        {
            field: 'product_name',
            headerName: 'Product',
            width: 250,
            headerAlign: 'center',
            align:'center'
        },
        {
            field: 'price',
            headerName: 'Price',
            width: 250,
            headerAlign: 'center',
            align:'center'
        },
        {
            field: 'availability',
            headerName: 'Availability',
            width: 250,
            headerAlign: 'center',
            align:'center'
        },
        {
            field: 'brand',
            headerName: 'Brand',
            width: 250,
            headerAlign: 'center',
            align:'center'
        },
        {
            field: 'condition',
            headerName: 'Condition',
            width: 250,
            headerAlign: 'center',
            align:'center'
        },
        {
            field: 'Actions',
            headerName: 'Delete',
            width: 150,
            headerAlign: 'center',
            align:'center',
            renderCell: (params) => {
                return (
                    <Tooltip title='delete'>
                        <IconButton onClick={() => deleteProduct(params.row)}>
                            <DeleteIcon style={{ color: 'red' }} />
                        </IconButton>
                    </Tooltip>
                )
            }
        },
        {
            field: 'edit',
            headerName: 'Edit',
            width: 150,
            headerAlign: 'center',
            align:'center',
            renderCell: (params) => {
                return (
                    <Tooltip title='edit'>
                        <IconButton onClick={()=>setId(params.row.id)}>
                            <EditProduct editProduct={editProduct} data={params.row} style={{ color: 'blue' }} />
                        </IconButton>
                    </Tooltip>
                )
            }
        },
        {
            field: 'info',
            headerName: 'Info',
            width: 150,
            headerAlign: 'center',
            align:'center',
            renderCell: (params) => {
                return (
                    <Box>
                        <Tooltip title="Info">
                            <IconButton >
                                <InfoView addToCart={addToCart} data={params.row} />
                            </IconButton>
                        </Tooltip>
                    </Box>
                )
            }
        }
    ]

    if (loading) {
        return (
            <div>
                <Topbar cart={cart}/>
                <div className='Loader'>
                    <p>Fetching data...</p>
                    <ClockLoader size={100} />
                </div>
            </div>
        )
    }

    return (
        <Box style={{ width: '100%' }}>
            <Topbar cart={cart}/>
            <DataGrid
                style={{ height: '90vh', fontFamily: 'Lato', fontSize: 20}}
                rows={data}
                columns={columns}
                pageSize={15}
                rowsPerPageOptions={[15]}
                autoHeight={true}
                disableSelectionOnClick={true}
            />
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
    )
}