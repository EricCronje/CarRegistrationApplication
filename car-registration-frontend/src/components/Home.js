// Frontend: React
import React, { useEffect, useState } from 'react';

const Home = () => {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        fetch('/api/cars')
            .then(response => response.json())
            .then(data => setCars(data))
			.catch(rejected => {console.log(rejected)})
    }, []);

    return (
        <table>
            <thead>
                <tr>
                    <th>Make</th>
                    <th>Model</th>
                    <th>Registration Expiry</th>
                </tr>
            </thead>
            <tbody>
                {cars.map(car => (
                    <tr key={car.id}>
                        <td>{car.make}</td>
                        <td>{car.model}</td>
                        <td>{new Date(car.registrationExpiry).toLocaleDateString()}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Home;
