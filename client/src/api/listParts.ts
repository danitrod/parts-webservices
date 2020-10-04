import { PartRepository } from 'src/types';

export const listParts = async (
  repo: number,
  set: Function,
  setLoading: Function,
  setShowActions: Function
) => {
  setLoading(true);

  const address = `http://localhost:300${repo}/list`;

  const rawResponse = await fetch(address, {
    method: 'GET'
  });
  const response: PartRepository = await rawResponse.json();

  set(response);
  setLoading(false);
  setShowActions(false);
};
