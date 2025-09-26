import React from "react";

export const Card: React.FC<React.PropsWithChildren<{ className?: string }>> = ({
    children,
    className,
}) => {
    return <div className={className}>{children}</div>;
};

export const CardHeader: React.FC<React.PropsWithChildren<{ className?: string }>> = ({
    children,
    className,
}) => {
    return <div className={className}>{children}</div>;
};

export const CardContent: React.FC<React.PropsWithChildren<{ className?: string }>> = ({
    children,
    className,
}) => {
    return <div className={className}>{children}</div>;
};

export default Card;
