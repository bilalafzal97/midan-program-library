use anchor_lang::prelude::*;

#[derive(Debug, Clone, AnchorSerialize, AnchorDeserialize)]
pub struct HaveLimitValue {
    pub have_it: bool,

    pub value: u32,
}

impl HaveLimitValue {
    pub fn space() -> usize {
        1 // have_it
            + 4 // value
    }
}
