import { Column, Schema, Meta } from "@once-ui-system/core";
import { baseURL, about, person, work } from "@/resources";
import { getPosts } from "@/utils/utils";
import WorkPageClient from "@/components/work/WorkPageClient";

export async function generateMetadata() {
  return Meta.generate({
    title: work.title,
    description: work.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(work.title)}`,
    path: work.path,
  });
}

export default function Work() {
  // Fetch projects on the server
  const allProjects = getPosts(["src", "app", "work", "projects"]);

  // Sort by date
  const sortedProjects = allProjects.sort((a, b) => {
    return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
  });

  // Group projects by category
  const projectsByCategory: Record<string, typeof sortedProjects> = {};
  sortedProjects.forEach((project) => {
    const category = project.metadata.category || "Other";
    if (!projectsByCategory[category]) {
      projectsByCategory[category] = [];
    }
    projectsByCategory[category].push(project);
  });

  // Define the desired order of sections
  const sectionOrder = [
    "UX Research",
    "Featured Projects",
    "Main Projects",
    "Personal Projects"
  ];

  // Sort sections according to the defined order
  const sections = Object.keys(projectsByCategory).sort((a, b) => {
    const indexA = sectionOrder.indexOf(a);
    const indexB = sectionOrder.indexOf(b);

    // If both are in the order array, sort by their position
    if (indexA !== -1 && indexB !== -1) {
      return indexA - indexB;
    }
    // If only A is in the order array, it comes first
    if (indexA !== -1) return -1;
    // If only B is in the order array, it comes first
    if (indexB !== -1) return 1;
    // If neither is in the order array, maintain alphabetical order
    return a.localeCompare(b);
  });

  // Map projects to a serializable format
  const projectsData = Object.entries(projectsByCategory).reduce((acc, [category, projects]) => {
    acc[category] = projects.map(p => ({
      slug: p.slug,
      metadata: {
        title: p.metadata.title,
        role: p.metadata.role,
        summary: p.metadata.summary,
        images: p.metadata.images,
        techStack: p.metadata.techStack,
        team: p.metadata.team,
        link: p.metadata.link,
      }
    }));
    return acc;
  }, {} as Record<string, any[]>);

  return (
    <Column maxWidth="m">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={work.path}
        title={work.title}
        description={work.description}
        image={`/api/og/generate?title=${encodeURIComponent(work.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <WorkPageClient
        sections={sections}
        projectsByCategory={projectsData}
      />
    </Column>
  );
}
