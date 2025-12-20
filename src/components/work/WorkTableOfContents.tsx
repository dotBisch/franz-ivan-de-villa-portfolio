"use client";

import React, { useState, useEffect } from "react";
import { Column, Flex, Text } from "@once-ui-system/core";
import styles from "./work.module.scss";

interface WorkTableOfContentsProps {
    sections: string[];
    activeSection: string;
    onSectionChange: (section: string) => void;
}

const WorkTableOfContents: React.FC<WorkTableOfContentsProps> = ({
    sections,
    activeSection,
    onSectionChange,
}) => {
    const [scrollActiveSection, setScrollActiveSection] = useState<string>("");

    useEffect(() => {
        const handleScroll = () => {
            let current = "";
            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    // Check if the section is near the top of the viewport
                    if (rect.top <= 150 && rect.bottom >= 150) {
                        current = section;
                        break;
                    } else if (rect.top < 150) {
                        current = section;
                    }
                }
            }
            setScrollActiveSection(current);
            if (current) {
                onSectionChange(current);
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll(); // Check on mount
        return () => window.removeEventListener("scroll", handleScroll);
    }, [sections, onSectionChange]);

    const scrollTo = (id: string, offset: number) => {
        const element = document.getElementById(id);
        if (element) {
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            });
        }
    };

    return (
        <Column gap="32">
            {sections.map((section, index) => (
                <Flex
                    key={index}
                    cursor="interactive"
                    className={`${styles.hover} ${activeSection === section ? styles.active : ""}`}
                    gap="8"
                    vertical="center"
                    onClick={() => scrollTo(section, 80)}
                >
                    <Flex
                        height="1"
                        minWidth={activeSection === section ? "24" : "16"}
                        background={activeSection === section ? "brand-strong" : "neutral-strong"}
                        style={{ transition: "all 0.3s ease" }}
                    />
                    <Text
                        onBackground="neutral-weak"
                        style={{
                            transition: "all 0.3s ease",
                            color: activeSection === section ? "var(--brand-on-background-weak)" : undefined,
                            whiteSpace: "nowrap",
                        }}
                    >
                        {section}
                    </Text>
                </Flex>
            ))}
        </Column>
    );
};

export default WorkTableOfContents;
