import Icon from "@material-ui/core/Icon";
import React from "react";

const getStars = (rating, className) => {
    let numStars = 0;
    let stars = [];
    for (let i = 0; i < rating; i++) {
        stars.push(<Icon color="primary" id={className + "_blueStar_" + i}
                         key={className + "_blueStar_" + i}>star</Icon>);
        numStars++;
    }
    for (let i = numStars; i < 5; i++) {
        stars.push(<Icon color="disabled" key={className + "_blueStar_" + i}
                         id={className + "_blueStar_" + i}>star</Icon>)
    }
    return stars;
};

export default getStars;