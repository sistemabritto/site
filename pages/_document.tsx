import { Html, Head, Main, NextScript } from 'next/document';

/**
 * Existe por um motivo só, e é suficiente: o `lang` do <html>.
 *
 * Sem `_document.tsx` o Next serve `<html>` sem idioma. O Lighthouse marca
 * como falha de acessibilidade (leitor de tela não sabe em que língua ler), e
 * o buscador perde o sinal mais direto de que o conteúdo é em português.
 *
 * `dir="ltr"` vai junto porque é gratuito e evita heurística do navegador.
 */
export default function Document() {
  return (
    <Html lang="pt-BR" dir="ltr">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
