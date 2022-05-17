import { AppProps } from 'next/app'
// import { Box, ChakraProvider } from '@chakra-ui/react'

// import theme from '../theme'
import '../styles/index.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    // <ChakraProvider theme={theme}>
    <Component {...pageProps} />
    // </ChakraProvider>
  )
}
