const axios = require("axios");
const slackMessage = async (details) => {
  try {
    let data = JSON.stringify({
      channel: "#users",
      text: `User  : ${details.name}
Email : ${details.email}
Phone : ${details.phoneNumber}
Turnover : ${details.turnover}`,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://hooks.slack.com/services/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",
      headers: {
        "Content-type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
};

module.exports = slackMessage;
