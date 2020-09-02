const dbquery = require('../db/dbquery');
const pool = require('../db/dbconfig')
const moment = require('moment-timezone');

let {getshopJsonFormat, getOfferJSONFormat, getshopsWithstoreAndCategory} = require('./array_formatter');

try {
    pool.connect()
}
catch(err) {
    console.log('database connection error', err)
}

/************************* MALL DB CONTROLLER ***********************/
module.exports.checkForMalls = async function(name,location) {
    let data = await pool.query(dbquery.checkForMalls, [name,location]);
    return data.rows;
}

module.exports.getMalls = async function() {
    let data  = await pool.query(dbquery.getAllMalls);
    return data.rows;
}

module.exports.getMallByID = async function(mall_id) {
    let data  = await pool.query(dbquery.getMallByID, [mall_id]);
    return data.rows;
}

module.exports.addMall = async function(postdata) {
    let { name, location} = postdata;
    let status = true;
    let createdAt = moment().tz('Asia/kolkata').format('YYYY-MM-DD HH:mm:ss');
    let updatedAt = moment().tz('Asia/kolkata').format('YYYY-MM-DD HH:mm:ss');
    let data = await pool.query(dbquery.addMall, [name,location,status,createdAt,updatedAt]);
    return data.rows;
}

module.exports.updateMallStatus = async function(mall_id) {
    let updatedAt = moment().tz('Asia/kolkata').format('YYYY-MM-DD HH:mm:ss');
    let data  = await pool.query(dbquery.updateMallStatus, [false,updatedAt,mall_id]);
    return data.rows;
}

module.exports.updateMallLogo = async function(image_id) {
    let updatedAt = moment().tz('Asia/kolkata').format('YYYY-MM-DD HH:mm:ss');
    let data = await pool.query(dbquery.imageStatusUpdate, [false,updatedAt,image_id])
    return data.rows; 
}

/**************  ROLE DB CONTROLLER *****************/
module.exports.CheckForRole = async function(name) {
    let data = await pool.query(dbquery.CheckForRole, [name])
    return data.rows;
}

module.exports.getAllRoles = async function() {
    let data  = await pool.query(dbquery.getAllRoles);
    return data.rows;
}

module.exports.getRoleExceptsuperadmin = async function() {
    let data = await pool.query(dbquery.getRoleExceptsuperadmin);
    return data.rows;
}

module.exports.addRole = async function(postdata) {
    let {name} = postdata;
    let status = true;
    let createdAt = moment().tz('Asia/kolkata').format('YYYY-MM-DD HH:mm:ss');
    let updatedAt = moment().tz('Asia/kolkata').format('YYYY-MM-DD HH:mm:ss');
    let data = await pool.query(dbquery.addRole, [name,status,createdAt,updatedAt]);
    return data.rows;
}

module.exports.getRoleByID = async function(role_id) {
    let data = await pool.query(dbquery.getRoleByID, [role_id]);
    return data.rows;
}

module.exports.updateRoleStatus = async function(role_id){
    let updatedAt = moment().tz('Asia/kolkata').format('YYYY-MM-DD HH:mm:ss');
    let data = await pool.query(dbquery.updateRoleStatus, [false,updatedAt,role_id]);
    return data.rows; 
}

module.exports.updateRole = async function(role_id,role_name){
    let updatedAt = moment().tz('Asia/kolkata').format('YYYY-MM-DD HH:mm:ss');
    let data = await pool.query(dbquery.updateRole, [role_name,updatedAt,role_id]);
    return data.rows; 
}

/************************* USER DB CONTROLLER **********************/
module.exports.checkForEmailValidity = async function(email) {
    let data = await pool.query(dbquery.checkForEmailValidity, [email]);
    return data.rows;
}

module.exports.addUser = async function(postdata) {
    let ndata = await generatePassword();
    if(ndata){
        let status = true;
        let password = ndata;
        let {role_id, mall_id, email, phone, name} = postdata;
        let createdAt = moment().tz('Asia/kolkata').format('YYYY-MM-DD HH:mm:ss');
        let updatedAt = moment().tz('Asia/kolkata').format('YYYY-MM-DD HH:mm:ss');
        let data = await pool.query(dbquery.addUser,
            [name, password, role_id, mall_id, createdAt, updatedAt, status, email, phone]);
        return data.rows;
    } 
}

