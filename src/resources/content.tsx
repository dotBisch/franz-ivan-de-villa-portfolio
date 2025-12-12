import { About, Gallery, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Franz Ivan",
  lastName: "De Villa",
  name: `Franz Ivan De Villa`,
  role: "Software Developer Intern",
  avatar: "/images/avatar.png",
  email: "franzivan.devilla@gmail.com",
  location: "Asia/Manila", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["English", "Filipino",], // optional: Leave the array empty if you don't want to display languages
};

const newsletter: Newsletter = {
  display: true,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: <>My weekly newsletter about creativity and engineering</>,
};

const social: Social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  // Set essentials: true for links you want to show on the about page
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/dotBisch/",
    essential: true,
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/franz-ivan-de-villa-9928a0289/",
    essential: true,
  },
  {
    name: "Instagram",
    icon: "instagram",
    link: "https://www.instagram.com/f_ivandv/",
    essential: true,
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
];

const about: About = {
  path: "/",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        Franz Ivan R. De Villa is a flexible developer specializing in the logical architecture 
        required to make systems work efficiently. His work spans full-stack development, 
        ranging from optimizing backend data layers and SQL logic to crafting responsive user interfaces with React and TypeScript.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "Rakso Computer Technology, Inc.",
        timeframe: "July 2025 - August 2025",
        role: "Software Developer Intern",
        achievements: [
          <>
            Refactored backend data layer by optimizing SQL query logic and modularizing server-side components, improving system performance, 
            maintainability, and data integrity across lead and client endpoints.
          </>,
          <>
            Built modal-based "Update Lead" workflow using React (TypeScript) and Inertia.js, integrating frontend validation 
            and backend synchronization to streamline data editing and user efficiency.
          </>,
        ],
        images: [
          // optional: leave the array empty if you don't want to display images
        ],
      },
    ],
  },
  studies: {
    display: true, // set to false to hide this section
    title: "Education",
    institutions: [
      {
        name: "Polytechnic University of the Philippines",
        description: <>Bachelor of Science in Computer Science</>,
      },
      {
        name: "Far Eastern University - Cavite",
        description: <>STEM - With High Honors</>,
      },
            {
        name: "Batangas Province Science High School",
        description: <>With High Honors</>,
      },
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Technical skills",
    skills: [
      {
        title: "Languages",
        tags: [
          {
            name: "",
            icon: "c",
          },
          {
            name: "",
            icon: "csharp",
          },
          {
            name: "Java",
            icon: "java",
          },
          {
            name: "Python",
            icon: "python",
          },
          {
            name: "JavaScript (ES6+)",
            icon: "javascript",
          },
          {
            name: "TypeScript",
            icon: "typescript",
          },
          {
            name: "HTML",
            icon: "html",
          },
          {
            name: "CSS",
            icon: "css",
          },
        ],
      },
      {
        title: "Frameworks & Libraries",
        tags: [
          {
            name: "React",
            icon: "react",
          },
          {
            name: "Next.js",
            icon: "nextjs",
          },
          {
            name: "Laravel",
            icon: "laravel",
          },
          {
            name: "Tailwind CSS",
            icon: "tailwind",
          },
        ],
      },
      {
        title: "Databases & BaaS",
        tags: [
          {
            name: "MySQL",
            icon: "mysql",
          },
          {
            name: "Supabase",
            icon: "supabase",
          },
        ],
      },
      {
        title: "Tools & Design",
        tags: [
          {
            name: "Git",
            icon: "git",
          },
          {
            name: "GitHub",
            icon: "github",
          },
          {
            name: "Figma",
            icon: "figma",
          },
          {
            name: "Framer",
            icon: "framer",
          },
          {
            name: "Canva",
            icon: "canva",
          },
        ],
        images: [
          {
            src: "/images/projects/project-01/cover-01.jpg",
            alt: "Project image",
            width: 16,
            height: 9,
          },
          {
            src: "/images/projects/project-01/cover-02.jpg",
            alt: "Project image",
            width: 16,
            height: 9,
          },
        ],
      },
    ],
  },
};

const work: Work = {
  path: "/404",
  label: "Projects",
  title: `Projects – ${person.name}`,
  description: `Design and dev projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery: Gallery = {
  path: "/404",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  // Images by https://lorant.one
  // These are placeholder images, replace with your own
  images: [
    {
      src: "/images/gallery/horizontal-1.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-4.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-3.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-1.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-2.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-2.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-4.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-3.jpg",
      alt: "image",
      orientation: "vertical",
    },
  ],
};

export { person, social, newsletter, about, work, gallery };
