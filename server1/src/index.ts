import cors from 'cors';
import express from 'express';
import { Part, PartRepository, PartResponse } from './types';
import { generateId } from './utils/genId';
import { populateRepository } from './utils/populateRepository';

// Mapa contendo as peças. O ID da peça é o identificador dela.
const parts: Map<string, Part> = new Map();

// Popular o repositório inicial
populateRepository(parts);

const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));

app.get('/', (_, res) => {
  return res.send('running');
});

// Inserir uma peça
app.post('/part', (req, res) => {
  const { name, description, subcomponents } = req.body;

  const newPart: Part = { name, description, subcomponents };

  if (newPart.subcomponents) {
    const missingSubpartIndex = newPart.subcomponents.findIndex(
      (component) => !parts.has(component[0])
    );
    if (missingSubpartIndex !== -1) {
      return res.status(400).json({
        err: true,
        msg: `A subparte ${subcomponents[missingSubpartIndex][0]} não existe.`
      });
    }
  }

  const id = generateId();
  parts.set(id, newPart);

  return res.json({ err: false, msg: 'Parte inserida com sucesso.', id });
});

// Obter uma peça específica
app.get('/part', (req, res) => {
  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({
      err: true,
      msg: 'Please specify the part ID. For a full list of parts try /list.'
    });
  }

  const part = parts.get(id);
  if (part) {
    const response: PartResponse = { err: false, part: { ...part, id } };
    if (part.subcomponents) {
      part.subcomponents.forEach((component) => {
        if (!parts.has(component[0])) {
          if (response.warning) {
            response.warning.push(component[0]);
          } else {
            response.warning = [component[0]];
          }
        }
      });
    }
    return res.json(response);
  } else {
    return res.status(404).json({ err: true, msg: 'Part not found.' });
  }
});

// Esvaziar lista de subpeças de uma peça específica
app.delete('/part/subcomponents', (req, res) => {
  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({
      err: true,
      msg: 'Please specify the part ID. For a full list of parts try /list.'
    });
  }

  const part = parts.get(id);
  if (part) {
    part.subcomponents = undefined;
    parts.set(id, part);
    return res.json({ err: false, msg: 'Subcomponent list cleared.' });
  } else {
    return res.status(404).json({ err: true, msg: 'Part not found.' });
  }
});

// Remover peça
app.delete('/part', (req, res) => {
  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({
      err: true,
      msg: 'Please specify the part ID. For a full list of parts try /list.'
    });
  }

  const part = parts.get(id);
  if (part) {
    parts.delete(id);
    return res.json({ err: false, msg: 'Part removed.' });
  } else {
    return res.status(404).json({ err: true, msg: 'Part not found.' });
  }
});

// Obter lista de todas as peças
app.get('/list', (_, res) => {
  setTimeout(() => {
    const rep: PartRepository = {};
    parts.forEach((part, id) => (rep[id] = part));

    return res.json({
      parts: rep
    });
  }, 500);
});

const port = process.env.PORT || 7000;
app.listen(port, () => console.log('App launched on port', port));