generatePassword = async () => {
    let password = Math.floor(100000 + Math.random() * 900000)
    let data1 = await pool.query(dbquery.checkPassword, [password]);
    if(data1.rows.length === 0) {
        return password
    }
    else {
        return generatePassword();
    }
}

module.exports.changeUserPassword = async function (user_id) {
    let ndata = await generatePassword();
    if(ndata){
        let password = ndata;
        let updatedAt = moment().tz('Asia/kolkata').format('YYYY-MM-DD HH:mm:ss');
        let data = await pool.query(dbquery.changePassword, [ password,updatedAt,user_id]);
        return data.rows;
    } 
}

module.exports.getAllUsers = async function () {
    let data = await pool.query(dbquery.getAllUsers);
    return data.rows;
}

module.exports.getUsersByMall = async function (mall_id) {
    let data = await pool.query(dbquery.getUsersByMall, [mall_id])
    return data.rows 
}

module.exports.getUserbyId = async function (user_id) {
    let data = await pool.query(dbquery.getUsersById, [user_id])
    return data.rows
}

module.exports.updateUserStatus = async function (user_id) {
    let updatedAt = moment().tz('Asia/kolkata').format('YYYY-MM-DD HH:mm:ss');
    let data = await pool.query(dbquery.updateUserStatus, [false,updatedAt,user_id])
    return data.rows
}

module.exports.updateUser = async function (user_id, postdata) {
    let { email, phone, name, role_id } = postdata;
    let updatedAt = moment().tz('Asia/kolkata').format('YYYY-MM-DD HH:mm:ss');
    let data = await pool.query(dbquery.updateUser,
        [email,phone,name,role_id,updatedAt,user_id]);
    return data.rows;
}

/*************************** FLOOR DB CONTROLLER ****************************/

module.exports.checkForFloor = async function(mall_id,name,alias) {
    let data = await pool.query(dbquery.checkForFloor, [name,alias,mall_id]);
    return data.rows;
}

module.exports.addFloor = async function(postdata) {
    let { name, alias, mall_id} = postdata;
    let status = true;
    let createdAt = moment().tz('Asia/kolkata').format('YYYY-MM-DD HH:mm:ss');
    let updatedAt = moment().tz('Asia/kolkata').format('YYYY-MM-DD HH:mm:ss'); 
    let data = await pool.query(dbquery.addFloor,
        [name,alias,mall_id,status,createdAt,updatedAt]);
    return data.rows;
}

module.exports.getFloor = async function() {
    let data = await pool.query(dbquery.getFloor)
    return data.rows;
}

module.exports.getFloorById = async function(floor_id) {
    let data = await pool.query(dbquery.getFloorById, [floor_id])
    return data.rows;
}

module.exports.getFloorByMallId = async function(mall_id) {
    let data = await pool.query(dbquery.getFloorByMallId, [mall_id])
    return data.rows;
}

module.exports.updateFloorData = async function(floor_id,postdata) { 
    let { name, alias, atm, wheelchair, babycare, washroom } = postdata;
    let updatedAt = moment().tz('Asia/kolkata').format('YYYY-MM-DD HH:mm:ss');
    let data = await pool.query(dbquery.updateFloorData,
        [name,alias,updatedAt,floor_id]);
    return data.rows;
}

module.exports.updateFloorStatus = async function(floor_id) {
    let updatedAt = moment().tz('Asia/kolkata').format('YYYY-MM-DD HH:mm:ss');
    let data = await pool.query(dbquery.updateFloorStatus, 
        [false,updatedAt,floor_id]);
    return data.rows
}

module.exports.updateFloorImage = async function(image_id) {
    let updatedAt = moment().tz('Asia/kolkata').format('YYYY-MM-DD HH:mm:ss');
    let data = await pool.query(dbquery.imageStatusUpdate, 
        [false,updatedAt,image_id]);
    return data.rows;
}

