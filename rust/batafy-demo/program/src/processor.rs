use {
    crate::instruction::MetaplexInstruction,
    borsh::BorshDeserialize,
    claim_bid::process_claim_bid,
    decommission_auction_manager::process_decommission_auction_manager,
    empty_payment_account::process_empty_payment_account,
    init_auction_manager_v2::process_init_auction_manager_v2,
    end_auction::process_end_auction,
    redeem_bid::process_redeem_bid,
    redeem_full_rights_transfer_bid::process_full_rights_transfer_bid,
    redeem_participation_bid::process_redeem_participation_bid,
    redeem_printing_v2_bid::process_redeem_printing_v2_bid,
    redeem_unused_winning_config_items_as_auctioneer::process_redeem_unused_winning_config_items_as_auctioneer,
    set_store::process_set_store,
    set_whitelisted_creator::process_set_whitelisted_creator,
    solana_program::{account_info::AccountInfo, entrypoint::ProgramResult, msg, pubkey::Pubkey},
    start_auction::process_start_auction,
    validate_safety_deposit_box_v2::process_validate_safety_deposit_box_v2,
    withdraw_master_edition::process_withdraw_master_edition,
};

pub mod claim_bid;
pub mod decommission_auction_manager;
pub mod empty_payment_account;
pub mod init_auction_manager_v2;
pub mod end_auction;
pub mod redeem_bid;
pub mod redeem_full_rights_transfer_bid;
pub mod redeem_participation_bid;
pub mod redeem_printing_v2_bid;
pub mod redeem_unused_winning_config_items_as_auctioneer;
pub mod set_store;
pub mod set_whitelisted_creator;
pub mod start_auction;
pub mod validate_safety_deposit_box_v2;
pub mod withdraw_master_edition;

pub fn process_instruction<'a>(
    program_id: &'a Pubkey,
    accounts: &'a [AccountInfo<'a>],
    input: &[u8],
) -> ProgramResult {
    let instruction = MetaplexInstruction::try_from_slice(input)?;
    match instruction {
        MetaplexInstruction::RedeemBid => {
            msg!("Instruction: Redeem Normal Token Bid");
            process_redeem_bid(program_id, accounts, None)
        }
        MetaplexInstruction::RedeemFullRightsTransferBid => {
            msg!("Instruction: Redeem Full Rights Transfer Bid");
            process_full_rights_transfer_bid(program_id, accounts, None)
        }
        MetaplexInstruction::StartAuction => {
            msg!("Instruction: Start Auction");
            process_start_auction(program_id, accounts)
        }
        MetaplexInstruction::ClaimBid => {
            msg!("Instruction: Claim Bid");
            process_claim_bid(program_id, accounts)
        }
        MetaplexInstruction::EmptyPaymentAccount(args) => {
            msg!("Instruction: Empty Payment Account");
            process_empty_payment_account(program_id, accounts, args)
        }
        MetaplexInstruction::SetStore(args) => {
            msg!("Instruction: Set Store");
            process_set_store(program_id, accounts, args.public)
        }
        MetaplexInstruction::SetWhitelistedCreator(args) => {
            msg!("Instruction: Set Whitelisted Creator");
            process_set_whitelisted_creator(program_id, accounts, args.activated)
        }
        MetaplexInstruction::RedeemUnusedWinningConfigItemsAsAuctioneer(args) => {
            msg!("Instruction: Redeem Unused Winning Config Items As Auctioneer");
            process_redeem_unused_winning_config_items_as_auctioneer(program_id, accounts, args)
        }
        MetaplexInstruction::DecommissionAuctionManager => {
            msg!("Instruction: Decomission Auction Manager");
            process_decommission_auction_manager(program_id, accounts)
        }
        MetaplexInstruction::RedeemPrintingV2Bid(args) => {
            msg!("Instruction: Redeem Printing V2 Bid");
            process_redeem_printing_v2_bid(
                program_id,
                accounts,
                args.edition_offset,
                args.win_index,
            )
        }
        MetaplexInstruction::WithdrawMasterEdition => {
            msg!("Instruction: Withdraw Master Edition");
            process_withdraw_master_edition(program_id, accounts)
        }
        MetaplexInstruction::InitAuctionManagerV2(args) => {
            msg!("Instruction: Init Auction Manager V2");
            process_init_auction_manager_v2(
                program_id,
                accounts,
                args.amount_type,
                args.length_type,
                args.max_ranges,
            )
        }
        MetaplexInstruction::ValidateSafetyDepositBoxV2(safety_deposit_config) => {
            msg!("Instruction: Validate Safety Deposit Box V2");
            process_validate_safety_deposit_box_v2(program_id, accounts, safety_deposit_config)
        }
        MetaplexInstruction::RedeemParticipationBidV3(args) => {
            msg!("Instruction: Redeem Participation Bid V3");
            process_redeem_participation_bid(program_id, accounts, false, args.win_index)
        }
        MetaplexInstruction::EndAuction(args) => {
            msg!("Instruction: End auction");
            process_end_auction(program_id, accounts, args)
        }
    }
}

//    "@oyster/common": "0.0.2",
// REACT_APP_STORE_OWNER_ADDRESS_ADDRESS=BZEimJo2j8dJNjgQUudVJF553tHx7f5LtPEUQ1ashA3Z
// REACT_APP_STORE_ADDRESS=4VTmUqP6fEoc1EK1EzrqSZ4gpxBJYRVB1GrMYuY9s1Ls
