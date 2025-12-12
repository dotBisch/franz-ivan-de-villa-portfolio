"use client";

import React, { useState, useEffect } from "react";
import { Column, Flex, Text } from "@once-ui-system/core";
import styles from "./about.module.scss";

interface TableOfContentsProps {
  structure: {
    title: string;
    display: boolean;
    items: string[];
  }[];
  about: {
    tableOfContent: {
      display: boolean;
      subItems: boolean;
    };
  };
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ structure, about }) => {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = structure
        .filter((section) => section.display)
        .map((section) => section.title);
      
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
             // If we scrolled past it, it might still be the active one if no other is found yet (looping forward)
             // But actually, iterating and finding the last one that is "above" the threshold is better for "current section" logic usually.
             // Let's try a different logic: find the one that is closest to top but not too far down.
             current = section;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, [structure]);

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

  if (!about.tableOfContent.display) return null;

  return (
    <Column
      left="0"
      style={{
        top: "50%",
        transform: "translateY(-50%)",
        whiteSpace: "nowrap",
      }}
      position="fixed"
      paddingLeft="24"
      gap="32"
      m={{ hide: true }}
    >
      {structure
        .filter((section) => section.display)
        .map((section, sectionIndex) => (
          <Column key={sectionIndex} gap="12">
            <Flex
              cursor="interactive"
              className={`${styles.hover} ${activeSection === section.title ? styles.active : ""}`}
              gap="8"
              vertical="center"
              onClick={() => scrollTo(section.title, 80)}
            >
              <Flex
                height="1"
                minWidth={activeSection === section.title ? "24" : "16"}
                background={activeSection === section.title ? "brand-strong" : "neutral-strong"}
                style={{ transition: "all 0.3s ease" }}
              ></Flex>
              <Text
                onBackground={activeSection === section.title ? "brand-strong" : "neutral-weak"}
                style={{
                  transition: "all 0.3s ease",
                }}
              >
                {section.title}
              </Text>
            </Flex>
            {about.tableOfContent.subItems && (
              <>
                {section.items.map((item, itemIndex) => (
                  <Flex
                    l={{ hide: true }}
                    key={itemIndex}
                    style={{ cursor: "pointer" }}
                    className={styles.hover}
                    gap="12"
                    paddingLeft="24"
                    vertical="center"
                    onClick={() => scrollTo(item, 80)}
                  >
                    <Flex height="1" minWidth="8" background="neutral-strong"></Flex>
                    <Text>{item}</Text>
                  </Flex>
                ))}
              </>
            )}
          </Column>
        ))}
    </Column>
  );
};

export default TableOfContents;
