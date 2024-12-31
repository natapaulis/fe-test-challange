import { Customer } from "types";

interface TableFilterOption {
  text: string;
  value: string;
}

export const getIndustryOptions = (
  customerList: Customer[] | undefined
): TableFilterOption[] => {
  if (!customerList) return [];
  return customerList?.reduce(
    (acc: TableFilterOption[], currentValue: Customer) => {
      if (acc.find((item) => item.value === currentValue.industry)) return acc;
      return [
        ...acc,
        { text: currentValue.industry, value: currentValue.industry },
      ];
    },
    []
  );
};
