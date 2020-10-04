const ID_LENGTH = 4;

let counter = 0;
export const generateId = (): string => {
  return (counter += 1).toString().padStart(ID_LENGTH, '0');
};
