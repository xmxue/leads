"use client";

import { Group, Box } from "@mantine/core";

interface StageIndicatorProps {
  stage: number; // Stage level (1 to 3)
}

export default function StageIndicator({ stage }: StageIndicatorProps) {
  return (
    <Group align="center" gap={3}>
      {[1, 2, 3].map((level) => (
        <Box
          key={level}
          style={(theme) => ({
            width: "5px",
            height: "20px",
            backgroundColor: level <= stage ? theme.colors.blue[6] : theme.colors.gray[5],
            borderRadius: "4px",
          })}
        />
      ))}
    </Group>
  );
}