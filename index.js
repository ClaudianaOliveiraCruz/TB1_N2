import inquirer from 'inquirer';
import chalk from 'chalk';
import fs from 'fs';
import users from './users.json' assert { type: 'json' };

const answers = inquirer.prompt([
  {
    name: 'menu',
    message: 'Que opção deseja?',
    type: 'list',
    choices: [
      { name: 'Criar Conta', value: 1 },
      { name: 'Depositar', value: 2 },
      { name: 'Consultar Saldo', value: 3 },
      { name: 'Sacar', value: 4 },
      { name: 'Sair', value: 5 },
    ],
  },
]);

answers
  .then((answers) => {
    console.log(chalk.yellow(`\n Menu `) + chalk.green(`${answers.menu}`));

    //CRIAR CONTA

    if (answers.menu === 1) {
      const answers2 = inquirer.prompt([
        
        {
          message: 'Qual é o seu nome? ',
          type: 'input',
          default: 'Digite seu nome',
          name: 'nome',
        },

        {
          message: 'Qual é o seu cpf? ',
          type: 'input',
          default: 'Digite seu cpf',
          name: 'cpf',
        },

        {
          message: 'Sua conta? ',
          type: 'input',
          default: 'Digite sua conta',
          name: 'conta',
        },
        {
          message: 'Sua idade? ',
          type: 'input',
          default: 'Digite ua idade',
          name: 'idade',
        },
      ]);

      answers2
        .then((answers2) => {
          console.log(
            chalk.yellow(`\nO seu nome é: `) + chalk.green(`${answers2.nome}`),
          );
          console.log(
            chalk.yellow(`\nO seu cpf é: `) + chalk.green(`${answers2.cpf}`),
          );
          console.log(
            chalk.yellow(`\nSua conta é: `) +
              chalk.green(`${answers2.conta}\n`),
          );
          console.log(
            chalk.yellow(`\nSua idade é: `) +
              chalk.green(`${answers2.idade}\n`),
          );
          //CRIANDO
          let user = {
            name: answers2.nome,
            idade: answers2.idade,
            conta: answers2.conta,
            cpf: answers2.cpf,
            saldo: 0,
          };
          const answers = inquirer.prompt([
            {
              name: 'menu',
              message: 'Que opção deseja?',
              type: 'list',
              choices: [
                { name: 'Criar Conta', value: 1 },
                { name: 'Depositar', value: 2 },
                { name: 'Consultar Saldo', value: 3 },
                { name: 'Sacar', value: 4 },
                { name: 'Sair', value: 5 },
              ],
            },
          ]);
          // ADD NO BANCO DE DADOS
          users.push(user);

          // STEP 3: ADD
          fs.writeFile('users.json', JSON.stringify(users), (err) => {
            // CHECANDO ERROS
            if (err) throw err;

            console.log('oh ss'); // Success
          });
        })
        .catch((error) => {
          console.log(chalk.red(`${error}`));
        });
        
    }

    //DEPOSITAR
    if (answers.menu === 2) {
      const answers3 = inquirer.prompt([
        {
          message: 'Digite o valor a ser depositado: ',
          type: 'input',
          default: 'Digite o valor do deposito',
          name: 'deposito',
        },
        {
          message: 'Qual é o seu cpf? ',
          type: 'input',
          default: 'Digite seu cpf',
          name: 'cpf',
        },

        {
          message: 'Digite sua Agencia? ',
          type: 'input',
          default: 'Digite sua Conta',
          name: 'conta',
        },
      ]);

      answers3
        .then((answers3) => {
          console.log(
            chalk.yellow(`\nValor do deposito foi: `) +
              chalk.green(`${answers3.deposito}\n`),
          );
          let user = {
            saldo: answers3.deposito,
          };
          const answers = inquirer.prompt([
            {
              name: 'menu',
              message: 'Que opção deseja?',
              type: 'list',
              choices: [
                { name: 'Criar Conta', value: 1 },
                { name: 'Depositar', value: 2 },
                { name: 'Consultar Saldo', value: 3 },
                { name: 'Sacar', value: 4 },
                { name: 'Sair', value: 5 },
              ],
            },
          ]);
          //buscando conta do usuario antes de salvar no json

          users.map((user) => {
            if (user.cpf === answers3.cpf) {
              return (user.saldo += Number(answers3.deposito));
            }
            
          });

          // ADD NO BANCO DE DADOS
          // users.push(user);

          // STEP 3: ADD
          fs.writeFile('users.json', JSON.stringify(users), (err) => {
            // CHECANDO ERROS
            if (err) throw err;

            console.log('oh ss'); // Success
          });
        })

        .catch((error) => {
          console.log(chalk.red(`${error}`));
        });
    }

    //CONSULTAR SALDO

    if (answers.menu === 3) {
      const answers3 = inquirer.prompt([
        {
          message: 'Qual é o seu cpf? ',
          type: 'input',
          default: 'Digite seu cpf',
          name: 'cpf',
        },
      ]);
      answers3
        .then((answers3) => {
          //buscando conta do usuario antes de salvar no json

          const findUser = users.find((user) => {
            return user.cpf === answers3.cpf;
          });

          console.log(` R$${findUser.saldo},00`);
        })

        .catch((error) => {
          console.log(chalk.red(`${error}`));
        });
        
    }
    

    //Sacar

    if (answers.menu === 4) {
      const answers4 = inquirer.prompt([
        {
          message: 'Digite o valor a ser sacado: ',
          type: 'input',
          default: 'Digite o valor do saque',
          name: 'sacar',
        },
        {
          message: 'Qual é o seu cpf? ',
          type: 'input',
          default: 'Digite seu cpf',
          name: 'cpf',
        },
      ]);

      answers4
        .then((answers4) => {
          console.log(
            chalk.yellow(`\nValor do sacado foi: `) +
              chalk.green(`${answers4.sacar}\n`),
          );

          users.map((user) => {
            if (user.cpf === answers4.cpf) {
              return (user.saldo -= Number(answers4.sacar));
            }
          });

          fs.writeFile('users.json', JSON.stringify(users), (err) => {
            // CHECANDO ERROS
            if (err) throw err;

            console.log('oh ss'); // Success
          });
        })
        .catch((error) => {
          console.log(chalk.red(`${error}`));
        });
    }
    
    //Sair

    if (answers.menu === 5) {
      console.log(chalk.yellow(`\nBYE BYE \n`));
    }
  })
  .catch((error) => {
    console.log(chalk.red(`${error}`));
  });
