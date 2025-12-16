import React from 'react';

const Icon = ({ path, className, size = 24, onClick }) => (<svg onClick={onClick} xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>{path}</svg>);

export const Icons = {
    Bath: (p) => <Icon {...p} path={<><path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-1.5C3.81 2 2.5 3.31 2.5 5.5c0 1.56 1.15 2.1 1.8 2.2" /><path d="M21 10c0-1.66-1.34-3-3-3-1.12 0-2.1.58-2.6 1.5L14 10" /><path d="M7 10h14L19.5 21h-11Z" /><path d="M7 10v4" /></>} />,
    Clock: (p) => <Icon {...p} path={<><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></>} />,
    Calendar: (p) => <Icon {...p} path={<><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /></>} />,
    X: (p) => <Icon {...p} path={<><path d="M18 6 6 18" /><path d="m6 6 12 12" /></>} />,
    ChevronLeft: (p) => <Icon {...p} path={<><path d="m15 18-6-6 6-6" /></>} />,
    ChevronRight: (p) => <Icon {...p} path={<><path d="m9 18 6-6-6-6" /></>} />,
    Camera: (p) => <Icon {...p} path={<><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" /><circle cx="12" cy="13" r="3" /></>} />,
    Share: (p) => <Icon {...p} path={<><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" /><polyline points="16 6 12 2 8 6" /><line x1="12" x2="12" y1="2" y2="15" /></>} />,
    Alert: (p) => <Icon {...p} path={<><circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="8" y2="12" /><line x1="12" x2="12.01" y1="16" y2="16" /></>} />,
    Download: (p) => <Icon {...p} path={<><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" /></>} />,
    IosShare: (p) => <Icon {...p} path={<><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" /><polyline points="16 6 12 2 8 6" /><line x1="12" x2="12" y1="2" y2="15" /></>} />,
    Book: (p) => <Icon {...p} path={<><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></>} />,
    Cloud: (p) => <Icon {...p} path={<><path d="M17.5 19c0-3.037-2.463-5.5-5.5-5.5S6.5 15.963 6.5 19" /><path d="M17.5 19h.5a4 4 0 0 0 1.5-7.75" /><path d="M6.5 19h-.5a4 4 0 0 1-1.5-7.75" /><path d="M16.5 10A5 5 0 0 0 7.5 10" /></>} />,
    Sun: (p) => <Icon {...p} path={<><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></>} />,
    Help: (p) => <Icon {...p} path={<><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></>} />,
    Star: (p) => <Icon {...p} path={<><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></>} />,
    Music: (p) => <Icon {...p} path={<><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></>} />,
    XLogo: (p) => <Icon {...p} path={<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />} />,
    Zzz: (p) => <Icon {...p} path={<><path d="M2 4v16" /><path d="M2 8h18a2 2 0 0 1 2 2v10" /><path d="M2 17h20" /><path d="M6 8v9" /></>} />,
    Gem: (p) => <Icon {...p} path={<path d="M6 3h12l4 6-10 13L2 9z" />} />,
};
