const { router, dbcontroller, FILES_PATH } = require("./controller-config");

router.get("/get-shops/:mall_id", async (req, res) => {
  try {
    let { mall_id } = req.params;
    let newdata = await dbcontroller.getShops(mall_id);
    if (newdata) {
      return res.status(200).send(newdata);
    }
  } catch (e) {
    return res.status(500).send({ error: `server error : ${e}` });
  }
});

router.get("/get-all-shops/:user_id", async (req, res) => {
  try {
    let { user_id } = req.params;
    let {mall_id} = req.query;
    let newdata = [];
    let send = false;
    let newd = await dbcontroller.checkUserById(user_id);
    if (newd.length > 0) {
      if (newd[0].role_name.toLowerCase() === "superadmin") {
        newdata = await dbcontroller.getShopsByMall(mall_id);
        send = true;
      } else {
        mall_id = newd[0].mall_id;
        newdata = await dbcontroller.getShopsByMall(mall_id);
        send = true;
      }
      if (send === true) {
        return res.status(200).send(newdata);
      }
    } else {
      return res.status(205).send({ message: "no rows found for this user" });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).send({ error: `server error ${e}` });
  }
});

router.get("/get-all-stores-by-shop-id/:shop_id", async (req, res) => {
  try {
    let { shop_id } = req.params;
    let newdata = await dbcontroller.getAllStoresByShopId(shop_id);
    if (newdata) {
      return res.status(200).send(newdata);
    }
  } catch (e) {
    console.log(e);
    return res.status(500).send({ error: `server error ${e}` });
  }
});

router.get("/get-all-categories-by-shop-id/:shop_id", async (req, res) => {
  try {
    let { shop_id } = req.params;
    let newdata = await dbcontroller.getAllCategoryByShopId(shop_id);
    if (newdata) {
      return res.status(200).send(newdata);
    }
  } catch (e) {
    console.log(e);
    return res.status(500).send({ error: `server error ${e}` });
  }
});

// router.get('/get-shops-by-floor/:floor_id', async (req,res) => {
//     try {
//         let floor_id = req.params.floor_id;
//         let newdata = await dbcontroller.getShopsByFloor(floor_id);
//         if(newdata) {
//             return res.status(200).send(newdata);
//         }
//     }
//     catch(e) {
//         console.log(e)
//         return res.status(500).send({error : 'server error'});
//     }
// })

router.get("/get-shops-by-shop-id/:shop_id", async (req, res) => {
  try {
    let shop_id = req.params.shop_id;
    let newdata = await dbcontroller.getShopById(shop_id);
    if (newdata) {
      return res.status(200).send(newdata);
    }
  } catch (e) {
    console.log(e);
    return res.status(500).send({ error: `server error ${e}` });
  }
});

router.put("/update-shop-status/:id", async (req, res) => {
  try {
    let shop_id = req.params.id;
    let newdata = await dbcontroller.updateShopStatus(shop_id);
    if (newdata) {
      return res.status(200).send(newdata);
    }
  } catch (e) {
    return res.status(500).send({ error: `server error ${e}` });
  }
});

router.post("/add-shop", async (req, res) => {
  try {
    let postdata = req.body;
    let newdata = await dbcontroller.addShops(postdata);
    let finish = false;

    const store_ids = JSON.parse(req.body.store_ids);
    const category_ids = JSON.parse(req.body.category_ids);

    if (newdata) {
      let shop_id = newdata[0].shop_id;
      store_ids.map(async id => {
        const respStoreAdd = await dbcontroller.addShopsToStore(id, shop_id);
        console.log("TCL: respStoreAdd", respStoreAdd);
      });

      category_ids.map(async id => {
        await dbcontroller.addShopsToCategory(id, shop_id);
      });

      let imagetype = "shop-logo";
      const randomFileName = Math.random()
        .toString(36)
        .substring(5);

      const fileNameWithExtension = "shoplogo-" + randomFileName + ".png";
      req.files.logofile.mv(
        `${FILES_PATH}/${fileNameWithExtension}`,
        async err => {
          if (err) {
            console.log(err);
          } else {
            let newdata1 = await dbcontroller.addImage(
              shop_id,
              imagetype,
              fileNameWithExtension
            );
            if (newdata1) {
              finish = false;
            }
          }
        }
      );
      let imagetype2 = "shop-image";
      const fileNameWithExtension1 = "shopimage-" + randomFileName + ".png";
      req.files.shopimage.mv(
        `${FILES_PATH}/${fileNameWithExtension1}`,
        async err => {
          if (err) {
            console.log(err);
            return res
              .status(400)
              .send({ message: `Failed to add the shop: ${err}` });
          } else {
            let newdata1 = await dbcontroller.addImage(
              shop_id,
              imagetype2,
              fileNameWithExtension1
            );
            if (newdata1) {
              finish = true;
            }
          }
          if (finish == true) {
            return res
              .status(200)
              .send({ message: `shops added successfully` });
          }
        }
      );
    }
  } catch (e) {
    console.log(e);
    return res.status(500).send({ error: `server error ${e}` });
  }
});

