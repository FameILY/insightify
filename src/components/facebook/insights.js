// src/components/facebook/insights.jsx
import React, { useEffect, useState } from 'react';
import { fetchInsights } from '@/app/api/facebook/api'; // Ensure this is correctly imported

const Insights = ({ igMediaId, accessToken }) => {
    const [insights, setInsights] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getInsights = async () => {
            try {
                const data = await fetchInsights(igMediaId, accessToken);
                setInsights(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        if (igMediaId && accessToken) {
            getInsights();
        }
    }, [igMediaId, accessToken]);

    if (loading) return <div>Loading insights...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h2>Insights</h2>
            <ul>
                {insights && insights.data.map((metric) => (
                    <li key={metric.id}>
                        <strong>{metric.title}</strong>: {metric.values[0].value}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Insights;