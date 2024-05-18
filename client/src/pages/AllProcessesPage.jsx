import React, { useEffect, useState } from 'react';
import ProcessCard from "../components/ProcessCard";
import { Grid, Container, Typography, TextField, Pagination } from '@mui/material';
import Banner from '../components/Banner';
import { useProcessContext } from '../hooks/useProcessContext';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../hooks/useGlobalContext';

const AllProcessesPage = () => {
    const { processes, getAllProcesses, currentProcess, getProcess } = useProcessContext();
    const { getPatient } = useGlobalContext();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [perPage] = useState(8);

    useEffect(() => {
        const fetchProcesses = async () => {
            await getAllProcesses();
        }
        fetchProcesses();
    }, []);

    const handleClick = async patientId => {
        await getPatient(patientId);
        navigate(`/process-details/`)
    }

    const filteredProcesses = processes && processes.filter(process =>
        process.patientName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const indexOfLastProcess = page * perPage;
    const indexOfFirstProcess = indexOfLastProcess - perPage;
    const currentProcesses = filteredProcesses && filteredProcesses.slice(indexOfFirstProcess, indexOfLastProcess);

    return (
        <>
            <Banner goBackPath={"/apppage"} />
            <Container maxWidth="lg" className="mx-auto mt-8">
                <Typography variant="h3" className="text-3xl font-semibold mb-8 text-blue-600">All Processes</Typography>
                <TextField
                    variant="outlined"
                    label="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    fullWidth
                    className="mb-4"
                    inputProps={{ 'aria-label': 'Search' }}
                />
                <Grid container spacing={3}>
                    {currentProcesses && currentProcesses.map(process => (
                        <Grid item key={process._id} xs={12} sm={6} md={4} lg={3}>
                            <div className="bg-blue-100 border border-blue-400 text-blue-900 p-4 rounded-lg hover:bg-blue-500" onClick={() => handleClick(process.patient)}>
                                <ProcessCard process={process} />
                            </div>
                        </Grid>
                    ))}
                </Grid>
                <Pagination
                    count={Math.ceil(filteredProcesses && filteredProcesses.length / perPage)}
                    page={page}
                    onChange={handleChangePage}
                    className="mt-4"
                />
            </Container>
        </>
    );
};

export default AllProcessesPage;