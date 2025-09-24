module scrap_mart_addr::scrap_mart {

    use std::option;
    use std::signer;
    use std::vector;
    use std::string; 

    /// A scrap item
    struct Scrap has copy, drop, store {
        id: u64,
        name: string::String,
        price: u64,
    }

    /// A buyer
    struct Buyer has copy, drop, store {
        addr: address,
        name: string::String,
    }

    /// Resource to hold all scrap and buyers
    struct ScrapMart has key {
        scraps: vector<Scrap>,
        buyers: vector<Buyer>,
    }

    /// Initialize the ScrapMart resource under the deployer
    public entry fun init(owner: &signer) {
        move_to(owner, ScrapMart {
            scraps: vector::empty<Scrap>(),
            buyers: vector::empty<Buyer>(),
        });
    }

    /// Add a scrap item
    public entry fun add_scrap(
        owner: &signer,
        id: u64,
        name: string::String,
        price: u64
    ) acquires ScrapMart {
        let addr = signer::address_of(owner);
        let mart = borrow_global_mut<ScrapMart>(addr); // ✅ no module prefix
        vector::push_back(&mut mart.scraps, Scrap { id, name, price });
    }

    /// Add a buyer
    public entry fun add_buyer(
        owner: &signer,
        addr: address,
        name: string::String
    ) acquires ScrapMart {
        let mart_addr = signer::address_of(owner);
        let mart = borrow_global_mut<ScrapMart>(mart_addr);
        vector::push_back(&mut mart.buyers, Buyer { addr, name });
    }

    /// List all scraps
    public fun list_scraps(owner: &signer): vector<Scrap> acquires ScrapMart {
        let addr = signer::address_of(owner);
        let mart = borrow_global<ScrapMart>(addr);
        mart.scraps
    }

    /// List all buyers
    public fun list_buyers(owner: &signer): vector<Buyer> acquires ScrapMart {
        let addr = signer::address_of(owner);
        let mart = borrow_global<ScrapMart>(addr);
        mart.buyers
    }


    /// Fetch a scrap by ID (returns Option<Scrap>)
    public fun get_scrap_by_id(owner: &signer, id: u64): option::Option<Scrap> acquires ScrapMart {
        let addr = signer::address_of(owner);
        let mart = borrow_global<ScrapMart>(addr);
        let len = vector::length(&mart.scraps);
        let mut_index = 0;
        while (mut_index < len) {
            let scrap_ref = vector::borrow(&mart.scraps, mut_index);
            if (scrap_ref.id == id) {
                return option::some(*scrap_ref);
            };
            mut_index = mut_index + 1;
        };
        option::none<Scrap>()
    }

}








