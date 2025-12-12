import Link from "next/link";
import Image from "next/image";
import { getProjectBySlug, getContributors, projects } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ from?: string }>;
}) {
  const { slug } = await params;
  const { from } = await searchParams;
  const project = getProjectBySlug(slug);

  const backHref = from === "home" ? "/" : "/projects";
  const backLabel = from === "home" ? "← Back to Home" : "← Back to Projects";

  if (!project) {
    return (
      <div className="p-6 max-w-6xl mx-auto flex-1">
        <div className="text-center py-20">
          <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
          <Link href={backHref} className="text-accent hover:underline">
            {backLabel}
          </Link>
        </div>
      </div>
    );
  }

  const contributors = await getContributors(project.username, project.repo);
  const contributorCount = contributors.length || project.contributors || 1;

  return (
    <div className="p-6 max-w-6xl mx-auto flex-1">
      {/* Back Link */}
      <div className="mb-6">
        <Link href={backHref} className="text-accent hover:underline text-sm">
          {backLabel}
        </Link>
      </div>

      {/* Project Card Preview */}
      <div className="flex justify-center mb-8">
        <div className="bg-crust rounded-xl overflow-hidden border border-card-border max-w-md w-full">
          {/* Terminal Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-mantle">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
              <span className="w-3 h-3 rounded-full bg-green-500"></span>
              <p className="text-accent text-sm ml-2">
                {project.username} / <span className="text-foreground">{project.repo}</span>
              </p>
            </div>
            {project.stars && (
              <span className="text-sm text-muted flex items-center gap-1">
                {project.stars.toLocaleString()} <span className="text-yellow-400">★</span>
              </span>
            )}
          </div>

          {/* Terminal Content */}
          <div className="p-4 flex flex-col">
            <p className="text-muted text-sm leading-relaxed mb-4">{project.description}</p>

            {/* Contributors */}
            <div className="flex items-center justify-between pt-3 border-t border-card-border">
              <div className="flex -space-x-2">
                {contributors.length > 0
                  ? contributors.slice(0, 4).map((c) => (
                      <a
                        key={c.login}
                        href={c.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={c.login}
                      >
                        <Image
                          src={c.avatar_url}
                          alt={c.login}
                          width={32}
                          height={32}
                          className="w-8 h-8 rounded-full border-2 border-crust hover:border-accent transition-colors"
                        />
                      </a>
                    ))
                  : Array.from({ length: Math.min(contributorCount, 4) }).map((_, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-surface border-2 border-crust flex items-center justify-center text-xs text-muted"
                      >
                        {String.fromCharCode(65 + i)}
                      </div>
                    ))}
              </div>
              <span className="text-xs text-muted">
                {contributorCount} Contributor{contributorCount !== 1 ? "s" : ""}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* GitHub Link */}
      <div className="flex justify-center mb-8">
        <a
          href={`https://github.com/${project.username}/${project.repo}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/80 transition-colors"
        >
          <GitHubIcon />
          View on GitHub
        </a>
      </div>

      {/* Meta & Tags */}
      <div className="flex items-center gap-4 text-sm text-muted mb-4">
        <span className="flex items-center gap-1">
          <CalendarIcon /> {project.date}
        </span>
        {project.stars && (
          <span className="flex items-center gap-1">
            <StarIcon /> {project.stars.toLocaleString()}
          </span>
        )}
        {project.forks && (
          <span className="flex items-center gap-1">
            <ForkIcon /> {project.forks}
          </span>
        )}
      </div>

      {project.tags && project.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tags.map((tag) => (
            <span
              key={tag.name}
              className="text-xs px-2 py-1 bg-accent/20 text-accent rounded"
            >
              {tag.name}
            </span>
          ))}
        </div>
      )}

      {/* Full Description */}
      <article className="mb-12">
        <div className="space-y-4 text-muted leading-relaxed">
          {project.fullDescription.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </article>
    </div>
  );
}

function CalendarIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  );
}

function ForkIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}
