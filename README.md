<img alt="GoStack" src="https://storage.googleapis.com/golden-wind/bootcamp-gostack/header-desafios.png" />

<h3 align="center">
  Challenge 06: Database and file upload in Node.js
</h3>

<p align="center">
  <a href="#rocket-about-the-challenge">About the Challenge</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#routes">Routes</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#installation">Installation</a>
</p>

## :rocket: About the Challenge

Application that stores incoming and outgoing financial transactions, allowing the registration and listing of these transactions, in addition to allowing the creation of new records in the database by sending a csv file.

### Routes

- **`POST /transactions`**

```json
{
  "id": "uuid",
  "title": "Salary",
  "value": 3000,
  "type": "income",
  "category": "Lorem"
}
```

- **`GET /transactions`**

```json
{
  "transactions": [
    {
      "id": "uuid",
      "title": "Freelance",
      "value": 4000,
      "type": "income",
      "category": {
        "id": "uuid",
        "title": "Salary"
      }
    },
    {
      "id": "uuid",
      "title": "Salary",
      "value": 2000,
      "type": "income",
      "category": {
        "id": "uuid",
        "title": "Others"
      }
    },
    {
      "id": "uuid",
      "title": "Payment",
      "value": 4000,
      "type": "outcome",
      "category": {
        "id": "uuid",
        "title": "Others"
      }
    },
    {
      "id": "uuid",
      "title": "Product Lorem",
      "value": 1200,
      "type": "outcome",
      "category": {
        "id": "uuid",
        "title": "Shopping"
      }
    }
  ],
  "balance": {
    "income": 6000,
    "outcome": 5200,
    "total": 800
  }
}
```

Within **balance**, income is the sum of all transaction values ​​with `type` income. The outcome is the sum of all transaction values ​​with `type` outcome, and the total is the value of `income - outcome`.

- **`DELETE /transactions/:id`**

- **`POST /transactions/import`** The csv file must follow the [model](./src/__tests__/import_template.csv)

## Installation

### Run Server

1. Clone the repository: `git@github.com:matheus-neves/challenge-database-upload.git`
2. Access the directory: `cd challenge-database-upload`
3. Install the dependencies: `yarn`
4. Run the server: `yarn dev:server`
5. Server running in `http://localhost:3333/`

### Database

1. Install Docker https://www.docker.com/get-started and check if was installed with the command: `docker version`
2. Run the command `docker run --name gostack_postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres`
3. Verify if container was created `docker ps -a`
4. Create a database with name `gostack_challenge06`


## :memo: License

This challenge is under license from MIT. See the archive [LICENSE](https://github.com/Rocketseat/bootcamp-gostack-desafios/blob/master/LICENSE) for more details.

---
Challenge completed ✔️by Matheus Neves and created with 💜by Rocketseat 👋 [Join the community!](https://discordapp.com/invite/gCRAFhc)
