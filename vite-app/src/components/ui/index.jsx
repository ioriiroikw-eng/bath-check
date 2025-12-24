import React from 'react';

/**
 * Premium Card Component - Glassmorphism style
 */
export const Card = ({ children, className = '', variant = 'default', ...props }) => {
    const variants = {
        default: 'glass-card',
        strong: 'glass-card-strong',
        dark: 'glass-dark',
    };

    return (
        <div className={`rounded-3xl ${variants[variant]} ${className}`} {...props}>
            {children}
        </div>
    );
};

/**
 * Premium Button Component - Tactile feedback
 */
export const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    disabled = false,
    ...props
}) => {
    const variants = {
        primary: 'btn-primary',
        secondary: 'btn-secondary',
        indigo: 'btn-indigo',
        ghost: 'bg-transparent hover:bg-gray-100 active:bg-gray-200 text-gray-600',
    };

    const sizes = {
        sm: 'py-2 px-4 text-sm',
        md: 'py-3 px-6 text-base',
        lg: 'py-5 px-8 text-xl',
    };

    return (
        <button
            className={`
                inline-flex items-center justify-center gap-2
                font-bold transition-all duration-200
                disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                ${variants[variant]}
                ${sizes[size]}
                ${className}
            `}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
};

/**
 * Icon Button - For toolbar actions
 */
export const IconButton = ({ children, label, className = '', active = false, ...props }) => {
    return (
        <button
            className={`
                flex flex-col items-center gap-1 group min-w-[3.5rem]
                transition-all duration-200
                ${className}
            `}
            {...props}
        >
            <div className={`
                p-3 rounded-2xl transition-all duration-200 group-active:scale-95
                ${active
                    ? 'bg-pink-100 text-pink-500 shadow-sm border border-pink-200'
                    : 'bg-gray-50 text-gray-400 group-hover:bg-pink-50 group-hover:text-pink-500'
                }
            `}>
                {children}
            </div>
            {label && (
                <span className={`
                    text-[10px] font-bold transition-colors duration-200
                    ${active ? 'text-pink-500' : 'text-gray-400 group-hover:text-pink-500'}
                `}>
                    {label}
                </span>
            )}
        </button>
    );
};

/**
 * Badge Component
 */
export const Badge = ({ children, variant = 'pink', className = '' }) => {
    const variants = {
        pink: 'bg-pink-500 text-white',
        indigo: 'bg-indigo-500 text-white',
        gray: 'bg-gray-100 text-gray-600',
        success: 'bg-green-500 text-white',
        warning: 'bg-orange-500 text-white',
    };

    return (
        <span className={`
            inline-flex items-center px-3 py-1 rounded-full text-xs font-bold
            ${variants[variant]}
            ${className}
        `}>
            {children}
        </span>
    );
};

export default { Card, Button, IconButton, Badge };
