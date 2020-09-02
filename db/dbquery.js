/*************** Mall related queries ***************** */

const checkForMalls = `select * from mall 
    where mall_name=$1 and location=$2`;

const getAllMalls = `select m.mall_id,m.mall_name,m.location,m.status,
    json_agg(i.*) as image_list 
    from mall m,image i 
    where m.mall_id = i.image_type_id 
    and image_type ILIKE 'mall%'
    and m.status = true 
    group by mall_id`;

const getMallByID = `select m.mall_id,m.mall_name,m.location,m.status,
    json_agg(i.*) as image_list 
    from mall m,image i 
    where m.mall_id = i.image_type_id 
    and image_type ILIKE 'mall%' 
    and mall_id=$1 
    group by mall_id`;

const addMall = `insert into mall(mall_name,location,status,created_at,updated_at) 
    values ($1,$2,$3,$4,$5) returning mall_id`;

const updateMallStatus = `update mall 
    set status=$1,
    updated_at=$2 
    where mall_id=$3 
    returning mall_id`;

/******************** Role related queries ******************* */

const CheckForRole = `select * from role 
    where role_name=$1 and status = true`;

const getAllRoles = `select role_id,role_name,status from role where status=true`;

const getRoleByID = `select role_id,role_name,status from role
    where role_id = $1`;

const addRole = `insert into role(role_name,status,created_at,updated_at) 
    values ($1,$2,$3,$4) returning role_id`;

const updateRoleStatus = `update role 
    set status=$1,
    updated_at=$2 
    where role_id=$3 
    returning role_id`;

const updateRole = `update role 
    set role_name=$1,
    updated_at=$2 
    where role_id=$3 
    returning role_id`;

const getRoleExceptsuperadmin = `select role_id,role_name,status from role 
    where role_name not ILIKE 'superadmin'`;

/******************** User related queries ******************* */

const checkForEmailValidity = `select * from tbl_user 
    where email=$1`;

const addUser = `INSERT into tbl_user(name, password, role_id, mall_id, created_at, updated_at, status, email, phone)
	VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) returning user_id`;

const getAllUsers = `select user_id,name,password,m.mall_id,
    u.status,email,phone,r.role_id,role_name,mall_name,location 
    from tbl_user u, role r,mall m 
    where u.role_id = r.role_id
	and u.status = true
    and u.mall_id = m.mall_id `;

const getUsersByMall = `select user_id,name,password,m.mall_id,
    u.status,email,phone,r.role_id,role_name,mall_name,location 
    from tbl_user u, role r,mall m 
    where u.role_id = r.role_id 
    and u.mall_id = m.mall_id 
    and m.mall_id=$1 
and u.status = true
    and u.role_id not in (select role_id 
        from role 
        where role_name ILIKE 'superadmin')`;

const getUsersById = `select user_id,name,password,m.mall_id,
    u.status,email,phone,r.role_id,role_name,mall_name,location 
    from tbl_user u, role r,mall m 
    where u.role_id = r.role_id 
    and u.mall_id = m.mall_id 
    and u.user_id=$1 `;

const updateUserStatus = `update tbl_user 
    set status = $1,updated_at=$2 
    where user_id = $3 returning user_id`;

const updateUser = `update tbl_user 
    set email=$1,phone=$2,name=$3,
    role_id=$4,updated_at=$5 
    where user_id = $6 returning user_id`;

const checkPassword = `select * from tbl_user 
    where password=$1`;

const changePassword = `update tbl_user 
    set password=$1,updated_at=$2 
    where user_id=$3 returning user_id,password`;

/**************************** Floor related querires *******************/

const checkForFloor = `select * from floor 
    where floor_name = $1 
    and alias=$2 
    and mall_id=$3`;

const getFloor = `select f.floor_id,f.floor_name,
    f.alias,m.mall_id,m.mall_name,f.status,
    json_agg(i.*) as image_list 
    from floor f,image i,mall m  
    where m.mall_id = f.mall_id
    and f.floor_id=i.image_type_id 
    and image_type ILIKE 'floor'
    and i.status = true
and f.status = true
    group by f.floor_id,m.mall_id
    order by floor_id`;

const getFloorById = `select f.floor_id,f.floor_name,
    f.alias,m.mall_id,m.mall_name,f.status,
    json_agg(i.*) as image_list 
    from floor f,image i,mall m  
    where m.mall_id = f.mall_id
    and f.floor_id=i.image_type_id 
    and image_type ILIKE 'floor' 
    and f.floor_id=$1 
    and i.status = true 
and f.status = true
    group by f.floor_id,m.mall_id
    order by floor_id`;

const getFloorByMallId = `select f.floor_id,f.floor_name,
    f.alias,m.mall_id,m.mall_name,f.status,
    json_agg(i.*) as image_list 
    from floor f,image i,mall m  
    where m.mall_id = f.mall_id
    and f.floor_id=i.image_type_id 
    and image_type ILIKE 'floor'
    and i.status = true  
    and f.mall_id=$1 
and f.status = true
    group by f.floor_id,m.mall_id
    order by floor_id`;

const updateFloorData = `update floor 
    set floor_name=$1,alias=$2,updated_at=$3 
    where floor_id=$4 returning floor_id`;

const updateFloorStatus = `update floor 
    set status=$1,updated_at=$2 
    where floor_id=$3 
    returning floor_id`;

const addFloor = `insert into floor(floor_name,alias,mall_id,status,created_at,updated_at)
    values ($1,$2,$3,$4,$5,$6) returning floor_id`;

/******************************** Category  related queries *******************/

const checkForCategory = `select * from category 
    where category_name=$1 
    and status=true`;

const addCategory = `insert into category(category_name,status,created_at,updated_at) 
    values ($1,$2,$3,$4) returning category_id`;

