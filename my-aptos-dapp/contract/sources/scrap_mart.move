module scrap_mart_addr::scrap_mart {

    use std::option;
    use std::signer;
    use std::vector;
    use std::string; 

    /// A scrap item
    struct Scrap has copy, drop, store {
        id: u64,
        cid: string::String,
        name: string::String,
        price: u64,
    }

    /// A buyer
    struct Buyer has copy, drop, store {
        id: u64,
        addr: address
    }

    /// Inventory of scraps a buyer has purchased
    struct OwnedScraps has key {
        scraps: vector<Scrap>,
    }

    /// Resource to hold all scraps and buyers for a seller
    struct ScrapMart has key {
        scraps: vector<Scrap>,
        buyers: vector<Buyer>,
        next_scrap_id: u64,
        next_buyer_id: u64,
    }

    /// Initialize the ScrapMart resource under the seller
    public entry fun init(owner: &signer) { 
        move_to(owner, ScrapMart { 
            scraps: vector::empty<Scrap>(), 
            buyers: vector::empty<Buyer>(), 
            next_scrap_id: 1, 
            next_buyer_id: 1, 
        }); 
    }

    /// Seller adds a scrap item (auto-increment ID)
    public entry fun add_scrap(
        seller: &signer,
        cid: string::String,
        name: string::String,
        price: u64
    ) acquires ScrapMart {
        let addr = signer::address_of(seller);
        let mart = borrow_global_mut<ScrapMart>(addr);

        let id = mart.next_scrap_id;
        mart.next_scrap_id = id + 1;

        vector::push_back(&mut mart.scraps, Scrap { id, cid, name, price });
    }



}








