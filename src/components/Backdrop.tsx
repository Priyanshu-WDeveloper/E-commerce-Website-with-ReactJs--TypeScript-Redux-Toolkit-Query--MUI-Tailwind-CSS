// import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
// import Button from '@mui/material/Button';

// export default function SimpleBackdrop() {
//     const [open, setOpen] = React.useState(true);
//     const handleClose = () => {
//         setOpen(false);
//     };
//     const handleOpen = () => {
//         setOpen(true);
//     };

//     return (
//         <div>
//             {/* <Button onClick={handleOpen}>Show backdrop</Button> */}
//             <Backdrop
//                 sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
//                 open={open}
//                 onClick={handleClose}
//             >
//                 <CircularProgress color="inherit" />
//             </Backdrop>
//         </div>
//     );
// }

import React, { useState, useEffect } from 'react';
// import SimpleBackdrop from './SimpleBackdrop';
// import ProductList from './ProductList';
import Button from '@mui/material/Button';
import MainContent from '../MainContent';


const ParentComponent: React.FC = () => {
    const [isBackdropOpen, setBackdropOpen] = useState<boolean>(true); // State for loading
    const [products, setProducts] = useState<any[]>([]); // State for products


    const [open, setOpen] = React.useState(true);
    //     const handleClose = () => {
    //         setOpen(false);
    //     };
    //     const handleOpen = () => {
    //         setOpen(true);
    //     };
    // Simulate fetching products (e.g., from an API)
    useEffect(() => {
        const fetchProducts = async () => {
            setTimeout(() => {
                setProducts([
                    { id: 1, name: 'Product 1' },
                    { id: 2, name: 'Product 2' },
                    { id: 3, name: 'Product 3' },
                ]);
                setBackdropOpen(false); // Close backdrop once products are loaded
            }, 2000); // Simulate a 2-second API call delay
        };

        fetchProducts();
    }, []);

    const handleCloseBackdrop = (): void => {
        setBackdropOpen(false); // Close the backdrop manually if needed
    };

    return (
        <div>
            {/* Show the SimpleBackdrop component */}
            {/* <SimpleBackdrop open={isBackdropOpen} onClose={handleCloseBackdrop} /> */}

            <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={open}
                onClick={handleClose}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

            {/* Show the ProductList component, passing products as props */}
            <MainContent products={producted} />

            {/* A button to manually trigger the backdrop */}
            <Button onClick={() => setBackdropOpen(true)}>Simulate Loading</Button>
        </div>
    );
};

export default ParentComponent;