router.put("/update-shop-logo", (req, res) => {
  try {
    let image_id = req.body.image_id;
    let shop_id = req.body.shop_id;
    let newdata = dbcontroller.imageStatusUpdate(image_id);
    if (newdata) {
      let imagetype = "shop-logo";
      const randomFileName = Math.random()
        .toString(36)
        .substring(5);

      const fileNameWithExtension = "shoplogo-" + randomFileName + ".png";
      req.files.logofile.mv(
        `${FILES_PATH}/${fileNameWithExtension}`,
        async err => {
          if (err) {
            console.log(err);
          } else {
            let newdata1 = await dbcontroller.addImage(
              shop_id,
              imagetype,
              fileNameWithExtension
            );
            if (newdata1) {
              return res.status(200).send(newdata1);
            }
          }
        }
      );
    }
  } catch (e) {
    return res.status(500).send({ error: `server error ${e}` });
  }
});

router.put("/update-shop-image", (req, res) => {
  try {
    let image_id = req.body.image_id;
    let shop_id = req.body.shop_id;
    let newdata = dbcontroller.imageStatusUpdate(image_id);
    if (newdata) {
      let imagetype = "shop-image";
      const randomFileName = Math.random()
        .toString(36)
        .substring(5);

      const fileNameWithExtension = "shopimage-" + randomFileName + ".png";
      req.files.shopimagefile.mv(
        `${FILES_PATH}/${fileNameWithExtension}`,
        async err => {
          if (err) {
            console.log(err);
          } else {
            let newdata1 = await dbcontroller.addImage(
              shop_id,
              imagetype,
              fileNameWithExtension
            );
            if (newdata1) {
              return res.status(200).send(newdata1);
            }
          }
        }
      );
    }
  } catch (e) {
    return res.status(500).send({ error: `server error ${e}` });
  }
});

router.put("/update-shop/:shop_id", async (req, res) => {
  try {
    let shop_id = req.params.shop_id;
    let postdata = req.body;
    let store_ids = JSON.parse(req.body.store_ids)
    let category_ids = JSON.parse(req.body.category_ids);
    let newdata = await dbcontroller.updateShopData(shop_id, postdata);

    store_ids.map(async store_id => {
        await dbcontroller.addShopsToStore(store_id, shop_id);
    });

    category_ids.map(async category_id => {
        await dbcontroller.addShopsToCategory(category_id, shop_id);
    });

    if(req.files){

        let imagetype = "shop-logo";
        const randomFileName = Math.random()
        .toString(36)
        .substring(5);

        const fileNameWithExtension = "shoplogo-" + randomFileName + ".png";
        if(req.files.shop_logo){
            let newdata2 = dbcontroller.updateShopLogo(shop_id);
             req.files.shop_logo.mv(
                `${FILES_PATH}/${fileNameWithExtension}`,
                async err => {
                    if (err) {
                        console.log(err);
                    } else {
                        let newdata1 = await dbcontroller.addImage(
                        shop_id,
                        imagetype,
                        fileNameWithExtension
                        );
                    }
                }
            );
        }
       

        let imagetype2 = "shop-image";
        const fileNameWithExtension1 = "shopimage-" + randomFileName + ".png";
        if(req.files.shop_image){
            let newdata2 = dbcontroller.updateShopImage(shop_id);
              req.files.shop_image.mv(
                `${FILES_PATH}/${fileNameWithExtension1}`,
                async err => {
                    if (err) {
                        console.log(err);
                    } else {
                        let newdata1 = await dbcontroller.addImage(
                        shop_id,
                        imagetype2,
                        fileNameWithExtension1
                        );
                    }
                }
            );
        }
        return res.status(200).send({message : 'Shops update successfully'});
    }
    else {
        return res.status(200).send({message : 'Shops update successfully'});
    }
  } catch (e) {
    console.log(e);
    return res.status(500).send({ error: `server error ${e}` });
  }
});

module.exports = router;
