getshopJsonFormat =(newdata) => {
    try {
        let arrayNew = [];
        let json_ready = false;
        let found = false;
        let finish = false
        if(newdata.length > 0) {
            newdata.map((data,i) => {
                data.store_list.map((stores) => {
                    stores.shop_list.map((shops) => {
                        if(arrayNew.length > 0){
                            arrayNew.map((a,j) => {
                                if(a.shop_name === shops.shop_name){
                                    found = true;
                                }
                                if(j+1 === arrayNew.length){
                                    finish = true
                                }
                            })
                            if( finish === true && found != true){
                                let obj = {};
                                obj = {
                                    shop_id : shops.shop_id, 
                                    shop_name : shops.shop_name, 
                                    contact_number : shops.contact_number,
                                    image_list : shops.image_list
                                }
                                arrayNew.push(obj)
                            }
                        }
                        else {
                            let obj = {};
                            obj = {
                                shop_id : shops.shop_id, 
                                shop_name : shops.shop_name, 
                                contact_number : shops.contact_number,
                                image_list : shops.image_list
                            }
                            arrayNew.push(obj)  
                        }
                        found = false;
                    })
                })
                if(i+1 === newdata.length) {
                    json_ready = true;
                }
            })
            if(json_ready === true) {
                return arrayNew
            }
        }
    }
    catch(e){
        console.log(e)
    }
}

getOfferJSONFormat = (newdata) => {
    try {
        let newarray = [];
        let json_ready = false;
        let found = false;
        let finish = false;
        newdata.map((data, i) => {
            data.store_list.map((stores) => {
                stores.shop_list.map((shops) => {
                   shops.offer_list.map((offers) => {
                       if(newarray.length > 0){
                            newarray.map((n, j) => {
                                if(n.offer_id === offers.offer_id){
                                    found = true;
                                }
                                if(j+1 === newarray.length){
                                    finish = true
                                }
                            })
                            if( finish === true && found != true){
                                let newobj = {
                                    shop_id : shops.shop_id,
                                    shop_name : shops.shop_name,
                                    offer_id : offers.offer_id,
                                    offer_name : offers.offer_name,
                                    description : offers.description,
                                    validity : offers.validity,
                                    status : offers.status,
                                    image_list : offers.image_list
                                }
                                newarray.push(newobj)
                            }
                       }
                       else {
                           let newobj = {
                                shop_id : shops.shop_id,
                                shop_name : shops.shop_name,
                                offer_id : offers.offer_id,
                                offer_name : offers.offer_name,
                                description : offers.description,
                                validity : offers.validity,
                                status : offers.status,
                                image_list : offers.image_list
                            }
                            newarray.push(newobj)
                       }
                       found = false
                   })
                })
            })
            if(i+1 === newdata.length) {
                    json_ready = true;
            }
        })
        if(json_ready === true) {
            return newarray
        }
    }
    catch(e){
        console.log(e)
    }
}

getScreenJSONFormat = (newdata) => {
    try {
        let newarray = [];
        let json_ready = false;
        let found = false;
        let finish = false;
        newdata.map((data, i ) => {
            if(data.screen_list != null){
                data.screen_list.map((screen) => {
                    let newobj = {
                        mall_name : data.mall_name,
                        device_name : screen.device_name,
                        device_unique_id : screen.device_unique_id
                    }
                    newarray.push(newobj)
                })
            }

            if(i+1 === newdata.length){
                finish = true
            }
        })

        if(finish == true) {
            return newarray;
        }
    }
    catch(e) {
        console.log(e)
    }
}

getshopsWithstoreAndCategory = (categorydata,storedata) => {
    let arraynew = [];
    let category_array = [];
    let category_finish = false
    let found = false;
    categorydata.map((shops1, i) => {
        storedata.map((shops2, j) => {
            if(shops1.shop_id === shops2.shop_id){
                category_array = []
                shops1.category_list.map((category)=>{
                    if(category_array.length > 0){
                        category_array.map((categories,k) => {
                            if(categories.category_id === category.category_id){
                                found = true;  
                            }
                            if(k+1 === category_array.length){
                                category_finish = true
                            }
                        })
                        if( category_finish === true && found != true){
                            let obj1 = {
                                category_id : category.category_id,
                                category_name : category.category_name,
                                status : category.status
                            }
                            category_array.push(obj1)
                        }
                    }
                    else{
                        let obj1 = {
                            category_id : category.category_id,
                            category_name : category.category_name,
                            status : category.status
                        }
                        category_array.push(obj1)
                    }
                })
                let obj = {
                    shop_id : shops2.shop_id,
                    shop_name : shops2.shop_name,
                    contact_number : shops2.contact_number,
                    status : shops2.status,
                    store_list : shops2.store_list,
                    category_list : category_array
                }
                arraynew.push(obj)
            }
            found = false;
        })
    })
    return arraynew
}

getShopsDetais = (shops1,shops2) =>{
    let arraynew = [];
    shops1.map((shop1) =>{
        shops2.map((shop2) => {
            if(shop1.shop_id === shop2.shop_id){
                let obj1 = {
                    shop_id : shop2.shop_id,
                    shop_name : shop2.shop_name,
                    contact_number :shop2.contact_number,
                    status : shop2.status,
                    image_list : shop1.image_list,
                    store_list : shop2.store_list,
                    category_list : shop2.category_list
                }
                arraynew.push(obj1);
            }
        })
    })
    return arraynew;
}

module.exports = {
    getshopJsonFormat, 
    getOfferJSONFormat, 
    getshopsWithstoreAndCategory,
    getShopsDetais,
    getScreenJSONFormat
}