/*************************** CATEGORY DB CONTROLLER ****************************/

module.exports.checkForCategory = async function(name) {
    let data = await pool.query(dbquery.checkForCategory, [name]);
    return data.rows;
}

module.exports.addCategory = async function(postdata) {
    let {name} = postdata;
    let status = true;
    let createdAt = moment().tz('Asia/kolkata').format('YYYY-MM-DD HH:mm:ss');
    let updatedAt = moment().tz('Asia/kolkata').format('YYYY-MM-DD HH:mm:ss'); 
    let data = await pool.query(dbquery.addCategory, 
        [name,status,createdAt,updatedAt]);
    return data.rows
}

module.exports.getAllCategory = async function() {
    let data = await pool.query(dbquery.getAllCategory);
    return data.rows;
}

module.exports.getCategoryById = async function(category_id) {
    let data = await pool.query(dbquery.getCategoryById, [category_id]);
    return data.rows;
}

module.exports.updateCategoryById = async function(category_id,postdata) {
    let { name, status } = postdata;
    let updatedAt = moment().tz('Asia/kolkata').format('YYYY-MM-DD HH:mm:ss');
    let data = await pool.query(dbquery.updateCategoryById, 
        [name,true,updatedAt,category_id]);
    return data.rows;
}

module.exports.updateCategoryStatus = async function(category_id) {
    let updatedAt = moment().tz('Asia/kolkata').format('YYYY-MM-DD HH:mm:ss');
    let data = await pool.query(dbquery.updateCategoryStatus, 
        [false,updatedAt,category_id]);
    return data.rows;
}

/*************************** SHOPS DB CONTROLLER ****************************/
module.exports.getShops = async function(mall_id) {
    let data = await pool.query(dbquery.getShops,[mall_id]);
    return data.rows
}


module.exports.getAllShops = async function() {
    let data = await pool.query(dbquery.getAllShops);
    let newdata = getshopJsonFormat(data.rows)
    return newdata;
}

module.exports.getShopsByMall = async function(mall_id) {
    let data = await pool.query(dbquery.getShopsByMall, [mall_id]);
    let newdata = getshopJsonFormat(data.rows)
    return newdata;
}

module.exports.getAllStoresByShopId = async function(shop_id) {
    let data = await pool.query(dbquery.getAllStoresByShopId, [shop_id]);
    return data.rows;
}

module.exports.getAllCategoryByShopId = async function(shop_id) {
    let data = await pool.query(dbquery.getAllCategoryByShopId, [shop_id]);
    return data.rows;
}

module.exports.getShopsByFloor = async function(floor_id) {
    let data = await pool.query(dbquery.getShopsByFloor, [floor_id]);
    return data.rows;
}

module.exports.getShopById = async function(shop_id) {
    let data = await pool.query(dbquery.getShopById, [shop_id]);
    return data.rows;
}

module.exports.updateShopStatus = async function(shop_id) {
    let updatedAt = moment().tz('Asia/kolkata').format('YYYY-MM-DD HH:mm:ss');
    let data = await pool.query(dbquery.updateShopStatus, [false,updatedAt,shop_id]);
    return data.rows;
}

module.exports.addShops = async function(postdata) {
    let { name, phone } = postdata
    let status = true;
    let createdAt = moment().tz('Asia/kolkata').format('YYYY-MM-DD HH:mm:ss');
    let updatedAt = moment().tz('Asia/kolkata').format('YYYY-MM-DD HH:mm:ss');
    let data = await pool.query(dbquery.addShops, 
        [name,phone,status,createdAt,updatedAt])
    return data.rows;
}

module.exports.addShopsToStore = async function (store_id,shop_id) {
    let createdAt = moment().tz('Asia/kolkata').format('YYYY-MM-DD HH:mm:ss');
    let updatedAt = moment().tz('Asia/kolkata').format('YYYY-MM-DD HH:mm:ss');
    let data = await pool.query(dbquery.addShopsToStore, [shop_id,store_id,true,createdAt,updatedAt]);
    return data.rows;
}

