"use client";

import { useState } from "react";
import { Row, Column } from "@once-ui-system/core";
import WorkTableOfContents from "./WorkTableOfContents";
import WorkSection from "./WorkSection";
import styles from "./work.module.scss";

interface Project {
    slug: string;
    metadata: {
        title: string;
        role?: string;
        summary: string;
        images: string[];
        link?: string;
    };
}

interface WorkPageClientProps {
    sections: string[];
    projectsByCategory: Record<string, Project[]>;
}

const WorkPageClient: React.FC<WorkPageClientProps> = ({
    sections,
    projectsByCategory,
}) => {
    const [activeSection, setActiveSection] = useState(sections[0] || "");

    return (
        <>
            {/* Left Sidebar - Table of Contents */}
            <Column
                left="0"
                style={{ top: "50%", transform: "translateY(-50%)" }}
                position="fixed"
                paddingLeft="24"
                gap="32"
                s={{ hide: true }}
            >
                <WorkTableOfContents
                    sections={sections}
                    activeSection={activeSection}
                    onSectionChange={setActiveSection}
                />
            </Column>

            {/* Main Content - Centered with proper spacing */}
            <Column
                fillWidth
                horizontal="center"
                paddingTop="40"
                paddingBottom="40"
            >
                <Column
                    maxWidth="m"
                    fillWidth
                    paddingX="l"
                    s={{ paddingX: "m" }}
                >
                    {sections.map((section) => (
                        <WorkSection
                            key={section}
                            title={section}
                            projects={projectsByCategory[section]}
                            isActive={activeSection === section}
                        />
                    ))}
                </Column>
            </Column>
        </>
    );
};

export default WorkPageClient;