const updateCategoryById = `update category 
    set category_name=$1,
    status=$2,updated_at=$3 
    where category_id=$4 
    returning category_id`;

const updateCategoryStatus = `update category 
    set status=$1,updated_at=$2 
    where category_id=$3 
    returning category_id`;

const getAllCategory = `select category_id,category_name,status from category where status=true`;

const getCategoryById = `select category_id,category_name,status from category 
    where category_id=$1 and status=true`;

/******************************** Shop related queries *************************/

// const getAllShops = `select *
// from floor f,category c,shops sh,store st,tbl_shop_category sc,tbl_store_shop ss,image i
// where f.floor_id = st.floor_id
// and sh.shop_id = sc.shop_id
// and c.category_id = sc.category_id
// and sh.shop_id = ss.shop_id
// and st.store_id = ss.store_id
// and sh.shop_id = i.image_type_id and image_type ILIKE 'shop%' order by sh.shop_id`;

// const getAllShops = `select s.*,json_agg(i.*) as image_list
//     from shops s, image i
//     where s.shop_id = i.image_type_id and image_type ILIKE 'shop%' and i.status=true
//     group by s.shop_id`;

const getShops = `select distinct(s.*) 
    from floor f,store st, tbl_store_shop t, shops s 
    where f.floor_id = st.floor_id 
    and st.store_id = t.store_id 
    and t.shop_id = s.shop_id 
    and s.status=true 
    and t.status = true 
    and f.mall_id=$1`;

const getAllShops = `WITH image_agg AS(
    select s.*,json_agg(i.*) as image_list 
    from shops s,image i
    where s.shop_id = i.image_type_id 
    and image_type ILIKE 'shop%' 
    and i.status=true
	and s.status = true
    group by shop_id),
    shop_agg AS (
        select st.*,json_agg(ia.*) as shop_list
        from store st,tbl_store_shop t,image_agg ia
        where st.store_id = t.store_id 
        and t.shop_id = ia.shop_id 
        and t.status = true
        group by 1,st.store_id),
        store_agg AS (
            select f.*,json_agg(sa.*) as store_list
            from floor f, shop_agg sa
            where f.floor_id = sa.floor_id 
            and f.status = true
            group by 1,f.floor_id) 
            select * from store_agg`;

const getShopsByMall = `WITH image_agg AS(
    select s.*,json_agg(i.*) as image_list 
    from shops s,image i
    where s.shop_id = i.image_type_id 
    and image_type ILIKE 'shop%' 
    and i.status=true 
and s.status = true
    group by shop_id),
    shop_agg AS (
        select st.*,json_agg(ia.*) as shop_list
        from store st,tbl_store_shop t,image_agg ia
        where st.store_id = t.store_id 
        and t.shop_id = ia.shop_id 
        and t.status = true
        group by 1,st.store_id),
        store_agg AS (
            select f.*,json_agg(sa.*) as store_list
            from floor f, shop_agg sa
            where f.floor_id = sa.floor_id 
            and f.status = true
            group by 1,f.floor_id) 
            select * from store_agg sa 
            where sa.mall_id=$1`;

const getAllStoresByShopId = `select s.shop_id,shop_name,contact_number,s.status,
    json_agg(t.*) as store_list
    from shops s,store t,tbl_store_shop st
    where s.shop_id = st.shop_id 
    and t.store_id = st.store_id 
    and s.shop_id=$1
	and s.status = true
    and st.status=true 
    group by s.shop_id`;

const getAllCategoryByShopId = `select s.shop_id,shop_name,contact_number,s.status,
    json_agg(c.*) as category_list
    from shops s,category c, tbl_shop_category sc
    where s.shop_id = sc.shop_id 
    and c.category_id = sc.category_id 
    and s.shop_id=$1
and s.status = true
    and sc.status = true 
    group by s.shop_id`;

const getShopsCategoryByMallId = `select s.*,json_agg(c.*) as category_list
    from shops s, 
    tbl_shop_category tc, 
    category c,
    store t,
    tbl_store_shop ss,
    floor f,
    mall m
    where s.shop_id = tc.shop_id 
    and tc.category_id = c.category_id
    and s.shop_id = ss.shop_id 
    and ss.store_id = t.store_id
    and f.floor_id = t.floor_id
    and f.mall_id = m.mall_id
    and tc.status =true
    and m.mall_id = $1
    and s.status = true
    and ss.status = true
    and f.status = true
    group by s.shop_id`;

// const getshopStoreBymallId = `select s.*,json_agg(t.*) as store_list
//     from shops s, 
//     store t,
//     tbl_store_shop ss,
//     floor f,
//     mall m
//     where s.shop_id = ss.shop_id 
//     and ss.store_id = t.store_id
//     and f.floor_id = t.floor_id
//     and f.mall_id = m.mall_id
//     and m.mall_id = $1
//     and s.status = true
//     and ss.status = true
//     and f.status = true
//     group by s.shop_id`;

const getshopStoreBymallId =   ` select s.*,
    json_agg(
        (select X from(
            select t.store_id,t.store_number,t.status,t.floor_id,i.image_url as path
        ) as x)
    ) as store_list
    from shops s, 
    store t,
	image i,
    tbl_store_shop ss,
    floor f,
    mall m
    where s.shop_id = ss.shop_id 
    and ss.store_id = t.store_id
    and f.floor_id = t.floor_id
    and f.mall_id = m.mall_id
    and m.mall_id = $1
	and t.store_id = i.image_type_id
	and i.image_type ILIKE 'store_path'
    and s.status = true
    and ss.status = true
    and f.status = true
    and i.status = true
    group by s.shop_id`

