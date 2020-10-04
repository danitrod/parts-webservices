export const clearSubparts = async (repo: number, id: string) => {
  const address = `http://localhost:300${repo}/part/subcomponents?id=${id}`;

  const rawResponse = await fetch(address, {
    method: 'DELETE'
  });
  const response = await rawResponse.json();

  return response;
};
