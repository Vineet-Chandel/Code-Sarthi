import React from 'react';

const PageNotFound = () => {
    return (
        <div data-theme="caramellatte" className="relative min-h-screen flex items-center justify-center bg-base-200 overflow-hidden">
            {/* Decorative background blobs */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-100 rounded-full blur-3xl opacity-50 animate-pulse" />
            <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-blue-100 rounded-full blur-3xl opacity-30 animate-bounce" style={{ animationDuration: '8s' }} />

            <div className="relative z-10 text-center px-6">
                {/* Animated Error Code */}
                <p className="text-sm font-bold tracking-widest text-accent uppercase mb-4 animate-fade-in">
                    Error 404
                </p>

                <h1 className="text-5xl md:text-8xl font-extrabold text-slate-900 tracking-tight mb-4">
                    Lost in <span className="text-accent">space?</span>
                </h1>

                <p className="max-w-lg mx-auto text-lg md:text-xl text-slate-600 mb-10 leading-relaxed">
                    We can’t seem to find the page you’re looking for. It might have been moved,
                    or perhaps it never existed in this dimension.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button
                        onClick={() => window.history.back()}
                        className="w-full sm:w-auto px-8 py-3 text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl shadow-sm hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-95"
                    >
                        Previous Page
                    </button>

                    <button
                        onClick={() => window.location.href = '/'}
                        className="w-full sm:w-auto px-8 py-3 text-sm font-semibold text-secondary-content bg-secondary rounded-2xl  flex items-center justify-center gap-2 group"
                    >
                        Take Me Home
                        <svg
                            className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </button>
                </div>

                {/* Support Link */}
                <p className="mt-12 text-sm text-slate-500">
                    Think this is a mistake? <a href="/help-center" className="text-accent font-medium hover:underline underline-offset-4">Contact Support</a>
                </p>
            </div>
        </div>
    );
};

export default PageNotFound;