## Technologies
In this project, I've created a simple message broker application using nodejs, kafka and postegres.

You can find here how to install Kafka and Zookeeper on Windows/Linux
* https://hevodata.com/learn/install-kafka-on-windows/  (Windows)
* https://www.conduktor.io/kafka/how-to-install-apache-kafka-on-linux (Linux)

### Libraries and Dependencies
* `Chance ` : To generate random data for testing
* `Jest` : JavaScript testing framework
* `pg` : Postgres  Library
* `Kafa-Node`: NodeJS Library for Apache Kafka
* `Typescript` : Programming Language

### How to run
* Go to consumer folder and open the terminal.
    * npm start
* Go to producer folder and open the terminal.
    * npm start
* To run the database.
    * docker-compose up.
* Unit and Integration test.
    * npm run test