/**
 * SEO Keywords Configuration
 * 
 * This file contains keyword definitions used throughout the portfolio
 * for consistent SEO optimization across all pages.
 */

export const seoKeywords = {
    // Primary identity keywords
    name: "Franz Ivan De Villa",

    // Professional role keywords
    roles: [
        "Software Developer",
        "Software Developer Intern",
        "Full-Stack Developer",
        "Web Developer",
        "Frontend Developer",
        "Backend Developer",
    ],

    // Technical skills keywords
    technologies: {
        languages: [
            "JavaScript",
            "TypeScript",
            "Python",
            "Java",
            "C",
            "C#",
            "HTML",
            "CSS",
            "SQL",
        ],
        frameworks: [
            "React",
            "Next.js",
            "Laravel",
            "Tailwind CSS",
            "Inertia.js",
        ],
        databases: [
            "MySQL",
            "Supabase",
        ],
        tools: [
            "Git",
            "GitHub",
            "Figma",
            "Framer",
            "Canva",
        ],
    },

    // Location keywords
    location: {
        city: "Manila",
        country: "Philippines",
        region: "Asia",
        timezone: "Asia/Manila",
    },

    // Specialization keywords
    specializations: [
        "Full-Stack Development",
        "Backend Optimization",
        "SQL Query Optimization",
        "Frontend Development",
        "Web Application Development",
        "Responsive Design",
        "Data Layer Architecture",
    ],

    // Industry keywords
    industry: [
        "Software Development",
        "Web Development",
        "Technology",
        "Computer Science",
        "Engineering",
    ],

    // Education keywords
    education: [
        "Computer Science",
        "Polytechnic University of the Philippines",
        "PUP",
        "Bachelor of Science",
    ],

    // Experience keywords
    experience: [
        "Rakso Computer Technology",
        "Software Developer Intern",
        "Backend Development",
        "Frontend Development",
        "React Development",
        "Laravel Development",
    ],
};

/**
 * Generate a keyword string from an array of keywords
 */
export function generateKeywordString(keywords: string[]): string {
    return keywords.join(", ");
}

/**
 * Get all technical keywords as a flat array
 */
export function getAllTechnicalKeywords(): string[] {
    return [
        ...seoKeywords.technologies.languages,
        ...seoKeywords.technologies.frameworks,
        ...seoKeywords.technologies.databases,
        ...seoKeywords.technologies.tools,
    ];
}

/**
 * Get location-based keyword string
 */
export function getLocationKeywords(): string {
    return `${seoKeywords.location.city}, ${seoKeywords.location.country}`;
}

/**
 * Generate a comprehensive meta description
 */
export function generateMetaDescription(options: {
    role?: string;
    technologies?: string[];
    includeLocation?: boolean;
    customText?: string;
}): string {
    const {
        role = seoKeywords.roles[0],
        technologies = [],
        includeLocation = true,
        customText,
    } = options;

    let description = `${seoKeywords.name} - ${role}`;

    if (technologies.length > 0) {
        description += ` specializing in ${technologies.join(", ")}`;
    }

    if (includeLocation) {
        description += `. Based in ${getLocationKeywords()}`;
    }

    if (customText) {
        description += `. ${customText}`;
    }

    return description;
}

/**
 * Example usage:
 * 
 * const metaDescription = generateMetaDescription({
 *   role: "Full-Stack Developer",
 *   technologies: ["React", "TypeScript", "Next.js"],
 *   includeLocation: true,
 *   customText: "Experienced in backend optimization and modern web development"
 * });
 */
