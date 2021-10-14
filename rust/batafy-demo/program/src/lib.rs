//! A Token Fraction program for the Solana blockchain.

pub mod deprecated_state;
pub mod entrypoint;
pub mod error;
pub mod instruction;
pub mod processor;
pub mod state;
pub mod utils;
// Export current sdk types for downstream users building with a different sdk version
// pub use solana_program;

// solana_program::declare_id!("p1exdMJcjVao65QdewkaZRUnU6VPSXhus9n2GzWfh98");
solana_program::declare_id!("6rqpCXj74BweAN9YsBMYoKCWJB7gedDn5zx7s2M9D2xi");
