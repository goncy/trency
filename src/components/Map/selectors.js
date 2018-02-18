import { MAP_DEFAULT_OPTIONS } from "./constants";

export const getOptions = ({ mapOpts }) => ({
  ...MAP_DEFAULT_OPTIONS,
  ...mapOpts
});
