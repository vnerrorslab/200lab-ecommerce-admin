// ----------------------------------------------------------------------

type EaseType =
    | 'linear'
    | 'easeIn'
    | 'easeOut'
    | 'easeInOut'
    | 'circIn'
    | 'circOut'
    | 'circInOut'
    | 'backIn'
    | 'backOut'
    | 'backInOut'
    | 'anticipate'
    | number[]

export type VariantsType = {
    distance?: number
    durationIn?: number
    durationOut?: number
    easeIn?: EaseType
    easeOut?: EaseType
}

export type TranEnterType = {
    durationIn?: number
    easeIn?: EaseType
}

export type TranExitType = {
    durationOut?: number
    easeOut?: EaseType
}
