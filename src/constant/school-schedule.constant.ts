function createDateTime(hour: number, minute: number): Date {
  return new Date(0, 0, 0, hour, minute);
}

export const period = [
  {
    index: 1,
    startAt: createDateTime(7, 0),
    endAt: createDateTime(7, 50),
  },
  {
    index: 2,
    startAt: createDateTime(7, 55),
    endAt: createDateTime(8, 45),
  },
  {
    index: 3,
    startAt: createDateTime(8, 50),
    endAt: createDateTime(9, 40),
  },
  {
    index: 4,
    startAt: createDateTime(9, 55),
    endAt: createDateTime(10, 45),
  },
  {
    index: 5,
    startAt: createDateTime(10, 55),
    endAt: createDateTime(11, 40),
  },
  {
    index: 6,
    startAt: createDateTime(12, 45),
    endAt: createDateTime(13, 35),
  },
  {
    index: 7,
    startAt: createDateTime(13, 40),
    endAt: createDateTime(14, 30),
  },
  {
    index: 8,
    startAt: createDateTime(14, 45),
    endAt: createDateTime(15, 25),
  },
  {
    index: 9,
    startAt: createDateTime(15, 40),
    endAt: createDateTime(16, 30),
  },
  {
    index: 10,
    startAt: createDateTime(16, 35),
    endAt: createDateTime(17, 25),
  },
  {
    index: 11,
    startAt: createDateTime(18, 0),
    endAt: createDateTime(18, 50),
  },
  {
    index: 12,
    startAt: createDateTime(18, 55),
    endAt: createDateTime(19, 45),
  },
  {
    index: 13,
    startAt: createDateTime(19, 50),
    endAt: createDateTime(20, 40),
  },
];
