import * as React from 'react'
import {
  Divider,
  HStack,
  Stack,
  Text,
  Link,
  Icon,
  IconButton,
  useBreakpointValue
} from '@chakra-ui/react'
import * as config from 'lib/config'
import { BsArrowLeft } from 'react-icons/bs'
import ThemeSwitcher from 'components/ThemeSwitcher'
import NextLink from 'next/link'
import { FaDiscord, FaYoutube, FaInstagram } from 'react-icons/fa'
const NavLink: React.FC<{ pageId: String }> = ({ pageId }) => {
  return pageId === config.rootNotionPageId ? (
    <Link href={config.mainWeb}>
      <Icon as={BsArrowLeft} /> Kembali ke situs utama
    </Link>
  ) : (
    <NextLink href='/' passHref>
      <Link>
        <Icon as={BsArrowLeft} /> Kembali ke halaman utama
      </Link>
    </NextLink>
  )
}
export const Footer: React.FC<{ pageId: String }> = ({ pageId }) => {
  const buttonSize = useBreakpointValue({ base: 'sm', md: 'xs' })
  return (
    <Stack as='footer' p='4' w='100%' maxW='1100px' fontSize={12}>
      <HStack justifyContent='space-between'>
        <NavLink pageId={pageId} />
        {/* <IconButton
          aria-label='change color mode'
          variant='transparent'
          size='sm'
          onClick={toggleColorMode}
          color='yellow.500'
          icon={colorMode === 'dark' ? <FaMoon /> : <FaSun />}
        /> */}
        <ThemeSwitcher />
      </HStack>
      <Divider />
      <HStack justifyContent='space-between' alignItems='flex-end'>
        <Stack>
          <HStack direction='column' spacing='3'>
            <Link href={config.socialMedia.instagram} isExternal>
              <IconButton
                size={buttonSize}
                aria-label='Instagram'
                icon={<FaInstagram />}
              />
            </Link>
            <Link href={config.socialMedia.discord} isExternal>
              <IconButton
                size={buttonSize}
                aria-label='Discord'
                icon={<FaDiscord />}
              />
            </Link>
            <Link href={config.socialMedia.youtube} isExternal>
              <IconButton
                size={buttonSize}
                aria-label='Youtube'
                icon={<FaYoutube />}
              />
            </Link>
          </HStack>
          <Link href={config.mainWeb} isExternal>
            Edufair Online &#169; 2021
          </Link>
        </Stack>
        <Text>
          Made with ❤️ by{' '}
          <Link href='https://wisesa.dev' isExternal>
            wisesa
          </Link>
        </Text>
      </HStack>
    </Stack>
  )
}
