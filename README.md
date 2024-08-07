# Rotulus APP

<p align="center">
<img align="center" src="/mobile/src/assets/rotulus-icon.png" alt="Logo"/>
</p>

The Rotulus application aims to help Brazilian consumers better understand the nutritional information of the products they are purchasing, presenting nutritional table data, nutritional information and ingredients and additives that may cause intolerances or allergies to certain users.

## ▶️ Run (using Docker)

With Docker installed you can just build using docker-compose:

```bash
docker-compose --env-file ./backend/.env.development.local build
```

And then up the containers:

```bash
docker-compose --env-file ./backend/.env.development.local up
```

## 🔨 Structure

The app is divided into backend and frontend

### Backend

The backend has the database's structure and a API Rest hat communicates with the database and provides routes to the screens.

To the database was used a SQL structure with PostgreSQL. For the rest api of the backend, the TypeScript language was used with the Node framework and the Prisma tool.

To start de backend in development environment you need install Node and run:
```bash
npm install

npm start
```

### Frontend

The frontend screens were built using the JavaScript language together with the react native framework.

To start de backend in development environment you need install Node and run:
```bash
npm install

npm start
```

## 🧾 Documentation

The documentation was written with Swagger and can be viwed when the app is runing in [{API_URL}/api#/](http://localhost:3000/api#/)

## ✅ Project Status 
- ✅ Requirements Engineering 
- ✅ Models and Diagrams 
- ✅ Database 
- ✅ Backend (REST API) 
- ✅ Frontend (Screens) 
- ✅ MPV (Prototype) 
- ✅ Beta
- 🔧 Deploy 

## 📱 Tecnologies 
| [<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/1200px-Postgresql_elephant.svg.png" alt="PostgreSQL" width="60"> <br> <sub> PostgreeSQL </sub>](https://www.postgresql.org/) | [<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/2048px-Typescript_logo_2020.svg.png" alt="TypeScript" width="60" > <br> <sub> TypeScript </sub>](https://www.typescriptlang.org/) | [<img src="https://media.licdn.com/dms/image/C4D0BAQGsw5k8xdaO_g/company-logo_200_200/0/1673531963909/prisma_io_logo?e=2147483647&v=beta&t=xtoYhrffwsiW4HZuPt6GkTIQvH0bfOs-X-k7HBUT_AQ" alt="Prisma" width="60"> <br> <sub> Prisma </sub>](https://www.prisma.io/) | [<img src="https://miro.medium.com/v2/resize:fit:800/1*v2vdfKqD4MtmTSgNP0o5cg.png" alt="Node" width="60" title="Ferramenta 1"> <br> <sub> Node </sub>](https://nodejs.org/en) | [<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png" alt="JavaScript" width="60"> <br> <sub> JavaScript </sub>](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript) | [<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png" alt="React Native" width="60"> <br> <sub> React Native </sub>](https://reactnative.dev/) |
| :---: | :---: | :---: | :---: | :---: | :---: |

## 📖 Bibliography 

- [PostgeSQL](https://www.postgresql.org/)
- [Node](https://nodejs.org/en)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma](https://www.prisma.io/)
- [React Native](https://reactnative.dev/)
