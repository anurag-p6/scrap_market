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


}








