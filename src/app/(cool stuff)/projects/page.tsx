import ProjectCard from "@/components/ProjectCard";
import { projects, getContributors } from "@/lib/projects";

export default async function Projects() {
  // Fetch contributors for all projects
  const projectsWithContributors = await Promise.all(
    projects.map(async (project) => ({
      ...project,
      contributors: await getContributors(project.username, project.repo),
    }))
  );
  return (
    <div className="p-6 max-w-6xl mx-auto flex-1">

      {/* Projects Section */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-8 animate-fade-slide-up">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <span className="text-accent">☆</span> Featured Projects
          </h1>
        </div>

        {projectsWithContributors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projectsWithContributors.map((project, index) => (
              <div
                key={project.slug}
                className="animate-pop-in hover:scale-[1.02] transition-transform"
                style={{ animationDelay: `${(index + 1) * 100}ms` }}
              >
                <ProjectCard {...project} from="projects" />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted text-center py-12">No projects yet. Check back soon!</p>
        )}
      </section>
    </div>
  );
}
