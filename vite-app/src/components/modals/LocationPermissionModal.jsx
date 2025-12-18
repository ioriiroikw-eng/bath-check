import React from 'react';
import { Icons } from '../Icons';

const LocationPermissionModal = ({ isOpen, onAllowLocation, onUseDefault }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl">
                {/* ヘッダー */}
                <div className="text-center mb-6">
                    <span className="text-5xl mb-4 block">📍</span>
                    <h2 className="text-xl font-black text-gray-800 mb-2">位置情報について</h2>
                </div>

                {/* 説明 */}
                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                    <p className="text-sm text-gray-600 leading-relaxed">
                        お住まいの地域の<span className="font-bold text-pink-500">正確な気温</span>を取得するために位置情報を使用します。
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                        ※ 位置情報はサーバーに保存されません
                    </p>
                </div>

                {/* 選択肢 */}
                <div className="space-y-3">
                    <button
                        onClick={onAllowLocation}
                        className="w-full bg-pink-500 text-white font-bold py-3 rounded-full shadow-lg active:scale-95 transition-transform"
                    >
                        📍 位置情報を許可する
                    </button>
                    <button
                        onClick={onUseDefault}
                        className="w-full bg-gray-100 text-gray-600 font-bold py-3 rounded-full active:scale-95 transition-transform"
                    >
                        🗼 東京の天気を使う
                    </button>
                </div>

                <p className="text-[10px] text-gray-400 text-center mt-4">
                    どちらを選んでもアプリは正常に動作します
                </p>
            </div>
        </div>
    );
};

export default LocationPermissionModal;
