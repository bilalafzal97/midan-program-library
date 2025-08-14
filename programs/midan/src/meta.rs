#![allow(missing_docs)]

#[cfg(not(feature = "no-entrypoint"))]
use solana_security_txt::security_txt;

#[cfg(not(feature = "no-entrypoint"))]
security_txt! {
    name: "Token Election",
    project_url: "https://tokenelection.game",
    contacts: "email:security@tokenelection.game",
    policy: "https://github.com/bilalafzal97/token-election-program-library/blob/main/SECURITY.md"
}
