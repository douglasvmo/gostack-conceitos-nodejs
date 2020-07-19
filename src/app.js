const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

// const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  // TODO
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  // TODO
  const { title, url, techs } = request.body;
  const repo = {
    title,
    url,
    techs,
    likes: 0,
    id: uuid(),
  };

  repositories.push(repo);

  return response.json(repo);
});

app.put("/repositories/:id", (request, response) => {
  // TODO
  const { title, url, techs } = request.body;
  const { id } = request.params;
  const index = repositories.findIndex((repo) => repo.id == id);

  if (index < 0) {
    return response.status(400).json({ error: "repository don't exists." });
  } else {
    const repo = {
      title,
      url,
      techs,
      id,
      likes: repositories[index].likes,
    };
    repositories.splice(index, 1, repo);

    return response.json(repositories[index]);
  }
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;
  const index = repositories.findIndex((repo) => repo.id === id);

  if (index < 0) {
    return response.status(400).json({ error: "repository don't exists." });
  } else {
    repositories.splice(index, 1);
    return response.status(204).send();
  }
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
  const { id } = request.params;
  const index = repositories.findIndex((repo) => repo.id === id);

  if (index < 0) {
    return response.status(400).json({ error: "repository don't exists." });
  } else {
    repositories[index].likes += 1;
    return response.json(repositories[index]);
  }
});

module.exports = app;
