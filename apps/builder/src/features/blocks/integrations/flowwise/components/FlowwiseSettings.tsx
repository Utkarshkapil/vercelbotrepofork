import { Alert, AlertIcon,  Stack, Text , Card , CardHeader , Heading , Button , Link   } from '@chakra-ui/react'
// import { ExternalLinkIcon } from '@/components/icons'
import { Webhook, WebhookOptions, FlowwiseBlock } from '@typebot.io/schemas'
// import { VariableSearchInput } from '@/components/inputs/VariableSearchInput'
import React , { useEffect , useState } from 'react'
import { WebhookAdvancedConfigForm } from '../../webhook/components/WebhookAdvancedConfigForm'
import { HttpMethod } from '@typebot.io/schemas/features/blocks/integrations/webhook/enums' 
type Props = {
  block: FlowwiseBlock
  onOptionsChange: (options: WebhookOptions) => void
}

export const FlowwiseSettings = ({
  block: { id: blockId, options },
  onOptionsChange,
}: Props) => {
  const [ chatFlows , setChatFlows ] = useState([]);
  const [ userId , setUserId ] = useState("");
  console.log("options flowwise settings",options);
  const setLocalWebhook = async (newLocalWebhook: Webhook) => {
    if (!options.webhook) return
    onOptionsChange({
      ...options,
      webhook: newLocalWebhook,
    })
    return
  }

  const chooseChatFlow = (id : string ) => {
   console.log("choose chatflow",id);
   const  newWebhookObj = {
    id: "1234",
    queryParams: [],
    headers: [],
    method: HttpMethod.POST,
    url: `http://localhost:8080/api/v1/prediction/${id}`,
    
   }
   setLocalWebhook(newWebhookObj);

  }
  useEffect( () => {
   fetch(`http://localhost:3000/api/auth/session`).then( result => {
    return result.json()
   } ).then( res => {
    console.log("resulttt",res);
    const  userId = res.user.id;
    setUserId(userId);
    // localStorage.setItem("providerAccountId", userId);
    fetch(`http://localhost:8080/api/v1/chatflows/${userId}`).then( result => {
      return result.json()
    } ).then( res => {
      console.log("chatflowss response", res );
      setChatFlows(res);
    } ).catch( err => {
      console.log("error",err);
    } )
   } ).catch( err => {
   console.log("error",err);
   } )
  }, [] )
  const url = options?.webhook?.url
  // const updateSaveVariable = (variable?: Variable) =>
  //   options && onOptionsChange({ ...options, variableId: variable?.id })
  return (
    <Stack spacing={4}>
      <Alert status={url ? 'success' : 'info'} rounded="md">
        <AlertIcon />
        {url ? (
          <Stack  >
          <Text>Your flowwise  is correctly configured 🚀 </Text>
          <Button
              as={Link}
              href={`http://localhost:8080/${userId}`}
              isExternal
              colorScheme="blue"
            >
              <Text mr="2"> Open  Flowwise </Text> 
            </Button>

          </Stack>
        ) : (
          <Stack>
            <Text>Head up to  to configure this block:</Text>
            <Text> Choose from chat flows  </Text>
            { chatFlows.map( (cf : { name : string , id : string  }) => {
              return (
                <Card cursor={"pointer"} key={cf.id} variant={"filled"} onClick={ () => {
                  chooseChatFlow(cf.id);
                } }>
                  <CardHeader>
                
        <Heading size='md'>  { 
         cf?.name 
         } </Heading>
      </CardHeader>
                </Card>
              )
            } ) }

            <Button
              as={Link}
              href={`http://localhost:8080/${userId}`}
              isExternal
              colorScheme="blue"
            >
              <Text mr="2"> Open  Flowwise </Text> 
            </Button>
            {/* <Stack>
        <FormLabel mb="0" htmlFor="variable">
          Save answer in a variable:
        </FormLabel>
        <VariableSearchInput
          initialVariableId={options?.variableId}
          onSelectVariable={updateSaveVariable}
        />
      </Stack> */}
          </Stack>
        )}
      </Alert>
      {options?.webhook && (
        <WebhookAdvancedConfigForm
          blockId={blockId}
          webhook={options.webhook as Webhook}
          options={options}
          onWebhookChange={setLocalWebhook}
          onOptionsChange={onOptionsChange}
        />
      )}
    </Stack>
  )
}
