export const OPEN_DETAILED_VIEW = "OPEN_DETAILED_VIEW";
export const CLOSE_DETAILED_VIEW = "CLOSE_DETAILED_VIEW";

export const openDetailedView = () => {
    return {
        type: OPEN_DETAILED_VIEW
    }
};

export const closeDetailedView = () => {
    return {
        type: CLOSE_DETAILED_VIEW
    }
};