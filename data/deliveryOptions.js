export const deliveryOption = [
  {
    id: "1",
    priceCents: 0,
    deliveryDay: "7",
  },
  {
    id: "2",
    priceCents: 499,
    deliveryDay: "4",
  },
  {
    id: "3",
    priceCents: 999,
    deliveryDay: "0",
  },
];

export function getDeliveryOption(deliveryId) {
  let matchDeliveryOption;

  deliveryOption.forEach((option) => {
    if (option.id === deliveryId) {
      matchDeliveryOption = option;
    }
  });

  return matchDeliveryOption;
}
