export const removePart = async (repo: number, id: string) => {
  const address = `http://localhost:300${repo}/part?id=${id}`;

  const rawResponse = await fetch(address, {
    method: 'DELETE'
  });
  const response = await rawResponse.json();

  return response;
};