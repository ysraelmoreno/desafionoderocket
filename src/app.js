const express = require("express");
const cors = require("cors");
const { uuid, isUuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

function validateProjectId(request, response, next){
  const { id } = request.params;

  if(!isUuid(id)){
    return response.status(400).json({
      error: "Invalid project ID"
    });
  }

  return next ();
}

const repositories = [];

app.get("/repositories", (request, response) => {
  
  return response.json(repositories);
  
});

app.post("/repositories", (request, response) => {
  // TODO
  const { title, url, techs } = request.body;

  const repository = { id : uuid(), title, url, techs, likes : 0};
  
  repositories.push(repository);
  return response.status(200).json(repository);
});

app.put("/repositories/:id", validateProjectId, (request, response) => {
  // TODO
  const { id } = request.params;
  const { title, url, techs } = request.body;
  const repository = repositories.find(repository => repository.id == id);
  
  if (repository < 0){
    return response.status(400).json({
      error: "Repository not Found"
    })
  }
  
  const newRepository = {
    id : id,
    title,
    url,
    techs,
    likes : repository.likes
  }

  repositories[repository] = newRepository;
  return response.status(200).json(newRepository);
});

app.delete("/repositories/:id", validateProjectId, (request, response) => {
  // TODO
  const { id } = request.params;
  const repository = repositories.findIndex(repository => repository.id == id);

  if(repository < 0){
    return response.status(400).json({
      error: "Project not Found"
    })
  }
  
  repositories.splice(repository, 1);
  return response.status(204).send();
});

app.post("/repositories/:id/like", validateProjectId, (request, response) => {
  // TODO
  const { id } = request.params;
  const repository = repositories.find(repository => repository.id == id);

  if(!repository){
    return response.status(400).send();
  }

  repository.likes += 1;

  return response.status(200).json(repository);
});

module.exports = app;
