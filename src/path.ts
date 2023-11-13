export default function buildPath(route: string) {
  if (process.env.NODE_ENV === 'production') {
    return 'https://us-central1-ofast-e6866.cloudfunctions.net/api' + route
  } else {
    return 'http://localhost:5000/ofast-e6866/us-central1/api' + route
  }
}
