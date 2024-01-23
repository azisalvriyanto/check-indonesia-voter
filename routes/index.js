const express = require("express");
const { checkIdentityNumber } = require("../utils/helpers");
const router = express.Router();

const handleCheckIdentityNumber = async (identityNumber) => {
  let res = {};

  if (
    identityNumber == undefined ||
    identityNumber == null ||
    identityNumber == ""
  ) {
    res = {
      meta: {
        success: false,
        code: 400,
        message: "Identity number not found",
        errors: [],
      },
      data: null,
    };
  } else {
    res = await checkIdentityNumber(identityNumber);
  }

  return res;
};

router.get("/", function (request, response, next) {
  return response.json({
    meta: {
      success: true,
      code: 200,
      message: "Made with love by Sintas",
      errors: [],
    },
    data: null,
  });
});

router.post("/", async function (request, response, next) {
  const identityNumber = request.body.identity_number;
  const res = await handleCheckIdentityNumber(identityNumber);
  response.status(res.meta.code);

  return response.json(res);
});

router.get("/check/:identityNumber", async function (request, response, next) {
  const identityNumber = request.params.identityNumber;
  const res = await handleCheckIdentityNumber(identityNumber);
  response.status(res.meta.code);

  return response.json(res);
});

module.exports = router;
