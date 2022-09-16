/**
 * @generated SignedSource<<431574dcae4e25ba1a22f28deb150392>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type ActivityType = "APPROVE" | "BORROW" | "BURN" | "CANCEL" | "CLAIM" | "DEPLOYMENT" | "LEND" | "MINT" | "NFT" | "RECEIVE" | "REPAY" | "SEND" | "STAKE" | "SWAP" | "Staking" | "UNKNOWN" | "UNSTAKE" | "WITHDRAW" | "market" | "money" | "%future added value";
export type Chain = "ARBITRUM" | "CELO" | "ETHEREUM" | "ETHEREUM_GOERLI" | "OPTIMISM" | "POLYGON" | "%future added value";
export type Currency = "ETH" | "USD" | "%future added value";
export type NftStandard = "ERC1155" | "ERC721" | "NONCOMPLIANT" | "%future added value";
export type TokenStandard = "ERC1155" | "ERC20" | "NATIVE" | "%future added value";
export type TransactionDirection = "IN" | "OUT" | "SELF" | "%future added value";
export type TransactionStatus = "CONFIRMED" | "FAILED" | "PENDING" | "%future added value";
export type ActivityScreenQuery$variables = {
  address: string;
};
export type ActivityScreenQuery$data = {
  readonly assetActivities: ReadonlyArray<{
    readonly assetChanges: ReadonlyArray<{
      readonly __typename: "NftTransfer";
      readonly asset: {
        readonly collection: {
          readonly name: string | null;
        } | null;
        readonly imageUrl: string | null;
        readonly name: string | null;
        readonly nftContract: {
          readonly address: string | null;
          readonly chain: Chain;
        } | null;
        readonly tokenId: string | null;
      };
      readonly direction: TransactionDirection;
      readonly nftStandard: NftStandard;
      readonly recipient: string;
      readonly sender: string;
    } | {
      readonly __typename: "TokenApproval";
      readonly approvedAddress: string;
      readonly asset: {
        readonly address: string | null;
        readonly chain: Chain;
        readonly decimals: number | null;
        readonly name: string | null;
        readonly symbol: string | null;
      };
      readonly quantity: string;
      readonly tokenStandard: TokenStandard;
    } | {
      readonly __typename: "TokenTransfer";
      readonly asset: {
        readonly address: string | null;
        readonly chain: Chain;
        readonly decimals: number | null;
        readonly name: string | null;
        readonly symbol: string | null;
      };
      readonly direction: TransactionDirection;
      readonly quantity: string;
      readonly recipient: string;
      readonly sender: string;
      readonly tokenStandard: TokenStandard;
      readonly transactedValue: {
        readonly currency: Currency | null;
        readonly value: number | null;
      } | null;
    } | {
      // This will never be '%other', but we need some
      // value in case none of the concrete values match.
      readonly __typename: "%other";
    } | null>;
    readonly timestamp: number;
    readonly transaction: {
      readonly from: string;
      readonly hash: string;
      readonly status: TransactionStatus;
      readonly to: string;
    };
    readonly type: ActivityType;
  } | null> | null;
};
export type ActivityScreenQuery = {
  response: ActivityScreenQuery$data;
  variables: ActivityScreenQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "address"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "address",
    "variableName": "address"
  },
  {
    "kind": "Literal",
    "name": "page",
    "value": 1
  },
  {
    "kind": "Literal",
    "name": "pageSize",
    "value": 50
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "timestamp",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "type",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "hash",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "to",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "from",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "symbol",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "address",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "decimals",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "chain",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "tokenStandard",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "quantity",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "sender",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "recipient",
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "direction",
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "currency",
  "storageKey": null
},
v20 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "value",
  "storageKey": null
},
v21 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "tokenId",
  "storageKey": null
},
v22 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "imageUrl",
  "storageKey": null
},
v23 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "nftStandard",
  "storageKey": null
},
v24 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "approvedAddress",
  "storageKey": null
},
v25 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v26 = [
  (v25/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ActivityScreenQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "AssetActivity",
        "kind": "LinkedField",
        "name": "assetActivities",
        "plural": true,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Transaction",
            "kind": "LinkedField",
            "name": "transaction",
            "plural": false,
            "selections": [
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "assetChanges",
            "plural": true,
            "selections": [
              (v8/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Token",
                    "kind": "LinkedField",
                    "name": "asset",
                    "plural": false,
                    "selections": [
                      (v9/*: any*/),
                      (v10/*: any*/),
                      (v11/*: any*/),
                      (v12/*: any*/),
                      (v13/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v14/*: any*/),
                  (v15/*: any*/),
                  (v16/*: any*/),
                  (v17/*: any*/),
                  (v18/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Amount",
                    "kind": "LinkedField",
                    "name": "transactedValue",
                    "plural": false,
                    "selections": [
                      (v19/*: any*/),
                      (v20/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "type": "TokenTransfer",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "NftAsset",
                    "kind": "LinkedField",
                    "name": "asset",
                    "plural": false,
                    "selections": [
                      (v9/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "NftContract",
                        "kind": "LinkedField",
                        "name": "nftContract",
                        "plural": false,
                        "selections": [
                          (v13/*: any*/),
                          (v11/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v21/*: any*/),
                      (v22/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "NftCollection",
                        "kind": "LinkedField",
                        "name": "collection",
                        "plural": false,
                        "selections": [
                          (v9/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  (v23/*: any*/),
                  (v16/*: any*/),
                  (v17/*: any*/),
                  (v18/*: any*/)
                ],
                "type": "NftTransfer",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Token",
                    "kind": "LinkedField",
                    "name": "asset",
                    "plural": false,
                    "selections": [
                      (v9/*: any*/),
                      (v10/*: any*/),
                      (v12/*: any*/),
                      (v11/*: any*/),
                      (v13/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v14/*: any*/),
                  (v24/*: any*/),
                  (v15/*: any*/)
                ],
                "type": "TokenApproval",
                "abstractKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ActivityScreenQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "AssetActivity",
        "kind": "LinkedField",
        "name": "assetActivities",
        "plural": true,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Transaction",
            "kind": "LinkedField",
            "name": "transaction",
            "plural": false,
            "selections": [
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/),
              (v25/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "assetChanges",
            "plural": true,
            "selections": [
              (v8/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Token",
                    "kind": "LinkedField",
                    "name": "asset",
                    "plural": false,
                    "selections": [
                      (v9/*: any*/),
                      (v10/*: any*/),
                      (v11/*: any*/),
                      (v12/*: any*/),
                      (v13/*: any*/),
                      (v25/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v14/*: any*/),
                  (v15/*: any*/),
                  (v16/*: any*/),
                  (v17/*: any*/),
                  (v18/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Amount",
                    "kind": "LinkedField",
                    "name": "transactedValue",
                    "plural": false,
                    "selections": [
                      (v19/*: any*/),
                      (v20/*: any*/),
                      (v25/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v25/*: any*/)
                ],
                "type": "TokenTransfer",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "NftAsset",
                    "kind": "LinkedField",
                    "name": "asset",
                    "plural": false,
                    "selections": [
                      (v9/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "NftContract",
                        "kind": "LinkedField",
                        "name": "nftContract",
                        "plural": false,
                        "selections": [
                          (v13/*: any*/),
                          (v11/*: any*/),
                          (v25/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v21/*: any*/),
                      (v22/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "NftCollection",
                        "kind": "LinkedField",
                        "name": "collection",
                        "plural": false,
                        "selections": [
                          (v9/*: any*/),
                          (v25/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v25/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v23/*: any*/),
                  (v16/*: any*/),
                  (v17/*: any*/),
                  (v18/*: any*/),
                  (v25/*: any*/)
                ],
                "type": "NftTransfer",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Token",
                    "kind": "LinkedField",
                    "name": "asset",
                    "plural": false,
                    "selections": [
                      (v9/*: any*/),
                      (v10/*: any*/),
                      (v12/*: any*/),
                      (v11/*: any*/),
                      (v13/*: any*/),
                      (v25/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v14/*: any*/),
                  (v24/*: any*/),
                  (v15/*: any*/),
                  (v25/*: any*/)
                ],
                "type": "TokenApproval",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": (v26/*: any*/),
                "type": "NftApproval",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": (v26/*: any*/),
                "type": "NftApproveForAll",
                "abstractKey": null
              }
            ],
            "storageKey": null
          },
          (v25/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "5242e58ed80990360d5cfe302b984aeb",
    "id": null,
    "metadata": {},
    "name": "ActivityScreenQuery",
    "operationKind": "query",
    "text": "query ActivityScreenQuery(\n  $address: String!\n) {\n  assetActivities(address: $address, pageSize: 50, page: 1) {\n    timestamp\n    type\n    transaction {\n      hash\n      status\n      to\n      from\n      id\n    }\n    assetChanges {\n      __typename\n      ... on TokenTransfer {\n        asset {\n          name\n          symbol\n          address\n          decimals\n          chain\n          id\n        }\n        tokenStandard\n        quantity\n        sender\n        recipient\n        direction\n        transactedValue {\n          currency\n          value\n          id\n        }\n        id\n      }\n      ... on NftTransfer {\n        asset {\n          name\n          nftContract {\n            chain\n            address\n            id\n          }\n          tokenId\n          imageUrl\n          collection {\n            name\n            id\n          }\n          id\n        }\n        nftStandard\n        sender\n        recipient\n        direction\n        id\n      }\n      ... on TokenApproval {\n        asset {\n          name\n          symbol\n          decimals\n          address\n          chain\n          id\n        }\n        tokenStandard\n        approvedAddress\n        quantity\n        id\n      }\n      ... on NftApproval {\n        id\n      }\n      ... on NftApproveForAll {\n        id\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "bb1bfd60534a8b8f6aa5737e92c70f8f";

export default node;
