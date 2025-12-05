import React from 'react';
import { ExternalLink } from 'lucide-react';

const StaticLabel = ({ data, color, percentage, onHover, onLeave, isHovered, isDimmed }) => {
    return (
        <div
            className={`relative w-full h-full transition-all duration-300 ease-in-out ${isDimmed ? 'opacity-30 grayscale blur-[1px]' : 'opacity-100'}`}
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
        >
            {/* Label card - Reduced padding and border width */}
            <div
                className={`bg-white rounded-xl shadow-sm border border-gray-100 p-4 border-l-[6px] w-full h-full flex flex-col justify-between
                ${isHovered ? 'scale-[1.02] shadow-2xl ring-4 ring-black/5 z-50' : 'hover:shadow-md'} 
                transition-all duration-300 ease-in-out`}
                style={{ borderLeftColor: color }}
            >
                <div className="mb-2">
                    <div className="flex justify-between items-start mb-1">
                        {/* Reduced title size */}
                        <h3 className="font-extrabold text-gray-900 text-base leading-tight uppercase tracking-wide truncate pr-2 flex-1">
                            {data.Projeto}
                        </h3>
                        {/* Reduced badge size */}
                        <div
                            className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold text-white shadow-sm shrink-0"
                            style={{ backgroundColor: color }}
                        >
                            {percentage}%
                        </div>
                    </div>

                    {/* Reduced hours text size */}
                    <div className="flex items-baseline gap-1.5 text-gray-900 mb-3">
                        <span className="font-bold text-xl tracking-tight">{data.Horas}</span>
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">horas totais</span>
                    </div>

                    {/* Description Field with Scaled Down Fluid Typography */}
                    {data.Descricao && (
                        <p
                            className="text-gray-600 leading-snug cursor-default line-clamp-4 overflow-hidden text-ellipsis whitespace-normal break-words"
                            style={{ fontSize: 'clamp(0.75rem, 0.7vw + 0.4rem, 0.9rem)' }}
                        >
                            {data.Descricao}
                        </p>
                    )}
                </div>

                <div className="mt-3 pt-3 border-t border-gray-100 min-h-[30px]">
                    {data.Link ? (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                window.open(data.Link, '_blank');
                            }}
                            className="text-blue-600 hover:text-blue-800 text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center gap-1.5 group"
                        >
                            <span>Acessar Projeto</span>
                            <ExternalLink size={12} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    ) : (
                        <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest cursor-not-allowed select-none">
                            Sem Link
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StaticLabel;
