import React, { useMemo, useState } from 'react';
import * as THREE from 'three';
import { Html } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';

const Slice = ({ data, startAngle, endAngle, color, radius = 5, height = 1, onClick, selectionIndex }) => {
    const [hovered, setHovered] = useState(false);
    const isSelected = selectionIndex !== -1;

    const shape = useMemo(() => {
        const shape = new THREE.Shape();
        shape.moveTo(0, 0);
        shape.arc(0, 0, radius, startAngle, endAngle, false);
        shape.lineTo(0, 0);
        return shape;
    }, [startAngle, endAngle, radius]);

    const extrudeSettings = useMemo(() => ({
        depth: height,
        bevelEnabled: false,
        steps: 1,
    }), [height]);

    const targetScaleZ = useMemo(() => {
        if (!isSelected) return hovered ? 1.2 : 1;
        // Base scale (1) + (Index + 1) * Step (e.g., 0.8)
        // Index 0 -> 1 + 1*0.8 = 1.8
        // Index 1 -> 1 + 2*0.8 = 2.6
        return 1 + (selectionIndex + 1) * 0.8;
    }, [isSelected, selectionIndex, hovered]);

    const { scaleZ, colorSpring } = useSpring({
        scaleZ: targetScaleZ,
        colorSpring: isSelected ? new THREE.Color(color).offsetHSL(0, 0, 0.1) : (hovered ? new THREE.Color(color).offsetHSL(0, 0, 0.05) : new THREE.Color(color)),
        config: { mass: 1, tension: 120, friction: 14 }
    });

    return (
        <animated.group>
            <animated.mesh
                onClick={(e) => {
                    e.stopPropagation();
                    onClick(data);
                }}
                onPointerOver={(e) => {
                    e.stopPropagation();
                    setHovered(true);
                    document.body.style.cursor = 'pointer';
                }}
                onPointerOut={(e) => {
                    e.stopPropagation();
                    setHovered(false);
                    document.body.style.cursor = 'auto';
                }}
                rotation={[-Math.PI / 2, 0, 0]}
                scale-z={scaleZ}
            >
                <extrudeGeometry args={[shape, extrudeSettings]} />
                <animated.meshStandardMaterial
                    color={colorSpring}
                    metalness={0.4}
                    roughness={0.3}
                />
            </animated.mesh>
        </animated.group>
    );
};

export default Slice;
