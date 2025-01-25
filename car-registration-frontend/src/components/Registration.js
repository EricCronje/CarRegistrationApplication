import { useState, useEffect, useCallback } from 'react';
import { HubConnectionBuilder, LogLevel, HttpTransportType } from '@microsoft/signalr';

const Registration = () => {
    const [statuses, setStatuses] = useState({});
    const [isConnected, setIsConnected] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Define the base hub URL, with a proxy URL if applicable
        const hubUrl = process.env.REACT_APP_PROXY_URL 
              ? `${process.env.REACT_APP_PROXY_URL}/registrationHub`
              : '/registrationHub';
        const connection = new HubConnectionBuilder()
            .withUrl(hubUrl, {
                transport: HttpTransportType.WebSockets,
                skipNegotiation: true,
            })
            .withAutomaticReconnect()
            .configureLogging(LogLevel.Information)
            .build();

        const startConnection = async () => {
            try {
                await connection.start();
                console.log('Connected to SignalR hub');
                setIsConnected(true);
                setError(null);

                connection.on('ReceiveRegistrationStatus', (carId, status) => {
                    setStatuses(prev => ({ ...prev, [carId]: status }));
                });
            } catch (err) {
                console.error('Connection failed: ', err);
                setError('Failed to connect to the server. Retrying...');
                setTimeout(startConnection, 5000); // Retry after 5 seconds
            }
        };

        startConnection();

        return () => {
            connection.off('ReceiveRegistrationStatus');
            connection
                .stop()
                .then(() => console.log('Disconnected from SignalR hub'))
                .catch(err => console.error('Error during disconnect: ', err));
        };
    }, []);

    const sortedStatuses = Object.entries(statuses).sort(([carIdA], [carIdB]) => carIdA.localeCompare(carIdB));

    const renderRows = useCallback(
        () =>
            sortedStatuses.map(([carId, status]) => (
                <tr key={carId}>
                    <td>{carId}</td>
                    <td>{status}</td>
                </tr>
            )),
        [sortedStatuses]
    );

    return (
        <div>
            {!isConnected && (
                <p>
                    <span role="status" aria-live="polite">
                        {error ? error : 'Connecting to server...'}
                    </span>
                </p>
            )}
            <table aria-label="Car Registration Status">
                <thead>
                    <tr>
                        <th scope="col">Car ID</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedStatuses.length > 0 ? (
                        renderRows()
                    ) : (
                        <tr>
                            <td colSpan="2">No statuses available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Registration;