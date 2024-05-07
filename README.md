# Curso ReactJS, Hooks, TDD, Clean Architecture, SOLID e Patterns - Rodrigo manguinho

### Diferenças do meu projeto para o do professor:

- A uma certa diferença do projeto do professor para esse, basicamente libs, no meu por exemplo estou usando o Vite, para não ter que baixar o create-react-app e o webpack...
- Irei usar o Vite e talvez o Tailwind.css


## Aulas
  ### 1. Introdução
  #### Aula 1
 -  Na aula 1 introdução foi ensinando a criar alias para o Git para subir o projeto, facilitando os commits.

  - Caso o git que você instalou colocou o editor padrão vim ou VI e quer usar o vscode para mudar basta colocar isso em algum terminal(cmd, vscode...): ```git config --global core.editor code --wait```, com isso ele vai abrir o vscode para editar o commit.

  - ```git config --global --edit```: Basta inserir isso em algum terminal. Com isso, ele abre o arquivo de configuração do git *.gitconfig*, onde você pode adicionar alias para comandos do git. Lembrando que a flag ```--global``` é para alterar do usuário, tem somente do projeto ```--local``` e do sistema ```--system``` todos os projetos e usuários da maquina. Ex do *gitconfig em outras maquinas* e arquivo de exemplo do *.gitconfig* na pasta *note*.

  - O professor criou uma pasta ```git-alias``` somente para demonstrar os commits usando esses atalhos que ele mesmo criou dentro do arquivo *.gitconfig* que ele abriu com o comando ```git config --global --edit```.:

    > Alias(apelido): Atalhos do git
      
    ```bash
      [push]
      followTags = true
      [alias]
      c = !git add --all && git commit -m
      s = !git status -s
      l = !git log --pretty=format:'%C(blue)%h%C(red)%d %C(white)%s - %C(cyan)%cn, %C(green)%cr'
      amend = !git add --all && git commit --amend --no-edit
      count = !git shortlog -s --grep
    ```
  #### Aula 2
- Na aula 2 configurou as dependências e padronizou os commits:

