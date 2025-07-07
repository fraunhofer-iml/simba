<a id="readme-top"></a>
<br />
<div align="center">
<h2 align="center">Shopfloor Financial Management with Blockchain and AI (SiMBA)</h3>
  <p align="center">
    A NestJS-based application.s
    <br />
    <a href="https://github.com/fraunhofer-iml/simba/issues/new?labels=bug&template=bug-report---.md">🐞 Report Bug</a> &middot;
    <a href="https://github.com/fraunhofer-iml/simba/issues/new?labels=enhancement&template=feature-request---.md">💡 Request Feature</a>
  </p>
</div>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">📚 About The Project</a>
      <ul><li><a href="#description">📄 Description</a></li></ul>
      <ul><li><a href="#built-with">🛠️ Built With</a></li></ul>
      <ul><li><a href="#components-overview">🏗️ Components Overview</a></li></ul>
    </li>
    </li>
    <li><a href="#getting-started">🚀 Getting Started</a></li>
    <li>
      <a href="#contributing">🤝 Contributing</a>
      <ul><li><a href="#getting-involved">🌟 Getting Involved</a></li></ul>
    </li>
    <li><a href="#license">📜 License</a></li>
    <li><a href="#contact">📬 Contact</a></li>
    <li><a href="#acknowledgments">🙏 Acknowledgments</a></li>
  </ol>
</details>

## 📚 About The Project <a id="about-the-project"></a>

### 📄 Description <a id="description"></a>

SiMBA brings financial innovation to the entire production process, from order placement to manufacturing to payment. Leveraging a cyber-physical production system, SiMBA enables dynamic, AI-driven pricing that predicts capacity utilisation and automatically sets prices to balance profitability and system efficiency. Once an order is received and produced, invoices are automatically generated and tokenised based on real-time production data. Finally, SiMBA ensures seamless, use-case-agnostic payment processing via direct debit, stable coins or emerging digital currencies such as CBDCs - making every transaction efficient, transparent and future-proof.
You can find detailed [documentation](./documentation) in this repository.

### 🛠️ Built With <a id="built-with"></a>

- [![Angular][angular-shield]][angular-url] Framework for building dynamic web applications
- [![Docker][docker-shield]][docker-url] Platform for containerizing and deploying applications efficiently
- [![ESLint][eslint-shield]][eslint-url] Utility for linting and enforcing code quality in JavaScript and TypeScript
- [![Hyperledger Besu][hyperledgerbesu-shield]][hyperledgerbesu-url] Ethereum client for enterprise blockchain applications, supporting
  permissioned and public networks
- [![Jest][jest-shield]][jest-url] JavaScript testing framework
- [![Keycloak][keycloak-shield]][keycloak-url] Identity and access management solution
- [![MinIO][minio-shield]][minio-url] S3-compatible object storage
- [![NestJS][nestjs-shield]][nestjs-url] Node.js framework for building scalable server-side applications
- [![NFT Folder Blockchain Connector][nftfolderblockchainconnector-shield]][nftfolderblockchainconnector-url] Library for interacting with
  specific smart contracts from the NFT-Folder project
- [![NFT Folder Smart Contracts][nftfoldersmartcontracts-shield]][nftfoldersmartcontracts-url] Smart contracts enabling tokenization,
  structuring, and secure storage of assets as NFTs on the blockchain
- [![Nx][nx-shield]][nx-url] Build system for monorepos
- [![PostgreSQL][postgresql-shield]][postgresql-url] Relational database management system known for reliability and performance
- [![Prettier][prettier-shield]][prettier-url] Code formatter for consistent style
- [![Prisma][prisma-shield]][prisma-url] ORM for database management
- [![RabbitMQ][rabbitmq-shield]][rabbitmq-url] Message broker for distributed systems, supporting AMQP
- [![Swagger][swagger-shield]][swagger-url] Tools for designing and documenting APIs
- [![TypeScript][typescript-shield]][typescript-url] Strongly typed programming language that enhances JavaScript