module.exports.addShopsToCategory = async function (category_id,shop_id) {
    let createdAt = moment().tz('Asia/kolkata').format('YYYY-MM-DD HH:mm:ss');
    let updatedAt = moment().tz('Asia/kolkata').format('YYYY-MM-DD HH:mm:ss');
    let data = await pool.query(dbquery.addShopsToCategory,
        [shop_id,category_id,true,createdAt,updatedAt]);
    return data.rows
}

module.exports.updateShopData = async function(shop_id,postdata) {
    let { name, contact_number } = postdata;
    let updatedAt = moment().tz('Asia/kolkata').format('YYYY-MM-DD HH:mm:ss'); 
    let data = await pool.query(dbquery.updateShopData, [name,contact_number,updatedAt,shop_id]); 
    await pool.query(dbquery.updateShopsToStore, [shop_id,false,updatedAt])
    await pool.query(dbquery.updateShopsToCategory, [shop_id,false,updatedAt])
    return data.rows
}

module.exports.updateShopLogo = async function(shop_id) {
    let updatedAt = moment().tz('Asia/kolkata').format('YYYY-MM-DD HH:mm:ss'); 
    let image_type_id = shop_id;
    let image_type = 'shop-logo';
    let data = await pool.query(dbquery.updateShopLogo, [false,updatedAt,image_type_id,image_type]); 
    return data.rows
}

module.exports.updateShopImage = async function(shop_id) {
    let updatedAt = moment().tz('Asia/kolkata').format('YYYY-MM-DD HH:mm:ss'); 
    let image_type_id = shop_id;
    let image_type = 'shop-image';
    let data = await pool.query(dbquery.updateShopLogo, [false,updatedAt,image_type_id,image_type]); 
    return data.rows
}
/*************************** STORE DB CONTROLLER ****************************/
module.exports.getStores = async function(mall_id) {
    let data = await pool.query(dbquery.getStores,[mall_id]);
    return data.rows;
}

module.exports.checkForStore = async function(mall_id,store_number) {
    let data = await pool.query(dbquery.checkForStore, [mall_id,store_number]);
    return data.rows;
}

module.exports.addStore = async function(postdata) {
    let createdAt = moment().tz('Asia/kolkata').format('YYYY-MM-DD HH:mm:ss');
    let updatedAt = moment().tz('Asia/kolkata').format('YYYY-MM-DD HH:mm:ss'); 
    let status = true;
    let floor_id = parseInt(postdata.floor_id);
    let store_number = parseInt(postdata.store_number);
    let data = await pool.query(dbquery.addStore,
        [store_number,floor_id,status,createdAt,updatedAt]);
    return data.rows;
}

module.exports.getAllStores = async function() {
    let data = await pool.query(dbquery.getAllStores);
    return data.rows;
}

module.exports.getStoreByMallId = async function(mall_id) {
    let data = await pool.query(dbquery.getStoreByMallId, [mall_id]);
    return data.rows;
}

module.exports.getStoreById = async function (store_id) {
    let data = await pool.query(dbquery.getStoreById, [store_id])
    return data.rows
}

module.exports.getStoreByFloorId = async function(floor_id) {
    let data = await pool.query(dbquery.getStoreByFloorId, [floor_id]);
    console.log(data.rows)
    return data.rows;
}

module.exports.updateStoreStatus = async function(store_id) {
    let updatedAt = moment().tz('Asia/kolkata').format('YYYY-MM-DD HH:mm:ss'); 
    let data = await pool.query(dbquery.updateStoreStatus, [false,updatedAt,store_id]);
    return data.rows;
}

module.exports.getAllEmptyStores = async function() {
    let data = await pool.query(dbquery.getAllEmptyStores);
    return data.rows;
}

/*************************** IMAGE DB CONTROLLER ****************************/
module.exports.addImage = async function(image_type_id,image_type,image_url) {
    console.log('add image')
    let createdAt = moment().tz('Asia/kolkata').format('YYYY-MM-DD HH:mm:ss');
    let updatedAt = moment().tz('Asia/kolkata').format('YYYY-MM-DD HH:mm:ss'); 
    let status = true;
    let data = await pool.query(dbquery.addImage,
        [image_url,image_type_id,createdAt,updatedAt,status,image_type]);
        console.log(data.rows)
    return data.rows;
}

