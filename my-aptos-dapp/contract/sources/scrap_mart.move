module scrap_mart_addr::scrap_mart {

    use std::signer;
    use std::vector;
    use std::string; // ✅ import string module

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
}








