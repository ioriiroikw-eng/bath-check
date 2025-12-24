import React from 'react';

/**
 * Modal Component - Premium overlay with slide-up animation
 */
export const Modal = ({
    isOpen,
    onClose,
    children,
    title,
    showCloseButton = true,
    size = 'md',
    className = '',
}) => {
    if (!isOpen) return null;

    const sizes = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        full: 'max-w-full mx-4',
    };

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose?.();
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center modal-overlay"
            onClick={handleBackdropClick}
        >
            <div
                className={`
                    w-full ${sizes[size]} mx-auto
                    bg-white rounded-t-3xl sm:rounded-3xl
                    shadow-2xl modal-content
                    max-h-[90vh] overflow-hidden
                    flex flex-col
                    ${className}
                `}
            >
                {/* Header */}
                {(title || showCloseButton) && (
                    <div className="flex items-center justify-between p-4 border-b border-gray-100">
                        {title && (
                            <h2 className="text-lg font-bold text-gray-800">{title}</h2>
                        )}
                        {showCloseButton && (
                            <button
                                onClick={onClose}
                                className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        )}
                    </div>
                )}

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-4">
                    {children}
                </div>
            </div>
        </div>
    );
};

/**
 * Bottom Sheet Modal - For mobile-first design
 */
export const BottomSheet = ({
    isOpen,
    onClose,
    children,
    title,
    className = '',
}) => {
    if (!isOpen) return null;

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose?.();
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-end justify-center modal-overlay"
            onClick={handleBackdropClick}
        >
            <div
                className={`
                    w-full max-w-lg mx-auto
                    bg-white rounded-t-3xl
                    shadow-2xl animate-slide-up
                    max-h-[85vh] overflow-hidden
                    flex flex-col
                    pb-safe
                    ${className}
                `}
            >
                {/* Handle bar */}
                <div className="flex justify-center pt-3 pb-2">
                    <div className="w-10 h-1 bg-gray-300 rounded-full" />
                </div>

                {/* Title */}
                {title && (
                    <div className="px-4 pb-2">
                        <h2 className="text-lg font-bold text-gray-800 text-center">{title}</h2>
                    </div>
                )}

                {/* Content */}
                <div className="flex-1 overflow-y-auto px-4 pb-4">
                    {children}
                </div>
            </div>
        </div>
    );
};

/**
 * Confirmation Dialog
 */
export const ConfirmDialog = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = '確認',
    cancelText = 'キャンセル',
    variant = 'primary',
}) => {
    if (!isOpen) return null;

    const buttonVariants = {
        primary: 'bg-pink-500 hover:bg-pink-600 text-white',
        danger: 'bg-red-500 hover:bg-red-600 text-white',
        indigo: 'bg-indigo-500 hover:bg-indigo-600 text-white',
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center modal-overlay p-4"
            onClick={(e) => e.target === e.currentTarget && onClose?.()}
        >
            <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl animate-bounce-in p-6">
                {title && (
                    <h3 className="text-xl font-bold text-gray-800 text-center mb-2">{title}</h3>
                )}
                {message && (
                    <p className="text-gray-600 text-center mb-6">{message}</p>
                )}
                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 py-3 px-4 rounded-full bg-gray-100 text-gray-600 font-bold hover:bg-gray-200 transition-colors"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={() => {
                            onConfirm?.();
                            onClose?.();
                        }}
                        className={`flex-1 py-3 px-4 rounded-full font-bold transition-colors ${buttonVariants[variant]}`}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default { Modal, BottomSheet, ConfirmDialog };
