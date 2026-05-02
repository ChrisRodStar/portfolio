import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 w-full min-h-[80vh] px-4 animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-slide-up">
          Christopher <span className="text-accent">Rodriguez</span>
        </h1>
        <p className="text-muted text-lg max-w-xl mx-auto animate-fade-slide-up delay-100">
          I build and design experiences for the web. Choose an area to explore below.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto">
        {/* Developer Portfolio Card */}
        <Link 
          href="/dev" 
          className="group card p-8 shadow-lg shadow-accent/5 hover:shadow-accent/20 hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center border border-surface hover:border-accent animate-pop-in delay-200"
        >
          <div className="w-16 h-16 rounded-2xl bg-surface group-hover:bg-accent/10 flex items-center justify-center mb-6 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted group-hover:text-accent transition-colors">
              <polyline points="16 18 22 12 16 6"></polyline>
              <polyline points="8 6 2 12 8 18"></polyline>
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-3 group-hover:text-accent transition-colors">Developer Portfolio</h2>
          <p className="text-muted leading-relaxed">
            View my software engineering projects, open-source contributions, technical background, and interactive terminal.
          </p>
          <div className="mt-8 text-sm font-medium text-accent opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
            Enter Developer Site <span className="text-lg">→</span>
          </div>
        </Link>

        {/* Marketing / Web Design Card */}
        <Link 
          href="/marketing" 
          className="group card p-8 shadow-lg shadow-accent/5 hover:shadow-accent/20 hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center border border-surface hover:border-accent animate-pop-in delay-300"
        >
          <div className="w-16 h-16 rounded-2xl bg-surface group-hover:bg-accent/10 flex items-center justify-center mb-6 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted group-hover:text-accent transition-colors">
              <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
              <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
              <path d="M2 2l7.586 7.586"></path>
              <circle cx="11" cy="11" r="2"></circle>
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-3 group-hover:text-accent transition-colors">Web Design & Marketing</h2>
          <p className="text-muted leading-relaxed">
            Explore my design portfolio, client work, case studies, and request a custom website for your business.
          </p>
          <div className="mt-8 text-sm font-medium text-accent opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
            Enter Marketing Site <span className="text-lg">→</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