const getShopsByFloor = `select *
    from floor f,category c,shops sh,store st,tbl_shop_category sc,tbl_store_shop ss
    where f.floor_id = st.floor_id
    and sh.shop_id = sc.shop_id
    and c.category_id = sc.category_id
    and sh.shop_id = ss.shop_id
    and st.store_id = ss.store_id
    and f.floor_id=$1`;

const getShopById = `select s.shop_id,shop_name,contact_number,s.status,
    json_agg(i.*) as image_list
    from shops s, image i
    where s.shop_id = i.image_type_id 
    and image_type ILIKE 'shop%' 
    and s.shop_id =$1
    and i.status=true
    group by s.shop_id`;

const updateShopStatus = `update shops 
    set status=$1,updated_at=$2 
    where shop_id=$3 returning shop_id`;

const addShops = `insert into shops(shop_name,contact_number,status,created_at,updated_at) 
    values ($1,$2,$3,$4,$5) returning shop_id`;

const addShopsToStore = `insert into tbl_store_shop(shop_id,store_id,status,created_at,updated_at) 
    values ($1,$2,$3,$4,$5) returning id`;

const addShopsToCategory = `insert into tbl_shop_category(shop_id,category_id,status,
    created_at,updated_at) 
    values ($1,$2,$3,$4,$5) returning id`;

const updateShopData = `update shops 
    set shop_name=$1,contact_number=$2,updated_at=$3 
    where shop_id=$4 returning shop_id`;

const updateShopsToStore = `update tbl_store_shop 
    set status=$2,updated_at=$3 
    where shop_id=$1 
    returning shop_id`;

const updateShopsToCategory = `update tbl_shop_category 
    set status=$2,updated_at=$3 
    where shop_id=$1 
    returning shop_id`;

const updateShopLogo = `update image 
    set status=$1, updated_at=$2
    where image_type_id = $3 and image_type=$4
    returning image_id`;

/********************************* Store related queries ******************** */
const getStores = `select distinct(st.*) 
    from store st, floor f,mall m 
    where st.floor_id = f.floor_id
    and f.mall_id = m.mall_id 
    and st.status=true and f.status=true 
    and m.mall_id=$1 and store_number not in (
        select distinct(t.store_number) 
        from store t,tbl_store_shop st 
        where t.store_id=st.store_id
    ) order by store_number`;

const checkForStore = `select t.* from floor f, store t 
    where f.floor_id=t.floor_id 
    and mall_id=$1 
    and store_number=$2`;

const addStore = `insert into store(store_number,floor_id,status,created_at,updated_at) 
    values ($1,$2,$3,$4,$5) returning store_id`;

const getAllStores = `select f.floor_id,f.floor_name,alias,m.mall_id,mall_name,
    store_id,store_number,image_url,image_type_id,image_type,image_id 
    from floor f,store s,image i,mall m 
    where m.mall_id = f.mall_id
    and f.floor_id=s.floor_id 
    and s.store_id=i.image_type_id 
    and image_type ILIKE 'store-path'
and s.status = true
    and i.status=true`;

const getStoreByMallId = `select f.floor_id,f.floor_name,alias,m.mall_id,mall_name,
    store_id,store_number,image_url,
    image_type_id,image_type,image_id 
    from floor f,store s,image i,mall m 
    where m.mall_id = f.mall_id
    and f.floor_id=s.floor_id 
    and s.store_id=i.image_type_id 
    and image_type ILIKE 'store-path' 
    and i.status=true 
and s.status = true
    and m.mall_id=$1`;

const getStoreById = `select f.floor_id,f.floor_name,alias,m.mall_id,mall_name,
    store_id,store_number,image_url,
    image_type_id,image_type,image_id
    from floor f,store s,image i,mall m 
    where m.mall_id = f.mall_id
    and f.floor_id=s.floor_id 
    and s.store_id=i.image_type_id 
    and image_type ILIKE 'store-path' 
    and s.store_id=$1
and s.status = true
    and i.status=true`;

const getStoreByFloorId = `select f.floor_id,f.floor_name,alias,m.mall_id,mall_name,
    store_id,store_number,image_url,
    image_type_id,image_type,image_id 
    from floor f,store s,image i,mall m 
    where m.mall_id = f.mall_id
    and f.floor_id=s.floor_id 
    and s.store_id=i.image_type_id 
    and image_type ILIKE 'store-path' 
and s.status = true
    and f.floor_id=$1 
    and i.status=true`;

const updateStoreStatus = `update store 
    set status= $1,updated_at=$2 
    where store_id=$3 
    returning store_id `;

const getAllEmptyStores = `select * from store 
    where status=true and store_number not in (
        select distinct(t.store_number) 
        from store t,tbl_store_shop st 
        where t.store_id=st.store_id
    )`;



/****************************** Images related queries  ********************* */

const addImage = `insert into image (image_url,image_type_id,created_at,updated_at,status,image_type) 
    values ($1,$2,$3,$4,$5,$6) returning image_id`;

const imageStatusUpdate = `update image set status=$1,updated_at=$2 
    where image_id=$3 returning image_id`;

/****************************** Main card related queries ******************* */

const checkForMainCard = `select * from main_card 
    where main_card_name=$1 
    and mall_id=$2`;

const addMainCard = `insert into main_card(main_card_name,mall_id,created_at,updated_at,status) 
    values ($1,$2,$3,$4,$5) returning main_card_id`;

const changeMainCardImage = `update image 
    set status = $1,updated_at=$2 
    where image_id=$3 
    returning image_type_id, image_type`;

const mainCardStatusUpdate = `update main_card 
    set status=$1,updated_at=$2 
    where main_card_id=$3 
    returning main_card_id`;

const updateMainCardMall = `update main_card 
    set mall_id=$1,updated_at=$2 
    where main_card_id=$3 
    returning main_card_id`;

