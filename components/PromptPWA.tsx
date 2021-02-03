import { useToast, Text, Icon, Box, HStack, Button } from '@chakra-ui/react'
import * as React from 'react'
import { useState, useEffect } from 'react'
import { FaPlusCircle, FaTimes } from 'react-icons/fa'
export const PromptPWA: React.FC<{ delay: number }> = ({ delay }) => {
  const [supportsPWA, setSupportsPWA] = useState(false)
  const [promptInstall, setPromptInstall] = useState(null)
  const toast = useToast()
  useEffect(() => {
    const handler = (e) => {
      e.preventDefault()
      setTimeout(() => setSupportsPWA(true), delay || 3000)
      setPromptInstall(e)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('transitionend', handler)
  }, [delay])

  const handleInstall = (evt) => {
    evt.preventDefault()
    if (!promptInstall) {
      return null
    }
    promptInstall.prompt()
  }
  if (!supportsPWA) {
    return null
  } else {
    toast({
      position: 'bottom-left',
      duration: 10000,
      isClosable: true,
      render: () => (
        <Box color='white' p={3} bg='blue.500' borderRadius={2}>
          <HStack justifyContent='space-between'>
            <Text fontWeight='bold'>Pasang Aplikasi?</Text>
            <Icon as={FaTimes} onClick={() => toast.closeAll()} />
          </HStack>
          <Text>Untuk akses lebih cepat dan dukungan offline.</Text>
          <Box mt='2'>
            <Button
              size='sm'
              mr='2'
              colorScheme='green'
              leftIcon={<FaPlusCircle />}
              onClick={handleInstall}
            >
              Pasang
            </Button>
            <Button
              size='sm'
              variant='outline'
              onClick={() => toast.closeAll()}
            >
              Nanti
            </Button>
          </Box>
        </Box>
      )
    })
  }
  return null
}

export default PromptPWA
