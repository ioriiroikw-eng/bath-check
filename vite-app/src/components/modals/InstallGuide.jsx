import React from 'react';
import { Icons } from '../Icons';

const InstallGuide = ({ onClose }) => { const isIOS = /iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase()); return (<div className="fixed bottom-0 left-0 right-0 p-4 z-50 slide-up pb-safe"> <div className="bg-gray-800/95 backdrop-blur text-white rounded-2xl p-4 shadow-2xl relative border border-pink-400"> <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 p-2"><Icons.X size={18} /></button> <div className="flex items-start gap-4"> <div className="bg-pink-500 p-3 rounded-xl shrink-0"><Icons.Download size={24} /></div> <div> <h3 className="font-bold text-sm mb-1 font-pop">ホーム画面に追加しよう！</h3> <p className="text-xs text-gray-300 mb-2">アプリみたいに使えて、全画面で見やすくなるよ✨</p> <div className="text-xs font-bold text-pink-300 flex items-center gap-1 flex-wrap"> {isIOS ? <><span className="bg-gray-600 px-1 rounded inline-flex"><Icons.IosShare size={12} /></span> から「ホーム画面に追加」</> : <>メニュー <span className="bg-gray-600 px-1 rounded text-[10px]">︙</span> から「アプリをインストール」</>} </div> </div> </div> </div> </div>); };

export default InstallGuide;
