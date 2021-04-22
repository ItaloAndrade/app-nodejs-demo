# Nodejs ExpressJs MongoDB utilizando  boas práticas de desenvolvimento

[![Author](https://img.shields.io/badge/author-italorio%40gmail.com-blue)](italorio@gmail.com) [![GitHub license](https://img.shields.io/github/license/maitraysuthar/rest-api-nodejs-mongodb.svg)](https://github.com/maitraysuthar/rest-api-nodejs-mongodb/blob/master/LICENSE) ![GitHub repo size](https://img.shields.io/badge/repo%20size-900kb-yellow) [![Codacy Badge](https://api.codacy.com/project/badge/Coverage/b3eb80984adc4671988ffb22d6ad83df)](https://www.codacy.com/manual/maitraysuthar/rest-api-nodejs-mongodb?utm_source=github.com&utm_medium=referral&utm_content=maitraysuthar/rest-api-nodejs-mongodb&utm_campaign=Badge_Coverage) [![Codacy Badge](https://app.codacy.com/project/badge/Grade/905babf1b50c4b7188c875e3d0551990)](https://www.codacy.com/gh/ItaloAndrade/app-nodejs-demo/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=ItaloAndrade/app-nodejs-demo&amp;utm_campaign=Badge_Grade) ![italorio@gmail.com](https://img.shields.io/badge/build-pass-green)

Um exemplo pronto para usar no desenvolvimento de API REST com Node.js, Express e MongoDB

## INICIO

Este é um modelo básico de API escrito em JavaScript ES2015. Ele pode ser utilizado para construir APIs web RESTful para suas plataformas front-end como frameworks Android, iOS ou JavaScript (Angular, Vue, etc).

O projeto será executado utilizando  **NodeJs** e **MongoDB** para armazenamento de dados. O projeto está aberto para sugestões, hospedei o mesmo no heroku  e atualmente uso como base nos  meus projetos pessoais  ..

## FreeLance
Você pode entrar em contato comigo diretamente pelo e-mail: ([italorio@gmail.com](mailto:italorio@gmail.com "italorio@gmail.com")) or you can download my CV from my personal [website](https://italo.andrade.github.io/portfolio/).

## Doação

Se você considera meu projeto como algo útil, pode  valorizar o meu trabalho fazendo uma doação..

<a href="https://www.buymeacoffee.com/italo.andrade" target="_blank"><img src="https://bmc-cdn.nyc3.digitaloceanspaces.com/BMC-button-images/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: auto !important;width: auto !important;" ></a>

## Características

    - Autenticaçã básica (registrar / fazer login com senha em hash)
    - Tokens JWT, faça solicitações com um token após o login com o cabeçalho `Authorization` com o valor` Bearer token` onde `token` será retornado na resposta de Login.
    - Estruturas de resposta predefinidas com códigos de status adequados.
    - CORS incluído.
    - Coleção API incluída para Postman.
 
## Software Necessário

    - Node.js **8+**
    - MongoDB **3.6+** (Recommended **4+**)

## Como instalar

### Recomendo usar o Git (recommended)

1.  Clone o projeto do github. Altere "myproject" para o nome do seu projeto.

```bash
git clone https://github.com/ItaloAndrade/app-nodejs-demo.git ./myproject
```

### Usando o  download manual

1.  Download repository
2.  Descompacte em seu diretorio 

### Instale as dependências do npm após a instalação (Git ou download manual)

```bash
cd myproject
npm install
```

### Configurando ambientes

1.  Você encontrará um arquivo chamado `config.env` no diretório raiz do projeto.
2.  Altere o arquivo com suas configurações secretas.

## Bugs or improvements

Todo projeto precisa de melhorias, sinta-se à vontade para relatar quaisquer bugs ou melhorias. Solicitações pull são sempre bem-vindas..

## License

Este projeto é um software de código aberto licenciado sob a Licença MIT. Veja o arquivo de LICENÇA para mais informações.
