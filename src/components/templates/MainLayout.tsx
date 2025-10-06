import React, { memo } from 'react';

interface MainLayoutProps {
	readonly children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
	return (
		<>
			<div className="fixed inset-0 bg-slate-900 footer-blur-target" />
			<main className="min-h-screen relative z-10">{children}</main>
		</>
	);
};

export default memo(MainLayout);
export { MainLayout };
