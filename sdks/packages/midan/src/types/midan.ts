export type Midan = {
    "version": "0.1.1",
    "name": "midan",
    "instructions": [
        {
            "name": "initialize",
            "accounts": [
                {
                    "name": "feeAndRentPayer",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "mainSigningAuthority",
                    "isMut": false,
                    "isSigner": true
                },
                {
                    "name": "programConfig",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "rent",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "params",
                    "type": {
                        "defined": "InitializeInputParams"
                    }
                }
            ]
        },
        {
            "name": "updateProgramStatus",
            "accounts": [
                {
                    "name": "mainSigningAuthority",
                    "isMut": false,
                    "isSigner": true
                },
                {
                    "name": "programConfig",
                    "isMut": true,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "params",
                    "type": {
                        "defined": "UpdateProgramStatusInputParams"
                    }
                }
            ]
        },
        {
            "name": "initializeEvent",
            "accounts": [
                {
                    "name": "feeAndRentPayer",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "authority",
                    "isMut": false,
                    "isSigner": true
                },
                {
                    "name": "eventDetail",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "rent",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "params",
                    "type": {
                        "defined": "InitializeEventInputParams"
                    }
                }
            ]
        },
        {
            "name": "updateEvent",
            "accounts": [
                {
                    "name": "authority",
                    "isMut": false,
                    "isSigner": true
                },
                {
                    "name": "eventDetail",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "rent",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "params",
                    "type": {
                        "defined": "UpdateEventInputParams"
                    }
                }
            ]
        },
        {
            "name": "initializeEventTeam",
            "accounts": [
                {
                    "name": "feeAndRentPayer",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "authority",
                    "isMut": false,
                    "isSigner": true
                },
                {
                    "name": "eventDetail",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "eventTeamDetail",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "eventTeamMemberDetail",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "rent",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "params",
                    "type": {
                        "defined": "InitializeEventTeamInputParams"
                    }
                }
            ]
        },
        {
            "name": "updateEventTeam",
            "accounts": [
                {
                    "name": "authority",
                    "isMut": false,
                    "isSigner": true
                },
                {
                    "name": "eventDetail",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "eventTeamDetail",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "rent",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "params",
                    "type": {
                        "defined": "UpdateEventTeamInputParams"
                    }
                }
            ]
        },
        {
            "name": "initializeEventTeamMember",
            "accounts": [
                {
                    "name": "feeAndRentPayer",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "member",
                    "isMut": false,
                    "isSigner": true
                },
                {
                    "name": "eventDetail",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "eventTeamDetail",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "eventTeamMemberDetail",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "rent",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "params",
                    "type": {
                        "defined": "InitializeEventTeamMemberInputParams"
                    }
                }
            ]
        },
        {
            "name": "updateEventTeamMember",
            "accounts": [
                {
                    "name": "authority",
                    "isMut": false,
                    "isSigner": true
                },
                {
                    "name": "eventDetail",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "eventTeamDetail",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "eventTeamMemberDetail",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "rent",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "params",
                    "type": {
                        "defined": "UpdateEventTeamMemberInputParams"
                    }
                }
            ]
        }
    ],
    "accounts": [
        {
            "name": "eventDetailAccount",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "lastBlockTimestamp",
                        "docs": [
                            "timestamp when account updated"
                        ],
                        "type": "i64"
                    },
                    {
                        "name": "authority",
                        "type": "publicKey"
                    },
                    {
                        "name": "creatorKey",
                        "type": "publicKey"
                    },
                    {
                        "name": "eventType",
                        "type": {
                            "defined": "EventType"
                        }
                    },
                    {
                        "name": "eventStatus",
                        "type": {
                            "defined": "EventStatus"
                        }
                    },
                    {
                        "name": "teamLimit",
                        "type": {
                            "defined": "HaveLimitValue"
                        }
                    },
                    {
                        "name": "memberLimit",
                        "type": {
                            "defined": "HaveLimitValue"
                        }
                    },
                    {
                        "name": "totalTeams",
                        "type": "u32"
                    },
                    {
                        "name": "totalMembers",
                        "type": "u32"
                    },
                    {
                        "name": "eventUrl",
                        "type": "string"
                    },
                    {
                        "name": "codeHash",
                        "type": {
                            "array": [
                                "u8",
                                32
                            ]
                        }
                    }
                ]
            }
        },
        {
            "name": "eventTeamDetailAccount",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "lastBlockTimestamp",
                        "docs": [
                            "timestamp when account updated"
                        ],
                        "type": "i64"
                    },
                    {
                        "name": "authority",
                        "type": "publicKey"
                    },
                    {
                        "name": "creatorKey",
                        "type": "publicKey"
                    },
                    {
                        "name": "index",
                        "type": "u32"
                    },
                    {
                        "name": "eventTeamType",
                        "type": {
                            "defined": "EventTeamType"
                        }
                    },
                    {
                        "name": "eventTeamStatus",
                        "type": {
                            "defined": "EventTeamStatus"
                        }
                    },
                    {
                        "name": "memberLimit",
                        "type": {
                            "defined": "HaveLimitValue"
                        }
                    },
                    {
                        "name": "totalMembers",
                        "type": "u32"
                    },
                    {
                        "name": "teamUrl",
                        "type": "string"
                    },
                    {
                        "name": "codeHash",
                        "type": {
                            "array": [
                                "u8",
                                32
                            ]
                        }
                    }
                ]
            }
        },
        {
            "name": "eventTeamMemberDetailAccount",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "lastBlockTimestamp",
                        "docs": [
                            "timestamp when account updated"
                        ],
                        "type": "i64"
                    },
                    {
                        "name": "creatorKey",
                        "type": "publicKey"
                    },
                    {
                        "name": "team",
                        "type": "publicKey"
                    },
                    {
                        "name": "member",
                        "type": "publicKey"
                    },
                    {
                        "name": "index",
                        "type": "u32"
                    },
                    {
                        "name": "eventTeamMemberType",
                        "type": {
                            "defined": "EventTeamMemberType"
                        }
                    },
                    {
                        "name": "eventTeamMemberStatus",
                        "type": {
                            "defined": "EventTeamMemberStatus"
                        }
                    }
                ]
            }
        },
        {
            "name": "programConfigAccount",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "lastBlockTimestamp",
                        "docs": [
                            "timestamp when account updated"
                        ],
                        "type": "i64"
                    },
                    {
                        "name": "mainSigningAuthority",
                        "docs": [
                            "program main signing authority"
                        ],
                        "type": "publicKey"
                    },
                    {
                        "name": "programStatus",
                        "type": {
                            "defined": "ProgramStatus"
                        }
                    }
                ]
            }
        }
    ],
    "types": [
        {
            "name": "InitializeEventTeamMemberInputParams",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "creatorKey",
                        "type": "publicKey"
                    },
                    {
                        "name": "eventTeamIndex",
                        "type": "u32"
                    },
                    {
                        "name": "teamCode",
                        "type": "string"
                    },
                    {
                        "name": "eventDetailBump",
                        "type": "u8"
                    },
                    {
                        "name": "eventTeamDetailBump",
                        "type": "u8"
                    }
                ]
            }
        },
        {
            "name": "InitializeEventTeamInputParams",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "url",
                        "type": "string"
                    },
                    {
                        "name": "memberLimit",
                        "type": {
                            "option": "u32"
                        }
                    },
                    {
                        "name": "creatorKey",
                        "type": "publicKey"
                    },
                    {
                        "name": "eventTeamType",
                        "type": {
                            "defined": "EventTeamType"
                        }
                    },
                    {
                        "name": "codeHash",
                        "type": {
                            "array": [
                                "u8",
                                32
                            ]
                        }
                    },
                    {
                        "name": "eventCode",
                        "type": "string"
                    },
                    {
                        "name": "eventDetailBump",
                        "type": "u8"
                    }
                ]
            }
        },
        {
            "name": "InitializeEventInputParams",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "url",
                        "type": "string"
                    },
                    {
                        "name": "teamLimit",
                        "type": {
                            "option": "u32"
                        }
                    },
                    {
                        "name": "memberLimit",
                        "type": {
                            "option": "u32"
                        }
                    },
                    {
                        "name": "creatorKey",
                        "type": "publicKey"
                    },
                    {
                        "name": "eventType",
                        "type": {
                            "defined": "EventType"
                        }
                    },
                    {
                        "name": "codeHash",
                        "type": {
                            "array": [
                                "u8",
                                32
                            ]
                        }
                    }
                ]
            }
        },
        {
            "name": "InitializeInputParams",
            "type": {
                "kind": "struct",
                "fields": []
            }
        },
        {
            "name": "UpdateEventTeamMemberInputParams",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "creatorKey",
                        "type": "publicKey"
                    },
                    {
                        "name": "member",
                        "type": "publicKey"
                    },
                    {
                        "name": "eventTeamMemberStatus",
                        "type": {
                            "defined": "EventTeamMemberStatus"
                        }
                    },
                    {
                        "name": "eventTeamIndex",
                        "type": "u32"
                    },
                    {
                        "name": "eventDetailBump",
                        "type": "u8"
                    },
                    {
                        "name": "eventTeamDetailBump",
                        "type": "u8"
                    },
                    {
                        "name": "eventTeamMemberDetailBump",
                        "type": "u8"
                    }
                ]
            }
        },
        {
            "name": "UpdateEventTeamInputParams",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "creatorKey",
                        "type": "publicKey"
                    },
                    {
                        "name": "eventTeamStatus",
                        "type": {
                            "defined": "EventTeamStatus"
                        }
                    },
                    {
                        "name": "codeHash",
                        "type": {
                            "array": [
                                "u8",
                                32
                            ]
                        }
                    },
                    {
                        "name": "eventTeamIndex",
                        "type": "u32"
                    },
                    {
                        "name": "eventDetailBump",
                        "type": "u8"
                    },
                    {
                        "name": "eventTeamDetailBump",
                        "type": "u8"
                    }
                ]
            }
        },
        {
            "name": "UpdateEventInputParams",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "creatorKey",
                        "type": "publicKey"
                    },
                    {
                        "name": "eventStatus",
                        "type": {
                            "defined": "EventStatus"
                        }
                    },
                    {
                        "name": "codeHash",
                        "type": {
                            "array": [
                                "u8",
                                32
                            ]
                        }
                    },
                    {
                        "name": "eventDetailBump",
                        "type": "u8"
                    }
                ]
            }
        },
        {
            "name": "UpdateProgramStatusInputParams",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "programStatus",
                        "type": {
                            "defined": "ProgramStatus"
                        }
                    },
                    {
                        "name": "programConfigBump",
                        "type": "u8"
                    }
                ]
            }
        },
        {
            "name": "HaveLimitValue",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "haveIt",
                        "type": "bool"
                    },
                    {
                        "name": "value",
                        "type": "u32"
                    }
                ]
            }
        },
        {
            "name": "EventStatus",
            "type": {
                "kind": "enum",
                "variants": [
                    {
                        "name": "Normal"
                    },
                    {
                        "name": "Halted"
                    }
                ]
            }
        },
        {
            "name": "EventTeamMemberStatus",
            "type": {
                "kind": "enum",
                "variants": [
                    {
                        "name": "Normal"
                    },
                    {
                        "name": "Halted"
                    }
                ]
            }
        },
        {
            "name": "EventTeamMemberType",
            "type": {
                "kind": "enum",
                "variants": [
                    {
                        "name": "Admin"
                    },
                    {
                        "name": "Normal"
                    }
                ]
            }
        },
        {
            "name": "EventTeamStatus",
            "type": {
                "kind": "enum",
                "variants": [
                    {
                        "name": "Normal"
                    },
                    {
                        "name": "Halted"
                    }
                ]
            }
        },
        {
            "name": "EventTeamType",
            "type": {
                "kind": "enum",
                "variants": [
                    {
                        "name": "Public"
                    },
                    {
                        "name": "Private"
                    }
                ]
            }
        },
        {
            "name": "EventType",
            "type": {
                "kind": "enum",
                "variants": [
                    {
                        "name": "Public"
                    },
                    {
                        "name": "Private"
                    },
                    {
                        "name": "PrivateWithTeam"
                    }
                ]
            }
        },
        {
            "name": "ProgramStatus",
            "type": {
                "kind": "enum",
                "variants": [
                    {
                        "name": "Normal"
                    },
                    {
                        "name": "Halted"
                    }
                ]
            }
        }
    ],
    "events": [
        {
            "name": "InitializeEventEvent",
            "fields": [
                {
                    "name": "timestamp",
                    "type": "i64",
                    "index": false
                },
                {
                    "name": "creatorKey",
                    "type": "publicKey",
                    "index": false
                },
                {
                    "name": "authority",
                    "type": "publicKey",
                    "index": false
                }
            ]
        },
        {
            "name": "InitializeEventTeamEvent",
            "fields": [
                {
                    "name": "timestamp",
                    "type": "i64",
                    "index": false
                },
                {
                    "name": "creatorKey",
                    "type": "publicKey",
                    "index": false
                },
                {
                    "name": "authority",
                    "type": "publicKey",
                    "index": false
                },
                {
                    "name": "eventTeamIndex",
                    "type": "u32",
                    "index": false
                }
            ]
        },
        {
            "name": "InitializeEventTeamMemberEvent",
            "fields": [
                {
                    "name": "timestamp",
                    "type": "i64",
                    "index": false
                },
                {
                    "name": "creatorKey",
                    "type": "publicKey",
                    "index": false
                },
                {
                    "name": "member",
                    "type": "publicKey",
                    "index": false
                },
                {
                    "name": "eventTeamIndex",
                    "type": "u32",
                    "index": false
                }
            ]
        },
        {
            "name": "UpdateEventEvent",
            "fields": [
                {
                    "name": "timestamp",
                    "type": "i64",
                    "index": false
                },
                {
                    "name": "creatorKey",
                    "type": "publicKey",
                    "index": false
                },
                {
                    "name": "authority",
                    "type": "publicKey",
                    "index": false
                },
                {
                    "name": "eventStatus",
                    "type": {
                        "defined": "EventStatus"
                    },
                    "index": false
                }
            ]
        },
        {
            "name": "UpdateEventTeamEvent",
            "fields": [
                {
                    "name": "timestamp",
                    "type": "i64",
                    "index": false
                },
                {
                    "name": "creatorKey",
                    "type": "publicKey",
                    "index": false
                },
                {
                    "name": "authority",
                    "type": "publicKey",
                    "index": false
                },
                {
                    "name": "eventTeamIndex",
                    "type": "u32",
                    "index": false
                },
                {
                    "name": "eventTeamStatus",
                    "type": {
                        "defined": "EventTeamStatus"
                    },
                    "index": false
                }
            ]
        },
        {
            "name": "UpdateEventTeamMemberEvent",
            "fields": [
                {
                    "name": "timestamp",
                    "type": "i64",
                    "index": false
                },
                {
                    "name": "creatorKey",
                    "type": "publicKey",
                    "index": false
                },
                {
                    "name": "authority",
                    "type": "publicKey",
                    "index": false
                },
                {
                    "name": "member",
                    "type": "publicKey",
                    "index": false
                },
                {
                    "name": "eventTeamIndex",
                    "type": "u32",
                    "index": false
                },
                {
                    "name": "eventTeamMemberStatus",
                    "type": {
                        "defined": "EventTeamMemberStatus"
                    },
                    "index": false
                }
            ]
        }
    ],
    "errors": [
        {
            "code": 6000,
            "name": "InvalidMainSigningAuthority",
            "msg": "Invalid main signing authority"
        },
        {
            "code": 6001,
            "name": "InvalidAuthority",
            "msg": "Invalid authority"
        },
        {
            "code": 6002,
            "name": "ValueIsZero",
            "msg": "Value is zero"
        },
        {
            "code": 6003,
            "name": "ProgramHalted",
            "msg": "Program halted"
        },
        {
            "code": 6004,
            "name": "InvalidProgram",
            "msg": "Invalid program"
        },
        {
            "code": 6005,
            "name": "MissingAccount",
            "msg": "Missing account"
        },
        {
            "code": 6006,
            "name": "InvalidUrl",
            "msg": "Invalid url"
        },
        {
            "code": 6007,
            "name": "InvalidCode",
            "msg": "Invalid code"
        },
        {
            "code": 6008,
            "name": "MissingCode",
            "msg": "missing code"
        },
        {
            "code": 6009,
            "name": "EventHalted",
            "msg": "Event halted"
        },
        {
            "code": 6010,
            "name": "EventTeamHalted",
            "msg": "Event team halted"
        },
        {
            "code": 6011,
            "name": "ExceededTeamLimit",
            "msg": "Exceed team limit"
        },
        {
            "code": 6012,
            "name": "ExceededMemberLimit",
            "msg": "Exceed member limit"
        },
        {
            "code": 6013,
            "name": "OnlyPrivateTeam",
            "msg": "Only private team"
        },
        {
            "code": 6014,
            "name": "InvalidTeam",
            "msg": "Invalid team"
        }
    ]
};

