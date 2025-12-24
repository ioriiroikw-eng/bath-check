import React from 'react';
import { Icons } from '../Icons';
import { getLocalDateStr } from '../../utils';

const DayDetailModal = ({ isOpen, onClose, details, logs }) => {
    if (!isOpen || !details) return null;
    const { dateStr, time, hoursSince, preBathHp, type, rating, memo } = details;
    const d = new Date(time);
    const displayDate = !isNaN(d) ? d.toLocaleDateString('ja-JP', { month: 'long', day: 'numeric', weekday: 'short' }) : dateStr;

    const dayLogs = logs.filter(log => { if (!log.timestamp) return false; return getLocalDateStr(new Date(log.timestamp)) === dateStr && log.type === 'action'; });

    // 星評価を表示するヘルパー
    const renderStars = (r) => {
        if (!r || r === 0) return null;
        return (
            <div className="flex gap-1 justify-center">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Icons.Star
                        key={star}
                        size={20}
                        className={star <= r ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                    />
                ))}
            </div>
        );
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white rounded-3xl p-6 w-full max-w-sm modal-enter shadow-2xl relative border-4 border-pink-300 flex flex-col max-h-[85vh]" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400"><Icons.X /></button>

                <div className="text-center mb-4 flex-shrink-0">
                    <h2 className="text-xl font-black text-gray-800 mb-1 font-pop">記録詳細</h2>
                    <p className="text-lg text-pink-500 font-bold">{displayDate}</p>
                </div>

                <div className="space-y-4 overflow-y-auto pr-1 pb-4 flex-grow">
                    {/* おやすみ（スキップ）記録がある場合のバナー */}
                    {type === 'sleep' && (
                        <div className="bg-indigo-50 p-3 rounded-xl text-center mb-2 border border-indigo-100">
                            <div className="flex items-center justify-center gap-2 mb-1">
                                <span className="text-2xl">🛌</span>
                                <span className="font-black text-indigo-600 font-pop">戦略的撤退</span>
                            </div>
                            <div className="text-xs font-bold text-indigo-400">
                                ズボラ貯金 +30分 獲得✨
                            </div>
                        </div>
                    )}

                    {/* 入浴記録がある場合の詳細 */}
                    {(type === 'bath' || !type) && (
                        <>
                            <div className="flex gap-3">
                                <div className="flex-1 bg-pink-50 p-3 rounded-xl text-center">
                                    <p className="text-[10px] font-bold text-gray-500 mb-1">直前の清潔度</p>
                                    <p className="text-3xl font-black text-pink-600 font-pop">{preBathHp !== undefined ? preBathHp : '?'}%</p>
                                </div>
                                <div className="flex-1 bg-blue-50 p-3 rounded-xl text-center">
                                    <p className="text-[10px] font-bold text-gray-500 mb-1">経過時間</p>
                                    <p className="text-2xl font-black text-blue-600 font-pop">{hoursSince !== undefined ? hoursSince : '?'}H</p>
                                </div>
                            </div>

                            {/* 星評価表示 */}
                            {rating > 0 && (
                                <div className="mt-2 p-4 rounded-xl bg-yellow-50 border-2 border-yellow-200 text-center">
                                    <p className="text-xs font-bold text-gray-500 mb-2">この日の評価</p>
                                    {renderStars(rating)}
                                    {memo && (
                                        <p className="mt-2 text-sm text-gray-600 italic">「{memo}」</p>
                                    )}
                                </div>
                            )}
                        </>
                    )}

                    <div className="mt-4">
                        <div className="flex items-center gap-2 mb-2"> <span className="text-lg">📝</span> <span className="text-sm font-bold text-gray-600">この日の行動ログ</span> </div>
                        {dayLogs.length > 0 ? (<div className="space-y-2 bg-gray-50 p-2 rounded-xl"> {dayLogs.map((log, i) => (<div key={i} className="flex gap-2 items-start bg-white p-2 rounded-lg shadow-sm"> <div className="text-base">{log.icon}</div> <div className="flex-1"> <div className="text-xs font-bold text-gray-700">{log.text}</div> <div className="text-[10px] text-gray-400 text-right">{log.time}</div> </div> </div>))} </div>) : (<div className="text-center py-4 bg-gray-50 rounded-xl text-gray-400 text-xs">記録された行動はありません</div>)}
                    </div>
                </div>
                <button onClick={onClose} className="mt-2 w-full bg-gray-200 text-gray-600 font-bold py-3 rounded-xl shadow-sm active:scale-95 flex-shrink-0">閉じる</button>
            </div>
        </div>
    );
};

export default DayDetailModal;
