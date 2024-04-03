const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Bloggi API",
      description:
        "API endpoints for a mini blog services documented on swagger",
      contact: {
        name: "Muhammad Ashraf",
        email: "muhammad.ashraf.tahaa@gmail.com",
        url: "https://github.com/Muhammad-Ashraf9",
      },
      version: "1.0.0",
    },
  },
  // looks for configuration in specified directories
  apis: ["./Routes/*.js", "./Model/*.js"],
};
const swaggerSpec = swaggerJsdoc(options);
module.exports = function swaggerDocs(app, port) {
  // Swagger Page
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  // Documentation in JSON format
  app.get("/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
};
