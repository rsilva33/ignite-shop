import { getCssText } from '@/styles'
import { Html, Head, Main, NextScript } from 'next/document'

// todo elemento dentro desse arquivo sera carregado em toda aplicacao, nao e recomendado que coloque css dentro desse documento
export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
          rel="stylesheet"
        />
        {/* Quando o usuario carregar a pagina, ve qualque que e o codigo necessario para pagina  */}
        <style
          id="stitches"
          dangerouslySetInnerHTML={{ __html: getCssText() }}
        />
      </Head>
      <body>
        {/* serve para indicar para o next em qual lugar do html do documento da aplicacao vao os conteudos das paginas que sao carregadas */}
        <Main />
        {/* Serve para indica em qual local do html nos queremos carregar os scripts js da pagina */}
        <NextScript />
      </body>
    </Html>
  )
}