module.exports.imageStatusUpdate = async function(image_id) {
    let updatedAt = moment().tz('Asia/kolkata').format('YYYY-MM-DD HH:mm:ss'); 
    let data = await pool.query(dbquery.imageStatusUpdate, [false,updatedAt,image_id]);
    return data.rows
}

/***************************** MAIN-CARD DB CONTROLLER **************************/

module.exports.checkForMainCard = async function(main_card_name,mall_id) {
    let data = await pool.query(dbquery.checkForMainCard, [main_card_name,mall_id]);
    return data.rows;
}

module.exports.addMainCard = async function(main_card_name,mall_id) {
    let createdAt = moment().tz('Asia/kolkata').format('YYYY-MM-DD HH:mm:ss');
    let updatedAt = moment().tz('Asia/kolkata').format('YYYY-MM-DD HH:mm:ss'); 
    let data = await pool.query(dbquery.addMainCard, 
        [main_card_name,mall_id,createdAt,updatedAt,true])
    return data.rows
}

module.exports.changeMainCardImage = async function(image_id) { 
    let updatedAt = moment().tz('Asia/kolkata').format('YYYY-MM-DD HH:mm:ss');
    let data = await pool.query(dbquery.changeMainCardImage, [false,updatedAt,image_id]);
    return data.rows;
}

module.exports.mainCardStatusUpdate = async function(main_card_id) {
    let updatedAt = moment().tz('Asia/kolkata').format('YYYY-MM-DD HH:mm:ss');
    let data = await pool.query(dbquery.mainCardStatusUpdate, [false,updatedAt,main_card_id]);
    return data.rows;
}

module.exports.updateMainCardMall = async function(postdata) {
    let {mall_id, main_card_id} = postdata;
    let updatedAt = moment().tz('Asia/kolkata').format('YYYY-MM-DD HH:mm:ss');
    let data = await pool.query(dbquery.updateMainCardMall, [mall_id,updatedAt,main_card_id]);
    return data.rows;
}

module.exports.getAllMainCards = async function() {
    let data = await pool.query(dbquery.getAllMainCards);
    return data.rows;
}

module.exports.getMainCardsByMallId = async function(mall_id) {
    let data = await pool.query(dbquery.getMainCardsByMallId, [mall_id]);
    return data.rows
}

module.exports.getMainCardsById = async function(main_card_id) {
    let data = await pool.query(dbquery.getMainCardsById, [main_card_id]);
    return data.rows;
}

/**************************** OFFERS DB CONTROLLER *******************************/

module.exports.addOffers = async function(postdata) {
    let {offer_name, desc, validity, shop_id} = postdata;
    let createdAt = moment().tz('Asia/kolkata').format('YYYY-MM-DD HH:mm:ss');
    let updatedAt = moment().tz('Asia/kolkata').format('YYYY-MM-DD HH:mm:ss');
    let status = true;
    let data = await pool.query(dbquery.addOffer,
        [offer_name,desc,validity,shop_id,status,createdAt,updatedAt])
    return data.rows;
}

module.exports.getAllOffers = async function() {
    let data = await pool.query(dbquery.getAllOffers);
    let newdata = getOfferJSONFormat(data.rows)
    return newdata;
}

module.exports.getOffersByMall = async function(mall_id) {
    let data = await pool.query(dbquery.getOffersByMall, [mall_id]);
    let newdata = getOfferJSONFormat(data.rows)
    return newdata;
}

module.exports.getOffersById = async function(offer_id) {
    let data = await pool.query(dbquery.getOffersById, [offer_id])
    let newdata = getOfferJSONFormat(data.rows)
    return newdata;
}

module.exports.getOffersByShopId = async function(shop_id) {
    let data = await pool.query(dbquery.getOffersByShopId, [shop_id]);
    return data.rows;
}

module.exports.updateOfferValidity = async function(offer_id,offer_validity_date) {
    let updatedAt = moment().tz('Asia/kolkata').format('YYYY-MM-DD HH:mm:ss');
    let data = await pool.query(dbquery.updateOfferValidity,
        [offer_validity_date,updatedAt,offer_id]);
    return data.rows; 
}

