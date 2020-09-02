
const { router, dbcontroller, FILES_PATH } = require("./controller-config");

router.post('/add-banner', async (req, res) => {
    try {
        let postdata = req.body;
        let newdata = await dbcontroller.addBanner(postdata);
        if(newdata) {
            let banner_id = newdata[0].banner_id;
            let imagetype = 'banner';
            const randomFileName = Math.random()
                        .toString(36)
                        .substring(5);

            const fileNameWithExtension  ="banner-"+randomFileName + ".png";
            req.files.bannerimage.mv(`${FILES_PATH}/${fileNameWithExtension}`,async err => {
                if(err) {
                    console.log(err)
                }
                else {
                    let newdata1 = await dbcontroller.addImage(banner_id,imagetype,fileNameWithExtension);
                    if(newdata1) {
                        return res.status(200).send({message : 'banner added successfully'})
                    }
                }
            }) 
        }
    }
    catch(e) {
        console.log(error)
        return res.status(500).send({error : `server error:${e}`});
    }
})

router.get('/get-all-banners/:user_id', async (req, res) => {
    try {
        console.log("banners")
        let {user_id} = req.params;
        let {mall_id} = req.query;
        let newdata = [];
        let send = false;
        console.log("api banners")
        let newd = await dbcontroller.checkUserById(user_id);
        // console.log(newd)   
        if(newd.length > 0){
            if((newd[0].role_name).toLowerCase() === 'superadmin'){
                console.log(mall_id)
                newdata = await dbcontroller.getBannersByMallId(mall_id);
                send = true;
            }
            else {
                mall_id = newd[0].mall_id;
                newdata = await dbcontroller.getBannersByMallId(mall_id)
                send = true;
            }
            if(send === true){
                return res.status(200).send(newdata)
            }
        }
        else {
            return res.status(205).send({message : 'no rows find for this user'})
        }
       
    }
    catch(e) {
        console.log(e)
        return res.status(500).send({error : `server error:${e}`});
    } 
})

router.get('/get-banners-by-id/:banner_id', async (req, res) => {
    try {
        let {banner_id} = req.params;
        let newdata = await dbcontroller.getBannersById(banner_id);
        if(newdata) {
            return res.status(200).send(newdata)
        }
    }
    catch(e) {
        return res.status(500).send({error : `server error:${e}`});
    }
})

router.get('/get-banners-by-mall-id/:mall_id', async (req, res) => {
    try {
        let {mall_id} = req.params;
        let newdata = await dbcontroller.getBannersByMallId(mall_id);
        if(newdata) {
            return res.status(200).send(newdata);
        }
    }
    catch(e) {
        return res.status(500).send({error : `server error:${e}`});
    }
})

router.put('/update-banner/:banner_id', async (req, res) => {
    try {
        let {banner_id} = req.params;
        let postdata = req.body.data;
        let newdata = await dbcontroller.updateBanner(banner_id,postdata);
        if(newdata) {
            return res.status(200).send(newdata);
        }
    }
    catch(e) {
        return res.status(500).send({error : `server error:${e}`});
    }
})

router.put('/delete-banner/:banner_id', async (req, res) => {
    try {
        let {banner_id} = req.params;
        let newdata = await dbcontroller.deleteBanner(banner_id);
        if(newdata) { 
            return res.status(200).send(newdata);
        }
    }
    catch(e) {
        return res.status(500).send({error : `server error:${e}`});
    }
})

router.put('/update-banner-image', async (req, res) => {
    try {
        let {image_id,banner_id} = req.body;
        let newdata = await dbcontroller.updateBannerImage(image_id);
        if(newdata) { 
            let imagetype = 'banner';
            const randomFileName = Math.random()
                        .toString(36)
                        .substring(5);

            const fileNameWithExtension  ="banner-"+randomFileName + ".png";
            req.files.bannerimage.mv(`${FILES_PATH}/${fileNameWithExtension}`,async err => {
                if(err) {
                    console.log(err)
                }
                else {
                    let newdata1 = await dbcontroller.addImage(banner_id,imagetype,fileNameWithExtension);
                    if(newdata1) {
                        return res.status(200).send({message : 'banner image updated'});
                    }
                }
            }) 
        }
    }
    catch(e) {
        return res.status(500).send({error : `server error:${e}`})
    }
})

module.exports = router;