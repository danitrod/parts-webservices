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
    name: 'Tecla',
    description: 'Objeto utilizado para entrada de um caracter'
  });
  repo.set(ids[1], {
    name: 'Teclado',
    description: 'Objeto de manipulação de entrada/saída com o computador',
    subcomponents: [[ids[0], 78]]
  });
  repo.set(ids[2], {
    name: 'Tela',
    description: 'Permite ao usuário visualização de informações'
  });
  repo.set(ids[3], {
    name: 'Processador',
    description: 'Unidade central de processamento'
  });
  repo.set(ids[4], {
    name: 'Computador',
    description: 'Lenovo ThinkPad',
    subcomponents: [
      [ids[1], 1],
      [ids[2], 1],
      [ids[3], 1]
    ]
  });
};