// const getAllMainCards = `select m.main_card_id,m.main_card_name,m.status,m.mall_id,
//     json_agg(i.*) as image_list
//     from main_card m inner join image i
//     on m.main_card_id=i.image_type_id
//     and image_type ILIKE 'main-card%'
//     and m.status = true
//     and i.status = true
//     group by m.main_card_id`;

const getAllMainCards = `select m.main_card_id,m.main_card_name,m.status,m.mall_id,a.mall_name, 
    json_agg(i.*) as image_list 
    from main_card m inner join image i
    on m.main_card_id=i.image_type_id
	inner join mall a on a.mall_id = m.mall_id 
    and image_type ILIKE 'main-card%'
    and m.status = true
    and i.status = true 
    group by m.main_card_id,a.mall_name`;

const getMainCardsByMallId = `select m.main_card_id,m.main_card_name,m.status,m.mall_id,a.mall_name,
    json_agg(i.*) as image_list 
    from main_card m inner join image i 
    on m.main_card_id=i.image_type_id 
    inner join mall a on a.mall_id = m.mall_id 
    and image_type ILIKE 'main-card%' 
    and a.mall_id=$1 
    and m.status = true
    and i.status = true 
    group by m.main_card_id,a.mall_name`;

const getMainCardsById = `select m.main_card_id,m.main_card_name,m.status,m.mall_id,a.mall_name, 
    json_agg(i.*) as image_list 
    from main_card m inner join image i 
    on m.main_card_id=i.image_type_id
    inner join mall a on a.mall_id = m.mall_id  
    and image_type ILIKE 'main-card%' 
    and main_card_id=$1
    and m.status = true
    and i.status = true 
    group by m.main_card_id,a.mall_name`;

/************************* Offer related queries *************************/

const addOffer = `insert into offers(offer_name,description,validity,shop_id,status,created_at,updated_at) 
    values ($1,$2,$3,$4,$5,$6,$7) returning offer_id`;

// const getAllOffers = `select s.*,json_agg(o.*) as offer_list,json_agg(i.*) as image_list from offers o, image i,shops s
//     where o.offer_id = i.image_type_id
//     and s.shop_id = o.shop_id
//     and image_type ILIKE 'offer-image%' and i.status=true group by s.shop_id`;

// const getAllOffers = `WITH image_agg AS(select o.*,json_agg(i.*) as image_list
//     from offers o ,image i
//     where o.offer_id = i.image_type_id and image_type ILIKE 'offer%'
//     and i.status=true
//     group by o.offer_id),
//     offer_agg AS(select s.*,json_agg(ia.*) as offer_list
//     from shops s,image_agg ia
//     where s.shop_id = ia.shop_id
//     group by 1, s.shop_id)
//     select * from offer_agg`;

const getAllOffers = `WITH image_agg AS(
    select o.*,json_agg(i.*) as image_list 
    from offers o left join image i 
    on o.offer_id = i.image_type_id 
    and image_type ILIKE 'offer%'
    or image_type_id is null 
    and i.status=true
    where o.status=true
    group by o.offer_id),
    offer_agg AS(
        select s.*,json_agg(ia.*) as offer_list 
		from shops s,image_agg ia 
		where s.shop_id = ia.shop_id 
		group by 1, s.shop_id),
		shop_agg AS (
            select st.*,json_agg(oa.*) as shop_list
            from store st,tbl_store_shop t,offer_agg oa
            where st.store_id = t.store_id 
            and t.shop_id = oa.shop_id
            group by 1,st.store_id),
            store_agg AS (
                select f.*,json_agg(sa.*) as store_list
                from floor f,shop_agg sa
                where f.floor_id = sa.floor_id
                group by 1,f.floor_id)
                select * from store_agg`;

const getOffersByMall = `WITH image_agg AS(
     select o.*,json_agg(i.*) as image_list 
    from offers o left join image i 
    on o.offer_id = i.image_type_id 
    and image_type ILIKE 'offer%'
    or image_type_id is null 
    and i.status=true
    where o.status=true
    group by o.offer_id),
    offer_agg AS(
        select s.*,json_agg(ia.*) as offer_list 
		from shops s,image_agg ia 
		where s.shop_id = ia.shop_id 
		group by 1, s.shop_id),
		shop_agg AS (
            select st.*,json_agg(oa.*) as shop_list
            from store st,tbl_store_shop t,offer_agg oa
            where st.store_id = t.store_id 
            and t.shop_id = oa.shop_id
            group by 1,st.store_id),
            store_agg AS (
                select f.*,json_agg(sa.*) as store_list
                from floor f,shop_agg sa
                where f.floor_id = sa.floor_id
                group by 1,f.floor_id)
                select * from store_agg a where a.mall_id=$1`;

    const getOffersById = `WITH image_agg AS(
    select o.*,json_agg(i.*) as image_list 
    from offers o left join image i 
    on o.offer_id = i.image_type_id 
    and image_type ILIKE 'offer%'
    or image_type_id is null 
    and i.status=true
    where o.status=true
    and o.offer_id=$1
    group by o.offer_id),
    offer_agg AS(
        select s.*,json_agg(ia.*) as offer_list 
		from shops s,image_agg ia 
		where s.shop_id = ia.shop_id 
		group by 1, s.shop_id),
		shop_agg AS (
            select st.*,json_agg(oa.*) as shop_list
            from store st,tbl_store_shop t,offer_agg oa
            where st.store_id = t.store_id 
            and t.shop_id = oa.shop_id
            group by 1,st.store_id),
            store_agg AS (
                select f.*,json_agg(sa.*) as store_list
                from floor f,shop_agg sa
                where f.floor_id = sa.floor_id
                group by 1,f.floor_id)
                select * from store_agg`;

