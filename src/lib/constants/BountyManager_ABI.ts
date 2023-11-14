export const BountyManager_ABI = [
  { inputs: [], name: "Library__LinkedIdList__InvalidNewId", type: "error" },
  {
    inputs: [{ internalType: "string", name: "funcSig", type: "string" }],
    name: "Module_OrchestratorCallbackFailed",
    type: "error",
  },
  {
    inputs: [],
    name: "Module__BountyManager__BountyAlreadyClaimedOrLocked",
    type: "error",
  },
  {
    inputs: [],
    name: "Module__BountyManager__ClaimExceedsGivenPayoutAmounts",
    type: "error",
  },
  {
    inputs: [],
    name: "Module__BountyManager__ClaimNotBelongingToBounty",
    type: "error",
  },
  { inputs: [], name: "Module__BountyManager__InvalidBountyId", type: "error" },
  { inputs: [], name: "Module__BountyManager__InvalidClaimId", type: "error" },
  {
    inputs: [],
    name: "Module__BountyManager__InvalidContributorAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "Module__BountyManager__InvalidContributorAmount",
    type: "error",
  },
  {
    inputs: [],
    name: "Module__BountyManager__InvalidContributorsLength",
    type: "error",
  },
  {
    inputs: [],
    name: "Module__BountyManager__InvalidPayoutAmounts",
    type: "error",
  },
  {
    inputs: [],
    name: "Module__BountyManager__OnlyClaimContributor",
    type: "error",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "role", type: "bytes32" },
      { internalType: "address", name: "caller", type: "address" },
    ],
    name: "Module__CallerNotAuthorized",
    type: "error",
  },
  { inputs: [], name: "Module__CannotCallInit2Again", type: "error" },
  {
    inputs: [],
    name: "Module__ERC20PaymentClient__ArrayLengthMismatch",
    type: "error",
  },
  {
    inputs: [],
    name: "Module__ERC20PaymentClient__CallerNotAuthorized",
    type: "error",
  },
  {
    inputs: [],
    name: "Module__ERC20PaymentClient__InvalidAmount",
    type: "error",
  },
  {
    inputs: [],
    name: "Module__ERC20PaymentClient__InvalidDueTo",
    type: "error",
  },
  {
    inputs: [],
    name: "Module__ERC20PaymentClient__InvalidRecipient",
    type: "error",
  },
  {
    inputs: [],
    name: "Module__ERC20PaymentClient__TokenTransferFailed",
    type: "error",
  },
  { inputs: [], name: "Module__InvalidMetadata", type: "error" },
  { inputs: [], name: "Module__InvalidOrchestratorAddress", type: "error" },
  {
    inputs: [],
    name: "Module__NoDependencyOrMalformedDependencyData",
    type: "error",
  },
  { inputs: [], name: "Module__OnlyCallableByOrchestrator", type: "error" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "bountyId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "minimumPayoutAmount",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "maximumPayoutAmount",
        type: "uint256",
      },
      { indexed: false, internalType: "bytes", name: "details", type: "bytes" },
    ],
    name: "BountyAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "bountyId",
        type: "uint256",
      },
    ],
    name: "BountyLocked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "bountyId",
        type: "uint256",
      },
      { indexed: true, internalType: "bytes", name: "details", type: "bytes" },
    ],
    name: "BountyUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "claimId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "bountyId",
        type: "uint256",
      },
      {
        components: [
          { internalType: "address", name: "addr", type: "address" },
          { internalType: "uint256", name: "claimAmount", type: "uint256" },
        ],
        indexed: true,
        internalType: "struct IBountyManager.Contributor[]",
        name: "contributors",
        type: "tuple[]",
      },
      { indexed: false, internalType: "bytes", name: "details", type: "bytes" },
    ],
    name: "ClaimAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "claimId",
        type: "uint256",
      },
      {
        components: [
          { internalType: "address", name: "addr", type: "address" },
          { internalType: "uint256", name: "claimAmount", type: "uint256" },
        ],
        indexed: true,
        internalType: "struct IBountyManager.Contributor[]",
        name: "contributors",
        type: "tuple[]",
      },
    ],
    name: "ClaimContributorsUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "claimId",
        type: "uint256",
      },
      { indexed: false, internalType: "bytes", name: "details", type: "bytes" },
    ],
    name: "ClaimDetailsUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "BountyId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "ClaimId",
        type: "uint256",
      },
    ],
    name: "ClaimVerified",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "uint8", name: "version", type: "uint8" },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "PaymentOrderAdded",
    type: "event",
  },
  {
    inputs: [],
    name: "BOUNTY_ADMIN_ROLE",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "CLAIM_ADMIN_ROLE",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "VERIFY_ADMIN_ROLE",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "minimumPayoutAmount", type: "uint256" },
      { internalType: "uint256", name: "maximumPayoutAmount", type: "uint256" },
      { internalType: "bytes", name: "details", type: "bytes" },
    ],
    name: "addBounty",
    outputs: [{ internalType: "uint256", name: "id", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "bountyId", type: "uint256" },
      {
        components: [
          { internalType: "address", name: "addr", type: "address" },
          { internalType: "uint256", name: "claimAmount", type: "uint256" },
        ],
        internalType: "struct IBountyManager.Contributor[]",
        name: "contributors",
        type: "tuple[]",
      },
      { internalType: "bytes", name: "details", type: "bytes" },
    ],
    name: "addClaim",
    outputs: [{ internalType: "uint256", name: "id", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "collectPaymentOrders",
    outputs: [
      {
        components: [
          { internalType: "address", name: "recipient", type: "address" },
          { internalType: "uint256", name: "amount", type: "uint256" },
          { internalType: "uint256", name: "createdAt", type: "uint256" },
          { internalType: "uint256", name: "dueTo", type: "uint256" },
        ],
        internalType: "struct IERC20PaymentClient.PaymentOrder[]",
        name: "",
        type: "tuple[]",
      },
      { internalType: "uint256", name: "", type: "uint256" },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes", name: "data", type: "bytes" }],
    name: "decoder",
    outputs: [{ internalType: "bool", name: "requirement", type: "bool" }],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "bountyId", type: "uint256" }],
    name: "getBountyInformation",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "minimumPayoutAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "maximumPayoutAmount",
            type: "uint256",
          },
          { internalType: "bytes", name: "details", type: "bytes" },
          { internalType: "uint256", name: "claimedBy", type: "uint256" },
        ],
        internalType: "struct IBountyManager.Bounty",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "claimId", type: "uint256" }],
    name: "getClaimInformation",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "bountyId", type: "uint256" },
          {
            components: [
              { internalType: "address", name: "addr", type: "address" },
              { internalType: "uint256", name: "claimAmount", type: "uint256" },
            ],
            internalType: "struct IBountyManager.Contributor[]",
            name: "contributors",
            type: "tuple[]",
          },
          { internalType: "bytes", name: "details", type: "bytes" },
        ],
        internalType: "struct IBountyManager.Claim",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "role", type: "bytes32" },
      { internalType: "address", name: "addr", type: "address" },
    ],
    name: "grantModuleRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "identifier",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IOrchestrator",
        name: "orchestrator_",
        type: "address",
      },
      {
        components: [
          { internalType: "uint256", name: "majorVersion", type: "uint256" },
          { internalType: "uint256", name: "minorVersion", type: "uint256" },
          { internalType: "string", name: "url", type: "string" },
          { internalType: "string", name: "title", type: "string" },
        ],
        internalType: "struct IModule.Metadata",
        name: "metadata",
        type: "tuple",
      },
      { internalType: "bytes", name: "", type: "bytes" },
    ],
    name: "init",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract IOrchestrator", name: "", type: "address" },
      { internalType: "bytes", name: "", type: "bytes" },
    ],
    name: "init2",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "bountyId", type: "uint256" }],
    name: "isExistingBountyId",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "claimId", type: "uint256" }],
    name: "isExistingClaimId",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "listBountyIds",
    outputs: [{ internalType: "uint256[]", name: "", type: "uint256[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "listClaimIds",
    outputs: [{ internalType: "uint256[]", name: "", type: "uint256[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "contributorAddrs", type: "address" },
    ],
    name: "listClaimIdsForContributorAddress",
    outputs: [{ internalType: "uint256[]", name: "", type: "uint256[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "bountyId", type: "uint256" }],
    name: "lockBounty",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "orchestrator",
    outputs: [
      { internalType: "contract IOrchestrator", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "outstandingTokenAmount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "paymentOrders",
    outputs: [
      {
        components: [
          { internalType: "address", name: "recipient", type: "address" },
          { internalType: "uint256", name: "amount", type: "uint256" },
          { internalType: "uint256", name: "createdAt", type: "uint256" },
          { internalType: "uint256", name: "dueTo", type: "uint256" },
        ],
        internalType: "struct IERC20PaymentClient.PaymentOrder[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "role", type: "bytes32" },
      { internalType: "address", name: "addr", type: "address" },
    ],
    name: "revokeModuleRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "title",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "bountyId", type: "uint256" },
      { internalType: "bytes", name: "details", type: "bytes" },
    ],
    name: "updateBounty",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "claimId", type: "uint256" },
      { internalType: "uint256", name: "bountyId", type: "uint256" },
      {
        components: [
          { internalType: "address", name: "addr", type: "address" },
          { internalType: "uint256", name: "claimAmount", type: "uint256" },
        ],
        internalType: "struct IBountyManager.Contributor[]",
        name: "contributors",
        type: "tuple[]",
      },
    ],
    name: "updateClaimContributors",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "claimId", type: "uint256" },
      { internalType: "bytes", name: "details", type: "bytes" },
    ],
    name: "updateClaimDetails",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "url",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "claimId", type: "uint256" },
      { internalType: "uint256", name: "bountyId", type: "uint256" },
    ],
    name: "verifyClaim",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "version",
    outputs: [
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "uint256", name: "", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;
