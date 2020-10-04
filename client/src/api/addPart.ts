import { Part } from '../types';

export const addPart = async (
  repo: number,
  set: Function,
  setLoading: Function,
  setShowActions: Function,
  part: Part
) => {
  setLoading(true);

  const address = `http://localhost:300${repo}/part`;

  const rawResponse = await fetch(address, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ...part
    })
  });
  const response = await rawResponse.json();

  setLoading(false);
  setShowActions(false);

  return response;
};