// const getOffersById = `WITH image_agg AS(
//     select o.*,json_agg(i.*) as image_list 
//     from offers o, image i 
//     where o.offer_id = i.image_type_id 
//     and image_type ILIKE 'offer%'
//     and o.status=true
//     and i.status=true
//     and offer_id =$1 
//     group by o.offer_id),
//     offer_agg AS(
//         select s.*,json_agg(ia.*) as offer_list 
//         from shops s,image_agg ia 
//         where s.shop_id = ia.shop_id 
//         group by 1, s.shop_id)
//         select * from offer_agg`;

// const getOffersById = `select o.*,json_agg(i.*) as image_list from offers o, image i
//     where o.offer_id = i.image_type_id
//     and image_type ILIKE 'offer-image%' and offer_id=$1 group by o.offer_id `;

const getOffersByShopId = `WITH image_agg AS(
     select o.*,json_agg(i.*) as image_list 
    from offers o left join image i 
    on o.offer_id = i.image_type_id 
    and image_type ILIKE 'offer%'
    or image_type_id is null 
    and i.status=true
    where o.status=true

    group by o.offer_id),
    offer_agg AS(
        select s.*,json_agg(ia.*) as offer_list 
        from shops s,image_agg ia 
        where s.shop_id = ia.shop_id 
        group by 1, s.shop_id)
        select * from offer_agg 
        where shop_id=$1`;

// const getOffersByShopId = `select o.*,json_agg(i.*) as image_list from offers o, image i
//     where o.offer_id = i.image_type_id
//     and image_type ILIKE 'offer-image%' and shop_id=$1 group by o.offer_id `;

const updateOfferValidity = `update offers 
    set validity=$1,updated_at=$2 
    where offer_id=$3 
    returning offer_id`;

const updateOfferData = `update offers 
    set offer_name=$1,description=$2,
    validity=$3,updated_at=$4,shop_id=$5 
    where offer_id=$6 
    returning offer_id`;

const updateOfferStatus = `update offers 
    set status=$1,updated_at=$2 
    where offer_id=$3 
    returning offer_id`;

/********************************* Event related queries ************************/

const addEvent = `insert into events(event_name,description,startdate,enddate,created_at,
    updated_at,status,mall_id)
    values ($1,$2,$3,$4,$5,$6,$7,$8) 
    returning event_id`;

// const getAllEvents = `select e.event_id,e.event_name,e.description,
//     e.startdate,e.enddate,e.status,m.mall_id,m.mall_name,
//     json_agg(i.*) as image_list 
//     from mall m left join events e on m.mall_id = e.mall_id
//     left join image i on e.event_id = i.image_type_id
//     and image_type ILIKE 'event%'
//     and e.status = true
//     and i.status = true 
//     group by event_id,m.mall_id
//     order by event_id`;

const getAllEvents = `select e.event_id,e.event_name,e.description,
e.startdate,e.enddate,e.status,m.mall_id,m.mall_name,
json_agg(i.*) as image_list 
from mall m , events e, image i  where m.mall_id = e.mall_id
and e.event_id = i.image_type_id
and image_type ILIKE 'event%'
and e.status = true
and i.status = true 
group by event_id,m.mall_id
order by event_id`;


const getEventById = `select e.event_id,e.event_name,e.description,
    e.startdate,e.enddate,e.status,m.mall_id,m.mall_name,
    json_agg(i.*) as image_list 
    from events e,image i,mall m 
    where m.mall_id = e.mall_id
    and e.event_id = i.image_type_id 
    and image_type ILIKE 'event%' 
    and e.event_id=$1 
    and e.status=true 
    and i.status=true 
    group by event_id,m.mall_id`;

const getEventByMallId = `select e.event_id,e.event_name,e.description,
    e.startdate,e.enddate,e.status,m.mall_id,m.mall_name,
    json_agg(i.*) as image_list 
    from mall m , events e, image i  where m.mall_id = e.mall_id
    and e.event_id = i.image_type_id
    and image_type ILIKE 'event%'
    and e.status = true
    and i.status = true
    and m.mall_id = $1 
    group by event_id,m.mall_id
    order by event_id`;

const deleteEvents = `update events 
    set status=$1,updated_at=$2 
    where event_id=$3 
    returning event_id`;

const updateEvent = `update events 
    set event_name=$1,description=$2,
    startdate=$3,enddate=$4,updated_at=$5 
    where event_id=$6 
    returning event_id`;

const deleteEventImage = `update image 
    set status=$1,updated_at=$2 
    where image_id=$3 
    returning image_id`;

const updateCoverImage = `update image
    set status=$1,updated_at=$2
    where image_type_id=$3 and image_type=$4
    returning image_id`;

/************************************* Banner related queries **************************/

const addBanner = `insert into banners(banner_name,validity,created_at,updated_at,status,mall_id) 
    values ($1,$2,$3,$4,$5,$6) returning banner_id`;

const getAllBanners = `select b.banner_id,b.banner_name,b.validity,b.mall_id,mall_name,
    json_agg(i.*) as image_list 
    from banners b,image i,mall m 
    where m.mall_id = b.mall_id
    and b.banner_id = i.image_type_id 
    and image_type ILIKE 'banner%' 
    and b.status=true 
    and i.status=true 
    group by banner_id,mall_name
    order by banner_id`;

const getBannersById = `select b.banner_id,b.banner_name,b.validity,b.mall_id,mall_name,
    json_agg(i.*) as image_list 
    from banners b,image i,mall m 
    where m.mall_id = b.mall_id
    and b.banner_id = i.image_type_id 
    and image_type ILIKE 'banner%' 
    and b.status=true 
    and i.status=true
    and banner_id=$1 
    group by banner_id,mall_name
    order by banner_id`;

