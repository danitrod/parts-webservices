import { Part } from '../types';
import { generateId } from './genId';

export const populateRepository = (repo: Map<string, Part>) => {
  const ids = [
    generateId(),
    generateId(),
    generateId(),
    generateId(),
    generateId()
  ];
  repo.set(ids[0], {
    name: 'Câmbio',
    description: 'Permite a troca de marchas'
  });
  repo.set(ids[1], {
    name: 'Retrovisor',
    description: 'Espelho para auxiliar o motorista'
  });
  repo.set(ids[2], {
    name: 'Rodas',
    description: 'Permitem que um veículo se locomova mais facilmente'
  });
  repo.set(ids[3], {
    name: 'Motor',
    description: 'Consome um combustível para acelerar um veículo'
  });
  repo.set(ids[4], {
    name: 'Carro',
    description: 'Tesla',
    subcomponents: [
      [ids[0], 1],
      [ids[1], 2],
      [ids[2], 4],
      [ids[3], 1]
    ]
  });
};
