import { Card, Text, Metric, Flex, ProgressBar } from "@tremor/react";

export default function TremorExample({
  title = 'Sales', // Default title
  metric = '$ 71,465', // Default sales value
  target = '$ 225,000', // Default annual target value
  progressPercentage = 32, // Default progress percentage
}) {
  return (
    <Card className="max-w-xs mx-auto">
      <Text>{title}</Text>
      <Metric>{metric}</Metric>
      <Flex className="mt-4 justify-between">
        <Text>{progressPercentage}% of target</Text>
        <Text>{target}</Text>
      </Flex>
      <ProgressBar value={progressPercentage} className="mt-2" />
    </Card>
  );
}
