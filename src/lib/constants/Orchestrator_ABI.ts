export const Orchestrator_ABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "DependencyInjection__ModuleNotUsedInOrchestrator",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "caller",
        type: "address",
      },
    ],
    name: "Orchestrator__CallerNotAuthorized",
    type: "error",
  },
  {
    inputs: [],
    name: "Orchestrator__ExecuteTxFailed",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "module",
        type: "address",
      },
    ],
    name: "Orchestrator__InvalidModuleType",
    type: "error",
  },
  {
    inputs: [],
    name: "Orchestrator__ModuleManager__CallerNotAuthorized",
    type: "error",
  },
  {
    inputs: [],
    name: "Orchestrator__ModuleManager__InvalidModuleAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "Orchestrator__ModuleManager__IsModule",
    type: "error",
  },
  {
    inputs: [],
    name: "Orchestrator__ModuleManager__IsNotModule",
    type: "error",
  },
  {
    inputs: [],
    name: "Orchestrator__ModuleManager__ModuleAmountOverLimits",
    type: "error",
  },
  {
    inputs: [],
    name: "Orchestrator__ModuleManager__ModulesNotConsecutive",
    type: "error",
  },
  {
    inputs: [],
    name: "Orchestrator__ModuleManager__OnlyCallableByModule",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_address",
        type: "address",
      },
    ],
    name: "AuthorizerUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_address",
        type: "address",
      },
    ],
    name: "FundingManagerUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "version",
        type: "uint8",
      },
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
        name: "module",
        type: "address",
      },
    ],
    name: "ModuleAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "module",
        type: "address",
      },
    ],
    name: "ModuleRemoved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_address",
        type: "address",
      },
    ],
    name: "PaymentProcessorUpdated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "module",
        type: "address",
      },
    ],
    name: "addModule",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "authorizer",
    outputs: [
      {
        internalType: "contract IAuthorizer",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "target",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "executeTx",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "executeTxFromModule",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "moduleName",
        type: "string",
      },
    ],
    name: "findModuleAddressInOrchestrator",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "fundingManager",
    outputs: [
      {
        internalType: "contract IFundingManager",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "orchestratorId_",
        type: "uint256",
      },
      {
        internalType: "address[]",
        name: "modules",
        type: "address[]",
      },
      {
        internalType: "contract IFundingManager",
        name: "fundingManager_",
        type: "address",
      },
      {
        internalType: "contract IAuthorizer",
        name: "authorizer_",
        type: "address",
      },
      {
        internalType: "contract IPaymentProcessor",
        name: "paymentProcessor_",
        type: "address",
      },
    ],
    name: "init",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "module",
        type: "address",
      },
    ],
    name: "isModule",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "listModules",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "modulesSize",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "orchestratorId",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "paymentProcessor",
    outputs: [
      {
        internalType: "contract IPaymentProcessor",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "module",
        type: "address",
      },
    ],
    name: "removeModule",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IAuthorizer",
        name: "authorizer_",
        type: "address",
      },
    ],
    name: "setAuthorizer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IFundingManager",
        name: "fundingManager_",
        type: "address",
      },
    ],
    name: "setFundingManager",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IPaymentProcessor",
        name: "paymentProcessor_",
        type: "address",
      },
    ],
    name: "setPaymentProcessor",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "authModule",
        type: "address",
      },
    ],
    name: "verifyAddressIsAuthorizerModule",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "fundingManagerAddress",
        type: "address",
      },
    ],
    name: "verifyAddressIsFundingManager",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "paymentProcessorAddress",
        type: "address",
      },
    ],
    name: "verifyAddressIsPaymentProcessor",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "recurringPaymentManager",
        type: "address",
      },
    ],
    name: "verifyAddressIsRecurringPaymentManager",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "version",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
] as const;
