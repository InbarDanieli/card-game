// take this solution from https://shaquillegalimba.medium.com/how-to-import-multiple-images-in-react-1936efeeae7b
function importAll(r) {
  let images = [];
  r.keys().forEach((item, index) => { images[index] = { id: r(item) } });
  return images
}

export async function getCatsImages() {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), 8000);

  const response = await fetch("https://cataas.com/api/cats?tags=cute&limit=100", { signal: controller.signal })
    .then((res) => res.json())
    .then((res) => res.filter((cat) => !(cat.tags.includes("gif"))))
    .then((res) => res.length > 16 ? res : Promise.reject())
    .then((res) => res.map((cat) => ({ ...cat, id: `https://cataas.com/cat/${cat._id}` })))
    .catch(() => importAll(require.context('../assets/cats-images', false, /\.(png|jpe?g|svg)$/)))

  clearTimeout(id);

  return response
}