import React from 'react';
import { Icons } from '../Icons';

const InAppBrowserWarning = ({ onClose }) => (<div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6 modal-enter"> <div className="bg-white rounded-3xl p-6 w-full max-w-sm text-center relative border-4 border-pink-400"> <div className="text-pink-500 mb-2 flex justify-center"><Icons.Alert size={48} /></div> <h2 className="text-xl font-black text-gray-800 mb-2 font-pop">⚠️ データが消えちゃうかも！</h2> <p className="text-sm text-gray-600 mb-4 font-bold">アプリ内ブラウザ(LINEなど)では履歴が保存されません💦</p> <div className="bg-gray-100 p-4 rounded-xl text-left mb-4 text-sm text-gray-700"> <p className="mb-2 font-bold">👇 Safari/Chromeで開いてね！</p> <ol className="list-decimal list-inside space-y-1"> <li>右上の <span className="font-bold bg-white px-1 rounded border">︙</span> やシェアボタンを押す</li> <li><span className="font-bold text-blue-600">「ブラウザで開く」</span> を選ぶ</li> </ol> </div> <button onClick={onClose} className="text-xs text-gray-400 underline p-2">分かったけどこのまま使う</button> </div> </div>);

export default InAppBrowserWarning;
