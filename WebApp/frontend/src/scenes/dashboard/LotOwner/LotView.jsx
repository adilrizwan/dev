import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Paper, Modal, Badge, Typography, Box, Button, Pagination, useMediaQuery } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import { pageSize } from '../../../constants/theme';
import { ref, getDownloadURL, listAll } from "firebase/storage";
import { storage } from '../../../constants/firebaseConfigNew';

export default function LotView() {
    const token = localStorage.getItem('token');
    const [lots, setLots] = useState([]);
    const [lotUrls, setLotUrls] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedLot, setSelectedLot] = useState(null);
    const [payload] = token.split('.').slice(1, 2);
    const decodedPayload = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
    const lotID = decodedPayload.id;
    const isSmallScreen = useMediaQuery('(max-width:1000px)');
    const isExtraSmallScreen = useMediaQuery('(max-width:550px)');
    const isExtraExtraSmallScreen = useMediaQuery('(max-width:400px)');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/lot/', {
                    headers: {
                        Authorization: token,
                    },
                    params: {
                        page: currentPage,
                    },
                });
                setLots(response.data.MyLots);
                const totalCount = parseInt(response.data.Results.split(' ')[3]);
                setTotalPages(Math.ceil(totalCount / pageSize));

                const urls = await Promise.all(response.data.MyLots.map(async (lot) => {
                    const path = `ID#${lotID}/${lot.LotName}/images/`;
                    const imageRef = ref(storage, path);
                    try {
                        const listResult = await listAll(imageRef); // This line lists all items (files and directories) under the reference
                        if (listResult.items.length > 0) {
                            const firstImageRef = listResult.items[0];
                            const url = await getDownloadURL(firstImageRef);
                            return url;
                        } else {
                            return null; // If there are no images, return null
                        }
                    } catch (error) {
                        console.error("Error listing items:", error);
                        return null;
                    }
                }));
                setLotUrls(urls);
                console.log(lotUrls)
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
        
    }, [token, currentPage, lotID, lotUrls]);

    const handleViewLot = (lot) => {
        setSelectedLot(lot);
        setIsModalOpen(true);
        console.log(selectedLot)
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };


    return (
        <Box p={2}>
            <Typography align='left' sx={{ mt: 0, mb: 1 }} variant="h2">
                My Lots
            </Typography>
            {lots.length > 0 ? (
                isSmallScreen ? (
                    <Box>
                        {lots.map((lot, index) => (
                            <Paper key={index} elevation={3} sx={{ p: 4, mb: 2 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    {isExtraSmallScreen ? null : (
                                        lotUrls[index] ? (
                                            <img src={lotUrls[index]} alt="lot" style={{ width: '100px', marginRight: '20px' }} />
                                        ) : (
                                            <LocalParkingIcon style={{ width: '100px', marginRight: '20px' }} />
                                        )
                                    )}
                                    <Box>
                                        <Typography variant="h3" gutterBottom>
                                            {lot.LotName}
                                        </Typography>
                                        <Typography variant="h5" gutterBottom>
                                            {lot.City + ", " + lot.Country}
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
                                            <Badge
                                                variant="dot"
                                                color={lot.Status === 'ACTIVE' ? 'success' : lot.Status === 'INACTIVE' ? 'error' : 'warning'}
                                                sx={{
                                                    height: 5,
                                                    width: 5,
                                                    borderRadius: '50%',
                                                    backgroundColor: lot.Status === 'ACTIVE' ? 'success.main' : lot.Status === 'INACTIVE' ? 'error.main' : 'warning.main',
                                                }}
                                            />


                                            <Typography variant="subtitle" gutterBottom sx={{ ml: 1 }}>
                                                {lot.Status}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    {isExtraExtraSmallScreen ? (
                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', minWidth: 'fit-content' }}>
                                            <Button variant="contained" color="primary">
                                                <VisibilityIcon sx={{ marginRight: '4px' }} />
                                            </Button>
                                        </Box>
                                    ) : (
                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', minWidth: 'fit-content' }}>
                                            <Button variant="contained" color="primary" startIcon={<VisibilityIcon />} onClick={() => handleViewLot(lot)}>View</Button>
                                        </Box>
                                    )}
                                </Box>
                            </Paper>
                        ))}
                    </Box>
                ) : (
                    <Grid container spacing={2}>
                        {lots.map((lot, index) => (
                            <Grid item xs={12} sm={6} key={index}>
                                <Paper elevation={3} sx={{ p: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        {lotUrls[index] ? (
                                            <img src={lotUrls[index]} alt="lot" style={{ width: '100px', marginRight: '20px' }} />
                                        ) : (
                                            <LocalParkingIcon style={{ width: '100px', marginRight: '20px' }} />
                                        )}
                                        <Box>
                                            <Typography variant="h3" gutterBottom>
                                                {lot.LotName}
                                            </Typography>
                                            <Typography variant="h5" gutterBottom>
                                                {lot.City + ", " + lot.Country}
                                            </Typography>
                                            <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
                                                <Badge
                                                    variant="dot"
                                                    color={lot.Status === 'ACTIVE' ? 'success' : lot.Status === 'INACTIVE' ? 'error' : 'warning'}
                                                    sx={{
                                                        height: 5,
                                                        width: 5,
                                                        borderRadius: '50%',
                                                        backgroundColor: lot.Status === 'ACTIVE' ? 'success.main' : lot.Status === 'INACTIVE' ? 'error.main' : 'warning.main',
                                                    }}
                                                />

                                                <Typography variant="subtitle" gutterBottom sx={{ ml: 1 }}>
                                                    {lot.Status}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', minWidth: 'fit-content' }}>
                                        <Button variant="contained" color="primary" startIcon={<VisibilityIcon />} onClick={() => handleViewLot(lot)}>View</Button>
                                    </Box>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                )
            ) : (
                <Typography variant="body1">
                    You don't have any lots added.
                </Typography>
            )}
            <Grid sx={{ mt: 5 }}>
                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={(event, value) => setCurrentPage(value)}
                    color="primary"
                    sx={{
                        marginTop: 'auto',
                        display: 'flex',
                        justifyContent: 'center',
                        '& .Mui-selected': {
                            color: 'primary.main',
                        },
                    }}
                />
            </Grid>
            <Modal
                open={isModalOpen}
                onClose={handleCloseModal}
                aria-labelledby="car-details-modal"
                aria-describedby="car-details"
            >
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, maxWidth: '80vw', maxHeight: '80vh', overflow: 'auto' }}>
                    <Button onClick={handleCloseModal} style={{ position: 'absolute', top: '10px', right: '10px' }}>
                        <CloseIcon />
                    </Button>
                    <Typography variant="h4" gutterBottom>
                        {selectedLot && selectedLot.LotName}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        <strong>Total Zones:</strong> {selectedLot && selectedLot.TotalZones}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        <strong>Total Capacity:</strong> {selectedLot && selectedLot.TotalCapacity}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        <strong>Address Line 1:</strong> {selectedLot && selectedLot.AddressL1}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        <strong>Address Line 2:</strong> {selectedLot && selectedLot.AddressL2}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        <strong>Postal Code:</strong> {selectedLot && selectedLot.PostalCode}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        <strong>City:</strong> {selectedLot && selectedLot.City}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        <strong>Country:</strong> {selectedLot && selectedLot.Country}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        <strong>Status:</strong> {selectedLot && selectedLot.Status}
                    </Typography>

                </Box>
            </Modal>
        </Box>
    );
}