module.exports.updateOfferData = async function(offer_id,postdata) {
    let {offer_name, desc, validity, shop_id} = postdata;
    let updatedAt = moment().tz('Asia/kolkata').format('YYYY-MM-DD HH:mm:ss');
    let data = await pool.query(dbquery.updateOfferData,
        [offer_name,desc,validity,updatedAt,shop_id,offer_id]) 
    return data.rows;
}

module.exports.updateOfferStatus = async function(offer_id) {
    let updatedAt = moment().tz('Asia/kolkata').format('YYYY-MM-DD HH:mm:ss');
    let data = await pool.query(dbquery.updateOfferStatus, [false,updatedAt,offer_id])
    return data.rows;  
}

/*************************** EVENT DB CONTROLLER *************************/

module.exports.addEvent = async function(postdata) {
    let {event_name, desc, startdate, enddate, mall_id} = postdata;
    let createdAt = moment().tz('Asia/kolkata').format('YYYY-MM-DD HH:mm:ss');
    let updatedAt = moment().tz('Asia/kolkata').format('YYYY-MM-DD HH:mm:ss');
    console.log("TCL: enddate", enddate);
    console.log("TCL: startdate", startdate);
    let status = true;
    let data = await pool.query(dbquery.addEvent,
        [event_name,desc,moment(startdate).format('YYYY-MM-DD'),moment(enddate).format('YYYY-MM-DD'),
            createdAt,updatedAt,status,mall_id]);
    return data.rows;
}

module.exports.getAllEvents = async function() {
    let data = await pool.query(dbquery.getAllEvents);
    return data.rows
}

module.exports.getEventById = async function(event_id) {
    let data = await pool.query(dbquery.getEventById, [event_id]);
    return data.rows;
}

module.exports.getEventByMallId = async function(mall_id) {
    let data = await pool.query(dbquery.getEventByMallId, [mall_id]);
    return data.rows;
}

module.exports.deleteEvents = async function(event_id) {
    let updatedAt = moment().tz('Asia/kolkata').format('YYYY-MM-DD HH:mm:ss');
    let status = false;
    let data = await  pool.query(dbquery.deleteEvents, [status,updatedAt,event_id])
    return data.rows;
}

module.exports.updateEvent = async function(event_id, postdata) {
    let updatedAt = moment().tz('Asia/kolkata').format('YYYY-MM-DD HH:mm:ss');
    let {event_name, description, startdate, enddate} = postdata;
    let data = await pool.query(dbquery.updateEvent,
        [event_name,description,startdate,enddate,updatedAt,event_id])
    return data.rows;
}

module.exports.deleteEventImage = async function(image_id) {
    let updatedAt = moment().tz('Asia/kolkata').format('YYYY-MM-DD HH:mm:ss');
    let data = await pool.query(dbquery.deleteEventImage, [false,updatedAt,image_id]);
    return data.rows;  
} 

module.exports.updateCoverImageInActive = async function(image_id) {
    let updatedAt = moment().tz('Asia/kolkata').format('YYYY-MM-DD HH:mm:ss');
    let data = await pool.query(dbquery.imageStatusUpdate, [false,updatedAt,image_id])
    return data.rows;
}

module.exports.updateCoverImage = async function(event_id) {
     let updatedAt = moment().tz('Asia/kolkata').format('YYYY-MM-DD HH:mm:ss');
     let image_type_id = event_id;
     let image_type = 'event-cover-image';
    let data = await pool.query(dbquery.updateCoverImage, [false,updatedAt,image_type_id,image_type])
    return data.rows;
}

/************************* BANNER DB CONTROLLER **********************/

module.exports.addBanner = async function(postdata) {
    let {banner_name, validity, mall_id} = postdata;
    let createdAt = moment().tz('Asia/kolkata').format('YYYY-MM-DD HH:mm:ss');
    let updatedAt = moment().tz('Asia/kolkata').format('YYYY-MM-DD HH:mm:ss');
    let status = true;
    let data = await pool.query(dbquery.addBanner, 
        [banner_name,validity,createdAt,updatedAt,status,mall_id]);
    return data.rows;
}

