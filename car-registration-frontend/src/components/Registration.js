import { useState, useEffect, useCallback } from 'react';
import { HubConnectionBuilder, LogLevel, HttpTransportType } from '@microsoft/signalr';
import './Style.css'; // Import the CSS file
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome CSS

const Registration = () => {
    const [statuses, setStatuses] = useState({});
    const [isConnected, setIsConnected] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true); // Loading state
    const [lastUpdate, setLastUpdate] = useState(null); // Last update timestamp
    const [connection, setConnection] = useState(null); // Store connection instance
    const [currentPage, setCurrentPage] = useState(1); // Pagination state
	const itemsPerPageConf = process.env.ITEMS_PER_PAGE
		? '${process.env.ITEMS_PER_PAGE}'
		: 5;
	
    const itemsPerPage = itemsPerPageConf; // Limit items per page

    const initializeConnection = async () => {
        const hubUrl = process.env.REACT_APP_PROXY_URL 
            ? `${process.env.REACT_APP_PROXY_URL}/registrationHub`
            : '/registrationHub';
        const newConnection = new HubConnectionBuilder()
            .withUrl(hubUrl, {
                transport: HttpTransportType.WebSockets,
                skipNegotiation: true,
            })
            .withAutomaticReconnect()
            .configureLogging(LogLevel.Information)
            .build();

        try {
            await newConnection.start();
            console.log('Connected to SignalR hub');
            setIsConnected(true);
            setError(null);
            setLoading(false); // Stop loading once connected

            newConnection.on('ReceiveRegistrationStatus', (carId, status) => {
                setStatuses(prev => ({ ...prev, [carId]: status }));
                setLastUpdate(new Date().toLocaleString()); // Update timestamp
            });

            setConnection(newConnection); // Save connection instance
        } catch (err) {
            console.error('Connection failed: ', err);
            setError('Failed to connect to the server. Retrying...');
            setLoading(false); // Stop loading if connection fails
            setTimeout(() => initializeConnection(), 5000); // Retry after 5 seconds
        }
    };

    useEffect(() => {
        initializeConnection();

        return () => {
            if (connection) {
                connection.off('ReceiveRegistrationStatus');
                connection
                    .stop()
                    .then(() => console.log('Disconnected from SignalR hub'))
                    .catch(err => console.error('Error during disconnect: ', err));
            }
        };
    }, []);

    const refreshConnection = async () => {
        if (connection) {
            setLoading(true);
            try {
                await connection.stop();
                await initializeConnection();
            } catch (err) {
                console.error('Error during refresh: ', err);
            }
        }
    };

    const sortedStatuses = Object.entries(statuses).sort(([carIdA], [carIdB]) => carIdA.localeCompare(carIdB));

    // Pagination logic
    const totalItems = sortedStatuses.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const currentItems = sortedStatuses.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const renderRows = useCallback(
        () =>
            currentItems.map(([carId, status]) => (
                <tr key={carId} className="table-row">
                    <td className="table-cell">{carId}</td>
                    <td className="table-cell">{status}</td>
                </tr>
            )),
        [currentItems]
    );

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
			<div className="registration-container">
			{loading ? (
			<div className="spinner"></div>
			) : (
			<>
				{!isConnected && (
					<p className="error-message">
						<span role="status" aria-live="polite">
							{error ? error : 'Connecting to server...'}
						</span>
					</p>
				)}
				<button 
					onClick={refreshConnection} 
					disabled={loading} 
					className="refresh-button"
				>
					<i className="fas fa-sync-alt"></i> Refresh
				</button>
				<table aria-label="Car Registration Status" className="status-table">
					<thead>
						<tr className="table-header">
							<th scope="col" className="table-header-cell">Car ID</th>
							<th scope="col" className="table-header-cell">Status</th>
						</tr>
					</thead>
					<tbody>
						{currentItems.length > 0 ? (
							renderRows()
						) : (
							<tr className="table-row">
								<td colSpan="2" className="table-cell">No statuses available</td>
							</tr>
						)}
					</tbody>
				</table>
				<div className="pagination-controls">
					<button 
						onClick={handlePreviousPage} 
						disabled={currentPage === 1} 
						className="pagination-button"
					>
						<i className="fas fa-chevron-left"></i> Previous
					</button>
					<span className="pagination-info">
						Page {currentPage} of {totalPages}
					</span>
					<button 
						onClick={handleNextPage} 
						disabled={currentPage === totalPages} 
						className="pagination-button"
					>
						Next <i className="fas fa-chevron-right"></i>
					</button>
				</div>
				{lastUpdate && (
					<p className="last-update">Last update: {lastUpdate}</p>
				)}
			</>
		)}
	</div>
    );
};

export default Registration;
