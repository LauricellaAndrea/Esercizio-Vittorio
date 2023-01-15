import { createServer } from "http";
import { parse } from 'url';

 const server = createServer((request, response) => {
  console.log("request received");
  console.log(request.url);

  response.statusCode = 200;
  response.setHeader("Content-Type", "application/json");

  const people = [{
    firstname : "Mario",
    lastname : "Rossi",
    id: 1,
  },
  {
    firstname : "Luca",
    lastname : "Bianchi",
    id: 2,
  },
  {
    firstname : "Francesca",
    lastname : "Verde",
    id: 3
  },
  {
    firstname : "Giovanni",
    lastname : "Blu",
    id: 4,
  }]

  const parsedUrl = parse(request.url, true);
  switch(parsedUrl.pathname){
    case '/users':
      const jsonResponseBody = JSON.stringify({ message: "users", data: people });
      response.end(jsonResponseBody);
      break;
    case '/user':
      const idUser = parsedUrl.query.id;
      if(!idUser){
        response.statusCode = 400;
        response.end(JSON.stringify({ error: "Bad Request, id is missing"}));
        return;
      }
      // Filtra l'elemento dell'array people in base al valore della variabile idUser
      const user = people.find(person => person.id == idUser);
      if(!user) {
        response.statusCode = 404;
        response.end(JSON.stringify({ error: "Not found"}));
        return;
      }
      response.end(JSON.stringify(user));
      break;
    case '/cars':
      const jsonResponseCars = JSON.stringify({ message: "cars" });
      response.end(jsonResponseCars);
      break;
    default:
      response.statusCode = 404;
      response.end(JSON.stringify({ error: "Not found"}));
      break;
  };
});

server.listen(3001, () => {
  console.log(`Server running at http://localhost:3001`);
});