module.exports.getAllBanners = async function() {
    let data = await pool.query(dbquery.getAllBanners);
    return data.rows;
}

module.exports.getBannersById = async function(banner_id) {
    let data = await pool.query(dbquery.getBannersById, [banner_id]);
    return data.rows;
}

module.exports.getBannersByMallId = async function(mall_id) {
    let data = await pool.query(dbquery.getBannersByMallId, [mall_id]);
    return data.rows;
}

module.exports.updateBanner = async function(banner_id,postdata) {
    let {banner_name, validity, mall_id} = postdata;
    let updatedAt = moment().tz('Asia/kolkata').format('YYYY-MM-DD HH:mm:ss');
    let data = await pool.query(dbquery.updateBanner,
        [banner_name,validity,mall_id,updatedAt,banner_id]);
    return data.rows;
}

module.exports.deleteBanner = async function(banner_id) {
    let updatedAt = moment().tz('Asia/kolkata').format('YYYY-MM-DD HH:mm:ss');
    let data = await pool.query(dbquery.deleteBanner, [false,updatedAt,banner_id]);
    return data.rows;
}

module.exports.updateBannerImage = async function(image_id) { 
    let updatedAt = moment().tz('Asia/kolkata').format('YYYY-MM-DD HH:mm:ss');
    let data = await pool.query(dbquery.imageStatusUpdate, [false,updatedAt,image_id]);
    return data.rows;
}

/*********************************** MALL-INFO DB CONTROLLER ************************/

module.exports.addMallInfo = async function(postdata) {
    let {helptext, phone, email, mall_id} = postdata;
    let createdAt = moment().tz('Asia/kolkata').format('YYYY-MM-DD HH:mm:ss');
    let updatedAt = moment().tz('Asia/kolkata').format('YYYY-MM-DD HH:mm:ss');
    let status = true;
    let data = await pool.query(dbquery.addMallInfo,
        [helptext,phone,email,mall_id,status,createdAt,updatedAt]);
    return data.rows;
}

module.exports.getAllMallInfo = async function() {
    let data = await pool.query(dbquery.getAllMallInfo);
    return data.rows;
}

module.exports.getMallInfoById = async function(mall_info_id) {
    let data = await pool.query(dbquery.getMallInfoById, [mall_info_id]);
    return data.rows;
}

module.exports.getMallInfoByMallId = async function(mall_id) { 
    let data = await pool.query(dbquery.getMallInfoByMallId, [mall_id]);
    return data.rows;
}

module.exports.updateMallInfo = async function(mall_info_id,postdata) {
    let {helptext, phone, email, mall_id} = postdata;
    let updatedAt = moment().tz('Asia/kolkata').format('YYYY-MM-DD HH:mm:ss');
    let data = await pool.query(dbquery.updateMallInfo,
        [helptext,phone,email,mall_id,updatedAt,mall_info_id]);
    return data.rows;
}

module.exports.deleteMallInfo = async function(mall_info_id) {
    let updatedAt = moment().tz('Asia/kolkata').format('YYYY-MM-DD HH:mm:ss');
    let data = await pool.query(dbquery.deleteMallInfo, [false,updatedAt,mall_info_id]);
    return data.rows;
}

/****************************** LOGIN related ************************ */

module.exports.getLoginData = async function(email) {
    let data = await pool.query(dbquery.getLoginData, [email,true]);
    return data.rows;
}


module.exports.checkUserById = async function(user_id) {
    let data = await pool.query(dbquery.checkUserById, [user_id]);
    return data.rows;
}

/**************************** Screen related *******************************/

module.exports.addScreen = async function(postdata) {
    let {device_unique_id,mall_id,device_name} = postdata;
    let status = true;
    let createdAt = moment().tz('Asia/kolkata').format('YYYY-MM-DD HH:mm:ss');
    let updatedAt = moment().tz('Asia/kolkata').format('YYYY-MM-DD HH:mm:ss');
    let data = await pool.query(dbquery.addScreen, 
        [device_unique_id,mall_id,status,createdAt,updatedAt,device_name]);
    return data.rows;
}

