export type TransfersResposeBody = {
    items: TokenTransfer[];
};

export type TokenTransfer = {
    block_hash: string;
    method: string;
    timestamp: string;
    to: {
        ens_domain_name?: string;
        hash: string;
    };
    total: {
        token_id: string;
    };
    type: "token_minting";
};