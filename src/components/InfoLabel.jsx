import React from 'react';
import { Html } from '@react-three/drei';
import { ExternalLink } from 'lucide-react';

const InfoLabel = ({ data, position, color }) => {
    return (
        <Html position={position} center>
            <div className="pointer-events-auto" style={{ width: '200px' }}>
                <div
                    className="bg-white rounded-lg shadow-lg p-4 border-l-4 transition-all hover:shadow-xl"
                    style={{ borderLeftColor: color }}
                >
                    <div className="mb-2">
                        <h3 className="font-bold text-gray-900 text-sm leading-tight mb-1">
                            {data.Projeto}
                        </h3>
                        <p className="text-xs text-gray-500">
                            <span className="font-semibold text-gray-700">{data.Horas}h</span> total
                        </p>
                    </div>

                    <button
                        onClick={() => window.open(data.Link, '_blank')}
                        className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-medium py-2 px-3 rounded transition-colors flex items-center justify-center gap-1.5"
                    >
                        <span>Acessar</span>
                        <ExternalLink size={12} />
                    </button>
                </div>
            </div>
        </Html>
    );
};

export default InfoLabel;
