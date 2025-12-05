import React, { useMemo, useState } from 'react';
import Slice from './Slice';

const PieChart = ({ data, onSelectSlice, selectedSlices = [] }) => {
    const processedData = useMemo(() => {
        const totalHours = data.reduce((acc, item) => acc + (Number(item.Horas) || 0), 0);
        let currentAngle = 0;

        // Generate colors
        const colors = [
            '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD',
            '#D4A5A5', '#9B59B6', '#3498DB', '#E67E22', '#2ECC71'
        ];

        return data.map((item, index) => {
            const hours = Number(item.Horas) || 0;
            const angle = (hours / totalHours) * Math.PI * 2;
            const startAngle = currentAngle;
            const endAngle = currentAngle + angle;
            currentAngle += angle;

            return {
                ...item,
                startAngle,
                endAngle,
                color: colors[index % colors.length]
            };
        });
    }, [data]);

    return (
        <group>
            {processedData.map((item, index) => {
                const selectionIndex = selectedSlices.findIndex(s => s.Projeto === item.Projeto);

                return (
                    <Slice
                        key={index}
                        data={item}
                        startAngle={item.startAngle}
                        endAngle={item.endAngle}
                        color={item.color}
                        selectionIndex={selectionIndex}
                        onClick={(data) => {
                            onSelectSlice(data);
                        }}
                    />
                );
            })}
        </group>
    );
};

export default PieChart;
