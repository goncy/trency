// @flow
export default function randomString(): string {
  return Math.random()
    .toString(36)
    .substring(5, 15);
}
