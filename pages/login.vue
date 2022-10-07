<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column col-6 offset-3 mt-5">
          <h2 class="title has-text-centered">Log In</h2>

          <Notification v-if="error" type="danger" :message="error" />

          <form method="post" @submit.prevent="login">
            <div class="form-group zfield">
              <label class="label">Email</label>
              <div class="control">
                <input
                  v-model="email"
                  type="email"
                  class="form-control"
                  name="email"
                />
              </div>
            </div>
            <div class="form-group zfield">
              <label class="label">Password</label>
              <div class="control">
                <input
                  v-model="password"
                  type="password"
                  class="form-control"
                  name="password"
                />
              </div>
            </div>
            <div class="control">
              <button type="submit" class="btn btn-light is-dark">Log In</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Notification from "~/components/Notification";

export default {
  components: {
    Notification,
  },
  middleware: "guest",
  layout: 'admin',
  data() {
    return {
      email: "",
      password: "",
      error: null,
    };
  },
  methods: {
    async login() {
      this.error = null;
      try {
        await this.$auth.loginWith("local", {
          data: {
            identifier: this.email,
            password: this.password,
          },
        });
        const lang = process.env.language || 'ca'
        this.$router.push(`/${lang}/dashboard`);
      } catch (e) {
        this.error = 'Could not log in, invalid user or password.'; // e.response.data.message[0].messages[0].message;
      }
    },
  },
};
</script>