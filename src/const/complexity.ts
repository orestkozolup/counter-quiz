export const getComplexityOptions = (t: (name: string) => string) => [
  {
    value: 0,
    label: t('complexity_easy'),
    description: "Operations with numbers up to 2 digits",
  },
  {
    value: 1,
    label: t('complexity_medium'),
    description: "Operations with numbers up to 3 digits",
  },
  {
    value: 2,
    label: t('complexity_difficult'),
    description: "Operations with numbers up to 4 digits",
  },
]