const getBannersByMallId = `select b.banner_id,b.banner_name,b.validity,b.mall_id,mall_name,
    json_agg(i.*) as image_list 
    from banners b,image i,mall m 
    where m.mall_id = b.mall_id
    and b.banner_id = i.image_type_id 
    and image_type ILIKE 'banner%' 
    and b.mall_id=$1 
    and b.status=true 
    and i.status=true 
    group by banner_id,mall_name
    order by banner_id`;

const updateBanner = `update banners 
    set banner_name=$1,validity=$2,
    mall_id=$3,updated_at=$4 
    where banner_id=$5 
    returning banner_id`;

const deleteBanner = `update banners 
    set status=$1,updated_at=$2 
    where banner_id=$3 
    returning banner_id`;

/******************************* Mall-info related queries ******************************/

const addMallInfo = `insert into mall_info (helptext,phone,email,mall_id,status,created_at,updated_at)
    values ($1,$2,$3,$4,$5,$6,$7) returning mall_info_id`;

const getAllMallInfo = `select mall_info_id,helptext,phone,email,
    m.mall_id,i.status,mall_name 
    from mall_info i, mall m 
    where m.mall_id = i.mall_id 
    and i.status = true 
    order by mall_info_id`;

const getMallInfoById = `select mall_info_id,helptext,phone,email,
    m.mall_id,i.status,mall_name 
    from mall_info i, mall m 
    where m.mall_id = i.mall_id 
    and mall_info_id=$1 
    and i.status = true 
    order by mall_info_id`;

const getMallInfoByMallId = `select mall_info_id,helptext,phone,email,
    m.mall_id,i.status,mall_name 
    from mall_info i, mall m 
    where m.mall_id = i.mall_id 
    and m.mall_id=$1 
    and i.status = true 
    order by mall_info_id`;

const updateMallInfo = `update mall_info 
    set helptext=$1,phone=$2,
    email=$3,mall_id=$4,updated_at=$5 
    where mall_info_id=$6 
    returning mall_info_id`;

const deleteMallInfo = `update mall_info 
    set status=$1,updated_at=$2 
    where mall_info_id=$3 
    returning mall_info_id`;

/****************************Login related queries *****************************/

const getLoginData = `select * from tbl_user u,role r,mall m 
    where u.role_id=r.role_id
    and m.mall_id = u.mall_id 
    and u.email=$1 
    and u.status=$2`;

const checkUserById = `select * from tbl_user u,role r 
    where u.role_id=r.role_id 
    and u.user_id=$1 
    and u.status=true`;

/************************ Screen related queries ********************************/

const addScreen = `insert into tbl_screen(device_unique_id,mall_id,status,created_at,updated_at,device_name) 
    values ($1,$2,$3,$4,$5,$6) returning screen_id`;

const getAllScreens = `select m.mall_id,m.mall_name,m.location,m.status,
    json_agg(s.*) as screen_list
    from mall m,tbl_screen s 
    where m.mall_id = s.mall_id 
    and m.status = true 
    and s.status = true 
    group by m.mall_id`;

const getScreenByMallId = `select m.mall_id,m.mall_name,m.location,m.status,
    json_agg(s.*) as screen_list
    from mall m,tbl_screen s 
    where m.mall_id = s.mall_id 
    and m.status = true 
    and s.status = true 
    and m.mall_id = $1 
    group by m.mall_id`;

const getScreenById = `select m.mall_id,m.mall_name,m.location,m.status,
    json_agg(s.*) as screen_list
    from mall m,tbl_screen s 
    where m.mall_id = s.mall_id 
    and m.status = true 
    and s.status = true 
    and s.screen_id = $1 
    group by m.mall_id`;

const updateScreenStatus = `update tbl_screen s 
    set status = false 
    where s.screen_id=$1 
    returning screen_id`;

/***************************** device related queries *******************************/

// const getDeviceData = `
//     WITH main_card_image_agg as (
//             select c.*, json_agg(i.*) as main_card_image_list
//             from main_card c,image i
//             where c.main_card_id = i.image_type_id
//             and image_type ILIKE 'main-card%'
//             and c.status =true
//             and i.status=true
//             group by c.main_card_id
//         ),
//         main_card_agg as (
//             select m1.mall_id,json_agg(ci.*) as main_card_list
//             from mall m1, main_card_image_agg ci, tbl_screen sc
//             where m1.mall_id = ci.mall_id
//             and m1.mall_id = sc.mall_id
//             and sc.device_unique_id=$1
//             group by m1.mall_id
//         ),
//         banner_image_agg as (
//             select b.*, json_agg(i.*) as banner_image_list
//             from banners b,image i
//             where b.banner_id = i.image_type_id
//             and image_type ILIKE 'banner%'
//             and b.status =true
//             and i.status=true
//             group by b.banner_id
//         ),
//         banner_agg as (
//             select m1.mall_id,json_agg(bi.*) as banner_list
//             from mall m1, banner_image_agg bi, tbl_screen sc
//             where m1.mall_id = bi.mall_id
//             and m1.mall_id = sc.mall_id
//             and sc.device_unique_id=$1
//             group by m1.mall_id
//         ),
//         event_image_agg as (
//             select e.*, json_agg(i.*) as event_image_list
//             from events e,image i
//             where e.event_id = i.image_type_id
//             and image_type ILIKE 'event%'
//             and e.status =true
//             and i.status=true
//             group by e.event_id
//             order by e.event_id
//         ),
//         event_agg as (
//             select m1.mall_id,json_agg(ea.*) as event_list
//             from mall m1, event_image_agg ea, tbl_screen sc
//             where m1.mall_id = ea.mall_id
//             and m1.mall_id = sc.mall_id
//             and sc.device_unique_id=$1
//             group by m1.mall_id
//         ),
//         mall_info_agg as (
//             select m1.mall_id,json_agg(i.*) as mall_info_list
//             from mall m1, mall_info i, tbl_screen sc
//             where m1.mall_id = i.mall_id
//             and m1.mall_id = sc.mall_id
//             and sc.device_unique_id=$1
//             group by m1.mall_id
//         )
//     select m.*,
//     json_agg(ia.*) as mall_info,
//     json_agg(ca.*) as main_card,
//     json_agg(ba.*) as banner,
//     json_agg(e.*) as events
//     from mall m,tbl_screen sc,event_agg e,main_card_agg ca,banner_agg ba,mall_info_agg ia
//     where m.mall_id = sc.mall_id
//     and m.mall_id = e.mall_id
//     and m.mall_id = ca.mall_id
//     and m.mall_id = ba.mall_id
//     and m.mall_id = ia.mall_id
//     and sc.device_unique_id=$1
//     group by m.mall_id
// `;

