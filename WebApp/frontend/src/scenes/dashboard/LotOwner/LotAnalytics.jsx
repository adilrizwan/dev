import React from 'react';
import { Box, Paper, Typography } from '@mui/material';

export default function AnalyticsDashboard() {
    return (
        <Box p={2}>
            <Typography align='left' sx={{ mt: 2 }} variant="h2">
                Analytics Dashboard
            </Typography>
            <Paper elevation={3} sx={{ p: 2, minHeight: '600px', mt: 2 }}>
                <Box sx={{
                    position: 'relative',
                    width: '100%',
                    height: 0,
                    paddingBottom: '56.25%' /* 16:9 aspect ratio */,
                    overflow: 'hidden',
                }}>
                    <iframe
                        title="Analytics Dashboard"
                        src="https://app.powerbi.com/view?r=eyJrIjoiNDJiMDc0ZGQtMDlhNi00NGYxLWI5ZWYtM2E1ODY5YTFiZGVjIiwidCI6ImZlZTNiOTE2LTAxYzEtNDk4Ny1hNjQ2LWUxOTM0MzJiOWVhYSIsImMiOjl9"
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            border: 'none',
                        }}
                        frameBorder="0"
                        allowFullScreen
                    ></iframe>
                </Box>
            </Paper>
        </Box>
    );
}
