import { useMap } from 'ahooks';
interface Option {
  value: string | undefined;
  label: string | undefined;
}
export default () => {
  const [map, { set: setOptions, get: getOptions }] = useMap<string, Option[]>([]);
  return { setOptions, getOptions, map };
};
