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