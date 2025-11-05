// take this solution from https://shaquillegalimba.medium.com/how-to-import-multiple-images-in-react-1936efeeae7b
function importAll(r) {
  let images = [];
  r.keys().forEach((item, index) => {
    images[index] = { id: r(item) };
  });
  return images;
}

export async function getCatsImages() {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), 6000);

  const response = await fetch(
    "https://cataas.com/api/cats?tags=cute&limit=50",
    { signal: controller.signal }
  )
    .then((res) => res.json())
    .then((res) => res.filter((cat) => !cat.tags.includes("gif")))
    .then((res) => (res.length > 16 ? res : Promise.reject()))
    .then((res) => {
      // If any cat._id is undefined, reject so we go to catch
      if (res.some((cat) => !cat.id)) {
        return Promise.reject();
      }
      return res.map((cat) => ({
        ...cat,
        id: `https://cataas.com/cat?${cat.id}`,
      }));
    })
    .catch(() =>
      importAll(
        require.context("../assets/cats-images", false, /\.(png|jpe?g|svg)$/)
      )
    );

  clearTimeout(id);

  return response;
}
