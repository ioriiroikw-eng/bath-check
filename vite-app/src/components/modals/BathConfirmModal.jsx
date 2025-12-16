import React from 'react';

const BathConfirmModal = ({ isOpen, onClose, onConfirm }) => { if (!isOpen) return null; return (<div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}> <div className="bg-white rounded-3xl p-6 w-full max-w-sm modal-enter text-center shadow-2xl border-4 border-pink-100" onClick={e => e.stopPropagation()}> <div className="text-5xl mb-4">🛁</div> <h3 className="text-xl font-black text-gray-800 mb-2 font-pop">お風呂タイム？</h3> <p className="text-gray-600 font-bold mb-6 text-sm">お風呂に入ってリセットしますか？<br />(HP全回復 & 今日の占い！)</p> <div className="flex gap-3"> <button onClick={onConfirm} className="flex-1 bg-gradient-to-r from-pink-400 to-purple-400 text-white font-bold py-3 rounded-xl shadow-md active:scale-95">入った！✨</button> <button onClick={onClose} className="flex-1 bg-gray-100 text-gray-500 font-bold py-3 rounded-xl shadow-md active:scale-95">まだ</button> </div> </div> </div>); };

export default BathConfirmModal;