### 🏗️ Components Overview <a id="components-overview"></a>

The project consists of the following components:

1. **Backend for frontend (`bff`)**

  - Exposes endpoints for the frontend application.
  - Handles all incoming HTTP requests and routes them to the appropriate services via AMQP.
  - Takes care of the preparation of the data for the Angular frontend.

2. **Master Data Service (`master-data-svc`)**

  - Manages all entities such as companies and products.

3. **Process Service (`process-svc`)**

  - Handles background processes and workflows.
  - Manages the lifecycle of orders, from offer to finished production. 
  - Interacts with the database and blockchain to store and retrieve entity data.

4. **Frontend (`frontend`)**

  - Allows users to place orders.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🚀 Getting Started <a id="getting-started"></a>

To set up and run Simba locally, please consult the chapters
[Deployment View](https://github.com/fraunhofer-iml/simba/blob/main/documentation/04-deployment-view.adoc) and
[Tutorial](https://github.com/fraunhofer-iml/simba/blob/main/documentation/05-tutorial.adoc) in our documentation. These two chapters
provide step-by-step instructions to guide you through the process of installing, configuring and running SIMBA on your local machine.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🤝 Contributing <a id="contributing"></a>

### 🌟 Getting Involved <a id="getting-involved"></a>

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are
**greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with
the tag "enhancement".

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/amazing-feature`)
3. Commit your Changes (`git commit -m 'Add some amazing-feature'`)
4. Push to the Branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 📜 License <a id="license"></a>

Licensed under the Apache License 2.0. See `LICENSE` for details.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 📬 Contact <a id="contact"></a>

Leon-Jonathan Krebs: leon.jonathan.krebs@iml.fraunhofer.de

Dominik Sparer: dominik.sparer@iml.fraunhofer.de

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🙏 Acknowledgments <a id="acknowledgments"></a>

- [wait-for-it](https://github.com/vishnubob/wait-for-it) for providing the `wait-for-it.sh` script, which is included unmodified in this
  project under the terms of the [MIT License](https://github.com/vishnubob/wait-for-it/blob/master/LICENSE)
- [Best-README-Template](https://github.com/othneildrew/Best-README-Template) provided inspiration and structure for creating this README
  file
- [Img Shields](https://shields.io) enabled the creation of customizable and visually appealing badges for this project, which is included unmodified in this readme file under the terms of the [CC0 1.0 Universal](https://github.com/badges/shields/blob/master/LICENSE)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[stars-shield]: https://img.shields.io/github/stars/fraunhofer-iml/forest-guard.svg?style=for-the-badge
[stars-url]: https://github.com/fraunhofer-iml/forest-guard/stargazers
[forks-shield]: https://img.shields.io/github/forks/fraunhofer-iml/forest-guard.svg?style=for-the-badge
[forks-url]: https://github.com/fraunhofer-iml/forest-guard/forks
[watchers-shield]: https://img.shields.io/github/watchers/fraunhofer-iml/forest-guard?style=for-the-badge
[watchers-url]: https://github.com/fraunhofer-iml/forest-guard/watchers
[contributors-shield]: https://img.shields.io/github/contributors/fraunhofer-iml/forest-guard.svg?style=for-the-badge
[contributors-url]: https://github.com/fraunhofer-iml/forest-guard/graphs/contributors
[commitactivity-shield]: https://img.shields.io/github/commit-activity/y/fraunhofer-iml/forest-guard?style=for-the-badge
[commitactivity-url]: https://github.com/fraunhofer-iml/forest-guard/graphs/commit-activity
[lastcommit-shield]: https://img.shields.io/github/last-commit/fraunhofer-iml/forest-guard?style=for-the-badge
[lastcommit-url]: https://github.com/fraunhofer-iml/forest-guard/commits/main
[issues-shield]: https://img.shields.io/github/issues/fraunhofer-iml/forest-guard.svg?style=for-the-badge
[issues-url]: https://github.com/fraunhofer-iml/forest-guard/issues
[license-shield]: https://img.shields.io/github/license/fraunhofer-iml/forest-guard.svg?style=for-the-badge
[license-url]: https://github.com/fraunhofer-iml/forest-guard/blob/main/LICENSE
[angular-shield]: https://img.shields.io/badge/Framework-Angular-DD0031?style=flat&logo=angular
[angular-url]: https://angular.io/
[docker-shield]: https://img.shields.io/badge/Platform-Docker-2496ED?style=flat&logo=docker
[docker-url]: https://www.docker.com/
[eslint-shield]: https://img.shields.io/badge/Linting-ESLint-4B32C3?style=flat&logo=eslint
[eslint-url]: https://eslint.org/
[hyperledgerbesu-shield]: https://img.shields.io/badge/Blockchain-Hyperledger%20Besu-F26822?style=flat&logo=ethereum
[hyperledgerbesu-url]: https://besu.hyperledger.org/
[jest-shield]: https://img.shields.io/badge/Testing-Jest-C21325?style=flat&logo=jest
[jest-url]: https://jestjs.io/
[keycloak-shield]: https://img.shields.io/badge/Library-Keycloak-DC382D?style=flat&logo=keycloak
[keycloak-url]: https://www.keycloak.org/
[minio-shield]: https://img.shields.io/badge/Storage-MinIO-FF6F00?style=flat&logo=minio
[minio-url]: https://min.io/
[nestjs-shield]: https://img.shields.io/badge/Framework-NestJS-E0234E?style=flat&logo=nestjs
[nestjs-url]: https://nestjs.com/
[nftfolderblockchainconnector-shield]: https://img.shields.io/badge/Library-Blockchain_Connector-F7931A?style=flat&logo=ethereum
[nftfolderblockchainconnector-url]: https://github.com/fraunhofer-iml/nft-folder-blockchain-connector
[nftfoldersmartcontracts-shield]: https://img.shields.io/badge/Smart_Contracts-Tokenization_Smart_Contracts-F7931A?style=flat&logo=ethereum
[nftfoldersmartcontracts-url]: https://github.com/fraunhofer-iml/nft-folder-smart-contracts
[nx-shield]: https://img.shields.io/badge/Tool-Nx-DD0031?style=flat&logo=nrwl
[nx-url]: https://nx.dev/
[postgresql-shield]: https://img.shields.io/badge/Database-PostgreSQL-336791?style=flat&logo=postgresql
[postgresql-url]: https://www.postgresql.org/
[prettier-shield]: https://img.shields.io/badge/Formatting-Prettier-F7B93E?style=flat&logo=prettier
[prettier-url]: https://prettier.io/
[prisma-shield]: https://img.shields.io/badge/ORM-Prisma-2D3748?style=flat&logo=prisma
[prisma-url]: https://www.prisma.io/
[rabbitmq-shield]: https://img.shields.io/badge/Message_Broker-RabbitMQ-FF6600?style=flat&logo=rabbitmq
[rabbitmq-url]: https://www.rabbitmq.com/
[rxjs-shield]: https://img.shields.io/badge/Library-RxJS-B7178C?style=flat&logo=reactivex
[rxjs-url]: https://rxjs.dev/
[swagger-shield]: https://img.shields.io/badge/API-Swagger-85EA2D?style=flat&logo=swagger
[swagger-url]: https://swagger.io/
[tailwindcss-shield]: https://img.shields.io/badge/CSS_Framework-TailwindCSS-06B6D4?style=flat&logo=tailwindcss
[tailwindcss-url]: https://tailwindcss.com/
[typescript-shield]: https://img.shields.io/badge/Language-TypeScript-007ACC?style=flat&logo=typescript
[typescript-url]: https://www.typescriptlang.org/
