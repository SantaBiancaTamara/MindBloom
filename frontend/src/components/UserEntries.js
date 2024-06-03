import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from './NavBar';  

function Entries() {
    const [entries, setEntries] = useState([]);
    const [error, setError] = useState('');
    const [expandedEntryId, setExpandedEntryId] = useState(null);

    useEffect(() => {
        const fetchEntries = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('Authentication token is missing. Please log in to continue.');
                return;
            }

            try {
                const response = await axios.get('http://localhost:8080/userEntries', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setEntries(response.data);
            } catch (err) {
                setError(err.response ? err.response.data.message : 'Failed to fetch entries.');
            }
        };

        fetchEntries();
    }, []);

    return (
        <NavBar>
            <div className="entry-tracker">
                <h2>Your Entries</h2>
                {error && <p className="text-danger">{error}</p>}
                <ul className="entries-list">
                    {entries.map(entry => (
                        <li key={entry._id} onClick={() => setExpandedEntryId(expandedEntryId === entry._id ? null : entry._id)}>
                            <div className="entry-summary">
                                <p><strong>Date:</strong> {new Date(entry.timestamp).toLocaleString()}</p>
                                <p><strong>Mood:</strong> {entry.moodId}</p>
                                {expandedEntryId === entry._id && (
                                    <div className="entry-details">
                                        <p><strong>Activities:</strong> {entry.activityIds.join(', ')}</p>
                                        <p><strong>Journal:</strong> {entry.journal|| "No journal entry"}</p>
                                    </div>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </NavBar>
    );
}

export default Entries;