export const IDL: Midan = {
    "version": "0.1.1",
    "name": "midan",
    "instructions": [
        {
            "name": "initialize",
            "accounts": [
                {
                    "name": "feeAndRentPayer",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "mainSigningAuthority",
                    "isMut": false,
                    "isSigner": true
                },
                {
                    "name": "programConfig",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "rent",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "params",
                    "type": {
                        "defined": "InitializeInputParams"
                    }
                }
            ]
        },
        {
            "name": "updateProgramStatus",
            "accounts": [
                {
                    "name": "mainSigningAuthority",
                    "isMut": false,
                    "isSigner": true
                },
                {
                    "name": "programConfig",
                    "isMut": true,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "params",
                    "type": {
                        "defined": "UpdateProgramStatusInputParams"
                    }
                }
            ]
        },
        {
            "name": "initializeEvent",
            "accounts": [
                {
                    "name": "feeAndRentPayer",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "authority",
                    "isMut": false,
                    "isSigner": true
                },
                {
                    "name": "eventDetail",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "rent",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "params",
                    "type": {
                        "defined": "InitializeEventInputParams"
                    }
                }
            ]
        },
        {
            "name": "updateEvent",
            "accounts": [
                {
                    "name": "authority",
                    "isMut": false,
                    "isSigner": true
                },
                {
                    "name": "eventDetail",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "rent",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "params",
                    "type": {
                        "defined": "UpdateEventInputParams"
                    }
                }
            ]
        },
        {
            "name": "initializeEventTeam",
            "accounts": [
                {
                    "name": "feeAndRentPayer",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "authority",
                    "isMut": false,
                    "isSigner": true
                },
                {
                    "name": "eventDetail",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "eventTeamDetail",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "eventTeamMemberDetail",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "rent",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "params",
                    "type": {
                        "defined": "InitializeEventTeamInputParams"
                    }
                }
            ]
        },
        {
            "name": "updateEventTeam",
            "accounts": [
                {
                    "name": "authority",
                    "isMut": false,
                    "isSigner": true
                },
                {
                    "name": "eventDetail",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "eventTeamDetail",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "rent",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "params",
                    "type": {
                        "defined": "UpdateEventTeamInputParams"
                    }
                }
            ]
        },
        {
            "name": "initializeEventTeamMember",
            "accounts": [
                {
                    "name": "feeAndRentPayer",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "member",
                    "isMut": false,
                    "isSigner": true
                },
                {
                    "name": "eventDetail",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "eventTeamDetail",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "eventTeamMemberDetail",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "rent",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "params",
                    "type": {
                        "defined": "InitializeEventTeamMemberInputParams"
                    }
                }
            ]
        },
        {
            "name": "updateEventTeamMember",
            "accounts": [
                {
                    "name": "authority",
                    "isMut": false,
                    "isSigner": true
                },
                {
                    "name": "eventDetail",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "eventTeamDetail",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "eventTeamMemberDetail",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "rent",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "params",
                    "type": {
                        "defined": "UpdateEventTeamMemberInputParams"
                    }
                }
            ]
        }
    ],
    "accounts": [
        {
            "name": "eventDetailAccount",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "lastBlockTimestamp",
                        "docs": [
                            "timestamp when account updated"
                        ],
                        "type": "i64"
                    },
                    {
                        "name": "authority",
                        "type": "publicKey"
                    },
                    {
                        "name": "creatorKey",
                        "type": "publicKey"
                    },
                    {
                        "name": "eventType",
                        "type": {
                            "defined": "EventType"
                        }
                    },
                    {
                        "name": "eventStatus",
                        "type": {
                            "defined": "EventStatus"
                        }
                    },
                    {
                        "name": "teamLimit",
                        "type": {
                            "defined": "HaveLimitValue"
                        }
                    },
                    {
                        "name": "memberLimit",
                        "type": {
                            "defined": "HaveLimitValue"
                        }
                    },
                    {
                        "name": "totalTeams",
                        "type": "u32"
                    },
                    {
                        "name": "totalMembers",
                        "type": "u32"
                    },
                    {
                        "name": "eventUrl",
                        "type": "string"
                    },
                    {
                        "name": "codeHash",
                        "type": {
                            "array": [
                                "u8",
                                32
                            ]
                        }
                    }
                ]
            }
        },
        {
            "name": "eventTeamDetailAccount",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "lastBlockTimestamp",
                        "docs": [
                            "timestamp when account updated"
                        ],
                        "type": "i64"
                    },
                    {
                        "name": "authority",
                        "type": "publicKey"
                    },
                    {
                        "name": "creatorKey",
                        "type": "publicKey"
                    },
                    {
                        "name": "index",
                        "type": "u32"
                    },
                    {
                        "name": "eventTeamType",
                        "type": {
                            "defined": "EventTeamType"
                        }
                    },
                    {
                        "name": "eventTeamStatus",
                        "type": {
                            "defined": "EventTeamStatus"
                        }
                    },
                    {
                        "name": "memberLimit",
                        "type": {
                            "defined": "HaveLimitValue"
                        }
                    },
                    {
                        "name": "totalMembers",
                        "type": "u32"
                    },
                    {
                        "name": "teamUrl",
                        "type": "string"
                    },
                    {
                        "name": "codeHash",
                        "type": {
                            "array": [
                                "u8",
                                32
                            ]
                        }
                    }
                ]
            }
        },
        {
            "name": "eventTeamMemberDetailAccount",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "lastBlockTimestamp",
                        "docs": [
                            "timestamp when account updated"
                        ],
                        "type": "i64"
                    },
                    {
                        "name": "creatorKey",
                        "type": "publicKey"
                    },
                    {
                        "name": "team",
                        "type": "publicKey"
                    },
                    {
                        "name": "member",
                        "type": "publicKey"
                    },
                    {
                        "name": "index",
                        "type": "u32"
                    },
                    {
                        "name": "eventTeamMemberType",
                        "type": {
                            "defined": "EventTeamMemberType"
                        }
                    },
                    {
                        "name": "eventTeamMemberStatus",
                        "type": {
                            "defined": "EventTeamMemberStatus"
                        }
                    }
                ]
            }
        },
        {
            "name": "programConfigAccount",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "lastBlockTimestamp",
                        "docs": [
                            "timestamp when account updated"
                        ],
                        "type": "i64"
                    },
                    {
                        "name": "mainSigningAuthority",
                        "docs": [
                            "program main signing authority"
                        ],
                        "type": "publicKey"
                    },
                    {
                        "name": "programStatus",
                        "type": {
                            "defined": "ProgramStatus"
                        }
                    }
                ]
            }
        }
    ],
    "types": [
        {
            "name": "InitializeEventTeamMemberInputParams",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "creatorKey",
                        "type": "publicKey"
                    },
                    {
                        "name": "eventTeamIndex",
                        "type": "u32"
                    },
                    {
                        "name": "teamCode",
                        "type": "string"
                    },
                    {
                        "name": "eventDetailBump",
                        "type": "u8"
                    },
                    {
                        "name": "eventTeamDetailBump",
                        "type": "u8"
                    }
                ]
            }
        },
        {
            "name": "InitializeEventTeamInputParams",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "url",
                        "type": "string"
                    },
                    {
                        "name": "memberLimit",
                        "type": {
                            "option": "u32"
                        }
                    },
                    {
                        "name": "creatorKey",
                        "type": "publicKey"
                    },
                    {
                        "name": "eventTeamType",
                        "type": {
                            "defined": "EventTeamType"
                        }
                    },
                    {
                        "name": "codeHash",
                        "type": {
                            "array": [
                                "u8",
                                32
                            ]
                        }
                    },
                    {
                        "name": "eventCode",
                        "type": "string"
                    },
                    {
                        "name": "eventDetailBump",
                        "type": "u8"
                    }
                ]
            }
        },
        {
            "name": "InitializeEventInputParams",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "url",
                        "type": "string"
                    },
                    {
                        "name": "teamLimit",
                        "type": {
                            "option": "u32"
                        }
                    },
                    {
                        "name": "memberLimit",
                        "type": {
                            "option": "u32"
                        }
                    },
                    {
                        "name": "creatorKey",
                        "type": "publicKey"
                    },
                    {
                        "name": "eventType",
                        "type": {
                            "defined": "EventType"
                        }
                    },
                    {
                        "name": "codeHash",
                        "type": {
                            "array": [
                                "u8",
                                32
                            ]
                        }
                    }
                ]
            }
        },
        {
            "name": "InitializeInputParams",
            "type": {
                "kind": "struct",
                "fields": []
            }
        },
        {
            "name": "UpdateEventTeamMemberInputParams",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "creatorKey",
                        "type": "publicKey"
                    },
                    {
                        "name": "member",
                        "type": "publicKey"
                    },
                    {
                        "name": "eventTeamMemberStatus",
                        "type": {
                            "defined": "EventTeamMemberStatus"
                        }
                    },
                    {
                        "name": "eventTeamIndex",
                        "type": "u32"
                    },
                    {
                        "name": "eventDetailBump",
                        "type": "u8"
                    },
                    {
                        "name": "eventTeamDetailBump",
                        "type": "u8"
                    },
                    {
                        "name": "eventTeamMemberDetailBump",
                        "type": "u8"
                    }
                ]
            }
        },
        {
            "name": "UpdateEventTeamInputParams",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "creatorKey",
                        "type": "publicKey"
                    },
                    {
                        "name": "eventTeamStatus",
                        "type": {
                            "defined": "EventTeamStatus"
                        }
                    },
                    {
                        "name": "codeHash",
                        "type": {
                            "array": [
                                "u8",
                                32
                            ]
                        }
                    },
                    {
                        "name": "eventTeamIndex",
                        "type": "u32"
                    },
                    {
                        "name": "eventDetailBump",
                        "type": "u8"
                    },
                    {
                        "name": "eventTeamDetailBump",
                        "type": "u8"
                    }
                ]
            }
        },
        {
            "name": "UpdateEventInputParams",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "creatorKey",
                        "type": "publicKey"
                    },
                    {
                        "name": "eventStatus",
                        "type": {
                            "defined": "EventStatus"
                        }
                    },
                    {
                        "name": "codeHash",
                        "type": {
                            "array": [
                                "u8",
                                32
                            ]
                        }
                    },
                    {
                        "name": "eventDetailBump",
                        "type": "u8"
                    }
                ]
            }
        },
        {
            "name": "UpdateProgramStatusInputParams",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "programStatus",
                        "type": {
                            "defined": "ProgramStatus"
                        }
                    },
                    {
                        "name": "programConfigBump",
                        "type": "u8"
                    }
                ]
            }
        },
        {
            "name": "HaveLimitValue",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "haveIt",
                        "type": "bool"
                    },
                    {
                        "name": "value",
                        "type": "u32"
                    }
                ]
            }
        },
        {
            "name": "EventStatus",
            "type": {
                "kind": "enum",
                "variants": [
                    {
                        "name": "Normal"
                    },
                    {
                        "name": "Halted"
                    }
                ]
            }
        },
        {
            "name": "EventTeamMemberStatus",
            "type": {
                "kind": "enum",
                "variants": [
                    {
                        "name": "Normal"
                    },
                    {
                        "name": "Halted"
                    }
                ]
            }
        },
        {
            "name": "EventTeamMemberType",
            "type": {
                "kind": "enum",
                "variants": [
                    {
                        "name": "Admin"
                    },
                    {
                        "name": "Normal"
                    }
                ]
            }
        },
        {
            "name": "EventTeamStatus",
            "type": {
                "kind": "enum",
                "variants": [
                    {
                        "name": "Normal"
                    },
                    {
                        "name": "Halted"
                    }
                ]
            }
        },
        {
            "name": "EventTeamType",
            "type": {
                "kind": "enum",
                "variants": [
                    {
                        "name": "Public"
                    },
                    {
                        "name": "Private"
                    }
                ]
            }
        },
        {
            "name": "EventType",
            "type": {
                "kind": "enum",
                "variants": [
                    {
                        "name": "Public"
                    },
                    {
                        "name": "Private"
                    },
                    {
                        "name": "PrivateWithTeam"
                    }
                ]
            }
        },
        {
            "name": "ProgramStatus",
            "type": {
                "kind": "enum",
                "variants": [
                    {
                        "name": "Normal"
                    },
                    {
                        "name": "Halted"
                    }
                ]
            }
        }
    ],
    "events": [
        {
            "name": "InitializeEventEvent",
            "fields": [
                {
                    "name": "timestamp",
                    "type": "i64",
                    "index": false
                },
                {
                    "name": "creatorKey",
                    "type": "publicKey",
                    "index": false
                },
                {
                    "name": "authority",
                    "type": "publicKey",
                    "index": false
                }
            ]
        },
        {
            "name": "InitializeEventTeamEvent",
            "fields": [
                {
                    "name": "timestamp",
                    "type": "i64",
                    "index": false
                },
                {
                    "name": "creatorKey",
                    "type": "publicKey",
                    "index": false
                },
                {
                    "name": "authority",
                    "type": "publicKey",
                    "index": false
                },
                {
                    "name": "eventTeamIndex",
                    "type": "u32",
                    "index": false
                }
            ]
        },
        {
            "name": "InitializeEventTeamMemberEvent",
            "fields": [
                {
                    "name": "timestamp",
                    "type": "i64",
                    "index": false
                },
                {
                    "name": "creatorKey",
                    "type": "publicKey",
                    "index": false
                },
                {
                    "name": "member",
                    "type": "publicKey",
                    "index": false
                },
                {
                    "name": "eventTeamIndex",
                    "type": "u32",
                    "index": false
                }
            ]
        },
        {
            "name": "UpdateEventEvent",
            "fields": [
                {
                    "name": "timestamp",
                    "type": "i64",
                    "index": false
                },
                {
                    "name": "creatorKey",
                    "type": "publicKey",
                    "index": false
                },
                {
                    "name": "authority",
                    "type": "publicKey",
                    "index": false
                },
                {
                    "name": "eventStatus",
                    "type": {
                        "defined": "EventStatus"
                    },
                    "index": false
                }
            ]
        },
        {
            "name": "UpdateEventTeamEvent",
            "fields": [
                {
                    "name": "timestamp",
                    "type": "i64",
                    "index": false
                },
                {
                    "name": "creatorKey",
                    "type": "publicKey",
                    "index": false
                },
                {
                    "name": "authority",
                    "type": "publicKey",
                    "index": false
                },
                {
                    "name": "eventTeamIndex",
                    "type": "u32",
                    "index": false
                },
                {
                    "name": "eventTeamStatus",
                    "type": {
                        "defined": "EventTeamStatus"
                    },
                    "index": false
                }
            ]
        },
        {
            "name": "UpdateEventTeamMemberEvent",
            "fields": [
                {
                    "name": "timestamp",
                    "type": "i64",
                    "index": false
                },
                {
                    "name": "creatorKey",
                    "type": "publicKey",
                    "index": false
                },
                {
                    "name": "authority",
                    "type": "publicKey",
                    "index": false
                },
                {
                    "name": "member",
                    "type": "publicKey",
                    "index": false
                },
                {
                    "name": "eventTeamIndex",
                    "type": "u32",
                    "index": false
                },
                {
                    "name": "eventTeamMemberStatus",
                    "type": {
                        "defined": "EventTeamMemberStatus"
                    },
                    "index": false
                }
            ]
        }
    ],
    "errors": [
        {
            "code": 6000,
            "name": "InvalidMainSigningAuthority",
            "msg": "Invalid main signing authority"
        },
        {
            "code": 6001,
            "name": "InvalidAuthority",
            "msg": "Invalid authority"
        },
        {
            "code": 6002,
            "name": "ValueIsZero",
            "msg": "Value is zero"
        },
        {
            "code": 6003,
            "name": "ProgramHalted",
            "msg": "Program halted"
        },
        {
            "code": 6004,
            "name": "InvalidProgram",
            "msg": "Invalid program"
        },
        {
            "code": 6005,
            "name": "MissingAccount",
            "msg": "Missing account"
        },
        {
            "code": 6006,
            "name": "InvalidUrl",
            "msg": "Invalid url"
        },
        {
            "code": 6007,
            "name": "InvalidCode",
            "msg": "Invalid code"
        },
        {
            "code": 6008,
            "name": "MissingCode",
            "msg": "missing code"
        },
        {
            "code": 6009,
            "name": "EventHalted",
            "msg": "Event halted"
        },
        {
            "code": 6010,
            "name": "EventTeamHalted",
            "msg": "Event team halted"
        },
        {
            "code": 6011,
            "name": "ExceededTeamLimit",
            "msg": "Exceed team limit"
        },
        {
            "code": 6012,
            "name": "ExceededMemberLimit",
            "msg": "Exceed member limit"
        },
        {
            "code": 6013,
            "name": "OnlyPrivateTeam",
            "msg": "Only private team"
        },
        {
            "code": 6014,
            "name": "InvalidTeam",
            "msg": "Invalid team"
        }
    ]
};
