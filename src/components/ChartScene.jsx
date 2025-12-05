import React, { useState, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { PieChart as PieChartIcon } from 'lucide-react';
import PieChart from './PieChart';
import StaticLabel from './StaticLabel';

const ChartScene = ({ data, onBack }) => {
    const [selectedSlices, setSelectedSlices] = useState([]);
    const [hoveredLabelIndex, setHoveredLabelIndex] = useState(null);

    const handleSliceClick = (sliceData) => {
        setSelectedSlices(prev => {
            const index = prev.findIndex(s => s.Projeto === sliceData.Projeto);
            if (index !== -1) {
                // Deselect: Remove from array
                return prev.filter(s => s.Projeto !== sliceData.Projeto);
            } else {
                // Deselect others and select this one (Single selection focus for clarity in this mode)
                // Or keep multi-selection? User said "clicasse em cada parte... destaque no próprio card".
                // Let's keep multi-selection support but usually users click one.
                // Resetting to single selection might be cleaner for the "highlight one card" effect, 
                // but let's stick to the previous multi-select behavior for now, just highlighting all selected.

                // Actually, for "Spotlight" effect, single selection is often better visually, 
                // but let's allow adding to selection.
                return [...prev, sliceData];
            }
        });
    };

    // Calculate percentages and organize data
    const { leftLabels, rightLabels } = useMemo(() => {
        const totalHours = data.reduce((acc, item) => acc + (Number(item.Horas) || 0), 0);

        // Same colors as in PieChart
        const colors = [
            '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD',
            '#D4A5A5', '#9B59B6', '#3498DB', '#E67E22', '#2ECC71'
        ];

        const processedData = data
            .map((item, index) => ({
                ...item,
                Horas: Number(item.Horas).toFixed(1), // Format to 1 decimal
                percentage: ((Number(item.Horas) / totalHours) * 100).toFixed(1),
                color: colors[index % colors.length],
                originalIndex: index
            }))
            .sort((a, b) => Number(b.Horas) - Number(a.Horas)); // Sort descending by hours

        const left = processedData.filter((_, i) => i % 2 === 0);
        const right = processedData.filter((_, i) => i % 2 !== 0);

        return { leftLabels: left, rightLabels: right };
    }, [data]);

    // Helper to determine if a label is highlighted or dimmed
    const getLabelState = (item) => {
        const isSelected = selectedSlices.some(s => s.Projeto === item.Projeto);
        const isHovered = hoveredLabelIndex === item.originalIndex;

        // Highlight if hovered OR selected
        const shouldHighlight = isHovered || isSelected;

        // Dim if:
        // 1. Mouse is hovering something else
        // 2. OR Mouse is NOT hovering anything, BUT something is highlighted (selected) and it's not this one
        const somethingIsHovered = hoveredLabelIndex !== null;
        const somethingIsSelected = selectedSlices.length > 0;

        let shouldDim = false;

        if (somethingIsHovered) {
            shouldDim = hoveredLabelIndex !== item.originalIndex;
        } else if (somethingIsSelected) {
            shouldDim = !isSelected;
        }

        return { isHovered: shouldHighlight, isDimmed: shouldDim };
    };

    return (
        <div className="w-full h-screen bg-[#F0F2F5] relative overflow-hidden flex font-sans">
            {/* Header / Upload Button Overlay */}
            <div className="absolute top-6 left-6 z-30">
                <button
                    onClick={onBack}
                    className="bg-white/90 backdrop-blur hover:bg-white text-gray-700 px-5 py-2.5 rounded-xl shadow-sm border border-gray-200 transition-all font-medium flex items-center gap-2 text-sm"
                >
                    <span>← Upload New File</span>
                </button>
            </div>

            {/* Left Column (25%) */}
            <div className="w-[25%] h-full flex flex-col z-20 overflow-y-auto custom-scrollbar p-6 pt-24 space-y-4">
                {leftLabels.map((item, index) => {
                    const { isHovered, isDimmed } = getLabelState(item);
                    return (
                        <div key={index} className="pointer-events-auto">
                            <StaticLabel
                                data={item}
                                color={item.color}
                                percentage={item.percentage}
                                side="left"
                                onHover={() => setHoveredLabelIndex(item.originalIndex)}
                                onLeave={() => setHoveredLabelIndex(null)}
                                isHovered={isHovered}
                                isDimmed={isDimmed}
                            />
                        </div>
                    );
                })}
            </div>

            {/* Center Column: 3D Chart (50%) */}
            <div className="w-[50%] h-full relative">
                <Canvas shadows className="w-full h-full">
                    <PerspectiveCamera makeDefault position={[0, 6, 16]} fov={45} />
                    <OrbitControls
                        enablePan={false}
                        minPolarAngle={0}
                        maxPolarAngle={Math.PI / 2.2}
                        autoRotate={!hoveredLabelIndex && selectedSlices.length === 0}
                        autoRotateSpeed={0.5}
                    />

                    <ambientLight intensity={1} />
                    <directionalLight
                        position={[10, 15, 10]}
                        intensity={1.5}
                        castShadow
                        shadow-mapSize={[2048, 2048]}
                    />
                    <Environment preset="city" />

                    <PieChart
                        data={data}
                        selectedSlices={selectedSlices}
                        onSelectSlice={handleSliceClick}
                    />
                </Canvas>

                <div className="absolute bottom-6 left-0 right-0 text-center pointer-events-none z-0">
                    <p className="text-gray-500 text-sm font-medium tracking-wide uppercase">
                        Powered By <span style={{ color: '#0A3161' }} className="font-extrabold text-base">5W</span> Consulting
                    </p>
                </div>
            </div>

            {/* Right Column (25%) */}
            <div className="w-[25%] h-full flex flex-col z-20 overflow-y-auto custom-scrollbar p-6 pt-24 space-y-4">
                {rightLabels.map((item, index) => {
                    const { isHovered, isDimmed } = getLabelState(item);
                    return (
                        <div key={index} className="pointer-events-auto">
                            <StaticLabel
                                data={item}
                                color={item.color}
                                percentage={item.percentage}
                                side="right"
                                onHover={() => setHoveredLabelIndex(item.originalIndex)}
                                onLeave={() => setHoveredLabelIndex(null)}
                                isHovered={isHovered}
                                isDimmed={isDimmed}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ChartScene;