const getDeviceData = ` 
    WITH main_card_image_agg as (
            select c.*, 
            json_agg(i.*) as main_card_image_list 
            from main_card c,image i 
            where c.main_card_id = i.image_type_id 
            and image_type ILIKE 'main-card%' 
            and c.status =true 
            and i.status=true 
            group by c.main_card_id
        ),
        main_card_agg as (
            select m1.mall_id,
            json_agg(ci.*) as main_card_list
            from mall m1, main_card_image_agg ci, tbl_screen sc  
            where m1.mall_id = ci.mall_id
            and m1.mall_id = sc.mall_id 
            and sc.device_unique_id=$1
            group by m1.mall_id
        ),
        banner_image_agg as (
            select b.*, 
            json_agg(i.*) as banner_image_list
            from banners b,image i 
            where b.banner_id = i.image_type_id 
            and image_type ILIKE 'banner%' 
            and b.status =true 
            and i.status=true 
            group by b.banner_id
        ),
        banner_agg as (
            select m1.mall_id,
            json_agg(bi.*) as banner_list
            from mall m1, banner_image_agg bi, tbl_screen sc  
            where m1.mall_id = bi.mall_id
            and m1.mall_id = sc.mall_id 
            and sc.device_unique_id=$1
            group by m1.mall_id
        ),
        event_image_agg as (
            select e.*, 
            json_agg(i.*) as event_image_list 
            from events e,image i 
            where e.event_id = i.image_type_id 
            and image_type ILIKE 'event%' 
            and e.status =true 
            and i.status=true 
            group by e.event_id
            order by e.event_id
        ),
        event_agg as (
            select m1.mall_id,
            json_agg(ea.*) as event_list
            from mall m1, event_image_agg ea, tbl_screen sc  
            where m1.mall_id = ea.mall_id
            and m1.mall_id = sc.mall_id 
            and sc.device_unique_id=$1
            group by m1.mall_id
        ),
        mall_info_agg as (
            select m1.mall_id,
            json_agg(i.*) as mall_info_list
            from mall m1, mall_info i, tbl_screen sc  
            where m1.mall_id = i.mall_id
            and m1.mall_id = sc.mall_id 
            and sc.device_unique_id=$1
            group by m1.mall_id
        ),
        offer_agg as (
            select o.*,
            json_agg(i.*) as offer_images
            from offers o,image i 
            where o.offer_id = i.image_type_id
            and image_type ILIKE 'offer%'
            and i.status = true
            group by 1,o.offer_id
        ),
        shop_offer_agg as(
            select s.shop_id, 
            json_agg(oa.*) as offer_list
            from shops s,offer_agg oa
            where s.shop_id = oa.shop_id
            group by 1,s.shop_id
        ),
        shop_image_agg as (
            select s.shop_id,
            json_agg(i.*) as image_list
            from shops s,image i 
            where s.shop_id = i.image_type_id
            and image_type ILIKE 'shop%'
            and i.status = true
            group by 1,s.shop_id
        ),
        category_agg as (
            select s.shop_id,
            json_agg(c.*) as category_list 
            from shops s,category c,tbl_shop_category tc
            where s.shop_id = tc.shop_id 
            and tc.category_id = c.category_id
            and c.status = true
            and tc.status = true
            group by 1,s.shop_id
        ),
        shop_agg as (
            select s.*,json_agg(sa.*) as shop_images,
            json_agg(oa.*) as offers_list,
            json_agg(ca.*) as category_list
            from shops s,shop_image_agg sa,
            shop_offer_agg oa,category_agg ca
            where 
            s.shop_id = sa.shop_id
            and sa.shop_id = oa.shop_id
            and s.shop_id = ca.shop_id
            group by 1,s.shop_id
        ),
        store_image_agg as (
            select st.store_id,json_agg(i.*) as store_images
            from store st,image i
            where st.store_id = i.image_type_id
            and image_type ILIKE 'store%'
            and i.status = true
            group by 1,store_id
        ),
        store_agg as (
            select st.*,
            json_agg(si.*) as store_images,
            json_agg(sa.*) as shop_list
            from store st,tbl_store_shop ts,
            shop_agg sa,store_image_agg si
            where st.store_id = ts.store_id
            and ts.shop_id = sa.shop_id
            and st.store_id = si.store_id
            and st.status = true
            and ts.status = true
            group by 1,st.store_id
        ),
        floor_image_agg as (
            select f.floor_id,
            json_agg(i.*) as floor_image 
            from floor f, image i
            where f.floor_id = i.image_type_id
            and image_type ILIKE 'floor%'
            and i.status = true
            or i.image_id is null
            group by 1,f.floor_id
        ),
        floor_agg as (
            select f.*,
            json_agg(fi.*) as floor_images,
            json_agg(sa.*) as store_list
            from floor f 
            left join floor_image_agg fi on f.floor_id = fi.floor_id 
            left join store_agg sa 
            on f.floor_id = sa.floor_id
            or sa.floor_id is NULL
            group by 1,f.floor_id
        ),
        mall_agg as (
            select m.mall_id,
            json_agg(fa.*) as floor_list
            from mall m, floor_agg fa
            where m.mall_id = fa.mall_id
            and m.status = true
            or fa.floor_id is NULL
            group by 1,m.mall_id
        )
    select m.*,
    json_agg(ia.*) as mall_info,
    json_agg(ca.*) as main_card,
    json_agg(ba.*) as banner,
    json_agg(e.*) as events,
    json_agg(ma.*) as remaining_data
    from mall m,tbl_screen sc,
    event_agg e,main_card_agg ca,
    banner_agg ba,mall_info_agg ia,
    mall_agg ma
    where m.mall_id = sc.mall_id 
    and m.mall_id = e.mall_id
    and m.mall_id = ca.mall_id
    and m.mall_id = ba.mall_id
    and m.mall_id = ia.mall_id
    and m.mall_id = ma.mall_id
    and sc.device_unique_id=$1
    group by m.mall_id`;

