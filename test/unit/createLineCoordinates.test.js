import createLineCoordinates from '../../src/createLineCoordinates';

test('createLineCoordinates creates a proper set of coordinates', () => {
  const currentX = 0;
  const currentY = 135;
  const nextX = 50;
  const nextY = 301;
  const count = 50;
  const chartHeight = 400;
  const results = createLineCoordinates(
    currentX,
    currentY,
    nextX,
    nextY,
    count,
    chartHeight
  );
  const expectedResults = [
    [0, 265],
    [1.7304364865133888, 259.25495086477554],
    [3.4608729730267775, 253.50990172955107],
    [5.191309459540166, 247.7648525943266],
    [6.921745946053555, 242.01980345910215],
    [8.652182432566944, 236.2747543238777],
    [10.382618919080333, 230.52970518865322],
    [12.113055405593721, 224.78465605342876],
    [13.84349189210711, 219.0396069182043],
    [15.573928378620499, 213.29455778297984],
    [17.304364865133888, 207.54950864775537],
    [19.034801351647275, 201.8044595125309],
    [20.765237838160665, 196.05941037730645],
    [22.495674324674056, 190.314361242082],
    [24.226110811187446, 184.56931210685752],
    [25.956547297700837, 178.82426297163306],
    [27.686983784214227, 173.0792138364086],
    [29.417420270727618, 167.33416470118414],
    [31.14785675724101, 161.58911556595967],
    [32.8782932437544, 155.8440664307352],
    [34.60872973026779, 150.09901729551075],
    [36.33916621678118, 144.35396816028629],
    [38.06960270329457, 138.60891902506182],
    [39.80003918980796, 132.86386988983736],
    [41.53047567632135, 127.11882075461291],
    [43.26091216283474, 121.37377161938846],
    [44.99134864934813, 115.62872248416402],
    [46.72178513586152, 109.88367334893957],
    [48.452221622374914, 104.13862421371512]
  ];

  expect(results).toEqual(expectedResults);
});