const { router, dbcontroller, FILES_PATH } = require("./controller-config");

router.post('/add-event', async (req, res) => {
    try {
        let postdata = req.body;
        let finish = false;
       
        let newdata = await dbcontroller.addEvent(postdata);
        if(newdata) {
            let event_id = newdata[0].event_id;
            let imagetype1 = 'event-cover-image';
            const randomFileName1 = Math.random()
                            .toString(36)
                            .substring(5);

            const fileNameWithExtension1  ="event-"+randomFileName1 + ".png";
            req.files.eventcoverimage.mv(`${FILES_PATH}/${fileNameWithExtension1}`,async err => {
                if(err) {
                    console.log(err)
                }
                else {
                    let newdata1 = await dbcontroller.addImage(event_id,imagetype1,fileNameWithExtension1);
                }
            })
            if(req.body.count > 1) {
                 req.files.eventfile.map((file,i) => {
                    let imagetype = 'event';
                    const randomFileName = Math.random()
                                .toString(36)
                                .substring(5);

                    const fileNameWithExtension  ="event-"+randomFileName + ".png";
                    file.mv(`${FILES_PATH}/${fileNameWithExtension}`,async err => {
                        if(err) {
                            console.log(err)
                        }
                        else {
                            let newdata2 = await dbcontroller.addImage(event_id,imagetype,fileNameWithExtension);
                            if(newdata2) {
                            }
                        }
                        if (i+1 == req.files.eventfile.length) {
                            finish = true;
                        }
                        if(finish == true) {
                            return res.status(200).send({message : 'event added successfully'})
                        }
                    })  
                })  
            }
            else {
                let imagetype = 'event';
                const randomFileName = Math.random()
                            .toString(36)
                            .substring(5);

                const fileNameWithExtension  ="event-"+randomFileName + ".png";
                req.files.eventfile.mv(`${FILES_PATH}/${fileNameWithExtension}`,async err => {
                    if(err) {
                        console.log(err)
                    }
                    else {
                        let newdata3 = await dbcontroller.addImage(event_id,imagetype,fileNameWithExtension);
                        if(newdata3) {
                        return res.status(200).send({message : 'event image added successfully'})

                        }
                    }
                })
            }  
        }
    }
    catch(e) {
        console.log(e)
        return res.status(500).send({error : `server error:${e}`});
    }
})

router.get('/get-all-events/:user_id', async (req, res) => {
    try {
        let {user_id} = req.params;
        let {mall_id} = req.query;
        let newdata = [];
        let send = false;
        let newd = await dbcontroller.checkUserById(user_id);   
        if(newd.length > 0){
            if((newd[0].role_name).toLowerCase() === 'superadmin'){
                newdata = await dbcontroller.getEventByMallId(mall_id);
                send = true;
            }
            else {
                mall_id = newd[0].mall_id;
                newdata = await dbcontroller.getEventByMallId(mall_id)
                send = true;
            }
            if(send === true){
                return res.status(200).send(newdata)
            }
        }
        else {
            return res.status(205).send({message : 'no rows find for this user'})
        }
        // let newdata = await dbcontroller.getAllEvents();
        // if(newdata) {
        //     return res.status(200).send(newdata)
        // }
    }
    catch (e) {
        console.log(e)
        return res.status(500).send({error : `server error:${e}`});
    }
})

router.get('/get-events-by-id/:event_id', async (req, res) => {
    try {
        console.log(req.params.event_id)
        let event_id = req.params.event_id;
        let newdata = await dbcontroller.getEventById(event_id);
        if(newdata) {
            return res.status(200).send(newdata);
        }
    }
    catch (e) {
        return res.status(500).send({error : `server error:${e}`});
    }
})

router.get('/get-events-by-mall-id/:mall_id', async (req, res) => {
    try {
        let mall_id = req.params.mall_id;
        let newdata = await dbcontroller.getEventByMallId(mall_id);
        if(newdata) {
            return res.status(200).send(newdata);
        }
    }
    catch (e) {
        return res.status(500).send({error : `server error:${e}`});
    }
})

