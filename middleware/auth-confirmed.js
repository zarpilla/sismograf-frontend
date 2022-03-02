export default function({ store, redirect, $auth }) {
  console.log("auth 1", store.state.auth);
  console.log("auth 2", $auth);
  if (
    store.state.auth &&
    store.state.auth.user &&
    !store.state.auth.user.confirmed
  ) {
    $auth.logout();
  }
}
