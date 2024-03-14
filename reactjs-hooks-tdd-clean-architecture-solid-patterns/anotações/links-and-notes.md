# Curso ReactJS, Hooks, TDD, Clean Architecture, SOLID e Patterns - Rodrigo manguinho

A uma certa diferença do projeto do professor para esse, basicamente libs, no meu por exemplo estou usando o Vite, para não ter que baixar o create-react-app e o webpack...

Na aula 1 introdução foi ensinando a criar alias para o Git para subir o projeto, facilitando os commits.

Caso o git que você instalou colocou o editor padrão vim ou VI e quer usar o vscode para mudar basta colocar isso em algum terminal(cmd, vscode...) --> git config --global core.editor code --wait, com isso ele vai abrir o vscode para editar o commit.

git config --global --edit --> Basta inserir isso em algum terminal. Com isso, ele abre o arquivo de configuração do git .gitconfig, onde você pode adicionar alias para comandos do git. Lembrando que a flag --global é para alterar do usuário, tem somente do projeto --local e do sistema --system todos os projetos e usuários da maquina.

O professor criou uma pasta git-alias somente para demonstrar os commits usando esses atalhos que ele mesmo criou

[alias(apelido)] --> Atalhos do git


# Isso aqui por padrão envia as tags que você mesmo criou para o seu projeto. git tag "1.0" criamos uma tag para esse projeto, dando git tag conseguimos ver todas as tags criados do projeto, isso é mais para fins de versionamento. No git existe duas tags, a tag normal e a tag anotada --> git tag -a "1.0.1" -m "mensagem 1.0.1". Se dermos um git tag agora iremos ter duas tags. O git so recomenda usar a tag anotada, que pera marcar a release, ou seja, versionamento do projeto e enviar essas tags para o seu servidor, você nunca deve enviar tag normal para o seu servidor, mas caso queira so para fins de estudo, para desenvolvimento, colocando marcadores, por exemplo para marcar o fim de uma etapa  no seu git sem nenhum problema pode usar a tag normal, mas queira marcar uma release de um projeto usa a tag anotada. Com essa config followTags ele so envia para o servidor as tags anotadas, o que é o recomendado, todas as tags normais(suas) ele não envia para o servidor(REMENDADO PELO GIT)
[push]
followTags = true
# Atalhos que são digitados no terminal, ex: git c, em vez de ter que digitar, git add . e depois git commit
[alias]
# A diferença é que o all pega tudo qualquer arquivo modifocado, não importa se você esteja em outra pasta. já o "." pega somente da onde você abriu o terminal
# c = !git add .
c = !git add --all && git commit -m
# -s status reduzidos, caso queira mais detalhes so digitar git status no termianal
s = !git status -s
# o git log é muito confuso, com a flag --oneline é de forma mais resumida, mas o outline resume muita coisa, então nos iremos personalizar o nosso proprio log usando a flag --pretty=format. h minusculo é a hash do commit pequeno, o d é a onde foi feito a branch e a tag, s o texto do commit, cn nome da pessoa que fez o commit, cr a data relativa que foi feito o commit, e a cor %C(red)
l = !git log --pretty=format:'%C(blue)%h%C(red)%d %C(white)%s - %C(cyan)%cn, %C(green)%cr'
# Ele junta um commit novo no commit anterior
amend = !git add --all && git commit --amend --no-edit 
# Esse comando basicamente conta os commits seguindo o padrão conventional commits, que basicamente são tipos de commits, ex: docs: feat: test: fix: --> Com isso ele conta os commits com base do tipo dele, ex: git count test
count = !git shortlog -s --grep

Na aula 2 configurou as dependências e padronizou os commits:

https://www.conventionalcommits.org/en/v1.0.0/ --> Basicamente ele padroniza a maneira de commitar os projetos.

Podemos usar o npm i git-commit-msg-linter (parece com um pre-commit(tipo o husky https://jamiewen00.medium.com/integrate-commitlint-to-your-repository-67d6524d0d24 nesse caso aqui você consegue usar o github desktop)) para facilitar a padronização dos commits. Basicamente ele impede de enviar algum commit sem estar no padrão. Obs: Ao usar o github desktop ele não funciona, da um erro de wsl, somente via CLI que está funcionando. https://github.com/legend80s/git-commit-msg-linter

padrão dos commits, ex: feat: add login button.

Se não fizer isso, dará esse erro:

**\*\***\***\*\*** Mensagem de commit inválida **\*\***\*\***\*\***
mensagem de commit: sdfsdf
Comprimento inválido: Comprimento 6. Mensagem de commit não pode ser maior que 100 caracteres ou menor que 10
formato correto: <type>(scope): <subject>
exemplo: docs: atualiza o README com link para a nova documentação

type:
feat Adição de funcionalidade.
fix Correção de defeito.
docs Mudança em documentação.
style Mudança de formatação ou estilo, que não afeta a execução do código (espaço, tabulação, etc).
refactor Mudança na organização do código, que não afeta o comportamento existente.
test Adição ou mudança de um teste.
chore Adição ou mudança em script de build, que não afeta o código de produção.
perf Mudança de código para melhoria de desempenho.
ci Mudança de configuração de integração contínua.
build Mudança em arquivos de build ou em dependências externas.
temp Commit temporário, que não deve ser incluído no CHANGELOG.

scope:
Opcional, pode ser qualquer coisa que especifique o escopo da mudança.
Exemplos: subpacote, workspace, módulo, componente, página.

subject:
Breve resumo da mudança, escrito no tempo verbal presente. Começa com letra minúscula e não há ponto final.

https://www.youtube.com/watch?v=sStBPj7JJpM --> Essa é a forma que eu crio meus commits (conventional commits) - Rocketseat
O commit tem que ser o mais simples possível.
A mensagem commit você tem que ler da seguinte forma: "Se aplicado, esse commit vai..." e ai mensagem de commit tem que continuar a frase, por isso a mensagem de commit nunca é no passado.

Errado: "added support to spanish on uploads"
Certo: "add support to spanish on uploads"

Na mensagem de commit você não coloca explicação da motivação de estar criando esse commit, a motivação(por que você esta fazendo esse commit) e o que esse commit faz(explicação) vem na descrição pode ser feito em Ingles ou Portuguese.

Depois so abrir uma pr ou dar push direto pra raiz principal

sequencia de commit CLI sem o uso de alias do professor:

. Git add . --> todos os arquivos
. git commit -m "feat: add login button" --> git commit ou git commit -a --> Se você tiver no windows ele vai abrir no editor de texto padrão que você definiu na instalação do git(no meu caso vs code) o arquivo COMMIT_EDITMSG.git, ai você coloca a mensagem de commit, salva e feche o arquivo, apos colocar o que deseja e fechar o arquivo, ele ira fazer o commit automaticamente(https://stackoverflow.com/questions/30149132/multiline-git-commit-message-in-vscode ou https://github.com/stkb/Rewrap/wiki/Settings-VSCode#wrapping-to-rulers).(No video do diego rockeseat ele usa o vim no mac)
. git push origin main --> empurra para o github ou cria uma pr(pull request)

usando o alias:
git c "feat: add login button" 
git push origin main


@typescript-eslint/eslint-plugin@"^6.4.0" from eslint-config-standard-with-typescript@43.0.1 --> Como estou usando o vite ele por padrão usa @typescript-eslint/eslint-plugin, com isso é impossível de usar o eslint-config-standard-with-typescript, somente na sua versão eslint-config-standard-with-typescript@11