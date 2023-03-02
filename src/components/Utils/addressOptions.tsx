import provinces from 'china-division/dist/provinces.json';
import cities from 'china-division/dist/cities.json';
import areas from 'china-division/dist/areas.json';
// https://gist.github.com/afc163/7582f35654fd03d5be7009444345ea17

areas.forEach((area) => {
  const matchCity = cities.filter(city => city.code === area.cityCode)[0];
  if (matchCity) {
    // @ts-ignore
    matchCity.children = matchCity.children || [];
    // @ts-ignore
    matchCity.children.push({
      label: area.name,
      value: area.code,
    });
  }
});

cities.forEach((city) => {
  const matchProvince = provinces.filter(province => province.code === city.provinceCode)[0];
  if (matchProvince) {
    // @ts-ignore
    matchProvince.children = matchProvince.children || [];
    // @ts-ignore
    matchProvince.children.push({
      label: city.name,
      value: city.code,
      // @ts-ignore
      children: city.children,
    });
  }
});

const addressOptions = provinces.map(province => ({
  label: province.name,
  value: province.code,
  // @ts-ignore
  children: province.children,
}));

export default addressOptions;
