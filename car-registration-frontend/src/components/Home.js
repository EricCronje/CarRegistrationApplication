import React, { useEffect, useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Font Awesome for icons
import './Style.css'; // Import the CSS file

const Home = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        fetch('/api/cars')
            .then(response => response.json())
            .then(data => {
                setCars(data);
                setLoading(false); // Data loaded
            })
            .catch(rejected => {
                console.log(rejected);
                setLoading(false); // Stop loading even if there's an error
            });
    }, []);

    return (
        <div className="home-container">
            <div className="controls">
                <button 
                    className="refresh-button"
                    onClick={() => window.location.reload()}
                >
                    <i className="fas fa-sync-alt"></i>
                    Refresh
                </button>
            </div>
            {loading ? (
                <div className="spinner"></div>
            ) : (
                <table className="data-table">
                    <thead>
                        <tr className="table-header">
                            <th className="table-header-cell">Id</th>
                            <th className="table-header-cell">Make</th>
                            <th className="table-header-cell">Model</th>
                            <th className="table-header-cell">Registration Expiry</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cars.map(car => (
                            <tr key={car.id} className="table-row">
                                <td className="table-cell">{car.id}</td>
                                <td className="table-cell">{car.make}</td>
                                <td className="table-cell">{car.model}</td>
                                <td className="table-cell">{new Date(car.registrationExpiry).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Home;