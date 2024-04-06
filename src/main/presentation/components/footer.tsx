// O memo evita que o componente seja renderizado novamente caso não haja mudanças em suas propriedades. Isso é útil para evitar renderizações desnecessárias. Ou caso, haja um componente em tela que faça renderização constante, o memo pode ser utilizado para evitar que ocorra renderizações desnecessárias em componentes  que não precisam renderizar novamente junto a esse que faz re-renderizações
import React, { memo } from 'react'

interface FooterProps extends React.HTMLAttributes<HTMLElement> {}

function Footer(props: FooterProps) {
  return <footer {...props} className="bg-primary h-12" />
}

const MemoFooter = memo(Footer)

export { MemoFooter as Footer }