- [Conventionalcommits](https://www.conventionalcommits.org/en/v1.0.0/): Basicamente ele padroniza a maneira de commitar os projetos.

- Podemos usar o ```npm i git-commit-msg-linter``` (parece com um pre-commit(tipo o husky: [Integrate-commitlint-to-your-repository](https://jamiewen00.medium.com/integrate-commitlint-to-your-repository-67d6524d0d24) nesse caso aqui você consegue usar o ```github desktop```)) para facilitar a padronização dos commits. Basicamente ele impede de enviar algum commit sem estar no padrão. Obs: Ao usar o github desktop ele não funciona, da um erro de *wsl*, somente via *CLI* que está funcionando: [Error-git-commit-msg-linter](https://github.com/legend80s/git-commit-msg-linter)

- Padrão dos commits, ex: 
  ```bash
  feat: add login button.
  ```

- Se não fizer isso, dará esse erro:

  ```bash
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

  ```

- [Essa é a forma que eu crio meus commits (conventional commits) - Rocketseat](https://www.youtube.com/watch?v=sStBPj7JJpM)

- [git-workflow](https://gist.github.com/vtenq/7a93687108cb876f884c3ce75a8a8023)

- [conventionalcommits](https://www.conventionalcommits.org/en/v1.0.0/#specification)

- [GIT: Mini Curso para Você Sair do Zero! (Aprenda em 45 Minutos)](https://www.youtube.com/watch?v=ts-H3W1uLMM)

- [Boas práticas com GIT (importante se você trabalha com time)](https://www.youtube.com/watch?v=2p45AP5wJdE)
- Como deve ser os commits:

  - O commit tem que ser o mais simples possível.
  - A mensagem commit você tem que ler da seguinte forma: "Se aplicado, esse commit vai..." e ai mensagem de commit tem que continuar a frase, por isso a mensagem de commit nunca é no passado.
    - Errado: "added support to spanish on uploads"
    - Certo: "add support to spanish on uploads"

  - Na mensagem de commit você não coloca explicação da motivação de estar criando esse commit, a motivação(por que você esta fazendo esse commit) e o que esse commit faz(explicação) vem na descrição pode ser feito em Ingles ou Portuguese.

  - Depois so abrir uma pr ou dar push direto pra raiz principal

- sequencia de commit CLI sem o uso de alias do professor:
  ```bash
  # Todos os arquivos
  Git add . 

  # git commit ou git commit -a: Se você tiver no windows ele vai abrir no editor de texto padrão que você definiu na instalação do git(no meu caso vs code) o arquivo COMMIT_EDITMSG.git, ai você coloca a mensagem de commit, salva e feche o arquivo, apos colocar o que deseja e fechar o arquivo, ele ira fazer o [commit automaticamente](https://stackoverflow.com/questions/30149132/multiline-git-commit-message-in-vscode ou https://github.com/stkb/Rewrap/wiki/Settings-VSCode#wrapping-to-rulers).(No video do diego rockeseat ele usa o vim no mac)
  Git commit -m "feat: add login button"

  # git push origin main: empurra para o github ou cria uma pr(pull request)
  Git push origin main
  ```
- Usando os alias:

  ```bash
  Git c "feat: add login button"
  Git push origin main
  ```

- ESLint. O ESLint implementa o processo de Linting, que é responsável por aplicar regras a uma base de código e destacar padrões ou códigos problemáticos, sem a necessidade do código ser executado

- Error: ```@typescript-eslint/eslint-plugin@"^6.4.0" from eslint-config-standard-with-typescript@43.0.1```: Somente na sua versão ```eslint-config-standard-with-typescript@11``` funciona com o Eslint ```@typescript-eslint/parser@7.1.1``` e ```@typescript-eslint/eslint-plugin@7.1.1```:

  ```bash
  npm i eslint-config-standard-with-typescript -D  
  npm ERR! code ERESOLVE
  npm ERR! ERESOLVE unable to resolve dependency tree
  npm ERR!
  npm ERR! While resolving: reactjs-hooks-tdd-clean-architecture-solid-patterns2@0.0.0
  npm ERR! Found: @typescript-eslint/eslint-plugin@7.2.0
  npm ERR! node_modules/@typescript-eslint/eslint-plugin
  npm ERR! dev @typescript-eslint/eslint-plugin@"^7.1.1" from the root project
  npm ERR!
  npm ERR! Could not resolve dependency:
  npm ERR! peer @typescript-eslint/eslint-plugin@"^6.4.0" from eslint-config-standard-with-typescript@43.0.1
  npm ERR! node_modules/eslint-config-standard-with-typescript
  npm ERR! dev eslint-config-standard-with-typescript@"\*" from the root project
  npm ERR!
  npm ERR! Fix the upstream dependency conflict, or retry
  npm ERR! this command with --force or --legacy-peer-deps
  npm ERR! to accept an incorrect (and potentially broken) dependency resolution.
  npm ERR!
  npm ERR!
  npm ERR! For a full report see:
  npm ERR! C:\Users\Pedro\AppData\Local\npm-cache_logs\2024-03-14T14_34_10_878Z-eresolve-report.txt

  npm ERR! A complete log of this run can be found in: C:\Users\Pedro\AppData\Local\npm-cache_logs\2024-03-14T14_34_10_878Z-debug-0.log

  npm ERR! ERESOLVE unable to resolve dependency tree
  npm ERR!
  npm ERR! While resolving: reactjs-hooks-tdd-clean-architecture-solid-patterns2@0.0.0
  npm ERR! Found: @typescript-eslint/parser@7.2.0
  npm ERR! node_modules/@typescript-eslint/parser
  npm ERR! dev @typescript-eslint/parser@"^7.1.1" from the root project
  npm ERR!
  npm ERR! Could not resolve dependency:
  ...
  ```
- Se quiser usar a versão mais atual do standard você tera que que usar a versão 6.4.0 do @typescript-eslint/eslint-plugin e @typescript-eslint/parser, tanto um como o outro tem que estar na mesma versão(de acordo com o momento atual) https://www.npmjs.com/package/eslint-config-standard-with-typescript.

- Mas o problema que o 11 não suporta v3(https://github.com/typescript-eslint/typescript-eslint/issues/2077) do @typescript-eslint/eslint-plugin, @typescript-eslint/parser... dando o erro: error Definition for rule '@typescript-eslint/camelcase' was not found @typescript-eslint/camelcase

- Com isso, configuramos no arquivo .eslintrc.json/ts/js/cjs:"@typescript-eslint/camelcase": "off" para desabilitar o erro.

- Forma antiga V4 [Migrate from v4](https://typicode.github.io/husky/migrate-from-v4.html)
  - ```npm i lint-staged husky -D```: Impede que façamos commits defeituosos em relação codigo

  - o arquivo junto com a *lib lint-staged .lintstagedrc.json* ela pega todos os arquivos que esteja prontos para entrar no proximo commit, ou seja, arquivos modificados, em cima desses arquivos queremos aplicar alguns scripts antes de fazer o commit, ex: eslint, prettier, testes, etc...
    ``` bash
    {
      "\*.{js,jsx,ts,tsx}": [
        "eslint --fix",
        "prettier --write",
        "git add"
      ]
    }
    ```
    ```bash
    {
        "*/**/*.{ts,tsx}": [
            "eslint --fix",
            "eslint"
        ]
    }
    ```
  - Basicamente o eslint tenta corrigir os arquivos antes de enviar .huskyrc.json
    ```bash
    {
      "hooks": {
        "pre-commit": "lint-staged"
      }
    }
    ```
  - E agora vem o husky, precisamos colocar isso junto com o husky

  - Nele vamos definir hooks para o git, como o pre-commit, basicamente passamos um script para rodar no pre-commit, o lint-staged, toda vez que formos fazer um commit, o husky dispara esse pre-commit, antes do pre-commit rodar, ele executa o comando lint-staged, que nada mais é que o arquivo .lintstagedrc.json

- Nova forma V9 do Husky[Introduction](https://typicode.github.io/husky/) e [Migrate from v4](https://typicode.github.io/husky/migrate-from-v4.html)
    ```bash
      #Instala
      npm i husky -D

      #Init
      npx husky init

      #Script criado no package.json:
      {
        "scripts": {
          "prepare": "husky"
          },
      }
          
      #Apos isso, ele cria uma pasta .husky e cria um script de setup(Prepare), basta você dar uma vez esse comando. Lembrando que o .git tem que estar na raiz do projeto, se não tiver ele não vai funcionar.
      npm run prepare

      #Apos dar esse comendo, ele cria um monte de arquivo na pasta, mas o mais importe o que esta na raiz dela, o .husky/pre-commit, que é o script que ele vai rodar antes de fazer o commit: Agora é so colocar o que ele deve executar antes de fazer o commit, no caso o lint-staged ou um comando direto do package.json, ex: npm lint. Pode colocar o prefixo run antes ou nem coloque:
      
      #Ex: nesse caso ele rodaria os testes antes de enviar
      npm test

      #Ex: nesse caso ele rodaria o lint-staged antes de enviar. Nesse caso você cria um arquivo .lintstagedrc.json na raiz do projeto, e coloca os comandos. Se não você coloca diretamente no package.json
      npx lint-staged

      # No package.json:
      "lint-staged": {
        "*/**/*.{ts,tsx}": [
            "eslint --fix",
            "eslint"
        ]
      }

      # No arquivo separado .lintstagedrc.json:
      {
        "*/**/*.{ts,tsx}": [
            "eslint --fix",
            "eslint"
        ]
      }

      # Caso você queira pode colocar o comando direto no pre-commit  do husky:
      npm run lint ou npm lint
      npm run lint:fix ou npm lint:fix
      npm run test ou npm test
  ```
  - Tenha em mente que a pasta *.git* esteja a onde você quer usar o husky, pois ele cria uma pasta .git/hooks, que é onde ele vai colocar os hooks, se não tiver a pasta .git, ele não vai funcionar. Por exemplo se no repositório você criou umas subs pastas para fazer front e a api, dentro do front e api não vai possui a pasta .git, porque o .git fica na raiz de tudo, ou seja, na pasta do projeto do repositório, antes de entrar nas subs pastas que você criou. Para ver ela basta abrir o projeto no windows explorer e habilitar a opção de mostrar pastas ocultas. Se não tiver ele vai dar esse erro quando tentar dar um npm run prepare:
    ```bash
    npm run prepare           

    > reactjs-hooks-tdd-clean-architecture-solid-patterns2@0.0.0 prepare
    > husky

    .git can't be found
    ```
  - Links de ajuda para instalar o Husky(Algumas coisas estão desatualizadas, mas ajudaram a tomar um norte):
     - [Husky e lint-staged para pré-commit em React](https://dev.to/griseduardo/husky-e-lint-staged-para-pre-commit-em-react-2l26)
     - [Lint-staged + Husky](https://valchan.com.br/lint-staged-husky/)
     - [Setting up a ESLint, Prettier, Husky and lint-staged Integration with TypeScript in Next.js 13 | 14](https://medium.com/yavar/setting-up-a-eslint-prettier-husky-and-lint-staged-integration-with-typescript-in-next-js-13-14-68044dfae920)
     - [O que mudou no script](https://github.com/typicode/husky/releases/tag/v9.0.1)
  
  - Por fim o Husky agora funciona no projeto, mas o eslint que o professor configurou esta todo desatualizando:
    ```bash
        module.exports = {
        root: true,
        env: { browser: true, es2020: true },
        // Extends: Realiza o extend da biblioteca ESLint, que implanta a análise do style guidesJS Standard Style, definido a estrutura que deve ser utilizada como default;
        extends: [
          // Inseridos por mim
          // Estende o style guide do eslint com as regras do standard
          'standard-with-typescript',

          // Ja veio com vite
          'eslint:recommended',
          // O plugin: --> Nada mais é que a lib @typescript-eslint/eslint-plugin
          'plugin:@typescript-eslint/recommended',
          'plugin:react-hooks/recommended',
        ],
        ignorePatterns: ['dist', '.eslintrc.cjs', '*.config.*'],

        // Inserido por mim
        parserOptions: {
          // Define o parser que será utilizado para analisar o código
          parser: '@typescript-eslint/parser',
          // Define o arquivo de configuração do typescript para ser usado pelo ESLint
          project: `${__dirname}/tsconfig.json`
        },

        // Do vite
        // parser: '@typescript-eslint/parser',

        plugins: ['react-refresh'],
        rules: {
          'react-refresh/only-export-components': [
            'warn',
            { allowConstantExport: true },
          ],
          
          // Inserido por mim
          // desabilita a config do eslint onde ele dita que so pode usar ou interface ou type
          "@typescript-eslint/consistent-type-definitions": "off",
          // ele não deixa fazer comparação que não seja booleana
          "@typescript-eslint/strict-boolean-expressions": "off",
          // error Definition for rule '@typescript-eslint/camelcase' was not found @typescript-eslint/camelcase
          "@typescript-eslint/camelcase": "off",
        },
      }
    ```
  - Vou usar um pacote meu para configurar o eslint: ```npm i @pedrohvfernandes/eslint-config``` e dar uninstall:
    ```bash
      npm uninstall eslint-config-standard-with-typescript eslint-plugin-import eslint-plugin-node eslint-plugin-promise eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-refresh eslint-plugin-standard @typescript-eslint/eslint-plugin @typescript-eslint/parser
    ```
  - Por fim pro arquivo do eslint eu mudou o tipo do arquivo dele para .json e estendo minha config do React

- E por fim jest que tive que colocar .cjs, em ts estava dando esse erro ao tentar rodar os testes:
  ```bash

      Error: Jest: Failed to parse the TypeScript config file C:\Users\Pedro\OneDrive\Documentos\GitHub\tdd-clean-architecture-solid\reactjs-hooks-tdd-clean-architecture-solid-patterns\jest.config.ts
        Error: Jest: 'ts-node' is required for the TypeScript configuration files. Make sure it is installed      
      Error: Cannot find package 'ts-node' imported from C:\Users\Pedro\OneDrive\Documentos\GitHub\tdd-clean-architecture-solid\reactjs-hooks-tdd-clean-architecture-solid-patterns\node_modules\jest-config\build\readConfigFileAndSetRootDir.js
      ...
  ```
- Em js
  ```bash
  Error: Jest: Failed to parse the TypeScript config file C:\Users\Pedro\OneDrive\Documentos\GitHub\tdd-clean-architecture-solid\reactjs-hooks-tdd-clean-architecture-solid-patterns\jest.config.ts
    Error: Jest: 'ts-node' is required for the TypeScript configuration files. Make sure it is installed
  Error: Cannot find package 'ts-node' imported from C:\Users\Pedro\OneDrive\Documentos\GitHub\tdd-clean-architecture-solid\reactjs-hooks-tdd-clean-architecture-solid-patterns\node_modules\jest-config\build\readConfigFileAndSetRootDir.js
      at readConfigFileAndSetRootDir (C:\Users\Pedro\OneDrive\Documentos\GitHub\tdd-clean-architecture-solid\reactjs-hooks-tdd-clean-architecture-solid-patterns\node_modules\jest-config\build\readConfigFileAndSetRootDir.js:116:13)
      at async readInitialOptions (C:\Users\Pedro\OneDrive\Documentos\GitHub\tdd-clean-architecture-solid\reactjs-hooks-tdd-clean-architecture-solid-patterns\node_modules\jest-config\build\index.js:403:13)
      ...
  ```
  ### 2. Login - Domain e Data Layer

  #### Aula 1
- Programação
- Scripts de teste: 
  ```bash
    # Teste base
    # --passWithNoTests: Passa se não tiver testes, caso mexemos em um arquivo que não tem teste, ele vai passar
      "test": "jest --passWithNoTests",
      
    # Todos esses testes vão herdar do base

    # Com -- ele herda o que tem no outro e roda o que tem em seguida no caso o --watch
      "test:watch": "npm test -- --watch",

    # Ele procura dentro de arquivos pro proximo commit testes relacionados a esses arquivos, e so vai rodar esses testes desses arquivos que estão indo para o proximo commit, para prevenir de rodar todos os testes do sistema
      "test:staged": "npm test -- --findRelatedTests",

    # Coverage para obter cobertura de teste, rodamos antes de fazer um push para o github
      "test:ci": "npm test -- --coverage",
  ```
- No meu *.lintstagedrc.json* eu coloquei o comando do jest para rodar os testes antes de fazer o commit de arquivos alterados(Somente deles):
  ```bash
    {
      "*/**/*.{ts,tsx}": [
          "eslint src/**/*.{ts,tsx} --fix",
          "npm run test:staged"
      ]
    }
  ```
- Na pasta *.husky* colocamos o arquivo de hook de pre push que roda o script ```npm run test:ci``` antes de fazer o push para o github, que vai gerar a cobertura de testes. Apos colocar isso, não sera possível enviar o push via github desktop, ele da erro de WSL
  ```bash
    <3>WSL (30) ERROR: CreateProcessParseCommon:708: Failed to translate C:\Users\Pedro\OneDrive\Documentos\GitHub\tdd-clean-architecture-solid
    <3>WSL (30) ERROR: CreateProcessParseCommon:754: getpwuid(0) failed 2
    <3>WSL (30) ERROR: UtilTranslatePathList:2866: Failed to translate C:\Users\Pedro\AppData\Local\GitHubDesktop\app-3.3.12\resources\app\git\mingw64\libexec\git-core
    <3>WSL (30) ERROR: UtilTranslatePathList:2866: Failed to translate C:\Users\Pedro\AppData\Local\GitHubDesktop\app-3.3.12\resources\app\git\mingw64\bin
    <3>WSL (30) ERROR: UtilTranslatePathList:2866: Failed to translate C:\Users\Pedro\AppData\Local\GitHubDesktop\app-3.3.12\resources\app\git\usr\bin
    <3>WSL (30) ERROR: UtilTranslatePathList:2866: Failed to translate C:\Users\Pedro\bin
    <3>WSL (30) ERROR: UtilTranslatePathList:2866: Failed to translate C:\Users\Pedro\AppData\Local\GitHubDesktop\app-3.3.12\resources\app\git\mingw64\bin
    <3>WSL (30) ERROR: UtilTranslatePathList:2866: Failed to translate C:\Users\Pedro\AppData\Local\GitHubDesktop\app-3.3.12\resources\app\git\mingw64\usr\bin
    <3>WSL (30) ERROR: UtilTranslatePathList:2866: Failed to translate C:\Python312\Scripts
    <3>WSL (30) ERROR: UtilTranslatePathList:2866: Failed to translate C:\Python312
    <3>WSL (30) ERROR: UtilTranslatePathList:2866: Failed to translate C:\WINDOWS\system32
    <3>WSL (30) ERROR: UtilTranslatePathList:2866: Failed to translate C:\WINDOWS
    <3>WSL (30) ERROR: UtilTranslatePathList:2866: Failed to translate C:\WINDOWS\System32\Wbem
    <3>WSL (30) ERROR: UtilTranslatePathList:2866: Failed to translate C:\WINDOWS\System32\WindowsPowerShell\v1.0
    <3>WSL (30) ERROR: UtilTranslatePathList:2866: Failed to translate C:\WINDOWS\System32\OpenSSH
    <3>WSL (30) ERROR: UtilTranslatePathList:2866: Failed to translate C:\Program Files (x86)\NVIDIA Corporation\PhysX\Common
    <3>WSL (30) ERROR: UtilTranslatePathList:2866: Failed to translate C:\Program Files\NVIDIA Corporation\NVIDIA NvDLISR
    <3>WSL (30) ERROR: UtilTranslatePathList:2866: Failed to translate C:\ProgramData\chocolatey\bin
    <3>WSL (30) ERROR: UtilTranslatePathList:2866: Failed to translate C:\Users\Pedro\AppData\Roaming\nvm
    <3>WSL (30) ERROR: UtilTranslatePathList:2866: Failed to translate C:\Program Files\nodejs
    <3>WSL (30) ERROR: UtilTranslatePathList:2866: Failed to translate C:\Program Files\nodejs
    <3>WSL (30) ERROR: UtilTranslatePathList:2866: Failed to translate C:\Program Files\Docker\Docker\resources\bin
    <3>WSL (30) ERROR: UtilTranslatePathList:2866: Failed to translate C:\Program Files\Git\cmd
    <3>WSL (30) ERROR: UtilTranslatePathList:2866: Failed to translate C:\Program Files\Cloudflare\Cloudflare WARP
    <3>WSL (30) ERROR: UtilTranslatePathList:2866: Failed to translate C:\Users\Pedro\.console-ninja\.bin
    <3>WSL (30) ERROR: UtilTranslatePathList:2866: Failed to translate C:\Users\Pedro\AppData\Local\Microsoft\WindowsApps
    <3>WSL (30) ERROR: UtilTranslatePathList:2866: Failed to translate C:\Users\Pedro\AppData\Local\Programs\Microsoft VS Code\bin
    <3>WSL (30) ERROR: UtilTranslatePathList:2866: Failed to translate C:\Users\Pedro\AppData\Local\GitHubDesktop\bin
    <3>WSL (30) ERROR: UtilTranslatePathList:2866: Failed to translate C:\Users\Pedro\AppData\Roaming\nvm
    <3>WSL (30) ERROR: UtilTranslatePathList:2866: Failed to translate C:\Program Files\nodejs
    <3>WSL (30) ERROR: UtilTranslatePathList:2866: Failed to translate C:\Users\Pedro\AppData\Roaming\npm
    <3>WSL (30) ERROR: CreateProcessEntryCommon:331: getpwuid(0) failed 2
    <3>WSL (30) ERROR: CreateProcessEntryCommon:502: execvpe /bin/bash failed 2
    <3>WSL (30) ERROR: CreateProcessEntryCommon:505: Create process not expected to return
    husky - pre-push script failed (code 1)
    error: failed to push some refs to 'https://github.com/PedrohvFernandes/tdd-clean-architecture-solid.git'
  ```
  #### Aula 2

  - Instalando a lib faker, para mocar os dados/valores na parte de teste ```npm install --save-dev @faker-js/faker``` O ```npm i -D faker @types/faker``` foi descontinuado
  - Devemos fazer as refatorações necessárias/identificado quando o teste esta no verde, antes de começar de escrever o proximo teste
  
  #### Aula 3
  - Modularização dos paths em *tsconfig.json*
  - Agora para o Jest como fazer para resolver esses path, porque foi dito so para o TS
  - [Enum](https://awari.com.br/javascript-enum-implementando-enums-em-javascript/#:~:text=Enums%20em%20JavaScript%20são%20uma,um%20conjunto%20de%20valores%20nomeados.)
  - ``` jest --clearCache``` ou ```npm run test:clear``` limpa o cache do jest, caso esteja dando erro de importação de arquivos...
  - Testes de falha(Caminho triste)

  #### Aula 4
  - Últimos testes para o componente RemoteAuthentication
  - Testes de sucesso(Caminho feliz)

  ### 3. Infra Layer - Implementando o HttpPostClient
  #### Aula 1  Criando o AxiosHttpClient e testando sua integração com a biblioteca axios
  - Usando o axios para fazer as requisições http

  #### Aula 2  Refatorando o AxiosHttpClient
  - Criando os mocks separados

  ### 4. Login - Presentation Layer
  #### Aula 1. Configurando o React
  - Configurando o React com o Vite. Questões de build, bundler e webpack o vite ja configura por si só, não precisamos nos preocupar com isso.
  - Em *Jest.config.cjs* colocamos o ```testEnvironment: 'node'``` para ```testEnvironment: 'jsdom'``` porque vamos começar a fazer testes que precisa acessar o DOM
  - Transform ts e tsx
  ``` 
    transform: {
      '.+\\.(ts|tsx)$': 'ts-jest'
    },
  ```
  - Em eslint
  ```
  {
    // Para resolver um warn do eslint
    "settings":{
      "react":{
        "version":"detect"
      }
    }
    // Evitar alguns erros do eslint
    "extends": [
      "plugin:react/recommended",
    ],
  	"rules": {
      "react/jsx-uses-react": "off",
      "react/jsx-uses-vars": "off"
    }
  }
  ```
  #### Aula 3. Configurando o Webpack
  - Usei o vite em vez do webpack, [comparison-vite-webpack-frontend](https://www.linkedin.com/pulse/comparison-vite-webpack-frontend-development-fatemeh-mahmoudi-4cmtc/)
  - Usei o Tailwindcss em vez Sass
  - Para que o webpack ? [Aprenda A Otimizar Seu Frontend Com Webpack](https://awari.com.br/aprenda-a-otimizar-seu-frontend-com-webpack/#:~:text=Webpack%20é%20uma%20ferramenta%20de,e%20a%20eficiência%20dos%20aplicativos.)
  - [Como configurar e fazer o deploy da sua aplicação React do zero usando o Webpack e o Babel](https://www.freecodecamp.org/portuguese/news/como-configurar-e-fazer-o-deploy-da-sua-aplicacao-react-do-zero-usando-o-webpack-e-o-babel/#:~:text=A%20função%20principal%20do%20Webpack,seja%20rápido%20de%20ser%20servido.)
  - [oque-e-o-babel-e-como-integrar-ele-na-sua-aplicacao-js](https://www.dio.me/articles/oque-e-o-babel-e-como-integrar-ele-na-sua-aplicacao-js)
  - [Usando o suporte do babel para o Typescript, você consegue trabalhar com pipelines de build existentes e tem mais chances de gerar JS mais rápido porque o Babel não faz checagem de tipo no seu código.](https://www.typescriptlang.org/pt/docs/handbook/babel-with-typescript.html#:~:text=Usando%20o%20suporte%20do%20babel,de%20tipo%20no%20seu%20código.)
  - [O'Que é o Babel e como integrar ele na sua aplicação JS](https://www.linkedin.com/pulse/oque-é-o-babel-e-como-integrar-ele-na-sua-aplicação-js-júnior/?originalSubdomain=pt)
  - [Vite vs webpack](https://kinsta.com/pt/blog/vite-vs-webpack/)
  - [Como substituir webpack & babel por Vite(bundler + compiler(tendo swc como opção)) em um projeto React Typescript legado](https://dev.to/richardbray/how-to-replace-webpack-babel-with-vite-on-a-legacy-react-typescript-project-3ofg)
  - [Por que você deve usar swc ? Alternativa de Babel (escrita em Rust) SWC](https://blog.logrocket.com/why-you-should-use-swc/)
  - Caso de esse erro no jest:
  ```bash
  
    ✖ npm run test:staged:
    ● Validation Error:

      Test environment jest-environment-jsdom cannot be found. Make sure the testEnvironment configuration option points to an existing node module.

      Configuration Documentation:
      https://jestjs.io/docs/configuration


    As of Jest 28 "jest-environment-jsdom" is no longer shipped by default, make sure to install it separately.
  ```
  De um ```npm i jest-environment-jsdom -D``` para resolver o problema [Error Test environment jest-environment-jsdom cannot be found](https://stackoverflow.com/questions/72013449/upgrading-jest-to-v29-error-test-environment-jest-environment-jsdom-cannot-be)
  - O Husky depois da v5 gera conflitos com o pacote git-commit-msg-linter, para resolver basta criar um arquivo dentro do husky *commit-msg* e colocar o seguinte comando:
  ```bash
  .git/hooks/commit-msg \$1
  ```
  Mais detalhes em: [The package is not working with husky v5](https://github.com/legend80s/git-commit-msg-linter/issues/7)

  #### 4. Criando o layout da tela do Login
  - [CONVERT YOUR IMAGES TO BASE64](https://www.base64-image.de)
  - [Loaders em Css](https://loading.io/css/)

  #### 5. Refatorando layout do Login em componentes

  #### 6. Definindo um Router para o sistema
  
  #### 7. Testando o estado inicial do Login 12
  - ```npm i -D @testing-library/react```

  #### 8. Testando o estado inicial do Login 22

  #### 9. Testando a integração com o Validation

  #### 10. Mostrando status de erro ou sucesso baseado na resposta do Validation

  #### 11. Testando a integração com o Auhentication

  #### 12. Refatorando os testes do Login

  #### 13. Testando caso de sucesso e erro
    - ```npm i -D jest-localstorage-mock``` Biblioteca para mockar o localstorage
  
  #### 14. Testando a navegação entre componentes

  #### 15. Refatorando os testes

  ### 5. Validation Layer

  #### 1. Criando o RequiredFieldValidation

  #### 2. Criando o EmailValidation

  #### 3. Criando o MinLengthValidation

  #### 4. Aplicando o Design Pattern Composite

  #### 5. Aplicando o Design Pattern Builder

  ### 6. Login - Main Layer
  
  #### 1. Fazendo a composição do Login

  #### 2. Refatorando os Factories

  #### 3. Ajustando o AxiosHttpClient

  #### 4. Criando últimos testes para bater coverage 100%

  #### 5. Criando variável de ambiente e subindo versão
     - Precisei instalar o ```ts-jest-mock-import-meta``` para resolver o erro de import.meta, que não é suportado pelo jest, ja que o vite usa o import.meta para pegar as variáveis de ambiente. E depois no arquivo de configuração do jest, no *jest.config.js* eu coloquei o plugin para resolver o problema:
     ```bash
      {
        ## [...]
        transform: {
          '^.+\\.tsx?$': [
            'ts-jest',
            {
              diagnostics: {
                ignoreCodes: [1343]
              },
              astTransformers: {
                before: [
                  {
                    path: 'node_modules/ts-jest-mock-import-meta',  // or, alternatively, 'ts-jest-mock-import-meta' directly, without node_modules.
                    options: { metaObjectReplacement: { url: 'https://www.url.com' } }
                  }
                ]
              }
            }
          ]
        }
      }
     ```
    Solução encontrada em: [error TS1343: The 'import.meta' meta-property is only allowed when the '--module' option is 'es2020', 'es2022', 'esnext', 'system', 'node16', or 'nodenext'.](https://github.com/kulshekhar/ts-jest/issues/3888)

  ### 7. Continuous Integration

  #### 1. Integrando o projeto com TravisCI e Coveralls
    - Nessa aula iremos realizar a integração do projeto com o TravisCI e Coveralls, para que possamos ter um ambiente de integração contínua(continuos integration - CI) e monitoramento de cobertura de testes.
    - Criamos uma segunda branch chamada *feat/ci* 
    - Antes de fazer o CI/CD usamos a ferramenta de check, para ver se os pacotes instalados estão atualizados. Instalamos globalmente ```npm i -g npm-check``` e rodamos o comando ```npm-check``` no terminal do projeto para verificar todos os pacotes do projeto. Podemos rodar o comando ```npm-check -u -s``` para atualizar todos os pacotes do projeto. O -S faz um skip em todos os pacotes que ele diz que não estamos utilizando, como por exemplo o tailwindcss, os types... que nunca importamos diretamente em nosso projeto, e o -U da a opção de atualizar todos os pacotes, para selecionar o pacote que deseja atualizar basta apertar a barra de espaço e depois enter.
    - Criamos um script para facilitar no check:
    ```bash
    "check": "npm-check -u -s"
    ```
    - [TravisCi](travis-ci.org) - O Travis ira rodar alguns scripts quando dermos um build no projeto, como por exemplo, rodar os testes, verificar se o código esta correto, se esta passando nos testes
      - Arquivo de configuração na raiz do projeto *travis.yml*
      - No site do travis permitimos o acesso dele nos repositórios do github ou somente em um repositório especifico ou específicos
        - [TravisCi](https://app.travis-ci.com/account/repositories)
          - Nesse link você pode ver todos os repositórios que ele tem acesso
          - Após isso é só dar um push
          - [Deployment Fails with node 20](https://travis-ci.community/t/deployment-fails-with-node-20/14215/1)
          - [Deployment to npm fails with node 20](https://travis-ci.community/t/deployment-to-npm-fails-with-node-20/14023/2)


  ## Tecnologias:
  - Vite
  - React
  - Typescript
  - Jest
  - Eslint
  - Husky
  - Lint-staged
  - Git-commit-msg-linter
  - Conventionalcommits
  - Clean Architecture
  - Solid
  - Faker
  - Axios
  - Tailwindscss

  ## Comandos:
  ```bash
      # Inicia o projeto
      dev: vite

      # Builda usando a ferramenta vite build e tsc
      build: tsc && vite build

      # Linta o projeto
      lint: eslint . --ext ts, tsx --report-unused-disable-directives --max-warnings 0
      lint:fix: eslint src/**/*.{ts,tsx} --fix

      preview: vite preview

      # Testa tudo que for testável
      test: jest

      #Do husky
      prepare: husky
  ```

  ## Ordem de execução:
  ```bash
      # Instalar dependências
      npm i

      # Pre commits
      npm run prepare

      # Inicia o projeto
      npm run dev

      # Testar o projeto
      npm run test

      # Verificar se os arquivos estão em ordem
      npm run lint
      npm run lint:fix
  ```
