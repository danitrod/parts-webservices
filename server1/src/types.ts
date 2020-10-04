export type PartRepository = {
  [id: string]: Part;
};

export type Part = {
  name: string;
  description: string;
  subcomponents?: [string, number][];
};

export type PartResponse = {
  err: boolean;
  part: Part & { id: string };
  warning?: string[];
};
