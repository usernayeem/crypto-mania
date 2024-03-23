import React from 'react'
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export const SkeletonComponent = () => {
    return (
        <>
            <Stack spacing={1.5} mb={2}>
                <Skeleton sx={{ bgcolor: "#637381", maxWidth: "1200" }} variant="rounded" height={60} />
                <Skeleton sx={{ bgcolor: "#637381", maxWidth: "1200" }} variant="rounded" height={60} />
                <Skeleton sx={{ bgcolor: "#637381", maxWidth: "1200" }} variant="rounded" height={60} />
                <Skeleton sx={{ bgcolor: "#637381", maxWidth: "1200" }} variant="rounded" height={60} />
                <Skeleton sx={{ bgcolor: "#637381", maxWidth: "1200" }} variant="rounded" height={60} />
                <Skeleton sx={{ bgcolor: "#637381", maxWidth: "1200" }} variant="rounded" height={60} />
            </Stack>
        </>
    )
}

