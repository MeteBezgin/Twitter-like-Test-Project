const { faker } = require("@faker-js/faker");
const axios = require("axios");

(async () => {
  for (let i = 0; i < 30; i++) {
    let name = faker.name.findName();
    let email = faker.internet.email();
    let password = faker.internet.password();
    let passwordConfirm = password;
    let resp = await axios.post("http://localhost:3001/api/users/add", {
      name,
      email,
      password,
      passwordConfirm,
    });
    console.log(resp.data);
    let user = resp.data._id;
    let title = faker.lorem.sentence();
    let content = faker.lorem.paragraph();
    console.log(user, title, content);
    let resp2 = await axios.post("http://localhost:3001/api/posts/add", {
      title,
      content,
      user,
    });
    console.log(resp2.data);
  }
})();
