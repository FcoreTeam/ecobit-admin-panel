export const DataHandler = <T extends object>(
  key: keyof T,
  value: T[keyof T],
  setData: React.Dispatch<React.SetStateAction<T>>
) => {
  setData((prev) => ({ ...prev, [key]: value }));
};