router.put('/delete-events/:event_id', async (req, res) => {
    try {
        let event_id = req.params.event_id;
        let newdata = await dbcontroller.deleteEvents(event_id);
        if(newdata) {
            return res.status(200).send(newdata);
        }
    }
    catch (e) {
        return res.status(500).send({error : `server error:${e}`});
    }
})

router.put('/update-event/:event_id', async (req, res) => {
    try {
        let event_id = req.params.event_id;
        let postdata = req.body;
        let newdata = await dbcontroller.updateEvent(event_id, postdata);
        if(newdata) {
            if(req.files) {
                let newdata2 = await dbcontroller.updateCoverImage(event_id);
                let imagetype1 = 'event-cover-image';
                const randomFileName1 = Math.random()
                                .toString(36)
                                .substring(5);

                const fileNameWithExtension1  ="event-"+randomFileName1 + ".png";
                req.files.event_cover_image.mv(`${FILES_PATH}/${fileNameWithExtension1}`,async err => {
                    if(err) {
                        console.log(err)
                    }
                    else {
                        let newdata1 = await dbcontroller.addImage(event_id,imagetype1,fileNameWithExtension1);
                        return res.status(200).send({message : 'event updated successfully'})
                    }
                })
            }
            else {
                return res.status(200).send({message : 'event updated successfully'})
            }
        }
       
       
    }
    catch(e) {
        return res.status(500).send({ error : `server error:${e}`})
    }
})

router.put('/add-image-to-event/:event_id', async (req, res) => {
    try {
        let finish = false;
        let event_id = req.params.event_id;
        if(req.body.count > 1) {
             req.files.eventfile.map((file,i) => {
                let imagetype = 'event';
                const randomFileName = Math.random()
                            .toString(36)
                            .substring(5);

                const fileNameWithExtension  ="event-"+randomFileName + ".png";
                file.mv(`${FILES_PATH}/${fileNameWithExtension}`,async err => {
                    if(err) {
                        console.log(err)
                    }
                    else {
                        let newdata1 = await dbcontroller.addImage(event_id,imagetype,fileNameWithExtension);
                        if(newdata1) {
                        }
                    }
                    if (i+1 == req.files.eventfile.length) {
                        finish = true;
                    }
                    if(finish == true) {
                        return res.status(200).send({message : 'event image added successfully'})
                    }
                })  
            })
        }
        else {
            let imagetype = 'event';
            const randomFileName = Math.random()
                        .toString(36)
                        .substring(5);

            const fileNameWithExtension  ="event-"+randomFileName + ".png";
            req.files.eventfile.mv(`${FILES_PATH}/${fileNameWithExtension}`,async err => {
                if(err) {
                    console.log(err)
                }
                else {
                    let newdata1 = await dbcontroller.addImage(event_id,imagetype,fileNameWithExtension);
                    if(newdata1) {
                    return res.status(200).send({message : 'event image added successfully'})

                    }
                }
            })  
        } 
    }
    catch(e) {
        console.log(e)
        return res.status(500).send({error : `server error:${e}`});
    }
})

router.put('/delete-event-image/:image_id', async (req, res) => {
    try {
        let image_id = req.params.image_id;
        let newdata = await dbcontroller.deleteEventImage(image_id);
        if(newdata) {
            return res.status(200).send(newdata)
        }
    }
    catch(e) {
        return res.status(500).send({error : `server error:${e}`});
    }
})

router.put('/update-event-cover-image', async (req, res) => {
    try {
        let {image_id,event_id} = req.body
        let newdata = await dbcontroller.updateCoverImageInActive(image_id);
        if(newdata) {
            let imagetype = 'event-cover-image';
            const randomFileName = Math.random()
                        .toString(36)
                        .substring(5);

            const fileNameWithExtension  ="event-"+randomFileName + ".png";
            req.files.eventcoverimage.mv(`${FILES_PATH}/${fileNameWithExtension}`,async err => {
                if(err) {
                    console.log(err)
                }
                else {
                    let newdata1 = await dbcontroller.addImage(event_id,imagetype,fileNameWithExtension);
                    if(newdata1) {
                    return res.status(200).send({message : 'event cover image added successfully'})

                    }
                }
            }) 
        }
    }
    catch(e) {
        console.log(e)
        return res.status(500).send({error : `server error:${e}`});
    }
})

module.exports = router;