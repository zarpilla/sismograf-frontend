export default function({ $axios, redirect }) {
  $axios.onError(error => {
    console.error('ax error', error)
    const code = parseInt(error.response && error.response.status);
    if (code === 401) redirect("/");
  });
}
