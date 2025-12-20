"use client";

import { Column, Heading, Row, Text, Media, Tag, SmartLink } from "@once-ui-system/core";
import { MediaSlider } from "@/components/MediaSlider";
import styles from "./work.module.scss";

interface Project {
    metadata: {
        title: string;
        role?: string;
        summary: string;
        images: string[];
        techStack?: string[];
        team?: Array<{ avatar: string }>;
        link?: string;
    };
    slug: string;
}

interface WorkSectionProps {
    title: string;
    projects: Project[];
    isActive: boolean;
}

const WorkSection: React.FC<WorkSectionProps> = ({ title, projects, isActive }) => {
    return (
        <Column
            id={title}
            fillWidth
            marginBottom="40"
        >
            {/* Section Title */}
            <Heading as="h2" variant="display-strong-s" marginBottom="l">
                {title}
            </Heading>

            {/* Projects */}
            <Column fillWidth gap="xl">
                {projects.map((project, index) => (
                    <Column key={`${project.slug}-${index}`} fillWidth gap="m">
                        {/* Large Project Image or Slider */}
                        {project.metadata.images && project.metadata.images.length > 0 && (
                            <div className={styles.projectPreview}>
                                <MediaSlider media={project.metadata.images} aspectRatio="16 / 9" />
                            </div>
                        )}

                        {/* Row 1: Title (Left) + Tech Stack (Right) */}
                        <Row fillWidth horizontal="between" vertical="start" gap="l" s={{ direction: "column" }}>
                            <Heading as="h3" variant="heading-strong-xl">
                                {project.metadata.title}
                            </Heading>

                            {/* Read case study link on the right */}
                            <SmartLink
                                suffixIcon="arrowRight"
                                style={{ margin: "0", width: "fit-content" }}
                                href={project.metadata.link || `/work/${project.slug}`}
                            >
                                <Text variant="body-default-s">Read case study</Text>
                            </SmartLink>
                        </Row>

                        {/* Row 2: Description (Full Width) */}
                        <Text variant="body-default-m" onBackground="neutral-weak">
                            {project.metadata.summary}
                        </Text>

                        {/* Row 3: Tech Stack (Full Width) */}
                        {project.metadata.techStack && project.metadata.techStack.length > 0 && (
                            <Row wrap gap="8">
                                {project.metadata.techStack.map((tech, techIndex) => (
                                    <Tag key={techIndex} size="l" variant="brand">
                                        {tech}
                                    </Tag>
                                ))}
                            </Row>
                        )}
                    </Column>
                ))}
            </Column>
        </Column>
    );
};

export default WorkSection;
