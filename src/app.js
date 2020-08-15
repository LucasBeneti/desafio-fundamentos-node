const express = require("express");
const { uuid } = require("uuidv4");
const cors = require("cors");

// const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

/*  {
      title: "Titulo do repo",
      url: "https://...",
      techs: ["Node.js",...],
      likes: 0,
    }
 */
const repositories = [];

app.get("/repositories", (request, response) => {
  // TODO
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  // TODO
  const { title, url, techs } = request.body;
  const newRepo = { id: uuid(), title, url, techs, likes: 0 };
  repositories.push(newRepo);
  return response.status(201).json(newRepo);
});

app.put("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;
  const { title, url, techs } = request.body;
  const repoIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  if (repoIndex < 0) {
    return response.status(400).json({ error: "Repositorio não existe." });
  }
  const currLikes = repositories[repoIndex].likes;

  const updatedRepo = {
    id,
    title,
    url,
    techs,
    likes: currLikes,
  };
  repositories[repoIndex] = updatedRepo;
  return response.status(200).json(updatedRepo);
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;
  const repoIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  if (repoIndex < 0) {
    return response.status(400).send({ message: "Repositorio não encontrado" });
  }
  repositories.splice(repoIndex, 1);
  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const repoIndex = repositories.findIndex(
    (repository) => repository.id === id
  );
  if (repoIndex < 0) {
    return response.status(400).json({ message: "Repositorio não encontrado" });
  }
  let currLikes = repositories[repoIndex].likes;
  const updateRepositoryLikes = {
    id: id,
    title: repositories[repoIndex].title,
    url: repositories[repoIndex].url,
    techs: repositories[repoIndex].techs,
    likes: (currLikes += 1),
  };
  repositories[repoIndex] = updateRepositoryLikes;
  const responseLikes = repositories[repoIndex].likes;

  return response.status(200).json({
    likes: responseLikes,
  });
});

module.exports = app;
