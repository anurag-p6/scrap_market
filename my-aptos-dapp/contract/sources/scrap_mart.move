module scrap_mart_addr::scrap_mart {

    use std::option;
    use std::signer;
    use std::vector;
    use std::string; 
    use aptos_framework::coin;
    use aptos_framework::aptos_coin::AptosCoin;

    /// A scrap item
    struct Scrap has copy, drop, store {
        id: u64,
        cid: string::String,
        name: string::String,
        price: u64, // in Octas (1 APT = 10^8 Octas)
    }

    /// Inventory of scraps a buyer has purchased
    struct OwnedScraps has key {
        scraps: vector<Scrap>,
    }

    /// Resource to hold all scraps for a seller
    struct ScrapMart has key {
        scraps: vector<Scrap>,
        next_scrap_id: u64,
    }

    /// Initialize the ScrapMart resource under the seller
    public entry fun init(owner: &signer) { 
        move_to(owner, ScrapMart { 
            scraps: vector::empty<Scrap>(), 
            next_scrap_id: 1, 
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


    /// Buyer purchases a scrap by paying seller in AptosCoin
    public entry fun buy_scrap(
        buyer: &signer,
        seller_addr: address,
        scrap_id: u64
    ) acquires ScrapMart, OwnedScraps {
        let mart = borrow_global_mut<ScrapMart>(seller_addr);
        let len = vector::length(&mart.scraps);
        let mut_index = 0;

        while (mut_index < len) {
            let scrap_ref = vector::borrow(&mart.scraps, mut_index);
            if (scrap_ref.id == scrap_id) {
                // take price
                let price = scrap_ref.price;

                // transfer coins from buyer -> seller
                let coins = coin::withdraw<AptosCoin>(buyer, price);
                coin::deposit<AptosCoin>(seller_addr, coins);

                // remove scrap from seller listings
                let bought_scrap = vector::remove(&mut mart.scraps, mut_index);

                // put into buyer inventory
                let buyer_addr = signer::address_of(buyer);
                if (!exists<OwnedScraps>(buyer_addr)) {
                    move_to(buyer, OwnedScraps { scraps: vector::empty<Scrap>() });
                };
                let owned = borrow_global_mut<OwnedScraps>(buyer_addr);
                vector::push_back(&mut owned.scraps, bought_scrap);

                return;
            };
            mut_index = mut_index + 1;
        };

        abort 1; // scrap not found
    }

    /// List all scraps for a seller
    public fun list_scraps(seller: &signer): vector<Scrap> acquires ScrapMart {
        let addr = signer::address_of(seller);
        let mart = borrow_global<ScrapMart>(addr);
        mart.scraps
    }

    /// List scraps owned by a buyer
    public fun list_owned(buyer: &signer): vector<Scrap> acquires OwnedScraps {
        let addr = signer::address_of(buyer);
        let owned = borrow_global<OwnedScraps>(addr);
        owned.scraps
    }
}








