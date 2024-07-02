// src/components/Entries.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import dayjs from 'dayjs';
import NavBar from './NavBar'; // Import NavBar component
import '../styles/UserEntries.css'; // Import the CSS file

function Entries() {
    const [entries, setEntries] = useState([]);
    const [notes, setNotes] = useState([]);
    const [error, setError] = useState('');
    const [expandedEntryId, setExpandedEntryId] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [month, setMonth] = useState(dayjs().month() + 1);
    const navigate = useNavigate();

    const entriesPerPage = 15;

    useEffect(() => {
        const fetchEntries = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('Authentication token is missing. Please log in to continue.');
                return;
            }

            try {
                const response = await axios.get('http://localhost:8080/userEntries', {
                    headers: { Authorization: `Bearer ${token}` },
                    params: {
                        month,
                        page,
                        limit: entriesPerPage,
                    },
                });

                const { entries, notes, total } = response.data;

                if (entries && notes && total !== undefined) {
                    setEntries(entries);
                    setNotes(notes);
                    setTotalPages(Math.ceil(total / entriesPerPage));
                } else {
                    setError('Unexpected response format from the server.');
                }
            } catch (err) {
                setError(err.response ? err.response.data.message : 'Failed to fetch entries.');
            }
        };

        fetchEntries();
    }, [page, month]);

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handleMonthChange = (event, value) => {
        setMonth(event.target.value);
        setPage(1); // Reset to first page whenever month is changed
    };

    const handleEntryClick = (id, type) => {
        if (type === 'note') {
            navigate(`/note/${id}`);
        } else if (type === 'journal') {
            navigate(`/journal/${id}`);
        }
    };

    const findNoteForEntry = (timestamp) => {
        const targetDate = new Date(timestamp).toDateString();
        return notes.find(note => new Date(note.timestamp).toDateString() === targetDate);
    };

    const fetchJournalsForEntry = async (timestamp) => {
        const token = localStorage.getItem('token');
        const date = new Date(timestamp).toISOString().split('T')[0]; // Format date as YYYY-MM-DD
        try {
            const response = await axios.get(`http://localhost:8080/journals/date/${date}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error) {
            console.error('Failed to fetch journals:', error);
            return [];
        }
    };

    const getMoodClass = (mood) => {
        switch (mood.toLowerCase()) {
            case 'very good':
                return 'entry-very-good';
            case 'good':
                return 'entry-good';
            case 'meh':
                return 'entry-meh';
            case 'bad':
                return 'entry-bad';
            case 'awful':
                return 'entry-awful';
            default:
                return 'entry-summary';
        }
    };

    return (
        <NavBar>
            <Box display="flex" flexDirection="column" alignItems="center" className="content">
                <Typography variant="h4" gutterBottom>
                    Your Entries for month:
                </Typography>
                {error && <Typography color="error">{error}</Typography>}
                <Box display="flex" justifyContent="center" alignItems="center" mb={3}>
                    <Select
                        value={month}
                        onChange={handleMonthChange}
                        className="month-select"
                    >
                        {Array.from({ length: 12 }, (_, i) => (
                            <MenuItem key={i + 1} value={i + 1}>
                                {dayjs().month(i).format('MMMM')}
                            </MenuItem>
                        ))}
                    </Select>
                </Box>
                <Grid container spacing={1} justifyContent="center">
                    {entries.map(entry => (
                        <Grid item xs={12} sm={8} md={6} lg={4} key={entry._id}>
                            <Box
                                className={getMoodClass(entry.moodId.name)}
                                p={2}
                                border={1}
                                borderRadius={5}
                                onClick={async () => {
                                    const journals = await fetchJournalsForEntry(entry.timestamp);
                                    setEntries(entries.map(e => e._id === entry._id ? { ...e, journals } : e));
                                    setExpandedEntryId(expandedEntryId === entry._id ? null : entry._id);
                                }}
                                sx={{ cursor: 'pointer' }}
                            >
                                <Typography variant="body1"><strong>Date:</strong> {new Date(entry.timestamp).toLocaleString()}</Typography>
                                <Typography variant="body1"><strong>Mood:</strong> {entry.moodId.name}</Typography>
                                {expandedEntryId === entry._id && entry.journals && (
                                    <Box mt={2}>
                                        <Typography variant="body2"><strong>Activities:</strong> {entry.activityIds.map(activity => activity.name).join(', ')}</Typography>
                                        {entry.journals.map((journal, index) => (
                                            <Typography key={journal._id} variant="body2" color="primary" onClick={() => handleEntryClick(journal._id, 'journal')}>
                                                <strong>Journal {index + 1}:</strong> {new Date(journal.timestamp).toLocaleString()}
                                            </Typography>
                                        ))}
                                        {findNoteForEntry(entry.timestamp) ? (
                                            <Typography variant="body2" color="primary" onClick={() => handleEntryClick(findNoteForEntry(entry.timestamp)._id, 'note')}>
                                                <strong>Note:</strong> {new Date(findNoteForEntry(entry.timestamp).timestamp).toLocaleString()}
                                            </Typography>
                                        ) : (
                                            <Typography variant="body2"><strong>Note:</strong> No note entry</Typography>
                                        )}
                                    </Box>
                                )}
                            </Box>
                        </Grid>
                    ))}
                </Grid>
                <Box mt={4} className="pagination">
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={handlePageChange}
                        sx={{ '& .Mui-selected': { backgroundColor: '#006400', color: 'white' }, '& .MuiPaginationItem-root': { border: '1px solid white' } }}
                    />
                </Box>
            </Box>
        </NavBar>
    );
}

export default Entries;