let getDeviceMallId = `select * from tbl_screen where device_unique_id=$1`;

/****************************Amenities related **********************/

const getAllAmenities = `select a.*,f.* 
    from amenities a, floor f, mall m 
    where a.floor_id = f.floor_id
    and f.mall_id = m.mall_id 
    and a.status = true`;

const getAllAmenitiesByMallId = `select a.*,f.* 
    from amenities a, floor f, mall m 
    where a.floor_id = f.floor_id
    and m.mall_id = f.mall_id 
    and a.status = true
    and m.mall_id = $1`;

const addAmenities = `insert into amenities(amenities_name,amenities_path,status,floor_id,created_at,updated_at) 
    values ($1,$2,$3,$4,$5,$6) returning amenities_id, amenities_number`;

const getAllAmenitiesById = `select a.*,f.* 
    from amenities a, floor f, mall m 
    where a.floor_id = f.floor_id
    and f.mall_id = m.mall_id 
    and a.status = true
    and a.amenities_id = $1`;

const getAmenities = `select distinct(amenities_number) 
    from amenities a, floor f, mall m 
    where a.floor_id = f.floor_id
    and f.mall_id = m.mall_id
    and a.status = true 
    and m.mall_id=$1`;

const getAmenitiesByType = `select amenities_id,amenities_number 
    from amenities 
    where amenities_name LIKE $1 
    and status= true 
    and mall_id=$2`;

const updateAmenitiesStatus = `update amenities 
    set status =$1,updated_at=$2 
    where amenities_id=$3 returning amenities_id`;

const updateAmenities = `update amenities 
    set amenities_name = $1,
    floor_id = $2,
    amenities_path = $3,
    updated_at = $4
    where amenities_id = $5 returning amenities_id`;

const updateAmenitiesData = `update amenities 
    set amenities_name = $1,
    floor_id = $2,
    updated_at = $3
    where amenities_id = $4 returning amenities_id`

module.exports = {
  updateAmenitiesStatus,
  getAmenitiesByType,
  getAmenities,
  getAllAmenitiesById,
  addAmenities,
  getAllAmenitiesByMallId,
  getOffersByMall,
  getRoleExceptsuperadmin,
  getShops,
  getShopsByMall,
  checkUserById,
  getAllMalls,
  getMallByID,
  getAllRoles,
  getRoleByID,
  addRole,
  updateRoleStatus,
  updateRole,
  addUser,
  addMall,
  checkForEmailValidity,
  getAllUsers,
  getUsersByMall,
  getUsersById,
  updateUserStatus,
  updateUser,
  checkPassword,
  changePassword,
  updateMallStatus,
  getFloor,
  getFloorById,
  getFloorByMallId,
  updateFloorData,
  updateFloorStatus,
  checkForCategory,
  addCategory,
  updateCategoryById,
  updateCategoryStatus,
  getAllCategory,
  getCategoryById,
  getAllShops,
  getShopsByFloor,
  getShopById,
  updateShopStatus,
  addFloor,
  addImage,
  addStore,
  getStores,
  getAllStores,
  getStoreByMallId,
  getStoreById,
  getStoreByFloorId,
  imageStatusUpdate,
  updateStoreStatus,
  addShops,
  addShopsToStore,
  addShopsToCategory,
  updateShopData,
  updateShopsToStore,
  updateShopsToCategory,
  addMainCard,
  changeMainCardImage,
  mainCardStatusUpdate,
  updateMainCardMall,
  getAllMainCards,
  addOffer,
  getAllOffers,
  getOffersById,
  getOffersByShopId,
  updateOfferValidity,
  updateOfferData,
  updateOfferStatus,
  addEvent,
  getAllEvents,
  getEventById,
  getEventByMallId,
  deleteEvents,
  updateEvent,
  deleteEventImage,
  addBanner,
  getAllBanners,
  getBannersById,
  getBannersByMallId,
  updateBanner,
  deleteBanner,
  addMallInfo,
  getAllMallInfo,
  getMallInfoById,
  getMallInfoByMallId,
  updateMallInfo,
  deleteMallInfo,
  getLoginData,
  getMainCardsByMallId,
  getMainCardsById,
  getAllStoresByShopId,
  getAllCategoryByShopId,
  getAllEmptyStores,
  checkForFloor,
  checkForStore,
  checkForMalls,
  CheckForRole,
  checkForMainCard,
  addScreen,
  getAllScreens,
  getScreenByMallId,
  getScreenById,
  updateScreenStatus,
  getDeviceData,
  getDeviceMallId,
  getShopsCategoryByMallId,
  getshopStoreBymallId,
  getAllAmenities,
  updateCoverImage,
  updateShopLogo,
  updateAmenities,
  updateAmenitiesData
};
