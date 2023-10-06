import { Text } from '@chakra-ui/react'
import { FlowwiseBlock } from '@typebot.io/schemas'
import { isNotDefined } from '@typebot.io/lib'

type Props = {
  block: FlowwiseBlock
}

export const FlowwiseContent = ({ block }: Props) => {
  console.log("blockccc flowwise content",block);
  const webhook = block?.options?.webhook

  if (isNotDefined(webhook?.body))
    return <Text color="gray.500">Configure Flowwise...</Text>
  return (
    <Text noOfLines={1} pr="6">
      {webhook?.url ? 'Trigger zap' : 'Disabled'}
    </Text>
  )
}
