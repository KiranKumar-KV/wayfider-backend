const { router, dbcontroller, FILES_PATH } = require("./controller-config");

router.get("/get-all-roles/:user_id", async (req, res) => {
  try {
    let { user_id } = req.params;
    let newdata = [];
    let send = false;
    let newd = await dbcontroller.checkUserById(user_id);
    if (newd.length > 0) {
      if (newd[0].role_name.toLowerCase() === "superadmin") {
        newdata = await dbcontroller.getAllRoles();
        send = true;
      } else {
        let mall_id = newd[0].mall_id;
        newdata = await dbcontroller.getRoleExceptsuperadmin(mall_id);
        send = true;
      }
      if (send === true) {
        return res.status(200).send(newdata);
      }
    } else {
      return res.status(205).send({ message: "no rows find for this user" });
    }

    // let newdata = await dbcontroller.getAllRoles();
    // if(newdata){
    //     return res.status(200).send(newdata)
    // }
  } catch (e) {
    console.log(e);
    return res.status(500).send({ error: `server error ${e}` });
  }
});

router.post("/add-role", async (req, res) => {
  try {
    let postdata = req.body.data;
    let newdata = await dbcontroller.addRole(postdata);
    if (newdata) {
      return res.status(200).send(newdata);
    }
  } catch (e) {
    return res.status(500).send({ error: `server error ${e}` });
  }
});

router.get("/get-role-by-id/:id", async (req, res) => {
  try {
    let role_id = req.params.id;
    let newdata = await dbcontroller.getRoleByID(role_id);
    if (newdata) {
      return res.status(200).send(newdata);
    }
  } catch (e) {
    return res.status(500).send({ error: `server error ${e}` });
  }
});

router.put("/update-role-status-by-id/:id", async (req, res) => {
  try {
    let role_id = req.params.id;
    console.log(role_id);
    let newdata = await dbcontroller.updateRoleStatus(role_id);
    if (newdata) {
      console.log(newdata);
      return res.status(200).send(newdata);
    }
  } catch (e) {
    return res.status(500).send({ error: `server error ${e}` });
  }
});

router.put("/update-role/:id", async (req, res) => {
  try {
    let role_id = req.params.id;
    let { name } = req.body.data;
    console.log(req.body.data);
    let newdata = await dbcontroller.updateRole(role_id, name);
    if (newdata) {
      return res.status(200).send(newdata);
    }
  } catch (e) {
    return res.status(500).send({ error: `server error ${e}` });
  }
});

module.exports = router;
