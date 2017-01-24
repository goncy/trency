export default function randomString () {
  return Math.random().toString(36).substring(5, 15)
}
