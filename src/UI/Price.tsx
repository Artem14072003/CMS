import React from "react";
const Price = ({price}: {price: number}) => {
    return (
        <>
            {Intl.NumberFormat("en-EN", {
                    style: "currency",
                    currency: 'USD'
                }).format(price)}
        </>
    );
};

export default React.memo(Price);