export type ProgramStatusType =
    | { normal: {} }
    | { halted: {} };

export class ProgramStatus {
    static readonly Normal: ProgramStatusType = {normal: {}};
    static readonly Halted: ProgramStatusType = {halted: {}};
}

export type EventStatusType =
    | { normal: {} }
    | { halted: {} };

export class EventStatus {
    static readonly Normal: EventStatusType = {normal: {}};
    static readonly Halted: EventStatusType = {halted: {}};
}

export type EventTypeType =
    | { public: {} }
    | { private: {} }
    | { privateWithTeam: {} };

export class EventType {
    static readonly Public: EventTypeType = {public: {}};
    static readonly Private: EventTypeType = {private: {}};
    static readonly PrivateWithTeam: EventTypeType = {privateWithTeam: {}};
}

export type EventTeamStatusType =
    | { normal: {} }
    | { halted: {} };

export class EventTeamStatus {
    static readonly Normal: EventTeamStatusType = {normal: {}};
    static readonly Halted: EventTeamStatusType = {halted: {}};
}

export type EventTeamTypeType =
    | { public: {} }
    | { private: {} };

export class EventTeamType {
    static readonly Public: EventTeamTypeType = {public: {}};
    static readonly Private: EventTeamTypeType = {private: {}};
}

export type EventTeamMemberStatusType =
    | { normal: {} }
    | { halted: {} };

export class EventTeamMemberStatus {
    static readonly Normal: EventTeamMemberStatusType = {normal: {}};
    static readonly Halted: EventTeamMemberStatusType = {halted: {}};
}

export type EventTeamMemberTypeType =
    | { admin: {} }
    | { normal: {} };

export class EventTeamMemberType {
    static readonly Admin: EventTeamMemberTypeType = {admin: {}};
    static readonly Normal: EventTeamMemberTypeType = {normal: {}};
}