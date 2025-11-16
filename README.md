# Progetto IUM-TWEB - GoalNet360 - Piattaforma di Analisi Dati Calcistici

Piattaforma web full-stack per l'analisi e visualizzazione di dati calcistici con architettura multi-server e sistema di filtri progressivi.

## Descrizione

GoalNet360 implementa un'architettura distribuita con tre server specializzati per gestire dati statici e dinamici di un dataset calcistico. Il sistema utilizza filtri progressivi per un'esplorazione intuitiva di partite, giocatori, club e competizioni.

## Architettura

### Main Server (Express - localhost:3000)
- Server principale con client integrato
- Gestione filtri progressivi e routing
- Chat real-time con Socket.io
- Sistema di login e autenticazione

### MongoDB Server (Express - localhost:3001)
- Gestione dati dinamici (Games, ClubGames, Appearances, GameLineups, GameEvents)
- Architettura modulare con routes prefissate `/mongo`
- Controller dedicati per ogni entità

### Java Server (Spring Boot - localhost:8080)
- Gestione dati statici (Competitions, Clubs, Players, PlayerValuations)
- Database PostgreSQL
- DTO per ottimizzazione trasmissione dati
- Routes prefissate `/postgres`
- Configurazione CORS per localhost:3000

## Installazione

### Prerequisiti
- Node.js
- MongoDB
- PostgreSQL
- Java (JDK)

## Stack Tecnologico

- **Frontend**: HTML, CSS, JavaScript, Bootstrap 5.3.1
- **Backend**: Express.js, Spring Boot
- **Database**: MongoDB, PostgreSQL
- **Real-time**: Socket.io
- **Data Processing**: Jupyter Notebook
- **API Doc**: Swagger

## Gestione Database

I dati sono inseriti tramite Jupyter Notebook con approccio automatizzato:
- **MongoDB**: dati dinamici (partite, eventi)
- **PostgreSQL**: dati statici (competizioni, club, giocatori)

## Note
Progetto svolto per il corso di Interazione Uomo Macchina e Tecnologie Web