module.exports.getAllScreens = async function() {
    let data = await pool.query(dbquery.getAllScreens);
    return data.rows;
}

module.exports.getScreenByMallId = async function(mall_id) {
    let data = await pool.query(dbquery.getScreenByMallId, [mall_id]);
    return data.rows;
}

module.exports.getScreenById = async function(screen_id) {
    let data = await pool.query(dbquery.getScreenById, [screen_id]);
    let newdata = getScreenJSONFormat(data.rows)
    return newdata;
    return data.rows;
}

module.exports.updateScreenStatus = async function(screen_id) {
    let data = await pool.query(dbquery.updateScreenStatus, [screen_id]);
    return data.rows;
}


/***********************device related *******************************/

module.exports.getDeviceData = async function(device_id) {
    let data = await pool.query(dbquery.getDeviceData, [device_id])
    return data.rows;
}

module.exports.getDeviceMallId = async function(device_id) {
    let data = await pool.query(dbquery.getDeviceMallId, [device_id])
    return data.rows; 
}

module.exports.getDeviceShops = async function(mall_id) {
    let data1 = await pool.query(dbquery.getShopsCategoryByMallId, [mall_id]);
    let data2 = await pool.query(dbquery.getshopStoreBymallId, [mall_id]);
    let categorydata  = data1.rows;
    let storedata = data2.rows;
    
    let data = getshopsWithstoreAndCategory(categorydata, storedata);
    // console.log(data)
    return data
}

/*************************** Floor Amenities ***************************/

module.exports.getAllAmenities = async function() {
    let data = await pool.query(dbquery.getAllAmenities);
    return data.rows
}

module.exports.getAllAmenitiesByMallId = async function(mall_id) {
    let data = await pool.query(dbquery.getAllAmenitiesByMallId,[mall_id]);
    return data.rows
}

module.exports.getAllAmenitiesById = async function(amenities_id) {
    let data = await pool.query(dbquery.getAllAmenitiesById, [amenities_id]);
    return data.rows;
}

module.exports.getAmenities = async function(mall_id) {
    let data = await pool.query(dbquery.getAmenities, [mall_id]);
    return data.rows;
}

module.exports.getAmenitiesByType = async function(amenities_name,mall_id) {
    let data = await pool.query(dbquery.getAmenitiesByType, [amenities_name,mall_id]);
    return data.rows
}

module.exports.addAmenities = async function(amenities_name,floor_id,fileNameWithExtension) {
    let createdAt = moment().tz('Asia/kolkata').format('YYYY-MM-DD HH:mm:ss');
    let updatedAt = moment().tz('Asia/kolkata').format('YYYY-MM-DD HH:mm:ss');
    let status = true;
    let data = await pool.query(dbquery.addAmenities,
    [amenities_name,fileNameWithExtension,status,floor_id,createdAt,updatedAt]);
    return data.rows;
}

module.exports.updateAmenitiesStatus = async function(amenities_id) {
    let updatedAt = moment().tz('Asia/kolkata').format('YYYY-MM-DD HH:mm:ss');
    let status = false;
    let data = await pool.query(dbquery.updateAmenitiesStatus,
    [status,updatedAt,amenities_id]);
    return data.rows
}

module.exports.updateAmenities = async function(amenities_name,floor_id,fileNameWithExtension,amenities_id) {
    let updatedAt = moment().tz('Asia/kolkata').format('YYYY-MM-DD HH:mm:ss');
    let data = await pool.query(dbquery.updateAmenities,
    [amenities_name,floor_id,fileNameWithExtension,updatedAt,amenities_id]);
    return data.rows;
}

module.exports.updateAmenitiesData = async function(amenities_name,floor_id,amenities_id) {
    let updatedAt = moment().tz('Asia/kolkata').format('YYYY-MM-DD HH:mm:ss');
    let data = await pool.query(dbquery.updateAmenitiesData,
    [amenities_name,floor_id,updatedAt,amenities_id]);
    return data.rows;
}
